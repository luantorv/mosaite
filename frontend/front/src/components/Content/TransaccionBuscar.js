import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import TransaccionesApp from "./TransaccionCard"
import transactionService from "../../services/TransactionService"

function TransaccionBuscar({ 
  searchQuery = "", 
  setSearchQuery,
  transacciones = [],
  loadingTransactions = false,
  onEliminar,
  onActualizarEstado,
  onEditar 
}) {
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
  }, [searchQuery, transacciones])

  const handleSearch = async (query) => {
    if (!query || !query.trim()) return

    setIsSearching(true)
    setHasSearched(false)

    console.log("🔍 Buscando transacciones con query:", query)

    // Simular delay para mejor UX
    setTimeout(() => {
      const results = transacciones.filter((transaccion) => {
        const searchLower = query.toLowerCase()

        // Buscar en leyenda
        if (transaccion.legend?.toLowerCase().includes(searchLower)) {
          return true
        }

        // Buscar en fecha
        if (transaccion.date?.includes(searchLower)) {
          return true
        }

        // Buscar en autor
        if (transaccion.user_name?.toLowerCase().includes(searchLower)) {
          return true
        }

        // Buscar en ID de transacción
        if (String(transaccion.trans_id).includes(searchLower)) {
          return true
        }

        // Buscar en códigos y nombres de cuentas
        const cuentasMatch = (transaccion.entries || []).some(entry => {
          const code = entry.account?.code || ""
          const name = entry.account?.name || ""
          return String(code).toLowerCase().includes(searchLower) ||
                 name.toLowerCase().includes(searchLower)
        })

        if (cuentasMatch) return true

        return false
      })

      console.log(`✅ Búsqueda completada: ${results.length} resultados`)
      setSearchResults(results)
      setIsSearching(false)
      setHasSearched(true)
    }, 500)
  }

  if (loadingTransactions) {
    return (
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
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h4 style={{ color: theme.textColor }}>Cargando transacciones...</h4>
      </div>
    )
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
          <h4 style={{ color: theme.textColor, marginBottom: "15px" }}>
            Realiza una búsqueda
          </h4>
          <p style={{ color: theme.textColor, opacity: 0.7, fontSize: "14px" }}>
            Escribe un término en la barra de búsqueda superior
          </p>
          <p style={{ color: theme.textColorSecondary, fontSize: "13px", marginTop: "10px" }}>
            Puedes buscar por: leyenda, fecha, autor, ID de transacción, código o nombre de cuenta
          </p>
        </div>
      )}

      {isSearching && (
        <div
          style={{
            background: theme.background,
            textAlign: "center",
            marginTop: "40px",
            padding: "40px",
            borderRadius: "20px"
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
          <div 
            style={{ 
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h5 style={{ color: theme.textColor, margin: 0 }}>
              {searchResults.length === 0
                ? "No se encontraron resultados"
                : `${searchResults.length} resultado${searchResults.length !== 1 ? "s" : ""} encontrado${searchResults.length !== 1 ? "s" : ""}`}
            </h5>
            
            {searchQuery && (
              <div
                style={{
                  background: theme.background,
                  padding: "8px 16px",
                  borderRadius: "20px",
                  boxShadow: theme.cardShadowIn,
                  fontSize: "14px",
                  color: theme.textColor,
                }}
              >
                Búsqueda: <strong>"{searchQuery}"</strong>
              </div>
            )}
          </div>

          {searchResults.length > 0 ? (
            <TransaccionesApp
              transacciones={searchResults}
              onEliminar={onEliminar}
              onActualizarEstado={onActualizarEstado}
              onEditar={onEditar}
            />
          ) : (
            <div
              style={{
                background: theme.background,
                textAlign: "center",
                padding: "60px 40px",
                borderRadius: "20px",
                boxShadow: theme.cardShadowOut,
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
              <h5 style={{ color: theme.textColor, marginBottom: "10px" }}>
                No se encontraron transacciones
              </h5>
              <p style={{ color: theme.textColor, opacity: 0.7 }}>
                No hay transacciones que coincidan con "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  marginTop: "20px",
                  background: theme.primaryColor,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  boxShadow: theme.cardShadowOut,
                }}
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TransaccionBuscar
