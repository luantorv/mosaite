import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"

const TransactionCard = ({ transaction, plan = [], onStatusChange, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)
  const { theme } = useTheme()

  if (!transaction || typeof transaction !== "object") {
    console.error("[v0] TransactionCard recibió una transacción inválida:", transaction)
    return null
  }

  const getCuentaNombre = (codigo) => {
    const cuenta = plan.find(([cod]) => String(cod) === String(codigo))
    return cuenta ? cuenta[1] : codigo
  }

  const lines = transaction.lines || []

  // Separar líneas en debe y haber, y ordenar (debe primero)
  const debeLines = lines.filter(([code, debe, haber]) => debe > 0 && haber === 0)
  const haberLines = lines.filter(([code, debe, haber]) => haber > 0 && debe === 0)
  const sortedLines = [...debeLines, ...haberLines]

  const totalDebe = debeLines.reduce((sum, [, debe]) => sum + debe, 0)
  const totalHaber = haberLines.reduce((sum, [, , haber]) => sum + haber, 0)

  const mainDebeAccount = debeLines.length > 0 ? debeLines[0][0] : "N/A"
  const mainHaberAccount = haberLines.length > 0 ? haberLines[0][0] : "N/A"

  // Función para formatear números
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  const autor = transaction.author || transaction.autor || transaction.createdBy || "N/A"

  // Configuración de estados
  const estadoConfig = {
    0: { icon: "🔍", color: "#ffc107", bg: "#fff3cd", label: "to check" },
    1: { icon: "✓", color: "#17a2b8", bg: "#d1ecf1", label: "checked" },
    2: { icon: "🔒", color: "#28a745", bg: "#d4edda", label: "closed" },
  }

  const currentEstado = estadoConfig[transaction.estado] || estadoConfig[0]
  const isLocked = transaction.estado === 2

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto 16px auto",
        padding: "24px",
        background: theme.background,
        borderRadius: "12px",
        boxShadow: theme.cardShadowOut,
      }}
    >
      {/* Header del componente */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
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
          <span
            style={{
              marginRight: "8px",
              color: theme.textColorSecondary,
              fontSize: "20px",
              padding: "10px",
            }}
          >
            {isExpanded ? "▲" : "▼"}
          </span>

          {!isExpanded ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                  color: theme.textColor,
                }}
              >
                {getCuentaNombre(mainDebeAccount)}/{getCuentaNombre(mainHaberAccount)} || Monto:{" "}
                {formatCurrency(totalDebe)}
              </span>
              {transaction.leyenda && (
                <span
                  style={{
                    fontSize: "14px",
                    color: theme.textColorSecondary,
                    fontStyle: "italic",
                  }}
                >
                  {transaction.leyenda}
                </span>
              )}
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              {transaction.leyenda && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "12px",
                    background: theme.background || "#f8f9fa",
                    borderRadius: "8px",
                    boxShadow: theme.cardShadowIn,
                  }}
                >
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: theme.textColor,
                      marginBottom: "4px",
                    }}
                  >
                    Leyenda:
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: theme.textColorSecondary,
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    {transaction.leyenda}
                  </p>
                </div>
              )}

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${theme.textColorSecondary}` }}>
                      <th style={{ padding: "8px", textAlign: "left", color: theme.textColor, width: "15%" }}>
                        Código
                      </th>
                      <th style={{ padding: "8px", textAlign: "left", color: theme.textColor, width: "45%" }}>
                        Nombre
                      </th>
                      <th style={{ padding: "8px", textAlign: "right", color: theme.textColor, width: "20%" }}>Debe</th>
                      <th style={{ padding: "8px", textAlign: "right", color: theme.textColor, width: "20%" }}>
                        Haber
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLines.map(([code, debe, haber], index) => (
                      <tr key={index} style={{ borderBottom: `1px solid ${theme.textColorSecondary}40` }}>
                        <td style={{ padding: "8px", color: theme.textColorSecondary, fontSize: "14px" }}>{code}</td>
                        <td
                          style={{
                            padding: "8px",
                            color: theme.textColorSecondary,
                            fontSize: "14px",
                            textAlign: debe > 0 ? "left" : "right",
                          }}
                        >
                          {getCuentaNombre(code)}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            textAlign: "right",
                            fontWeight: debe > 0 ? "600" : "normal",
                            color: debe > 0 ? "#28a745" : theme.textColorSecondary,
                            fontSize: "14px",
                          }}
                        >
                          {debe > 0 ? formatCurrency(debe) : "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            textAlign: "right",
                            fontWeight: haber > 0 ? "600" : "normal",
                            color: haber > 0 ? "#dc3545" : theme.textColorSecondary,
                            fontSize: "14px",
                          }}
                        >
                          {haber > 0 ? formatCurrency(haber) : "-"}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid ${theme.textColor}`, fontWeight: "bold" }}>
                      <td colSpan="2" style={{ padding: "8px", color: theme.textColor }}>
                        TOTALES
                      </td>
                      <td style={{ padding: "8px", textAlign: "right", color: "#28a745" }}>
                        {formatCurrency(totalDebe)}
                      </td>
                      <td style={{ padding: "8px", textAlign: "right", color: "#dc3545" }}>
                        {formatCurrency(totalHaber)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Parte derecha - Botones e información */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {/* Botones */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            {/* Botón de estado */}
            <button
              onClick={() => onStatusChange && onStatusChange(transaction)}
              onMouseEnter={() => setHoveredButton("status")}
              onMouseLeave={() => setHoveredButton(null)}
              title={`Estado: ${currentEstado.label}`}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: currentEstado.bg,
                boxShadow: hoveredButton === "status" ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentEstado.icon}
            </button>

            {/* Botón de editar */}
            <button
              onClick={() => onEdit && onEdit(transaction)}
              onMouseEnter={() => setHoveredButton("edit")}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={isLocked}
              title={isLocked ? "No se puede editar (cerrado)" : "Editar transacción"}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: isLocked ? "#f8f9fa" : "#e3f2fd",
                boxShadow: hoveredButton === "edit" && !isLocked ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: isLocked ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isLocked ? "#adb5bd" : "#007bff",
              }}
            >
              ✏️
            </button>

            {/* Botón de borrar */}
            <button
              onClick={() => onDelete && onDelete(transaction)}
              onMouseEnter={() => setHoveredButton("delete")}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={isLocked}
              title={isLocked ? "No se puede eliminar (cerrado)" : "Eliminar transacción"}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: isLocked ? "#f8f9fa" : "#f8d7da",
                boxShadow: hoveredButton === "delete" && !isLocked ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: isLocked ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isLocked ? "#adb5bd" : "#dc3545",
              }}
            >
              🗑️
            </button>
          </div>

          {/* Información adicional cuando está expandido */}
          {isExpanded && (
            <div
              style={{
                fontSize: "20px",
                color: theme.textColorSecondary,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div>Creado por: {autor}</div>
              <div>Fecha: {transaction.fecha || "N/A"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente principal que maneja la lista de transacciones
const TransaccionesApp = ({ transacciones = [], plan = [], onEliminar, onActualizarEstado, onEditar }) => {
  const { theme } = useTheme()

  // Handlers para los eventos
  const handleStatusChange = (transaction) => {
    if (onActualizarEstado) {
      // Ciclar entre estados: 0 -> 1 -> 2 -> 0
      const nuevoEstado = transaction.estado === 2 ? 0 : (transaction.estado || 0) + 1
      onActualizarEstado(transaction.id, nuevoEstado)
    }
  }

  const handleEdit = (transaction) => {
    if (onEditar) {
      onEditar(transaction)
    }
  }

  const handleDelete = (transaction) => {
    if (onEliminar && window.confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
      onEliminar(transaction.id)
    }
  }

  const transaccionesValidas = transacciones.filter((t) => t && typeof t === "object" && t.id)

  if (transaccionesValidas.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: theme.textColorSecondary,
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>No hay transacciones válidas para mostrar</p>
        <p style={{ fontSize: "14px" }}>Las transacciones creadas aparecerán aquí</p>
      </div>
    )
  }

  // Ordenar transacciones por fecha (más reciente primero)
  const transaccionesOrdenadas = [...transaccionesValidas].sort((a, b) => {
    const fechaA = new Date(a.fechaCreacion || a.fecha).getTime()
    const fechaB = new Date(b.fechaCreacion || b.fecha).getTime()
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
          {transaccionesOrdenadas.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              plan={plan}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransaccionesApp
export { TransactionCard }
