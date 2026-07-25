import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import accountService from "../../services/AccountService";
import transactionService from "../../services/TransactionService";

/**
 * Modal para editar una transacción existente.
 *
 * Props:
 *  - transaction: la transacción a editar (con entries)
 *  - onClose: () => void  — cerrar el modal sin guardar
 *  - onUpdated: (transaccionActualizada) => void — tras guardar con éxito
 */
function TransaccionEditar({ transaction, onClose, onUpdated }) {
  const { theme } = useTheme();

  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fecha, setFecha] = useState(
    transaction?.date || transaction?.created_at?.split("T")[0] || new Date().toISOString().split("T")[0]
  );
  const [lines, setLines] = useState([{ acc_id: null, debe: 0, haber: 0 }]);
  const [leyenda, setLeyenda] = useState(transaction?.legend || "");
  const [showAccountMenu, setShowAccountMenu] = useState(null);
  const [error, setError] = useState("");

  // Cargar cuentas y prellenar líneas desde las entradas de la transacción
  useEffect(() => {
    loadAccounts();
    // Convertir las entradas del backend (centavos) a líneas del formulario (pesos)
    const entries = transaction?.entries || [];
    const prefilled = entries.map((entry) => ({
      acc_id: entry.account?.acc_id ?? entry.acc_id ?? null,
      debe: (entry.debit || 0) / 100,
      haber: (entry.credit || 0) / 100,
    }));
    setLines(prefilled.length > 0 ? prefilled : [{ acc_id: null, debe: 0, haber: 0 }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  const loadAccounts = async () => {
    setLoadingAccounts(true);
    const result = await accountService.getActiveAccounts();
    if (result.success) {
      setAccounts(result.accounts);
    } else {
      setError(result.error);
    }
    setLoadingAccounts(false);
  };

  const getAccountById = (accId) => accounts.find((acc) => acc.acc_id === accId);
  const getNombreCuenta = (accId) => getAccountById(accId)?.name || "";
  const getCodigoCuenta = (accId) => getAccountById(accId)?.code || "";

  const agregarLinea = () => setLines([...lines, { acc_id: null, debe: 0, haber: 0 }]);

  const seleccionarCuenta = (index, accId) => {
    const newLines = [...lines];
    newLines[index].acc_id = accId;
    setLines(newLines);
    setShowAccountMenu(null);
  };

  const actualizarMonto = (index, campo, valor) => {
    const newLines = [...lines];
    const nuevoValor = parseFloat(valor) || 0;
    if (campo === "debe") {
      newLines[index].debe = nuevoValor;
      if (nuevoValor > 0) newLines[index].haber = 0;
    } else {
      newLines[index].haber = nuevoValor;
      if (nuevoValor > 0) newLines[index].debe = 0;
    }
    setLines(newLines);
  };

  const eliminarLinea = (index) => {
    if (lines.length > 1) setLines(lines.filter((_, i) => i !== index));
  };

  const guardarCambios = async () => {
    setError("");

    const lineasValidas = lines.filter((line) => line.acc_id && (line.debe > 0 || line.haber > 0));

    if (lineasValidas.length < 2) {
      setError("Una transacción debe tener al menos 2 entradas con cuenta y monto");
      return;
    }

    const lineaInvalida = lineasValidas.find((line) => line.debe > 0 && line.haber > 0);
    if (lineaInvalida) {
      setError("Una línea no puede tener valores en Debe y Haber al mismo tiempo");
      return;
    }

    const totalDebe = lineasValidas.reduce((sum, line) => sum + line.debe, 0);
    const totalHaber = lineasValidas.reduce((sum, line) => sum + line.haber, 0);
    if (Math.abs(totalDebe - totalHaber) > 0.01) {
      setError(`La transacción no está balanceada. Diferencia: $${Math.abs(totalDebe - totalHaber).toFixed(2)}`);
      return;
    }

    setSaving(true);

    const transactionData = {
      date: fecha,
      legend: leyenda.trim() || null,
      entries: lineasValidas.map((line) => ({
        acc_id: line.acc_id,
        debit: Math.round(line.debe * 100),
        credit: Math.round(line.haber * 100),
      })),
    };

    const result = await transactionService.updateTransaction(transaction.trans_id, transactionData);

    if (result.success) {
      if (onUpdated) onUpdated(result.transaction);
      onClose();
    } else {
      // Reutilizar el formato de error del backend (puede ser objeto o string)
      if (typeof result.error === "object" && result.error !== null) {
        const messages = [];
        Object.entries(result.error).forEach(([field, value]) => {
          const arr = Array.isArray(value) ? value : [value];
          messages.push(`${field}: ${arr.join(", ")}`);
        });
        setError(messages.join("\n") || "Error al actualizar la transacción");
      } else {
        setError(result.error || "Error al actualizar la transacción");
      }
    }

    setSaving(false);
  };

  const totalDebe = lines.reduce((sum, line) => sum + line.debe, 0);
  const totalHaber = lines.reduce((sum, line) => sum + line.haber, 0);
  const estaBalanceado = Math.abs(totalDebe - totalHaber) < 0.01;

  const linesSorted = [...lines].sort((a, b) => {
    const aEsDebe = a.haber === 0 && a.debe >= 0;
    const bEsDebe = b.haber === 0 && b.debe >= 0;
    if (aEsDebe && !bEsDebe) return -1;
    if (!aEsDebe && bEsDebe) return 1;
    return 0;
  });

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={() => !saving && onClose()}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 9998,
        }}
      />

      {/* Contenedor del modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: theme.background,
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          padding: "30px",
          zIndex: 9999,
          width: "90%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h4 style={{ color: theme.textColor, margin: 0 }}>
            Editar Transacción <span style={{ color: theme.textColorSecondary, fontSize: "14px" }}>#{transaction.trans_id}</span>
          </h4>
          <button
            onClick={() => !saving && onClose()}
            disabled={saving}
            style={{
              background: "transparent",
              border: "none",
              color: theme.textColorSecondary,
              fontSize: "24px",
              cursor: saving ? "not-allowed" : "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {loadingAccounts ? (
          <div style={{ textAlign: "center", padding: "40px", color: theme.textColor }}>
            <div className="spinner-border mb-3" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando cuentas...</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ color: theme.textColor, fontWeight: "500", minWidth: "60px" }}>Fecha:</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                disabled={saving}
                style={{
                  background: theme.background,
                  color: theme.textColor,
                  border: `2px solid ${theme.border || "#ddd"}`,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  boxShadow: theme.cardShadowIn,
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px",
                  background: "#ff4d4f20",
                  border: "1px solid #ff4d4f",
                  borderRadius: "8px",
                  color: "#ff4d4f",
                  fontSize: "14px",
                  whiteSpace: "pre-line",
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                background: theme.background,
                borderRadius: "12px",
                boxShadow: theme.cardShadowOut,
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 130px 130px 40px",
                  gap: "10px",
                  marginBottom: "15px",
                  paddingBottom: "10px",
                  borderBottom: `2px solid ${theme.border || "#ddd"}`,
                }}
              >
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Código</div>
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Nombre</div>
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Debe</div>
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "center" }}>Haber</div>
                <div></div>
              </div>

              {linesSorted.map((line) => {
                const originalIndex = lines.findIndex((l) => l === line);
                const nombreCuenta = getNombreCuenta(line.acc_id);
                const codigoCuenta = getCodigoCuenta(line.acc_id);
                const esHaber = line.haber > 0 || (line.haber === 0 && line.debe === 0);

                return (
                  <div
                    key={originalIndex}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr 130px 130px 40px",
                      gap: "10px",
                      marginBottom: "10px",
                      alignItems: "center",
                      background: theme.background,
                      borderRadius: "8px",
                      boxShadow: theme.cardShadowIn,
                      padding: "12px",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setShowAccountMenu(showAccountMenu === originalIndex ? null : originalIndex)}
                        disabled={saving}
                        style={{
                          width: "100%",
                          background: theme.background,
                          color: codigoCuenta ? theme.textColor : theme.textColorSecondary,
                          border: `1px solid ${theme.border || "#ddd"}`,
                          borderRadius: "4px",
                          padding: "8px",
                          cursor: saving ? "not-allowed" : "pointer",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        {codigoCuenta || "---"}
                      </button>

                      {showAccountMenu === originalIndex && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            minWidth: "350px",
                            background: theme.background,
                            borderRadius: "8px",
                            boxShadow: theme.cardShadowOut,
                            zIndex: 10000,
                            maxHeight: "250px",
                            overflowY: "auto",
                            border: `1px solid ${theme.border || "#ddd"}`,
                            marginTop: "5px",
                          }}
                        >
                          {accounts.map((cuenta) => (
                            <div
                              key={cuenta.acc_id}
                              onClick={() => seleccionarCuenta(originalIndex, cuenta.acc_id)}
                              style={{
                                padding: "10px",
                                cursor: "pointer",
                                color: theme.textColor,
                                fontSize: "14px",
                                borderBottom: `1px solid ${theme.border || "#eee"}`,
                              }}
                              onMouseEnter={(e) => (e.target.style.background = theme.hoverBackground || "rgba(0,0,0,0.05)")}
                              onMouseLeave={(e) => (e.target.style.background = "transparent")}
                            >
                              {cuenta.code} - {cuenta.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        color: theme.textColor,
                        fontSize: "14px",
                        textAlign: esHaber ? "right" : "left",
                        paddingLeft: esHaber ? "0" : "10px",
                        paddingRight: esHaber ? "10px" : "0",
                      }}
                    >
                      {nombreCuenta}
                    </div>

                    <input
                      type="number"
                      step="0.01"
                      value={line.debe || ""}
                      onChange={(e) => actualizarMonto(originalIndex, "debe", e.target.value)}
                      placeholder="0.00"
                      disabled={line.haber > 0 || saving}
                      style={{
                        background: theme.background,
                        color: theme.textColor,
                        border: `1px solid ${theme.border || "#ddd"}`,
                        borderRadius: "4px",
                        padding: "8px",
                        textAlign: "right",
                        opacity: line.haber > 0 || saving ? 0.5 : 1,
                      }}
                    />

                    <input
                      type="number"
                      step="0.01"
                      value={line.haber || ""}
                      onChange={(e) => actualizarMonto(originalIndex, "haber", e.target.value)}
                      placeholder="0.00"
                      disabled={line.debe > 0 || saving}
                      style={{
                        background: theme.background,
                        color: theme.textColor,
                        border: `1px solid ${theme.border || "#ddd"}`,
                        borderRadius: "4px",
                        padding: "8px",
                        textAlign: "right",
                        opacity: line.debe > 0 || saving ? 0.5 : 1,
                      }}
                    />

                    <button
                      onClick={() => eliminarLinea(originalIndex)}
                      disabled={lines.length === 1 || saving}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: lines.length === 1 || saving ? "#ccc" : "#dc3545",
                        cursor: lines.length === 1 || saving ? "not-allowed" : "pointer",
                        fontSize: "18px",
                        padding: "0",
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}

              <button
                onClick={agregarLinea}
                disabled={saving}
                style={{
                  width: "100%",
                  background: theme.background,
                  border: `2px dashed ${theme.border || "#ddd"}`,
                  borderRadius: "8px",
                  padding: "12px",
                  color: theme.textColorSecondary,
                  fontSize: "22px",
                  cursor: saving ? "not-allowed" : "pointer",
                  marginTop: "10px",
                  opacity: saving ? 0.5 : 1,
                }}
              >
                +
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 130px 130px 40px",
                  gap: "10px",
                  marginTop: "15px",
                  paddingTop: "15px",
                  borderTop: `2px solid ${theme.border || "#ddd"}`,
                }}
              >
                <div></div>
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "right" }}>Totales:</div>
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "right", paddingRight: "8px" }}>
                  ${totalDebe.toFixed(2)}
                </div>
                <div style={{ color: theme.textColor, fontWeight: "600", textAlign: "right", paddingRight: "8px" }}>
                  ${totalHaber.toFixed(2)}
                </div>
                <div></div>
              </div>
            </div>

            {(totalDebe > 0 || totalHaber > 0) && (
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  background: estaBalanceado ? "#d4edda" : "#f8d7da",
                  color: estaBalanceado ? "#155724" : "#721c24",
                }}
              >
                {estaBalanceado ? "✓ Transacción balanceada" : `⚠ Diferencia: $${Math.abs(totalDebe - totalHaber).toFixed(2)}`}
              </div>
            )}

            <div style={{ marginBottom: "25px" }}>
              <label style={{ color: theme.textColor, fontWeight: "500", display: "block", marginBottom: "10px" }}>
                Leyenda
              </label>
              <textarea
                value={leyenda}
                onChange={(e) => setLeyenda(e.target.value)}
                placeholder="Escribe aquí..."
                disabled={saving}
                style={{
                  width: "100%",
                  minHeight: "70px",
                  background: theme.background,
                  color: theme.textColor,
                  border: `2px solid ${theme.border || "#ddd"}`,
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow: theme.cardShadowIn,
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  opacity: saving ? 0.5 : 1,
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
              <button
                onClick={() => !saving && onClose()}
                disabled={saving}
                style={{
                  background: theme.background,
                  color: theme.textColor,
                  border: `2px solid ${theme.border || "#ddd"}`,
                  borderRadius: "8px",
                  padding: "10px 20px",
                  cursor: saving ? "not-allowed" : "pointer",
                  boxShadow: theme.cardShadowOut,
                  opacity: saving ? 0.5 : 1,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios}
                disabled={saving || !estaBalanceado || totalDebe === 0}
                style={{
                  background: !saving && estaBalanceado && totalDebe > 0 ? theme.primaryColor : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  cursor: !saving && estaBalanceado && totalDebe > 0 ? "pointer" : "not-allowed",
                  boxShadow: theme.cardShadowOut,
                }}
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </>
        )}

        {/* Capa para cerrar el menú de cuentas al hacer clic fuera */}
        {showAccountMenu !== null && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              background: "transparent",
            }}
            onClick={() => setShowAccountMenu(null)}
          />
        )}
      </div>
    </>
  );
}

export default TransaccionEditar;
