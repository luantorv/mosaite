import os
import subprocess
import tempfile
import shutil
import re
from pathlib import Path
from typing import Dict, Optional, Tuple, Set


class LaTeXToPDFError(Exception):
    """Excepción personalizada para errores del módulo LaTeX a PDF"""
    pass


def latex_to_pdf(
    template_path: str,
    replacements: Dict[str, str],
    output_dir: str,
    output_filename: Optional[str] = None
) -> str:
    """
    Genera un PDF a partir de una plantilla LaTeX reemplazando valores.
    
    Args:
        template_path: Ruta al archivo de plantilla .tex
        replacements: Diccionario con claves y valores a reemplazar
        output_dir: Directorio donde guardar el PDF resultante
        output_filename: Nombre del archivo PDF (sin extensión). Si es None, 
                        usa el nombre de la plantilla.
    
    Returns:
        str: Mensaje de éxito con la ruta del archivo generado
        
    Raises:
        LaTeXToPDFError: Si ocurre algún error en el proceso
    """
    
    # 1. Validar tipos de parámetros
    _validate_input_types(template_path, replacements, output_dir, output_filename)
    
    # 2. Validar que la plantilla existe
    template_path = Path(template_path)
    if not template_path.exists():
        raise LaTeXToPDFError(f"La plantilla no existe: {template_path}")
    
    if not template_path.suffix.lower() == '.tex':
        raise LaTeXToPDFError(f"La plantilla debe ser un archivo .tex: {template_path}")
    
    # 3. Validar permisos de escritura en el directorio de salida
    output_dir = Path(output_dir)
    _validate_output_directory(output_dir)
    
    # 4. Leer y validar la plantilla
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            template_content = f.read()
    except Exception as e:
        raise LaTeXToPDFError(f"Error al leer la plantilla: {e}")
    
    # 5. Validar que las claves coincidan
    template_keys = _extract_template_keys(template_content)
    replacement_keys = set(replacements.keys())
    
    _validate_key_matching(template_keys, replacement_keys)
    
    # 6. Reemplazar valores en la plantilla
    processed_content = _replace_template_values(template_content, replacements)
    
    # 7. Compilar LaTeX y generar PDF
    output_filename = output_filename or template_path.stem
    try:
        pdf_path = _compile_latex_to_pdf(
            processed_content, 
            output_dir, 
            output_filename
        )
        return f"✅ PDF generado exitosamente: {pdf_path}"
        
    except Exception as e:
        raise LaTeXToPDFError(f"Error durante la compilación de LaTeX: {e}")


def _validate_input_types(
    template_path: str,
    replacements: Dict[str, str],
    output_dir: str,
    output_filename: Optional[str]
) -> None:
    """Valida los tipos de los parámetros de entrada"""
    
    if not isinstance(template_path, str):
        raise LaTeXToPDFError(f"template_path debe ser string, recibido: {type(template_path)}")
    
    if not isinstance(replacements, dict):
        raise LaTeXToPDFError(f"replacements debe ser dict, recibido: {type(replacements)}")
    
    if not isinstance(output_dir, str):
        raise LaTeXToPDFError(f"output_dir debe ser string, recibido: {type(output_dir)}")
    
    if output_filename is not None and not isinstance(output_filename, str):
        raise LaTeXToPDFError(f"output_filename debe ser string o None, recibido: {type(output_filename)}")
    
    # Validar que todas las claves y valores del diccionario sean strings
    for key, value in replacements.items():
        if not isinstance(key, str):
            raise LaTeXToPDFError(f"Todas las claves deben ser strings. Clave inválida: {key} ({type(key)})")
        if not isinstance(value, str):
            raise LaTeXToPDFError(f"Todos los valores deben ser strings. Valor inválido para '{key}': {value} ({type(value)})")


def _validate_output_directory(output_dir: Path) -> None:
    """Valida que el directorio de salida sea accesible"""
    
    # Crear el directorio si no existe
    try:
        output_dir.mkdir(parents=True, exist_ok=True)
    except Exception as e:
        raise LaTeXToPDFError(f"No se pudo crear el directorio de salida: {e}")
    
    # Verificar permisos de escritura
    if not os.access(output_dir, os.W_OK):
        raise LaTeXToPDFError(f"Sin permisos de escritura en: {output_dir}")


def _extract_template_keys(template_content: str) -> Set[str]:
    """Extrae las claves de la plantilla (formato {{clave}})"""
    
    # Buscar patrones como {{clave}} en la plantilla
    # La expresión regular debe ser más específica para evitar confusiones con llaves de LaTeX
    pattern = r'\{\{([^{}]+)\}\}'
    matches = re.findall(pattern, template_content)
    
    # Limpiar espacios en blanco de las claves encontradas
    keys = {match.strip() for match in matches}
    
    return keys


def _validate_key_matching(template_keys: Set[str], replacement_keys: Set[str]) -> None:
    """Valida que las claves de la plantilla y el diccionario coincidan"""
    
    missing_in_dict = template_keys - replacement_keys
    extra_in_dict = replacement_keys - template_keys
    
    errors = []
    
    if missing_in_dict:
        errors.append(f"Claves faltantes en el diccionario: {sorted(missing_in_dict)}")
    
    if extra_in_dict:
        errors.append(f"Claves extra en el diccionario: {sorted(extra_in_dict)}")
    
    if errors:
        raise LaTeXToPDFError(f"Error de coincidencia de claves: {'; '.join(errors)}")


def _replace_template_values(template_content: str, replacements: Dict[str, str]) -> str:
    """Reemplaza los valores en la plantilla"""
    
    processed_content = template_content
    
    for key, value in replacements.items():
        # Escapar caracteres especiales de LaTeX en el valor
        escaped_value = _escape_latex_special_chars(value)
        
        # Reemplazar {{clave}} con el valor
        pattern = r'\{\{' + re.escape(key.strip()) + r'\}\}'
        processed_content = re.sub(pattern, escaped_value, processed_content)
    
    return processed_content


def _escape_latex_special_chars(text: str) -> str:
    """Escapa caracteres especiales de LaTeX"""
    
    # Caracteres que necesitan ser escapados en LaTeX
    latex_special_chars = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '^': r'\textasciicircum{}',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '\\': r'\textbackslash{}'
    }
    
    result = text
    for char, replacement in latex_special_chars.items():
        result = result.replace(char, replacement)
    
    return result


def _compile_latex_to_pdf(
    latex_content: str,
    output_dir: Path,
    filename: str
) -> Path:
    """Compila el contenido LaTeX a PDF"""
    
    # Crear un directorio temporal para la compilación
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        
        # Escribir el archivo .tex temporal
        tex_file = temp_path / f"{filename}.tex"
        try:
            with open(tex_file, 'w', encoding='utf-8') as f:
                f.write(latex_content)
        except Exception as e:
            raise LaTeXToPDFError(f"Error al escribir archivo temporal: {e}")
        
        # Guardar el directorio de trabajo actual
        original_cwd = os.getcwd()
        
        try:
            # Cambiar al directorio temporal para evitar archivos auxiliares en el directorio original
            os.chdir(temp_path)
            
            # Compilar con pdflatex
            for _ in range(2):
                result = subprocess.run([
                    'pdflatex',
                    '-interaction=nonstopmode',
                    '-output-directory', str(temp_path),
                    f"{filename}.tex"
                ], 
                capture_output=True, 
                text=True,
                cwd=temp_path
                )
                
                if result.returncode != 0:
                    # Leer el log para obtener más información del error
                    log_file = temp_path / f"{filename}.log"
                    error_details = ""
                    if log_file.exists():
                        try:
                            with open(log_file, 'r', encoding='utf-8') as f:
                                log_content = f.read()
                                # Extraer líneas de error del log
                                error_lines = [line for line in log_content.split('\n') if 'error' in line.lower()]
                                if error_lines:
                                    error_details = f"\nDetalles del error: {chr(10).join(error_lines[:5])}"
                        except:
                            pass
                    
                    raise LaTeXToPDFError(f"pdflatex falló con código {result.returncode}: {result.stderr}{error_details}")
        
        except FileNotFoundError:
            raise LaTeXToPDFError("pdflatex no está instalado o no está en el PATH")
        except Exception as e:
            raise LaTeXToPDFError(f"Error ejecutando pdflatex: {e}")
        finally:
            # Restaurar el directorio de trabajo original
            os.chdir(original_cwd)
        
        # Verificar que se generó el PDF
        pdf_temp_file = temp_path / f"{filename}.pdf"
        if not pdf_temp_file.exists():
            raise LaTeXToPDFError("No se generó el archivo PDF")
        
        # Mover el PDF al directorio de salida
        final_pdf_path = output_dir / f"{filename}.pdf"
        try:
            shutil.copy2(pdf_temp_file, final_pdf_path)
            
            # Limpiar cualquier archivo auxiliar que haya podido quedar en el directorio original
            _cleanup_auxiliary_files(original_cwd, filename)
            
            return final_pdf_path
        except Exception as e:
            raise LaTeXToPDFError(f"Error al copiar el PDF final: {e}")


def _cleanup_auxiliary_files(directory: str, filename: str) -> None:
    """Limpia archivos auxiliares de LaTeX que puedan haber quedado"""
    
    # Extensiones de archivos auxiliares de LaTeX
    aux_extensions = ['.aux', '.log', '.fdb_latexmk', '.fls', '.synctex.gz', '.toc', '.lof', '.lot', '.out', '.bbl', '.blg']
    
    directory_path = Path(directory)
    
    for ext in aux_extensions:
        aux_file = directory_path / f"{filename}{ext}"
        if aux_file.exists():
            try:
                aux_file.unlink()
                print(f"🧹 Archivo auxiliar eliminado: {aux_file.name}")
            except Exception:
                # Si no se puede eliminar, no es crítico
                pass


# Función auxiliar para uso más simple
def quick_pdf_from_template(template_path: str, data: Dict[str, str], output_path: str) -> str:
    """
    Función simplificada para generar PDF desde plantilla.
    
    Args:
        template_path: Ruta a la plantilla .tex
        data: Diccionario con datos a reemplazar
        output_path: Ruta completa del PDF de salida (incluyendo nombre y extensión)
    
    Returns:
        str: Mensaje de resultado
    """
    output_path = Path(output_path)
    output_dir = output_path.parent
    filename = output_path.stem
    
    return latex_to_pdf(template_path, data, str(output_dir), filename)


def create_example_template(filename: str = "plantilla_ejemplo.tex") -> str:
    """Crea una plantilla de ejemplo para pruebas"""
    
    template_content = r"""\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[spanish]{babel}
\usepackage{geometry}
\geometry{margin=2.5cm}

\title{{{titulo}}}
\author{{{nombre}}}
\date{{{fecha}}}

\begin{document}

\maketitle

\section{Información Personal}

Estimado/a {{nombre}},

Este documento ha sido generado automáticamente el día {{fecha}}.

\section{Detalles}

\begin{itemize}
    \item \textbf{Nombre:} {{nombre}}
    \item \textbf{Cargo:} {{cargo}}
    \item \textbf{Departamento:} {{departamento}}
    \item \textbf{Email:} {{email}}
\end{itemize}

\section{Mensaje}

{{mensaje}}

\vspace{2cm}

Atentamente,\\
La Administración

\end{document}"""

    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(template_content)
        return f"✅ Plantilla creada: {filename}"
    except Exception as e:
        return f"❌ Error creando plantilla: {e}"


if __name__ == "__main__":
    print("=== Módulo LaTeX a PDF - Ejemplo de Uso ===\n")
    
    # 1. Crear plantilla de ejemplo
    print("1. Creando plantilla de ejemplo...")
    result = create_example_template()
    print(result)
    
    # 2. Probar la generación de PDF
    print("\n2. Generando PDF desde plantilla...")
    try:
        # Datos de ejemplo
        data = {
            "titulo": "Documento de Ejemplo",
            "nombre": "Juan Pérez",
            "fecha": "22 de Septiembre de 2025",
            "cargo": "Desarrollador Python",
            "departamento": "Tecnología",
            "email": "juan.perez@empresa.com",
            "mensaje": "Este es un documento de prueba generado automáticamente usando una plantilla LaTeX y el módulo personalizado de Python."
        }
        
        # Generar PDF
        result = latex_to_pdf(
            template_path="plantilla_ejemplo.tex",
            replacements=data,
            output_dir="./output",
            output_filename="documento_generado"
        )
        
        print(result)
        
    except LaTeXToPDFError as e:
        print(f"❌ Error: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
    
    print("\n=== Fin del ejemplo ===")
    print("\nPara usar el módulo:")
    print("1. Ejecuta este script para crear la plantilla de ejemplo")
    print("2. O crea tu propia plantilla .tex usando el formato {{clave}}")
    print("3. Importa el módulo: from latex_pdf_module import latex_to_pdf")
    print("4. Llama a latex_to_pdf() con tus datos")