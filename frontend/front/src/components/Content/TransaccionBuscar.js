import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import TransaccionesApp from "./TransaccionCard"
import ChatService from "../../services/ChatService"

// Prefijo que activa la consulta en lenguaje natural (ConsultorIA)
const IA_PREFIX = /^\/ia\b/i
const isIaQuery = (q) => IA_PREFIX.test((q || "").trim())
const extractIaQuestion = (q) => (q || "").trim().replace(IA_PREFIX, "").trim()

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

  // Estado del modo ConsultorIA (búsqueda con prefijo "/ia")
  const [iaActive, setIaActive] = useState(false)
  const [iaLoading, setIaLoading] = useState(false)
  const [iaData, setIaData] = useState(null) // { sql, columns, rows, row_count, truncated }
  const [iaError, setIaError] = useState(null)
  const [iaQuestion, setIaQuestion] = useState("")

  const resetIa = () => {
    setIaActive(false)
    setIaLoading(false)
    setIaData(null)
    setIaError(null)
    setIaQuestion("")
  }

  useEffect(() => {
    const q = (searchQuery || "").trim()

    if (!q) {
      if (hasSearched) {
        setHasSearched(false)
        setSearchResults([])
      }
      resetIa()
      return
    }

    if (isIaQuery(q)) {
      // Búsqueda con IA: con debounce para no disparar una llamada por tecla
      setIaActive(true)
      const question = extractIaQuestion(q)
      setIaQuestion(question)
      const handle = setTimeout(() => handleIaSearch(question), 700)
      return () => clearTimeout(handle)
    }

    // Búsqueda normal (filtrado local)
    resetIa()
    handleSearch(searchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleIaSearch = async (question) => {
    setIaActive(true)
    setIaData(null)
    setIaError(null)

    if (!question) {
      setIaLoading(false)
      setIaError('Escribe una pregunta después de "/ia". Ej: /ia ¿cuántas transacciones hay?')
      return
    }

    setIaLoading(true)
    console.log("🤖 Consulta IA:", question)

    const res = await ChatService.consultoria(question)
    setIaLoading(false)

    if (res.success && res.data) {
      if (res.data.valid) {
        setIaData(res.data)
        setIaError(null)
      } else {
        // Se pudo generar el SQL pero no ejecutar, o no fue válido
        setIaData(res.data.sql ? { sql: res.data.sql, columns: [], rows: [] } : null)
        setIaError(res.data.error || "No se pudo procesar la consulta.")
      }
    } else {
      setIaData(null)
      setIaError(res.error || "Error al comunicarse con el servicio de IA.")
    }
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

  // --- Vista del modo ConsultorIA ("/ia ...") ---
  if (iaActive) {
    return (
      <div>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <h5 style={{ color: theme.textColor, margin: 0 }}>
            🤖 Consulta IA
          </h5>
          {iaQuestion && (
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
              Pregunta: <strong>"{iaQuestion}"</strong>
            </div>
          )}
        </div>

        {iaLoading && (
          <div
            style={{
              background: theme.background,
              textAlign: "center",
              padding: "40px",
              borderRadius: "20px",
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
              <span className="visually-hidden">Procesando...</span>
            </div>
            <h4 style={{ color: theme.textColor }}>Generando y ejecutando la consulta...</h4>
            <p style={{ color: theme.textColor, opacity: 0.7, fontSize: "14px", marginTop: "10px" }}>
              El asistente traduce tu pregunta a SQL y la ejecuta
            </p>
          </div>
        )}

        {!iaLoading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* SQL generada */}
            {iaData?.sql && (
              <div>
                <div style={{ color: theme.textColorSecondary, fontSize: "13px", marginBottom: "6px" }}>
                  Consulta SQL generada:
                </div>
                <pre
                  style={{
                    background: theme.background,
                    boxShadow: theme.cardShadowIn,
                    borderRadius: "12px",
                    padding: "16px",
                    margin: 0,
                    color: theme.textColor,
                    fontSize: "13px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowX: "auto",
                  }}
                >
                  {iaData.sql}
                </pre>
              </div>
            )}

            {/* Error */}
            {iaError && (
              <div
                style={{
                  background: "#ffebee",
                  color: "#c62828",
                  padding: "16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                }}
              >
                <strong>⚠️ </strong>{iaError}
              </div>
            )}

            {/* Tabla de resultados */}
            {iaData && iaData.columns && iaData.columns.length > 0 && (
              <div>
                <div
                  style={{
                    color: theme.textColor,
                    fontSize: "14px",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}
                >
                  {iaData.row_count} fila{iaData.row_count !== 1 ? "s" : ""}
                  {iaData.truncated ? ` (mostrando las primeras ${iaData.rows.length})` : ""}
                </div>

                {iaData.rows.length > 0 ? (
                  <div
                    style={{
                      overflowX: "auto",
                      background: theme.background,
                      boxShadow: theme.cardShadowOut,
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${theme.textColorSecondary}` }}>
                          {iaData.columns.map((col) => (
                            <th
                              key={col}
                              style={{
                                padding: "10px 12px",
                                textAlign: "left",
                                color: theme.textColor,
                                fontSize: "14px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {iaData.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            style={{ borderBottom: `1px solid ${theme.textColorSecondary}40` }}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                style={{
                                  padding: "8px 12px",
                                  color: theme.textColorSecondary,
                                  fontSize: "14px",
                                }}
                              >
                                {cell === null || cell === undefined ? "—" : String(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    style={{
                      background: theme.background,
                      textAlign: "center",
                      padding: "40px",
                      borderRadius: "12px",
                      boxShadow: theme.cardShadowOut,
                      color: theme.textColor,
                    }}
                  >
                    La consulta no devolvió resultados.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
