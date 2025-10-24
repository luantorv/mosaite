import { useTheme } from "../../context/ThemeContext"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

function Dashboard() {
  const { theme } = useTheme()

  // Datos locales para el Proof of Concept
  const dashboardData = {
    "saldo-caja": "$125.000,00",
    "var-men": 12,
    "mov-ver": 34,
    verif: 86,
    flujo: [
      ["2024-09-30", 50],
      ["2024-10-31", 65],
      ["2024-11-30", 45],
      ["2024-12-31", 78],
      ["2025-01-31", 92],
      ["2025-02-28", 67],
    ],
    evol: [
      ["2024-09-30", 12500],
      ["2024-10-31", 15800],
      ["2024-11-30", 14200],
      ["2024-12-31", 18900],
      ["2025-01-31", 22100],
      ["2025-02-28", 19500],
    ],
  }

  // Formatear datos para recharts
  const flujoData = dashboardData.flujo.map(([fecha, cantidad]) => ({
    fecha,
    cantidad,
  }))

  const evolData = dashboardData.evol.map(([fecha, monto]) => ({
    fecha,
    monto,
  }))

  // Función para formatear la variación mensual
  const formatVariacion = (valor) => {
    const signo = valor >= 0 ? "+" : ""
    const flecha = valor >= 0 ? "↑" : "↓"
    const color = valor >= 0 ? "#28a745" : "#dc3545"
    return { texto: `${flecha}${signo}${valor}%`, color }
  }

  const variacion = formatVariacion(dashboardData["var-men"])

  return (
    <div style={{ padding: "20px", backgroundColor: theme.background }}>
      {/* Primera fila: 4 tarjetas */}
      <div className="row g-3 mb-4">
        {/* Tarjeta 1: Saldo de Caja */}
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
                Saldo de Caja
              </h6>
              <h3 className="card-title mb-0" style={{ color: theme.textColor }}>
                {dashboardData["saldo-caja"]}
              </h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Variación Mensual */}
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
                Variación Mensual
              </h6>
              <h3 className="card-title mb-0" style={{ color: variacion.color }}>
                {variacion.texto}
              </h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Movimientos para Verificar */}
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
                Mov. para Verificar
              </h6>
              <h3 className="card-title mb-0" style={{ color: theme.textColor }}>
                {dashboardData["mov-ver"]}
              </h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 4: % Verificados */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card h-100"
            style={{
              backgroundColor: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
            }}
          >
            <div className="card-body text-center d-flex flex-column">
              <h6 className="card-subtitle mb-2" style={{ color: theme.textColorSecondary }}>
                % Verificados
              </h6>
              <h3 className="card-title mb-3" style={{ color: theme.textColor }}>
                {dashboardData["verif"]}%
              </h3>
              <div className="mt-auto">
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${dashboardData["verif"]}%` }}
                    aria-valuenow={dashboardData["verif"]}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila: 2 gráficos */}
      <div className="row g-3">
        {/* Gráfico 1: Flujo de Movimientos */}
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
                Cantidad de Movimientos
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={flujoData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.textColorSecondary} opacity={0.3} />
                  <XAxis dataKey="fecha" stroke={theme.textColor} interval="preserveStartEnd" />
                  <YAxis stroke={theme.textColor} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.textColorSecondary}`,
                      color: theme.textColor,
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="cantidad" stroke={theme.primary || "#007bff"} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráfico 2: Evolución de Resultados */}
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
                Evolución de Resultados
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={evolData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.textColorSecondary} opacity={0.3} />
                  <XAxis dataKey="fecha" stroke={theme.textColor} interval="preserveStartEnd" />
                  <YAxis stroke={theme.textColor} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.textColorSecondary}`,
                      color: theme.textColor,
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="monto" stroke="#28a745" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
