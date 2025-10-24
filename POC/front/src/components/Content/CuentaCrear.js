import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { Modal, Button, Form } from "react-bootstrap"

function CuentaCrear({ plan }) {
  const { theme } = useTheme()
  const [planLocal, setPlanLocal] = useState(plan)
  const [codigo, setCodigo] = useState("")
  const [nombre, setNombre] = useState("")
  const [nature, setNature] = useState(0)
  const [state, setState] = useState(1)
  const [showInactive, setShowInactive] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState("")

  // Función para obtener el nombre de la partida
  const getNombrePartida = (digito) => {
    const partidas = {
      1: "Activo",
      2: "Pasivo",
      3: "Patrimonio Neto",
      4: "Ingresos",
      5: "Egresos",
    }
    return partidas[digito] || digito
  }

  // Función para obtener el nombre del grupo
  const getNombreGrupo = (partida, grupo) => {
    const grupos = {
      11: "Activo Corriente",
      12: "Activo No Corriente",
      21: "Pasivo Corriente",
      22: "Pasivo No Corriente",
      31: "Capital y Reservas",
      41: "Ingresos Ordinarios",
      42: "Ingresos Extraordinarios",
      51: "Costo de Ventas",
      52: "Gastos de Comercialización",
      53: "Gastos de Administración",
      54: "Gastos Financieros",
      55: "Otros Egresos",
    }
    return grupos[`${partida}${grupo}`] || `${partida}${grupo}`
  }

  // Función para obtener el nombre del rubro
  const getNombreRubro = (partida, grupo, rubro) => {
    const rubros = {
      111: "Caja y Bancos",
      112: "Créditos por Ventas",
      113: "Otros Créditos",
      114: "Bienes de Cambio",
      115: "Inversiones Temporales",
      121: "Bienes de Uso",
      122: "Depreciaciones Acumuladas",
      123: "Activos Intangibles",
      124: "Amortizaciones Acumuladas",
      125: "Inversiones Permanentes",
      126: "Otros Activos No Corrientes",
      211: "Deudas Comerciales",
      212: "Deudas Fiscales",
      213: "Deudas Sociales",
      214: "Deudas Bancarias y Financieras CP",
      215: "Otras Deudas",
      221: "Deudas Bancarias y Financieras LP",
      222: "Previsiones",
      311: "Capital Social",
      312: "Ajustes al Patrimonio",
      313: "Reservas",
      314: "Resultados Acumulados",
      315: "Resultados del Ejercicio",
      411: "Ventas",
      412: "Otros Ingresos Operativos",
      413: "Resultados por Tenencia",
      421: "Resultados Extraordinarios",
      511: "Costo de Mercaderías y Servicios",
      521: "Gastos de Ventas",
      531: "Gastos de Personal",
      532: "Servicios y Honorarios",
      533: "Servicios Públicos y Comunicaciones",
      534: "Alquileres y Arrendamientos",
      535: "Impuestos y Tasas",
      536: "Seguros",
      537: "Depreiaciones y Amortizaciones",
      538: "Gastos Generales",
      539: "Otros Gastos Administrativos",
      541: "Resultados Financieros",
      551: "Egresos Extraordinarios",
    }
    return rubros[`${partida}${grupo}${rubro}`] || `${partida}${grupo}${rubro}`
  }

  // Organizar el plan en estructura jerárquica
  const organizarPlan = () => {
    const estructura = {}

    const cuentasFiltradas = showInactive ? planLocal : planLocal.filter(([, , , estado]) => estado === 1)

    cuentasFiltradas.forEach(([codigo, nombre, naturaleza, estado]) => {
      const codigoStr = codigo.toString().padStart(5, "0")
      const partida = codigoStr[0]
      const grupo = codigoStr[1]
      const rubro = codigoStr[2]

      if (!estructura[partida]) {
        estructura[partida] = {}
      }
      if (!estructura[partida][grupo]) {
        estructura[partida][grupo] = {}
      }
      if (!estructura[partida][grupo][rubro]) {
        estructura[partida][grupo][rubro] = []
      }

      estructura[partida][grupo][rubro].push({
        codigo,
        nombre,
        nature: naturaleza,
        state: estado,
      })
    })

    return estructura
  }

  const estructuraJerarquica = organizarPlan()

  // Validar código
  const validarCodigo = (cod) => {
    if (!/^\d{5}$/.test(cod)) {
      return "El código debe tener exactamente 5 dígitos"
    }

    if (cod.endsWith("000") || (cod.endsWith("00") && !cod.endsWith("000"))) {
      return "No se pueden crear partidas, grupos o rubros. Solo cuentas específicas"
    }

    const existe = planLocal.some(([codigoExistente]) => codigoExistente.toString() === cod)
    if (existe) {
      return "Este código ya existe en el plan de cuentas"
    }

    return null
  }

  // Manejar creación de cuenta
  const handleCrear = () => {
    setError("")

    if (!codigo || !nombre) {
      setError("Todos los campos son obligatorios")
      return
    }

    const errorValidacion = validarCodigo(codigo)
    if (errorValidacion) {
      setError(errorValidacion)
      return
    }

    setShowModal(true)
  }

  // Confirmar creación
  const confirmarCreacion = () => {
    console.log("Cuenta creada:", { codigo, nombre, nature, state })
    const nuevaCuenta = [Number.parseInt(codigo), nombre, nature, state]
    setPlanLocal([...planLocal, nuevaCuenta])

    setCodigo("")
    setNombre("")
    setNature(0)
    setState(1)
    setShowModal(false)
    setError("")

    alert(
      `Cuenta creada exitosamente: ${codigo} - ${nombre} (${nature === 0 ? "Deudor" : "Acreedor"}, ${state === 1 ? "Activa" : "Inactiva"})`,
    )
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Título y Switch */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ color: theme.textColor, fontWeight: "600", margin: 0 }}>Plan de Cuentas</h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: theme.background,
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: theme.cardShadowOut,
          }}
        >
          <span style={{ color: theme.textColor, fontSize: "14px", fontWeight: "500" }}>Mostrar cuentas inactivas</span>
          <Form.Check
            type="switch"
            id="show-inactive-switch"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            style={{
              transform: "scale(1.2)",
            }}
          />
        </div>
      </div>

      {/* Área del árbol jerárquico */}
      <div
        style={{
          flex: 1,
          background: theme.background,
          borderRadius: "15px",
          padding: "20px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 80px",
            gap: "10px",
            marginBottom: "15px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${theme.textColorSecondary}40`,
          }}
        >
          <div style={{ color: theme.textColor, fontWeight: "700", fontSize: "15px" }}>Cuenta</div>
          <div style={{ color: theme.textColor, fontWeight: "700", fontSize: "15px", textAlign: "center" }}>Debe</div>
          <div style={{ color: theme.textColor, fontWeight: "700", fontSize: "15px", textAlign: "center" }}>Haber</div>
        </div>

        {Object.entries(estructuraJerarquica).map(([partida, grupos]) => (
          <div key={partida} style={{ marginBottom: "15px" }}>
            {/* Partida */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 80px",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  color: theme.textColor,
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {partida}0000 {getNombrePartida(partida)}
              </div>
              <div></div>
              <div></div>
            </div>

            {/* Grupos */}
            {Object.entries(grupos).map(([grupo, rubros]) => (
              <div key={grupo} style={{ marginLeft: "20px", marginBottom: "10px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 80px",
                    gap: "10px",
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      color: theme.textColor,
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    └─ {partida}
                    {grupo}000 {getNombreGrupo(partida, grupo)}
                  </div>
                  <div></div>
                  <div></div>
                </div>

                {/* Rubros */}
                {Object.entries(rubros).map(([rubro, cuentas]) => (
                  <div key={rubro} style={{ marginLeft: "40px", marginBottom: "8px" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 80px 80px",
                        gap: "10px",
                        marginBottom: "4px",
                      }}
                    >
                      <div
                        style={{
                          color: theme.textColor,
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        └─ {partida}
                        {grupo}
                        {rubro}00 {getNombreRubro(partida, grupo, rubro)}
                      </div>
                      <div></div>
                      <div></div>
                    </div>

                    {cuentas.map(({ codigo, nombre, nature, state }) => (
                      <div
                        key={codigo}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 80px 80px",
                          gap: "10px",
                          marginLeft: "60px",
                          marginBottom: "2px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          opacity: state === 0 ? 0.5 : 1,
                        }}
                      >
                        <div
                          style={{
                            color: theme.textColorSecondary || theme.textColor,
                            fontSize: "13px",
                          }}
                        >
                          └─ {codigo.toString().padStart(5, "0")} {nombre}
                          {state === 0 && (
                            <span
                              style={{
                                marginLeft: "8px",
                                fontSize: "11px",
                                color: "#ff4d4f",
                                fontWeight: "600",
                              }}
                            >
                              (Inactiva)
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                            textShadow: "0 0 3px currentColor, 0 0 1px currentColor",
                            color: nature === 0 ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {nature === 0 ? "↑" : "↓"}
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                            textShadow: "0 0 3px currentColor, 0 0 1px currentColor",
                            color: nature === 1 ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {nature === 1 ? "↑" : "↓"}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Formulario de creación */}
      <div
        style={{
          background: theme.background,
          borderRadius: "15px",
          boxShadow: theme.cardShadowOut,
          padding: "20px",
        }}
      >
        <div className="row g-3 align-items-end">
          {/* Campo Código */}
          <div className="col-md-2">
            <label
              htmlFor="codigo"
              style={{
                color: theme.textColor,
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Código
            </label>
            <input
              type="text"
              id="codigo"
              className="form-control"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="11101"
              maxLength="5"
              style={{
                background: theme.background,
                color: theme.textColor,
                border: `1px solid ${theme.textColorSecondary}40`,
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </div>

          {/* Campo Nombre */}
          <div className="col-md-3">
            <label
              htmlFor="nombre"
              style={{
                color: theme.textColor,
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la cuenta"
              style={{
                background: theme.background,
                color: theme.textColor,
                border: `1px solid ${theme.textColorSecondary}40`,
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-md-2">
            <label
              htmlFor="nature"
              style={{
                color: theme.textColor,
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Naturaleza
            </label>
            <select
              id="nature"
              className="form-select"
              value={nature}
              onChange={(e) => setNature(Number.parseInt(e.target.value))}
              style={{
                background: theme.background,
                color: theme.textColor,
                border: `1px solid ${theme.textColorSecondary}40`,
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <option value={0}>Deudor</option>
              <option value={1}>Acreedor</option>
            </select>
          </div>

          <div className="col-md-2">
            <label
              htmlFor="state"
              style={{
                color: theme.textColor,
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Estado
            </label>
            <select
              id="state"
              className="form-select"
              value={state}
              onChange={(e) => setState(Number.parseInt(e.target.value))}
              style={{
                background: theme.background,
                color: theme.textColor,
                border: `1px solid ${theme.textColorSecondary}40`,
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <option value={1}>Activa</option>
              <option value={0}>Inactiva</option>
            </select>
          </div>

          {/* Botón Crear */}
          <div className="col-md-3">
            <button
              className="btn w-100"
              onClick={handleCrear}
              style={{
                background: theme.primaryColor,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
                fontWeight: "600",
                boxShadow: theme.smallButtonShadowOut,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = theme.smallButtonShadowOut
              }}
            >
              Crear
            </button>
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              background: "#ff4d4f20",
              border: "1px solid #ff4d4f",
              borderRadius: "8px",
              color: "#ff4d4f",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        style={{
          backdropFilter: "blur(5px)",
        }}
      >
        <Modal.Header
          closeButton
          style={{
            background: theme.background,
            borderBottom: `1px solid ${theme.textColorSecondary}20`,
          }}
        >
          <Modal.Title style={{ color: theme.textColor, fontSize: "18px" }}>Confirmar Creación</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: theme.background,
            color: theme.textColor,
          }}
        >
          <p style={{ marginBottom: "15px" }}>
            <strong>Este cambio es permanente. Corroborá la información antes de confirmar.</strong>
          </p>
          <p style={{ marginBottom: "5px" }}>Estás por crear la siguiente cuenta:</p>
          <div
            style={{
              background: theme.background,
              padding: "15px",
              borderRadius: "8px",
              boxShadow: theme.cardShadowIn,
              marginTop: "10px",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>Código:</strong> {codigo}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Nombre:</strong> {nombre}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Naturaleza:</strong> {nature === 0 ? "Deudor" : "Acreedor"}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Estado:</strong> {state === 1 ? "Activa" : "Inactiva"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            background: theme.background,
            borderTop: `1px solid ${theme.textColorSecondary}20`,
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{
              background: theme.background,
              color: theme.textColor,
              border: `1px solid ${theme.textColorSecondary}40`,
              boxShadow: theme.smallButtonShadowOut,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={confirmarCreacion}
            style={{
              background: theme.primaryColor,
              border: "none",
              boxShadow: theme.smallButtonShadowOut,
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CuentaCrear
