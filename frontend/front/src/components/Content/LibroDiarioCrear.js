import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import TransaccionesApp from "./TransaccionCard"

function TransaccionVerificar({ transacciones, plan, onEliminar, onActualizarEstado, onEditar }) {
  const { theme } = useTheme()
  const [hoveredButton, setHoveredButton] = useState(false)

  const transaccionesArray = transacciones || []

  // Filtrar transacciones por estado
  const transaccionesParaVerificar = transaccionesArray.filter((t) => t.estado === 0)
  const transaccionesVerificadas = transaccionesArray.filter((t) => t.estado === 1)

  // Función para cambiar el estado de "to check" a "checked"
  const handleActualizarEstado = (id, estadoActual) => {
    if (onActualizarEstado) {
      // Alternar: si es 0 pasa a 1, si es 1 pasa a 0
      const nuevoEstado = estadoActual === 0 ? 1 : 0
      onActualizarEstado(id, nuevoEstado)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Contenedor de las dos secciones */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          flex: 1,
          overflow: "auto",
          marginBottom: "80px",
          paddingRight: "8px",
        }}
      >
        {/* Sección: Transacciones para verificar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 0",
              borderBottom: `2px solid ${theme.textColorSecondary || "#ccc"}`,
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: theme.textColor,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Para Verificar
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.textColorSecondary,
                  background: "#fff3cd",
                  padding: "4px 12px",
                  borderRadius: "12px",
                }}
              >
                {transaccionesParaVerificar.length}
              </span>
            </h3>
          </div>

          <div>
            {transaccionesParaVerificar.length === 0 ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: theme.textColorSecondary,
                }}
              >
                <p style={{ fontSize: "18px", marginBottom: "10px" }}>No hay transacciones para verificar</p>
                <p style={{ fontSize: "14px" }}>Las transacciones pendientes aparecerán aquí</p>
              </div>
            ) : (
              <TransaccionesApp
                transacciones={transaccionesParaVerificar}
                plan={plan}
                onEliminar={onEliminar}
                onActualizarEstado={handleActualizarEstado}
                onEditar={onEditar}
              />
            )}
          </div>
        </div>

        {/* Sección: Transacciones verificadas */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 0",
              borderBottom: `2px solid ${theme.textColorSecondary || "#ccc"}`,
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: theme.textColor,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Verificadas
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.textColorSecondary,
                  background: "#d1ecf1",
                  padding: "4px 12px",
                  borderRadius: "12px",
                }}
              >
                {transaccionesVerificadas.length}
              </span>
            </h3>
          </div>

          <div>
            {transaccionesVerificadas.length === 0 ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: theme.textColorSecondary,
                }}
              >
                <p style={{ fontSize: "18px", marginBottom: "10px" }}>No hay transacciones verificadas</p>
                <p style={{ fontSize: "14px" }}>Las transacciones verificadas aparecerán aquí</p>
              </div>
            ) : (
              <TransaccionesApp
                transacciones={transaccionesVerificadas}
                plan={plan}
                onEliminar={onEliminar}
                onActualizarEstado={onActualizarEstado}
                onEditar={onEditar}
              />
            )}
          </div>
        </div>
      </div>

      {/* Botón "Crear" en la parte inferior derecha */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
      >
        <button
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
          style={{
            padding: "14px 32px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#fff",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: hoveredButton ? "0 8px 16px rgba(102, 126, 234, 0.4)" : "0 4px 12px rgba(102, 126, 234, 0.3)",
            transition: "all 0.3s ease",
            transform: hoveredButton ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          Crear
        </button>
      </div>
    </div>
  )
}

export default TransaccionVerificar
