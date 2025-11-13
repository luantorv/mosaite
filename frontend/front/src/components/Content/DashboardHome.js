import { useState, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import dashboardService from "../../services/DashboardService"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

function Dashboard() {
  const { theme } = useTheme()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    setLoading(true)
    setError("")
    
    console.log("📊 Cargando estadísticas del dashboard...")
    const result = await dashboardService.getStats()
    
    if (result.success) {
      console.log("✅ Estadísticas cargadas:", result.stats)
      setDashboardData(result.stats)
    } else {
      console.error("❌ Error al cargar estadísticas:", result.error)
      setError(result.error)
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        color: theme.textColor,
      }}>
        <div className="text-center">
          <div className="spinner-border mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <div
          style={{
            padding: "20px",
            background: "#ff4d4f20",
            border: "1px solid #ff4d4f",
            borderRadius: "8px",
            color: "#ff4d4f",
            textAlign: "center",
          }}
        >
          <h5>Error al cargar el dashboard</h5>
          <p>{error}</p>
          <button
            onClick={loadDashboardStats}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: theme.primaryColor,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: theme.textColor }}>
        <p>No hay datos disponibles</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", backgroundColor: theme.background }}>
      {/* Alerta de desbalance si existe */}
      {dashboardData.alerta && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "8px",
            color: "#856404",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "24px" }}>⚠️</span>
          <div>
            <strong>Alerta de Balance:</strong>
            <p style={{ margin: "5px 0 0 0" }}>{dashboardData.alerta}</p>
          </div>
        </div>
      )}

      <div className="row g-3 mb-4">
        {/* Tarjeta 1: Total de Alumnos */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2" style={{ color: theme.textColorSecondary }}>
                Total de Alumnos
              </h6>
              <h3 className="card-title mb-0" style={{ color: theme.textColor }}>
                {dashboardData["total-alumnos"]}
              </h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Cantidad de Grupos */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2" style={{ color: theme.textColorSecondary }}>
                Cantidad de Grupos
              </h6>
              <h3 className="card-title mb-0" style={{ color: theme.textColor }}>
                {dashboardData["cantidad-grupos"]}
              </h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Asientos Totales cargados */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2" style={{ color: theme.textColorSecondary }}>
                Asientos Totales Cargados
              </h6>
              <h3 className="card-title mb-0" style={{ color: theme.textColor }}>
                {dashboardData["asientos-cargados"]}
              </h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 4: Libros Diarios Creados */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2" style={{ color: theme.textColorSecondary }}>
                Libros Diarios Creados
              </h6>
              <h3 className="card-title mb-0" style={{ color: theme.textColor }}>
                {dashboardData["libros-diarios"]}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Gráfico 1: Evolución Histórica de Actividad y Cobertura */}
        <div className="col-12 col-lg-6">
          <div
            className="card"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3" style={{ color: theme.textColor }}>
                Actividad (Últimos 6 meses)
              </h5>
              {dashboardData.evolucionHistorica && dashboardData.evolucionHistorica.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart 
                    data={dashboardData.evolucionHistorica} 
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.textColorSecondary} opacity={0.3} />
                    <XAxis dataKey="mes" stroke={theme.textColor} />
                    <YAxis stroke={theme.textColor} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.background,
                        border: `1px solid ${theme.textColorSecondary}`,
                        color: theme.textColor,
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="asientos" 
                      stroke="#007bff" 
                      strokeWidth={2} 
                      name="Asientos" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cobertura" 
                      stroke="#28a745" 
                      strokeWidth={2} 
                      name="Cobertura" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ 
                  height: "300px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: theme.textColorSecondary 
                }}>
                  No hay datos históricos disponibles
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gráfico 2: Actividad y Cobertura por Grupo */}
        <div className="col-12 col-lg-6">
          <div
            className="card"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body">
              <h5 className="card-title mb-3" style={{ color: theme.textColor }}>
                Actividad por Grupo
              </h5>
              {dashboardData.actividadPorGrupo && dashboardData.actividadPorGrupo.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={dashboardData.actividadPorGrupo} 
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.textColorSecondary} opacity={0.3} />
                    <XAxis dataKey="grupo" stroke={theme.textColor} />
                    <YAxis stroke={theme.textColor} width={60} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.background,
                        border: `1px solid ${theme.textColorSecondary}`,
                        color: theme.textColor,
                      }}
                    />
                    <Legend />
                    <Bar dataKey="asientos" fill="#6f42c1" name="Asientos" />
                    <Bar dataKey="cobertura" fill="#17a2b8" name="Cobertura" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ 
                  height: "300px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: theme.textColorSecondary 
                }}>
                  No hay datos de grupos disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón de actualizar */}
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <button
          onClick={loadDashboardStats}
          style={{
            background: theme.background,
            color: theme.textColor,
            border: `2px solid ${theme.border || "#ddd"}`,
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = theme.cardShadowIn)}
          onMouseLeave={(e) => (e.target.style.boxShadow = theme.cardShadowOut)}
        >
          🔄 Actualizar estadísticas
        </button>
      </div>
    </div>
  )
}

export default Dashboard
