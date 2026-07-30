import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import Pagination from "./Pagination"

const LibroDiarioCard = ({
  libroDiario,
  onDescargar,
  onBorrar,
  selectable = false,
  selected = false,
  onToggleSelect,
}) => {
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

  // Formatear montos (llegan en centavos desde el backend)
  const formatCurrency = (cents) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format((cents || 0) / 100)

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto 16px auto",
        padding: "20px 24px",
        background: theme.background,
        borderRadius: "12px",
        boxShadow: theme.cardShadowOut,
        border: selected ? `2px solid ${theme.primaryColor || "#667eea"}` : "2px solid transparent",
        transition: "border 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Checkbox de selección */}
        {selectable && (
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect && onToggleSelect(libroDiario.id)}
            title="Seleccionar libro diario"
            style={{
              width: "20px",
              height: "20px",
              marginRight: "12px",
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
                {libroDiario.transaccionesCount != null && (
                  <div>Transacciones: {libroDiario.transaccionesCount}</div>
                )}
                {libroDiario.totalDebe != null && (
                  <div>Total Debe: {formatCurrency(libroDiario.totalDebe)}</div>
                )}
                {libroDiario.totalHaber != null && (
                  <div>Total Haber: {formatCurrency(libroDiario.totalHaber)}</div>
                )}
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
  const [selectedIds, setSelectedIds] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Ordenar libros diarios por fecha (más reciente primero)
  const librosDiariosOrdenados = [...(librosDiarios || [])].sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime()
    const fechaB = new Date(b.fecha).getTime()
    return fechaB - fechaA
  })

  // --- Paginación ---
  const totalItems = librosDiariosOrdenados.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginaActual = librosDiariosOrdenados.slice(startIndex, startIndex + itemsPerPage)

  const handleItemsPerPageChange = (n) => {
    setItemsPerPage(n)
    setCurrentPage(1)
  }

  // --- Selección múltiple ---
  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const idsPaginaActual = paginaActual.map((l) => l.id)
  const allPageSelected = idsPaginaActual.length > 0 && idsPaginaActual.every((id) => selectedIds.includes(id))

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !idsPaginaActual.includes(id)))
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...idsPaginaActual])])
    }
  }

  const clearSelection = () => setSelectedIds([])

  const seleccionados = librosDiariosOrdenados.filter((l) => selectedIds.includes(l.id))

  const handleBulkDownload = () => {
    if (!onDescargar || seleccionados.length === 0) return
    seleccionados.forEach((libro) => onDescargar(libro))
  }

  const handleBulkDelete = () => {
    if (!onBorrar || seleccionados.length === 0) return
    if (window.confirm(`¿Eliminar ${seleccionados.length} libro(s) diario(s) seleccionado(s)?`)) {
      seleccionados.forEach((libro) => onBorrar(libro))
      clearSelection()
    }
  }

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
                {selectedIds.length} seleccionado(s)
              </span>

              <button onClick={handleBulkDownload} title="Descargar los libros seleccionados" style={{ ...toolbarButton, color: "#17a2b8" }}>
                ⬇ Descargar
              </button>

              <button onClick={handleBulkDelete} title="Eliminar los libros seleccionados" style={{ ...toolbarButton, color: "#dc3545" }}>
                🗑 Eliminar
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
          {paginaActual.map((libroDiario, index) => (
            <LibroDiarioCard
              key={libroDiario.id || index}
              libroDiario={libroDiario}
              onDescargar={onDescargar}
              onBorrar={onBorrar}
              selectable
              selected={selectedIds.includes(libroDiario.id)}
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

export default LibroDiarioCard
export { LibrosDiariosApp }
