import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import LibroDiarioCard from "./LibroDiarioCard"

const LibrosDiariosRecientes = () => {
  const { theme } = useTheme()
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [librosDiarios, setLibrosDiarios] = useState([])

  // Función para formatear fecha a yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Función para generar hora random entre 19:00 y 20:00
  const generateRandomHour = () => {
    const minutes = Math.floor(Math.random() * 60)
    const hour = 19
    return `${hour}:${String(minutes).padStart(2, "0")}`
  }

  // Inicializar fechas por defecto
  useEffect(() => {
    const hoy = new Date()
    const hace7Dias = new Date()
    hace7Dias.setDate(hoy.getDate() - 7)

    setFechaDesde(formatDate(hace7Dias))
    setFechaHasta(formatDate(hoy))
  }, [])

  // Generar libros diarios cuando cambian las fechas
  useEffect(() => {
    if (fechaDesde && fechaHasta) {
      const generarLibrosDiarios = () => {
        const libros = []
        const desde = new Date(fechaDesde + "T00:00:00")
        const hasta = new Date(fechaHasta + "T00:00:00")
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        // Iterar desde la fecha "desde" hasta "hasta"
        const currentDate = new Date(desde)
        while (currentDate <= hasta) {
          // Solo agregar si es una fecha pasada (no incluye hoy)
          if (currentDate < hoy) {
            libros.push({
              id: formatDate(currentDate),
              fecha: formatDate(currentDate),
              hora: generateRandomHour(),
              autor: "usuario_poc",
            })
          }
          currentDate.setDate(currentDate.getDate() + 1)
        }

        // Ordenar de más reciente a más antiguo
        libros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        setLibrosDiarios(libros)
      }

      generarLibrosDiarios()
    }
  }, [fechaDesde, fechaHasta])

  const handleDescargar = (libro) => {
    console.log("Descargar libro diario:", libro)
    // Aquí iría la lógica para descargar el libro
  }

  const handleBorrar = (libro) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el libro diario del ${libro.fecha}?`)) {
      console.log("Borrar libro diario:", libro)
      // Aquí iría la lógica para borrar el libro
      setLibrosDiarios(librosDiarios.filter((l) => l.id !== libro.id))
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

      {/* Lista de libros diarios */}
      <div>
        {librosDiarios.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: theme.textColorSecondary,
            }}
          >
            <p style={{ fontSize: "18px" }}>No hay libros diarios para mostrar</p>
          </div>
        ) : (
          librosDiarios.map((libro) => (
            <LibroDiarioCard key={libro.id} libroDiario={libro} onDescargar={handleDescargar} onBorrar={handleBorrar} />
          ))
        )}
      </div>
    </div>
  )
}

export default LibrosDiariosRecientes
