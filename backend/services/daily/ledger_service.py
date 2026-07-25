"""
Servicio de libros diarios (daily).

Gestiona la creación de libros diarios en PDF a partir de transacciones
contables, su almacenamiento en disco y su posterior acceso (listado,
recuperación y borrado).

Un *libro diario* corresponde a un día concreto y agrupa todas las
transacciones de esa fecha en un único PDF, mostrando por cada asiento sus
entradas de Debe y Haber y una fila de totales.

El servicio es agnóstico de Django: recibe las transacciones como una lista de
diccionarios con la forma que produce `TransactionSerializer`:

    {
        "trans_id": 12,
        "date": "2026-07-24",
        "legend": "Compra de mercadería",
        "user_name": "Ana",
        "entries": [
            {"account": {"code": "1.1.01", "name": "Caja"},
             "debit": 150000, "credit": 0},
            {"account": {"code": "2.1.01", "name": "Proveedores"},
             "debit": 0, "credit": 150000},
        ],
    }

Los importes (`debit`/`credit`) están expresados en centavos (enteros).
"""

import json
import threading
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

from .config import (
    CURRENCY_SYMBOL,
    INDEX_FILE,
    LEDGER_TEMPLATE,
    PDF_PREFIX,
    STORAGE_DIR,
)
from .main import LaTeXToPDFError, compile_latex_to_pdf, escape_latex


class DailyLedgerError(Exception):
    """Error del servicio de libros diarios."""
    pass


# --- Helpers de formato/renderizado (nivel de módulo, sin estado) ---

_COL_SEP = " & "
_ROW_END = r" \\"


def _format_money(cents: int) -> str:
    """Convierte centavos (int) a una cadena con separador de miles: 1,234.56."""
    return f"{(cents or 0) / 100:,.2f}"


def _money_cell(cents: int) -> str:
    """Celda de importe con símbolo de moneda (LaTeX crudo)."""
    return CURRENCY_SYMBOL + _format_money(cents)


def _debit_row(code: str, name: str, cents: int) -> str:
    # Código | Cuenta | Debe | (Haber vacío)
    return escape_latex(code) + _COL_SEP + escape_latex(name) + _COL_SEP + _money_cell(cents) + _COL_SEP + _ROW_END


def _credit_row(code: str, name: str, cents: int) -> str:
    # Código | (Cuenta indentada) | (Debe vacío) | Haber
    return (
        escape_latex(code)
        + _COL_SEP
        + r"\hspace*{0.8cm}"
        + escape_latex(name)
        + _COL_SEP
        + _COL_SEP
        + _money_cell(cents)
        + _ROW_END
    )


def _legend_row(legend: str) -> str:
    # Fila que ocupa las 4 columnas con la leyenda del asiento en cursiva.
    return r"\multicolumn{4}{p{15cm}}{\footnotesize\textit{" + escape_latex(legend) + r"}} " + _ROW_END


def _render_rows(transacciones: List[Dict]) -> str:
    """Renderiza el cuerpo de la tabla LaTeX a partir de las transacciones."""
    lines: List[str] = []

    # Ordenar por trans_id para una salida estable
    ordenadas = sorted(transacciones, key=lambda t: t.get("trans_id", 0))

    for trans in ordenadas:
        entries = trans.get("entries", []) or []
        debe_entries = [e for e in entries if (e.get("debit") or 0) > 0]
        haber_entries = [e for e in entries if (e.get("credit") or 0) > 0]

        for entry in debe_entries:
            account = entry.get("account") or {}
            lines.append(_debit_row(account.get("code", "---"), account.get("name", ""), entry["debit"]))

        for entry in haber_entries:
            account = entry.get("account") or {}
            lines.append(_credit_row(account.get("code", "---"), account.get("name", ""), entry["credit"]))

        legend = trans.get("legend")
        if legend:
            lines.append(_legend_row(legend))

        lines.append(r"\hline")

    return "\n".join(lines)


class DailyLedgerService:
    """Servicio de creación, almacenamiento y acceso de libros diarios en PDF."""

    def __init__(self):
        # Protege lecturas/escrituras concurrentes del índice de metadatos.
        self._lock = threading.Lock()

    # --- Índice de metadatos ---

    def _load_index(self) -> Dict[str, Dict]:
        if not INDEX_FILE.exists():
            return {}
        try:
            with open(INDEX_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, OSError):
            # Índice corrupto o ilegible: se trata como vacío para no romper el flujo.
            return {}

    def _save_index(self, index: Dict[str, Dict]) -> None:
        try:
            with open(INDEX_FILE, "w", encoding="utf-8") as f:
                json.dump(index, f, ensure_ascii=False, indent=2)
        except OSError as e:
            raise DailyLedgerError(f"No se pudo guardar el índice de libros diarios: {e}")

    def _record_with_path(self, record: Dict) -> Dict:
        """Devuelve una copia del registro con la ruta absoluta del PDF resuelta."""
        enriched = dict(record)
        enriched["path"] = str(STORAGE_DIR / record["filename"])
        return enriched

    # --- Generación ---

    def generate_ledger(
        self,
        fecha: str,
        transacciones: List[Dict],
        autor: Optional[str] = None,
        overwrite: bool = False,
    ) -> Dict:
        """
        Genera (y almacena) el libro diario de una fecha.

        Args:
            fecha: Fecha del libro diario en formato ISO (YYYY-MM-DD).
            transacciones: Lista de transacciones de esa fecha (ver módulo).
            autor: Nombre de quien genera el libro (opcional).
            overwrite: Si ya existe un libro para esa fecha y es False, lanza
                       error; si es True, lo regenera.

        Returns:
            El registro de metadatos del libro generado (incluye `path`).

        Raises:
            DailyLedgerError: Si no hay transacciones, ya existe (sin overwrite)
                              o falla la compilación del PDF.
        """
        if not fecha or not isinstance(fecha, str):
            raise DailyLedgerError("Se requiere una fecha válida (YYYY-MM-DD).")

        if not transacciones:
            raise DailyLedgerError(f"No hay transacciones para generar el libro diario del {fecha}.")

        with self._lock:
            index = self._load_index()
            if fecha in index and not overwrite:
                raise DailyLedgerError(
                    f"Ya existe un libro diario para el {fecha}. Usa overwrite=True para regenerarlo."
                )

        # Calcular totales (en centavos)
        total_debe = 0
        total_haber = 0
        for trans in transacciones:
            for entry in trans.get("entries", []) or []:
                total_debe += entry.get("debit") or 0
                total_haber += entry.get("credit") or 0

        # Renderizar el documento LaTeX
        latex_content = self._render_document(
            fecha=fecha,
            autor=autor or "N/A",
            filas=_render_rows(transacciones),
            total_debe=_format_money(total_debe),
            total_haber=_format_money(total_haber),
        )

        filename = f"{PDF_PREFIX}_{fecha}.pdf"
        try:
            compile_latex_to_pdf(latex_content, str(STORAGE_DIR), f"{PDF_PREFIX}_{fecha}")
        except LaTeXToPDFError as e:
            raise DailyLedgerError(f"Error al generar el PDF del libro diario: {e}")

        record = {
            "id": fecha,
            "fecha": fecha,
            "filename": filename,
            "autor": autor or "N/A",
            "created_at": datetime.now().isoformat(timespec="seconds"),
            "total_debe": total_debe,
            "total_haber": total_haber,
            "transacciones": len(transacciones),
        }

        with self._lock:
            index = self._load_index()
            index[fecha] = record
            self._save_index(index)

        return self._record_with_path(record)

    def _render_document(
        self,
        fecha: str,
        autor: str,
        filas: str,
        total_debe: str,
        total_haber: str,
    ) -> str:
        """Lee la plantilla y sustituye los marcadores por sus valores."""
        if not LEDGER_TEMPLATE.exists():
            raise DailyLedgerError(f"No se encontró la plantilla del libro diario: {LEDGER_TEMPLATE}")

        try:
            template = LEDGER_TEMPLATE.read_text(encoding="utf-8")
        except OSError as e:
            raise DailyLedgerError(f"No se pudo leer la plantilla del libro diario: {e}")

        generado = datetime.now().strftime("%Y-%m-%d %H:%M")

        # Los valores escalares provistos por el usuario se escapan; `filas` ya
        # viene renderizado como LaTeX y se inserta en último lugar.
        content = template
        content = content.replace("{{fecha}}", escape_latex(fecha))
        content = content.replace("{{autor}}", escape_latex(autor))
        content = content.replace("{{generado}}", escape_latex(generado))
        content = content.replace("{{total_debe}}", total_debe)
        content = content.replace("{{total_haber}}", total_haber)
        content = content.replace("{{filas}}", filas)
        return content

    # --- Acceso ---

    def list_ledgers(self) -> List[Dict]:
        """Lista los libros diarios almacenados, del más reciente al más antiguo."""
        with self._lock:
            index = self._load_index()
        records = [self._record_with_path(r) for r in index.values()]
        records.sort(key=lambda r: r["fecha"], reverse=True)
        return records

    def get_ledger(self, ledger_id: str) -> Optional[Dict]:
        """Devuelve el registro de un libro diario por su id (fecha), o None."""
        with self._lock:
            index = self._load_index()
        record = index.get(ledger_id)
        return self._record_with_path(record) if record else None

    def get_ledger_path(self, ledger_id: str) -> Optional[Path]:
        """Devuelve la ruta del PDF de un libro diario si existe en disco."""
        record = self.get_ledger(ledger_id)
        if not record:
            return None
        path = Path(record["path"])
        return path if path.exists() else None

    def get_ledger_bytes(self, ledger_id: str) -> Optional[bytes]:
        """Devuelve el contenido binario del PDF, o None si no existe."""
        path = self.get_ledger_path(ledger_id)
        if not path:
            return None
        return path.read_bytes()

    def delete_ledger(self, ledger_id: str) -> bool:
        """
        Elimina un libro diario (PDF + entrada del índice).

        Returns:
            True si existía y se eliminó, False si no existía.
        """
        with self._lock:
            index = self._load_index()
            record = index.pop(ledger_id, None)
            if record is None:
                return False

            pdf_path = STORAGE_DIR / record["filename"]
            if pdf_path.exists():
                try:
                    pdf_path.unlink()
                except OSError as e:
                    # Reinsertar para no dejar el índice inconsistente con el disco.
                    index[ledger_id] = record
                    self._save_index(index)
                    raise DailyLedgerError(f"No se pudo eliminar el PDF del libro diario: {e}")

            self._save_index(index)
            return True


# Instancia singleton para uso en toda la aplicación
daily_service = DailyLedgerService()
