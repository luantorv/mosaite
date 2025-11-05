import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"

const LibroDiarioCard = ({ libroDiario, onDescargar, onBorrar }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)
  const { theme } = useTheme()

  const handleDescargar = () => {
    if (onDescargar) {
      onDescargar(libroDiario)
    } else {
      console.log("Descargar libro diario:", libroDiario)
    }
  }

  const handleBorrar = () => {
    if (onBorrar && window.confirm("¿Estás seguro de que quieres eliminar este libro diario?")) {
      onBorrar(libroDiario)
    }
  }

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto 16px auto",
        padding: "20px 24px",
        background: theme.background,
        borderRadius: "12px",
        boxShadow: theme.cardShadowOut,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Parte izquierda - Contenido principal */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            flex: 1,
            marginRight: "16px",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Triángulo para expandir/colapsar */}
          <span
            style={{
              marginRight: "12px",
              color: theme.textColorSecondary,
              fontSize: "18px",
              padding: "8px",
            }}
          >
            {isExpanded ? "▲" : "▼"}
          </span>

          {/* Fecha */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: "500",
                color: theme.textColor,
              }}
            >
              {libroDiario.fecha || "N/A"}
            </span>

            {/* Información expandida */}
            {isExpanded && (
              <div
                style={{
                  fontSize: "16px",
                  color: theme.textColorSecondary,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  marginTop: "8px",
                }}
              >
                <div>Creado por: {libroDiario.autor || "N/A"}</div>
              </div>
            )}
          </div>
        </div>

        {/* Parte derecha - Botones y hora */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
          }}
        >
          {/* Botones */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Botón de descargar */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDescargar()
              }}
              onMouseEnter={() => setHoveredButton("download")}
              onMouseLeave={() => setHoveredButton(null)}
              title="Descargar libro diario"
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "#d1ecf1",
                boxShadow: hoveredButton === "download" ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#17a2b8",
              }}
            >
              ⬇
            </button>

            {/* Botón de borrar */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleBorrar()
              }}
              onMouseEnter={() => setHoveredButton("delete")}
              onMouseLeave={() => setHoveredButton(null)}
              title="Eliminar libro diario"
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "#f8d7da",
                boxShadow: hoveredButton === "delete" ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#dc3545",
              }}
            >
              🗑
            </button>
          </div>

          {/* Hora (solo visible cuando está expandido) */}
          {isExpanded && (
            <div
              style={{
                fontSize: "16px",
                color: theme.textColorSecondary,
                marginTop: "4px",
              }}
            >
              {libroDiario.hora || "N/A"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente principal que maneja la lista de libros diarios
const LibrosDiariosApp = ({ librosDiarios = [], onDescargar, onBorrar }) => {
  const { theme } = useTheme()

  if (!librosDiarios || librosDiarios.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: theme.textColorSecondary,
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>No hay libros diarios para mostrar</p>
        <p style={{ fontSize: "14px" }}>Los libros diarios creados aparecerán aquí</p>
      </div>
    )
  }

  // Ordenar libros diarios por fecha (más reciente primero)
  const librosDiariosOrdenados = [...librosDiarios].sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime()
    const fechaB = new Date(b.fecha).getTime()
    return fechaB - fechaA
  })

  return (
    <div
      style={{
        background: theme.background,
        minHeight: "200px",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {librosDiariosOrdenados.map((libroDiario, index) => (
            <LibroDiarioCard
              key={libroDiario.id || index}
              libroDiario={libroDiario}
              onDescargar={onDescargar}
              onBorrar={onBorrar}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LibroDiarioCard
export { LibrosDiariosApp }
