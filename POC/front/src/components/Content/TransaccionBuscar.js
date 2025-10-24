import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import TransaccionesApp from "./TransaccionCard"

function TransaccionBuscar({ transacciones = [], plan = [], onBuscar, searchQuery = "", setSearchQuery }) {
  const { theme } = useTheme()
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      handleSearch(searchQuery)
    } else if (searchQuery === "" && hasSearched) {
      setHasSearched(false)
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearch = (query) => {
    if (!query || !query.trim()) return

    setIsSearching(true)
    setHasSearched(false)

    setTimeout(() => {
      const results = transacciones.filter((transaccion) => {
        const searchLower = query.toLowerCase()

        if (transaccion.leyenda?.toLowerCase().includes(searchLower)) return true

        if (transaccion.fecha?.includes(searchLower)) return true

        if (transaccion.author?.toLowerCase().includes(searchLower)) return true

        const cuentasMatch = (transaccion.lines || []).some(([code]) =>
          String(code).toLowerCase().includes(searchLower),
        )

        if (cuentasMatch) return true

        return false
      })

      setSearchResults(results)
      setIsSearching(false)
      setHasSearched(true)
    }, 1500)
  }

  const handleEliminar = (id) => {
    console.log("[v0] Eliminar transacción:", id)
    alert(`Eliminar transacción ${id}`)
    setSearchResults((prev) => prev.filter((t) => t.id !== id))
  }

  const handleActualizarEstado = (id, nuevoEstado) => {
    console.log("[v0] Actualizar estado:", id, nuevoEstado)
    setSearchResults((prev) => prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)))
  }

  const handleEditar = (transaccion) => {
    console.log("[v0] Editar transacción:", transaccion)
    alert(`Editar transacción: ${transaccion.leyenda}`)
  }

  return (
    <div>
      {!hasSearched && !isSearching && (
        <div
          style={{
            background: theme.background,
            borderRadius: "20px",
            padding: "60px 40px",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              marginBottom: "20px",
            }}
          >
            📋
          </div>
          <h4 style={{ color: theme.textColor, marginBottom: "15px" }}>Realiza una búsqueda</h4>
          <p style={{ color: theme.textColor, opacity: 0.7, fontSize: "14px" }}>
            Escribe un término en la barra de búsqueda y presiona Enter o el botón Buscar
          </p>
        </div>
      )}

      {isSearching && (
        <div
          style={{
            background: theme.background,
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
              color: theme.textColor,
              marginBottom: "20px",
            }}
          >
            <span className="visually-hidden">Buscando...</span>
          </div>
          <h4 style={{ color: theme.textColor }}>Buscando transacciones...</h4>
          <p style={{ color: theme.textColor, opacity: 0.7, fontSize: "14px", marginTop: "10px" }}>
            Esto puede tomar unos segundos
          </p>
        </div>
      )}

      {hasSearched && !isSearching && (
        <div style={{ marginTop: "30px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ color: theme.textColor }}>
              {searchResults.length === 0
                ? "No se encontraron resultados"
                : `${searchResults.length} resultado${searchResults.length !== 1 ? "s" : ""} encontrado${searchResults.length !== 1 ? "s" : ""}`}
            </h5>
          </div>

          {searchResults.length > 0 ? (
            <TransaccionesApp
              transacciones={searchResults}
              plan={plan}
              onEliminar={handleEliminar}
              onActualizarEstado={handleActualizarEstado}
              onEditar={handleEditar}
            />
          ) : (
            <div
              style={{
                background: theme.background,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
              <p style={{ color: theme.textColor, opacity: 0.7 }}>
                No se encontraron transacciones que coincidan con tu búsqueda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TransaccionBuscar
