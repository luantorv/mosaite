import { useState, useEffect, useCallback } from "react"
import { useTheme } from "../../context/ThemeContext"
import { LibrosDiariosApp } from "./LibroDiarioCard"
import libroDiarioService from "../../services/LibroDiarioService"

const LibrosDiariosRecientes = () => {
  const { theme } = useTheme()
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [librosDiarios, setLibrosDiarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Función para formatear fecha a yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Mapear un libro diario del backend al formato que espera la tarjeta
  const mapLedger = (ledger) => ({
    id: ledger.ledger_id,
    ledger_id: ledger.ledger_id,
    fecha: ledger.date,
    autor: ledger.user_name,
    hora: (ledger.created_at || "").split("T")[1]?.slice(0, 5) || "",
    pdf_filename: ledger.pdf_filename,
    date: ledger.date,
    transaccionesCount: ledger.transactions_count,
    totalDebe: ledger.total_debit,
    totalHaber: ledger.total_credit,
  })

  // Inicializar fechas por defecto (últimos 7 días)
  useEffect(() => {
    const hoy = new Date()
    const hace7Dias = new Date()
    hace7Dias.setDate(hoy.getDate() - 7)

    setFechaDesde(formatDate(hace7Dias))
    setFechaHasta(formatDate(hoy))
  }, [])

  // Cargar libros diarios desde el backend cuando cambian las fechas
  const cargarLibrosDiarios = useCallback(async () => {
    if (!fechaDesde || !fechaHasta) return

    setLoading(true)
    setError(null)

    const result = await libroDiarioService.getLedgers({
      date_from: fechaDesde,
      date_to: fechaHasta,
    })

    if (result.success) {
      setLibrosDiarios(result.ledgers.map(mapLedger))
    } else {
      setError(result.error)
      setLibrosDiarios([])
    }

    setLoading(false)
  }, [fechaDesde, fechaHasta])

  useEffect(() => {
    cargarLibrosDiarios()
  }, [cargarLibrosDiarios])

  const handleDescargar = async (libro) => {
    const result = await libroDiarioService.downloadLedger(libro)
    if (!result.success) {
      alert(`Error al descargar: ${result.error}`)
    }
  }

  const handleBorrar = async (libro) => {
    const result = await libroDiarioService.deleteLedger(libro.ledger_id)
    if (result.success) {
      setLibrosDiarios((prev) => prev.filter((l) => l.id !== libro.id))
    } else {
      alert(`Error al eliminar: ${result.error}`)
    }
  }

  return (
    <div
      style={{
        background: theme.background,
        minHeight: "400px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            htmlFor="fechaDesde"
            style={{
              color: theme.textColor,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Desde:
          </label>
          <input
            id="fechaDesde"
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: theme.background,
              boxShadow: theme.cardShadowIn,
              color: theme.textColor,
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            htmlFor="fechaHasta"
            style={{
              color: theme.textColor,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Hasta:
          </label>
          <input
            id="fechaHasta"
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: theme.background,
              boxShadow: theme.cardShadowIn,
              color: theme.textColor,
              fontSize: "14px",
            }}
          />
        </div>
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

      {loading ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: theme.textColorSecondary,
          }}
        >
          Cargando libros diarios...
        </div>
      ) : (
        <LibrosDiariosApp
          librosDiarios={librosDiarios}
          onDescargar={handleDescargar}
          onBorrar={handleBorrar}
        />
      )}
    </div>
  )
}

export default LibrosDiariosRecientes
