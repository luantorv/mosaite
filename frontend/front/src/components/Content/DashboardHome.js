import { useTheme } from "../../context/ThemeContext"
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

  const dashboardData = {
    "total-alumnos": 60,
    "cantidad-grupos": 4,
    "asientos-cargados": 300,
    "libros-diarios": 6,
    // Evolución histórica de Actividad y Cobertura
    evolucionHistorica: [
      { mes: "Ene", asientos: 45, cobertura: 38 },
      { mes: "Feb", asientos: 52, cobertura: 45 },
      { mes: "Mar", asientos: 48, cobertura: 42 },
      { mes: "Abr", asientos: 65, cobertura: 58 },
      { mes: "May", asientos: 78, cobertura: 70 },
      { mes: "Jun", asientos: 85, cobertura: 75 },
    ],
    // Actividad y Cobertura actual por grupo
    actividadPorGrupo: [
      { grupo: "Grupo A", asientos: 45, cobertura: 38 },
      { grupo: "Grupo B", asientos: 78, cobertura: 65 },
      { grupo: "Grupo C", asientos: 52, cobertura: 48 },
    ],
  }

  return (
    <div style={{ padding: "20px", backgroundColor: theme.background }}>
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
                Actividad
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.evolucionHistorica} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
                  <Line type="monotone" dataKey="asientos" stroke="#007bff" strokeWidth={2} name="Asientos" />
                  <Line type="monotone" dataKey="cobertura" stroke="#28a745" strokeWidth={2} name="Cobertura" />
                </LineChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.actividadPorGrupo} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
