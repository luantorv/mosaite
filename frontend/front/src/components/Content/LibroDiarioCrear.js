import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { TransactionCard } from "./TransaccionCard"
import libroDiarioService from "../../services/LibroDiarioService"

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function LibroDiarioCrear() {
  const { theme } = useTheme()

  const [fecha, setFecha] = useState(formatDate(new Date()))
  const [preview, setPreview] = useState(null)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const formatCurrency = (cents) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format((cents || 0) / 100)

  const handlePrevisualizar = async () => {
    if (!fecha) return
    setLoadingPreview(true)
    setError(null)
    setMensaje(null)
    setPreview(null)

    const result = await libroDiarioService.previewLedger(fecha)

    if (result.success) {
      setPreview(result.preview)
    } else {
      setError(result.error)
    }

    setLoadingPreview(false)
  }

  const handleGenerar = async () => {
    if (!fecha) return
    setCreating(true)
    setError(null)
    setMensaje(null)

    const result = await libroDiarioService.createLedger(fecha)

    if (result.success) {
      setMensaje(`Libro diario del ${fecha} generado correctamente.`)
      setPreview(null)
    } else {
      setError(result.error)
    }

    setCreating(false)
  }

  const transacciones = preview?.transactions || []
  const puedeGenerar =
    preview && preview.transactions_count > 0 && !preview.already_exists && !creating

  const inputStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: theme.background,
    boxShadow: theme.cardShadowIn,
    color: theme.textColor,
    fontSize: "15px",
  }

  const primaryButton = (enabled) => ({
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    background: enabled
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : theme.textColorSecondary,
    border: "none",
    borderRadius: "12px",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.6,
    boxShadow: enabled ? "0 4px 12px rgba(102, 126, 234, 0.3)" : "none",
    transition: "all 0.2s ease",
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "16px 0",
          borderBottom: `2px solid ${theme.textColorSecondary || "#ccc"}`,
          marginBottom: "24px",
        }}
      >
        <h3 style={{ fontSize: "24px", fontWeight: "600", color: theme.textColor, margin: 0 }}>
          Generar Libro Diario
        </h3>
        <p style={{ fontSize: "14px", color: theme.textColorSecondary, marginTop: "8px", marginBottom: 0 }}>
          Selecciona una fecha para reunir todas las transacciones verificadas de ese día en un libro
          diario. Al generarlo, esas transacciones quedarán cerradas.
        </p>
      </div>

      {/* Selector de fecha + acciones */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label htmlFor="fechaLibro" style={{ color: theme.textColor, fontSize: "16px", fontWeight: "500" }}>
            Fecha:
          </label>
          <input
            id="fechaLibro"
            type="date"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value)
              setPreview(null)
              setMensaje(null)
              setError(null)
            }}
            style={inputStyle}
          />
        </div>

        <button onClick={handlePrevisualizar} disabled={loadingPreview || !fecha} style={primaryButton(!loadingPreview && !!fecha)}>
          {loadingPreview ? "Cargando..." : "Previsualizar"}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "8px",
            background: "#f8d7da",
            color: "#dc3545",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {mensaje && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "8px",
            background: "#d4edda",
            color: "#28a745",
            fontSize: "14px",
          }}
        >
          {mensaje}
        </div>
      )}

      {/* Previsualización */}
      {preview && (
        <div style={{ flex: 1, overflow: "auto", paddingRight: "8px" }}>
          {/* Resumen */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              padding: "16px",
              marginBottom: "20px",
              borderRadius: "12px",
              background: theme.background,
              boxShadow: theme.cardShadowIn,
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: theme.textColorSecondary }}>Transacciones</div>
              <div style={{ fontSize: "22px", fontWeight: "600", color: theme.textColor }}>
                {preview.transactions_count}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: theme.textColorSecondary }}>Total Debe</div>
              <div style={{ fontSize: "22px", fontWeight: "600", color: "#28a745" }}>
                {formatCurrency(preview.total_debit)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: theme.textColorSecondary }}>Total Haber</div>
              <div style={{ fontSize: "22px", fontWeight: "600", color: "#dc3545" }}>
                {formatCurrency(preview.total_credit)}
              </div>
            </div>
          </div>

          {preview.already_exists && (
            <div
              style={{
                padding: "12px 16px",
                marginBottom: "16px",
                borderRadius: "8px",
                background: "#fff3cd",
                color: "#856404",
                fontSize: "14px",
              }}
            >
              Ya existe un libro diario para el {fecha}. Puedes consultarlo en «Recientes».
            </div>
          )}

          {transacciones.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: theme.textColorSecondary }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                No hay transacciones verificadas para el {fecha}
              </p>
              <p style={{ fontSize: "14px" }}>
                Solo las transacciones verificadas (o ya cerradas) entran en el libro diario.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {transacciones.map((t) => (
                <TransactionCard key={t.trans_id} transaction={t} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Botón generar */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "16px",
          marginTop: "auto",
        }}
      >
        <button onClick={handleGenerar} disabled={!puedeGenerar} style={primaryButton(puedeGenerar)}>
          {creating ? "Generando..." : "Generar libro diario"}
        </button>
      </div>
    </div>
  )
}

export default LibroDiarioCrear
