import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"

const TransactionCard = ({ transaction, onStatusChange, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)
  const { theme } = useTheme()

  if (!transaction || typeof transaction !== "object") {
    console.error("TransactionCard recibió una transacción inválida:", transaction)
    return null
  }

  // Adaptar datos del backend
  const entries = transaction.entries || []
  
  // Validar que entries tenga datos válidos
  if (entries.length === 0) {
    console.warn("TransactionCard: No hay entries en la transacción", transaction)
  }
  
  // Convertir centavos a pesos y separar en debe/haber
  const debeLines = entries
    .filter(entry => entry && entry.debit > 0)
    .map(entry => {
      const account = entry.account || {}
      return {
        code: account.code || entry.acc_id || "???",
        name: account.name || "Cuenta no encontrada",
        debe: entry.debit / 100,
        haber: 0
      }
    })
  
  const haberLines = entries
    .filter(entry => entry && entry.credit > 0)
    .map(entry => {
      const account = entry.account || {}
      return {
        code: account.code || entry.acc_id || "???",
        name: account.name || "Cuenta no encontrada",
        debe: 0,
        haber: entry.credit / 100
      }
    })

  const sortedLines = [...debeLines, ...haberLines]

  const totalDebe = debeLines.reduce((sum, line) => sum + line.debe, 0)
  const totalHaber = haberLines.reduce((sum, line) => sum + line.haber, 0)

  const mainDebeAccount = debeLines.length > 0 ? debeLines[0].name : "N/A"
  const mainHaberAccount = haberLines.length > 0 ? haberLines[0].name : "N/A"

  // Función para formatear números
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  const autor = transaction.user_name || "N/A"
  const fecha = transaction.date || transaction.created_at?.split('T')[0] || "N/A"
  const leyenda = transaction.legend || ""

  // Sistema de 3 estados (como Git)
  // status: false = 0 (Por verificar / to check)
  // status: true = 1 (Verificado / checked)
  // locked: true = 2 (Cerrado / closed - cuando está en un libro diario)
  
  // Por ahora usamos solo el campo status del backend
  // Cuando implementes libros diarios, agregarás el campo 'locked'
  const estadoActual = transaction.locked ? 2 : (transaction.status ? 1 : 0)
  
  // Configuración de estados (estilo Git)
  const estadoConfig = {
    0: { icon: "📋", color: "#ffc107", bg: "#fff3cd", label: "Por verificar", nextLabel: "Marcar como verificado" },
    1: { icon: "✓", color: "#17a2b8", bg: "#d1ecf1", label: "Verificado", nextLabel: "Marcar como cerrado" },
    2: { icon: "🔒", color: "#28a745", bg: "#d4edda", label: "Cerrado", nextLabel: "Transacción cerrada" },
  }

  const currentEstado = estadoConfig[estadoActual] || estadoConfig[0]
  const isLocked = estadoActual === 2

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
                {mainDebeAccount} / {mainHaberAccount} || Monto: {formatCurrency(totalDebe)}
              </span>
              {leyenda && (
                <span
                  style={{
                    fontSize: "14px",
                    color: theme.textColorSecondary,
                    fontStyle: "italic",
                  }}
                >
                  {leyenda}
                </span>
              )}
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              {leyenda && (
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
                    {leyenda}
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
                      <th style={{ padding: "8px", textAlign: "right", color: theme.textColor, width: "20%" }}>
                        Debe
                      </th>
                      <th style={{ padding: "8px", textAlign: "right", color: theme.textColor, width: "20%" }}>
                        Haber
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLines.map((line, index) => (
                      <tr key={index} style={{ borderBottom: `1px solid ${theme.textColorSecondary}40` }}>
                        <td style={{ padding: "8px", color: theme.textColorSecondary, fontSize: "14px" }}>
                          {line.code}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            color: theme.textColorSecondary,
                            fontSize: "14px",
                            textAlign: line.debe > 0 ? "left" : "right",
                          }}
                        >
                          {line.name}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            textAlign: "right",
                            fontWeight: line.debe > 0 ? "600" : "normal",
                            color: line.debe > 0 ? "#28a745" : theme.textColorSecondary,
                            fontSize: "14px",
                          }}
                        >
                          {line.debe > 0 ? formatCurrency(line.debe) : "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            textAlign: "right",
                            fontWeight: line.haber > 0 ? "600" : "normal",
                            color: line.haber > 0 ? "#dc3545" : theme.textColorSecondary,
                            fontSize: "14px",
                          }}
                        >
                          {line.haber > 0 ? formatCurrency(line.haber) : "-"}
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
              onClick={() => onStatusChange && !isLocked && onStatusChange(transaction)}
              onMouseEnter={() => setHoveredButton("status")}
              onMouseLeave={() => setHoveredButton(null)}
              title={isLocked ? currentEstado.label : currentEstado.nextLabel}
              disabled={isLocked}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: currentEstado.bg,
                boxShadow: hoveredButton === "status" && !isLocked ? theme.cardShadowIn : theme.cardShadowOut,
                cursor: isLocked ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isLocked ? 0.6 : 1,
              }}
            >
              {currentEstado.icon}
            </button>

            {/* Botón de editar */}
            <button
              onClick={() => onEdit && !isLocked && onEdit(transaction)}
              onMouseEnter={() => setHoveredButton("edit")}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={isLocked}
              title={isLocked ? "No se puede editar (cerrada)" : "Editar transacción"}
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
              onClick={() => onDelete && !isLocked && onDelete(transaction)}
              onMouseEnter={() => setHoveredButton("delete")}
              onMouseLeave={() => setHoveredButton(null)}
              disabled={isLocked}
              title={isLocked ? "No se puede eliminar (cerrada)" : "Eliminar transacción"}
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
                fontSize: "14px",
                color: theme.textColorSecondary,
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
                <span
                  style={{
                    background: currentEstado.bg,
                    color: currentEstado.color,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {currentEstado.label}
                </span>
              </div>
              <div>Creado por: {autor}</div>
              <div>Fecha: {fecha}</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                ID: {transaction.trans_id}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente principal que maneja la lista de transacciones
const TransaccionesApp = ({ transacciones = [], onEliminar, onActualizarEstado, onEditar }) => {
  const { theme } = useTheme()

  // Handlers para los eventos
  const handleStatusChange = (transaction) => {
    if (onActualizarEstado && !transaction.locked) {
      // Ciclar entre estados: 0 -> 1 -> 2 (pero 2 solo cuando esté en libro diario)
      // Por ahora solo toggle entre 0 y 1 hasta que implementes libros diarios
      onActualizarEstado(transaction.trans_id)
    }
  }

  const handleEdit = (transaction) => {
    if (onEditar && !transaction.locked) {
      onEditar(transaction)
    }
  }

  const handleDelete = (transaction) => {
    if (onEliminar && !transaction.locked && window.confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
      onEliminar(transaction.trans_id)
    }
  }

  const transaccionesValidas = transacciones.filter((t) => t && typeof t === "object" && t.trans_id)

  if (transaccionesValidas.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: theme.textColorSecondary,
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>No hay transacciones para mostrar</p>
        <p style={{ fontSize: "14px" }}>Las transacciones creadas aparecerán aquí</p>
      </div>
    )
  }

  // Ordenar transacciones por fecha (más reciente primero)
  const transaccionesOrdenadas = [...transaccionesValidas].sort((a, b) => {
    const fechaA = new Date(a.created_at || a.date).getTime()
    const fechaB = new Date(b.created_at || b.date).getTime()
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
              key={transaction.trans_id}
              transaction={transaction}
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