import { useTheme } from "../../context/ThemeContext"

/**
 * Controles de paginación reutilizables.
 *
 * Props:
 *  - currentPage: página actual (1-indexed)
 *  - totalPages: cantidad total de páginas
 *  - totalItems: cantidad total de elementos (para el texto "Mostrando...")
 *  - itemsPerPage: elementos por página actuales
 *  - onPageChange: (page) => void
 *  - onItemsPerPageChange: (n) => void
 *  - itemsPerPageOptions: array de opciones (por defecto [5, 10, 20, 50])
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
}) => {
  const { theme } = useTheme()

  if (totalItems === 0) return null

  const from = (currentPage - 1) * itemsPerPage + 1
  const to = Math.min(currentPage * itemsPerPage, totalItems)

  // Construir el rango de páginas visible con "..." cuando hay muchas
  const getPageNumbers = () => {
    const pages = []
    const maxButtons = 5

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    pages.push(1)

    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    if (currentPage <= 3) {
      start = 2
      end = 4
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3
      end = totalPages - 1
    }

    if (start > 2) pages.push("...")
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < totalPages - 1) pages.push("...")

    pages.push(totalPages)
    return pages
  }

  const buttonBase = {
    minWidth: "38px",
    height: "38px",
    padding: "0 10px",
    borderRadius: "8px",
    border: "none",
    background: theme.background,
    color: theme.textColor,
    boxShadow: theme.cardShadowOut,
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  }

  const disabledStyle = {
    opacity: 0.4,
    cursor: "not-allowed",
  }

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 5,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "16px",
        marginTop: "8px",
        background: theme.background,
        boxShadow: `0 -8px 12px -8px ${theme.background}`,
      }}
    >
      {/* Info + selector de elementos por página */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <span style={{ color: theme.textColorSecondary, fontSize: "14px" }}>
          Mostrando <strong>{from}-{to}</strong> de <strong>{totalItems}</strong>
        </span>

        {onItemsPerPageChange && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: theme.textColorSecondary, fontSize: "14px" }}>Por página:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "none",
                background: theme.background,
                boxShadow: theme.cardShadowIn,
                color: theme.textColor,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Página anterior"
            style={{ ...buttonBase, ...(currentPage === 1 ? disabledStyle : {}) }}
          >
            ‹
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                style={{ color: theme.textColorSecondary, padding: "0 4px" }}
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                style={{
                  ...buttonBase,
                  background: page === currentPage ? theme.primaryColor || "#667eea" : theme.background,
                  color: page === currentPage ? "#fff" : theme.textColor,
                  boxShadow: page === currentPage ? theme.cardShadowIn : theme.cardShadowOut,
                  fontWeight: page === currentPage ? "600" : "normal",
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Página siguiente"
            style={{ ...buttonBase, ...(currentPage === totalPages ? disabledStyle : {}) }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default Pagination
