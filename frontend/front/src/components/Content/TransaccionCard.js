import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import Pagination from "./Pagination"

const TransactionCard = ({
  transaction,
  onStatusChange,
  onEdit,
  onDelete,
  selectable = false,
  selected = false,
  onToggleSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)
  const { theme } = useTheme()
  const { systemConfig } = useAuth()
  const skipVerification = systemConfig?.skip_verification || false

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
  // status: 0 (Por verificar / to check)
  // status: 1 (Verificado / checked)
  // status: 2 (Cerrado / closed - cuando está en un libro diario)
  //
  // Con skip_verification activo, el flujo se simplifica a crear -> cerrar:
  // el estado "Por verificar" pasa directamente a "Cerrado".
  const estadoActual = typeof transaction.status === "number" ? transaction.status : 0

  // Configuración de estados (estilo Git)
  const estadoConfig = {
    0: {
      icon: "📋",
      color: "#ffc107",
      bg: "#fff3cd",
      label: "Por verificar",
      nextLabel: skipVerification ? "Marcar como cerrado" : "Marcar como verificado",
    },
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
        border: selected ? `2px solid ${theme.primaryColor || "#667eea"}` : "2px solid transparent",
        transition: "border 0.2s ease",
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
        {/* Checkbox de selección */}
        {selectable && (
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect && onToggleSelect(transaction.trans_id)}
            title="Seleccionar transacción"
            style={{
              width: "20px",
              height: "20px",
              marginRight: "12px",
              marginTop: "14px",
              cursor: "pointer",
              accentColor: theme.primaryColor || "#667eea",
              flexShrink: 0,
            }}
          />
        )}

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
  const [selectedIds, setSelectedIds] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Una transacción cerrada (status 2) no se puede modificar
  const isClosed = (transaction) => transaction.status === 2

  // Handlers para los eventos
  const handleStatusChange = (transaction) => {
    if (onActualizarEstado && !isClosed(transaction)) {
      // El backend decide el siguiente estado según skip_verification:
      // flujo completo (0 -> 1 -> 0) o flujo simplificado (0 -> 2)
      onActualizarEstado(transaction.trans_id)
    }
  }

  const handleEdit = (transaction) => {
    if (onEditar && !isClosed(transaction)) {
      onEditar(transaction)
    }
  }

  const handleDelete = (transaction) => {
    if (onEliminar && !isClosed(transaction) && window.confirm("¿Estás seguro de que quieres eliminar esta transacción?")) {
      onEliminar(transaction.trans_id)
    }
  }

  const transaccionesValidas = transacciones.filter((t) => t && typeof t === "object" && t.trans_id)

  // Ordenar transacciones por fecha (más reciente primero)
  const transaccionesOrdenadas = [...transaccionesValidas].sort((a, b) => {
    const fechaA = new Date(a.created_at || a.date).getTime()
    const fechaB = new Date(b.created_at || b.date).getTime()
    return fechaB - fechaA
  })

  // --- Paginación ---
  const totalItems = transaccionesOrdenadas.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // Mantener la página dentro de rango si cambia el listado o los items por página
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginaActual = transaccionesOrdenadas.slice(startIndex, startIndex + itemsPerPage)

  const handleItemsPerPageChange = (n) => {
    setItemsPerPage(n)
    setCurrentPage(1)
  }

  // --- Selección múltiple ---
  const toggleSelect = (transId) => {
    setSelectedIds((prev) =>
      prev.includes(transId) ? prev.filter((id) => id !== transId) : [...prev, transId]
    )
  }

  // "Seleccionar todo" opera sobre las transacciones visibles en la página actual
  const idsPaginaActual = paginaActual.map((t) => t.trans_id)
  const allPageSelected = idsPaginaActual.length > 0 && idsPaginaActual.every((id) => selectedIds.includes(id))

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !idsPaginaActual.includes(id)))
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...idsPaginaActual])])
    }
  }

  const clearSelection = () => setSelectedIds([])

  // Transacciones seleccionadas que no están cerradas (las cerradas no se pueden modificar)
  const seleccionadasModificables = transaccionesValidas.filter(
    (t) => selectedIds.includes(t.trans_id) && !isClosed(t)
  )

  const handleBulkDelete = () => {
    if (!onEliminar || seleccionadasModificables.length === 0) return
    if (
      window.confirm(
        `¿Eliminar ${seleccionadasModificables.length} transacción(es) seleccionada(s)? Esta acción no se puede deshacer.`
      )
    ) {
      seleccionadasModificables.forEach((t) => onEliminar(t.trans_id))
      clearSelection()
    }
  }

  const handleBulkStatus = () => {
    if (!onActualizarEstado || seleccionadasModificables.length === 0) return
    if (
      window.confirm(`¿Cambiar el estado de ${seleccionadasModificables.length} transacción(es) seleccionada(s)?`)
    ) {
      seleccionadasModificables.forEach((t) => onActualizarEstado(t.trans_id))
      clearSelection()
    }
  }

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

  const toolbarButton = {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: theme.background,
    color: theme.textColor,
    boxShadow: theme.cardShadowOut,
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  }

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
        {/* Barra de herramientas: seleccionar todo + acciones masivas */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            marginBottom: "12px",
            borderRadius: "12px",
            background: theme.background,
            boxShadow: theme.cardShadowIn,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              color: theme.textColor,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <input
              type="checkbox"
              checked={allPageSelected}
              onChange={toggleSelectAll}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: theme.primaryColor || "#667eea",
              }}
            />
            Seleccionar página
          </label>

          {selectedIds.length > 0 && (
            <>
              <span style={{ color: theme.textColorSecondary, fontSize: "14px" }}>
                {selectedIds.length} seleccionada(s)
              </span>

              <button
                onClick={handleBulkStatus}
                disabled={seleccionadasModificables.length === 0}
                title="Cambiar el estado de las transacciones seleccionadas"
                style={{
                  ...toolbarButton,
                  opacity: seleccionadasModificables.length === 0 ? 0.5 : 1,
                  cursor: seleccionadasModificables.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                🔄 Cambiar estado
              </button>

              <button
                onClick={handleBulkDelete}
                disabled={seleccionadasModificables.length === 0}
                title="Eliminar las transacciones seleccionadas"
                style={{
                  ...toolbarButton,
                  color: "#dc3545",
                  opacity: seleccionadasModificables.length === 0 ? 0.5 : 1,
                  cursor: seleccionadasModificables.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                🗑️ Eliminar
              </button>

              <button onClick={clearSelection} style={{ ...toolbarButton, marginLeft: "auto" }}>
                Limpiar selección
              </button>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {paginaActual.map((transaction) => (
            <TransactionCard
              key={transaction.trans_id}
              transaction={transaction}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              selectable
              selected={selectedIds.includes(transaction.trans_id)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  )
}

export default TransaccionesApp
export { TransactionCard }