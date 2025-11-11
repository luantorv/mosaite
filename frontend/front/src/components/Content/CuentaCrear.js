import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Modal, Button, Form } from "react-bootstrap";
import accountService from "../../services/AccountService";

function CuentaCrear() {
  const { theme } = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [nature, setNature] = useState(true);
  const [state, setState] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [error, setError] = useState("");

  // Cargar cuentas al montar
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    const result = await accountService.getAccounts();
    
    if (result.success) {
      setAccounts(result.accounts);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Abrir modal de detalles
  const handleAccountClick = (cuenta) => {
    setSelectedAccount(cuenta);
    setShowDetailModal(true);
  };

  // Cerrar modal de detalles
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAccount(null);
  };

  // Toggle estado de cuenta
  const handleToggleStatus = async () => {
    if (!selectedAccount) return;

    setSaving(true);
    const result = await accountService.toggleAccountStatus(
      selectedAccount.acc_id,
      selectedAccount.status
    );

    if (result.success) {
      await loadAccounts();
      setShowDetailModal(false);
      setSelectedAccount(null);
    } else {
      alert(result.error || "Error al cambiar estado de la cuenta");
    }

    setSaving(false);
  };

  // Función para obtener el nombre de la partida
  const getNombrePartida = (digito) => {
    const partidas = {
      1: "Activo",
      2: "Pasivo",
      3: "Patrimonio Neto",
      4: "Ingresos",
      5: "Egresos",
    };
    return partidas[digito] || digito;
  };

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
    };
    return grupos[`${partida}${grupo}`] || `${partida}${grupo}`;
  };

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
      537: "Depreciaciones y Amortizaciones",
      538: "Gastos Generales",
      539: "Otros Gastos Administrativos",
      541: "Resultados Financieros",
      551: "Egresos Extraordinarios",
    };
    return rubros[`${partida}${grupo}${rubro}`] || `${partida}${grupo}${rubro}`;
  };

  // Organizar el plan en estructura jerárquica
  const organizarPlan = () => {
    const estructura = {};

    const cuentasFiltradas = showInactive 
      ? accounts 
      : accounts.filter(cuenta => cuenta.status);

    cuentasFiltradas.forEach((cuenta) => {
      const codigoStr = cuenta.code.padStart(5, "0");
      const partida = codigoStr[0];
      const grupo = codigoStr[1];
      const rubro = codigoStr[2];

      if (!estructura[partida]) {
        estructura[partida] = {};
      }
      if (!estructura[partida][grupo]) {
        estructura[partida][grupo] = {};
      }
      if (!estructura[partida][grupo][rubro]) {
        estructura[partida][grupo][rubro] = [];
      }

      estructura[partida][grupo][rubro].push(cuenta);
    });

    return estructura;
  };

  const estructuraJerarquica = organizarPlan();

  // Validar código
  const validarCodigo = (cod) => {
    if (!/^\d{5}$/.test(cod)) {
      return "El código debe tener exactamente 5 dígitos";
    }

    if (cod.endsWith("000") || (cod.endsWith("00") && !cod.endsWith("000"))) {
      return "No se pueden crear partidas, grupos o rubros. Solo cuentas específicas";
    }

    const existe = accounts.some((cuenta) => cuenta.code === cod);
    if (existe) {
      return "Este código ya existe en el plan de cuentas";
    }

    return null;
  };

  // Manejar creación de cuenta
  const handleCrear = () => {
    setError("");

    if (!codigo || !nombre) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const errorValidacion = validarCodigo(codigo);
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setShowCreateModal(true);
  };

  // Confirmar creación
  const confirmarCreacion = async () => {
    setSaving(true);
    setError("");

    const accountData = {
      code: codigo,
      name: nombre,
      nature: nature,
      status: state,
    };

    const result = await accountService.createAccount(accountData);

    if (result.success) {
      await loadAccounts();
      setCodigo("");
      setNombre("");
      setNature(true);
      setState(true);
      setShowCreateModal(false);
      alert(`Cuenta creada exitosamente: ${codigo} - ${nombre}`);
    } else {
      if (typeof result.error === 'object') {
        const errorMessages = Object.entries(result.error)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
        setError(errorMessages);
      } else {
        setError(result.error || "Error al crear cuenta");
      }
      setShowCreateModal(false);
    }

    setSaving(false);
  };

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
          <p>Cargando plan de cuentas...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "20px" }}>
      {/* Título y Switch */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ color: theme.textColor, fontWeight: "600", margin: 0 }}>
          Plan de Cuentas ({accounts.length} cuentas)
        </h4>

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
          <span style={{ color: theme.textColor, fontSize: "14px", fontWeight: "500" }}>
            Mostrar cuentas inactivas
          </span>
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
          //boxShadow: theme.cardShadowOut,
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
          <div style={{ color: theme.textColor, fontWeight: "700", fontSize: "15px", textAlign: "center" }}>
            Debe
          </div>
          <div style={{ color: theme.textColor, fontWeight: "700", fontSize: "15px", textAlign: "center" }}>
            Haber
          </div>
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
                    └─ {partida}{grupo}000 {getNombreGrupo(partida, grupo)}
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
                        └─ {partida}{grupo}{rubro}00 {getNombreRubro(partida, grupo, rubro)}
                      </div>
                      <div></div>
                      <div></div>
                    </div>

                    {cuentas.map((cuenta) => (
                      <div
                        key={cuenta.acc_id}
                        onClick={() => handleAccountClick(cuenta)}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 80px 80px",
                          gap: "10px",
                          marginLeft: "60px",
                          marginBottom: "2px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          opacity: !cuenta.status ? 0.5 : 1,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = theme.hoverBackground || "rgba(0,0,0,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div
                          style={{
                            color: theme.textColorSecondary || theme.textColor,
                            fontSize: "13px",
                          }}
                        >
                          └─ {cuenta.code.padStart(5, "0")} {cuenta.name}
                          {!cuenta.status && (
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
                            color: cuenta.nature ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {cuenta.nature ? "↑" : "↓"}
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                            textShadow: "0 0 3px currentColor, 0 0 1px currentColor",
                            color: !cuenta.nature ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {!cuenta.nature ? "↑" : "↓"}
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
              disabled={saving}
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
              disabled={saving}
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
              onChange={(e) => setNature(e.target.value === 'true')}
              disabled={saving}
              style={{
                background: theme.background,
                color: theme.textColor,
                border: `1px solid ${theme.textColorSecondary}40`,
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <option value={true}>Deudora</option>
              <option value={false}>Acreedora</option>
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
              onChange={(e) => setState(e.target.value === 'true')}
              disabled={saving}
              style={{
                background: theme.background,
                color: theme.textColor,
                border: `1px solid ${theme.textColorSecondary}40`,
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <option value={true}>Activa</option>
              <option value={false}>Inactiva</option>
            </select>
          </div>

          {/* Botón Crear */}
          <div className="col-md-3">
            <button
              className="btn w-100"
              onClick={handleCrear}
              disabled={saving}
              style={{
                background: theme.primaryColor,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
                fontWeight: "600",
                boxShadow: theme.smallButtonShadowOut,
                transition: "all 0.3s ease",
                opacity: saving ? 0.5 : 1,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = theme.smallButtonShadowOut;
              }}
            >
              {saving ? 'Creando...' : 'Crear Cuenta'}
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
              whiteSpace: "pre-line",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Modal de creación */}
      <Modal
        show={showCreateModal}
        onHide={() => !saving && setShowCreateModal(false)}
        centered
      >
        <Modal.Header
          closeButton={!saving}
          style={{
            background: theme.background,
            borderBottom: `1px solid ${theme.textColorSecondary}20`,
          }}
        >
          <Modal.Title style={{ color: theme.textColor, fontSize: "18px" }}>
            Confirmar Creación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: theme.background,
            color: theme.textColor,
          }}
        >
          <p style={{ marginBottom: "15px" }}>
            <strong>Estás por crear la siguiente cuenta:</strong>
          </p>
          <div
            style={{
              background: theme.background,
              padding: "15px",
              borderRadius: "8px",
              boxShadow: theme.cardShadowIn,
              marginTop: "10px",
            }}
          >
            <p style={{ margin: "4px 0" }}>
              <strong>Código:</strong> {codigo}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Nombre:</strong> {nombre}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Naturaleza:</strong> {nature ? "Deudora" : "Acreedora"}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Estado:</strong> {state ? "Activa" : "Inactiva"}
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
            onClick={() => setShowCreateModal(false)}
            disabled={saving}
            style={{
              background: theme.background,
              color: theme.textColor,
              border: `1px solid ${theme.textColorSecondary}40`,
              boxShadow: theme.smallButtonShadowOut,
              opacity: saving ? 0.5 : 1,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={confirmarCreacion}
            disabled={saving}
            style={{
              background: theme.primaryColor,
              border: "none",
              boxShadow: theme.smallButtonShadowOut,
              opacity: saving ? 0.5 : 1,
            }}
          >
            {saving ? 'Guardando...' : 'Confirmar'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de detalles de cuenta */}
      <Modal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        centered
      >
        <Modal.Header
          closeButton={!saving}
          style={{
            background: theme.background,
            borderBottom: `1px solid ${theme.textColorSecondary}20`,
          }}
        >
          <Modal.Title style={{ color: theme.textColor, fontSize: "18px" }}>
            Detalles de la Cuenta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: theme.background,
            color: theme.textColor,
          }}
        >
          {selectedAccount && (
            <div
              style={{
                background: theme.background,
                padding: "15px",
                borderRadius: "8px",
                //boxShadow: theme.cardShadowIn,
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: theme.textColor }}>Código:</strong>
                <div style={{ fontSize: "16px", marginTop: "4px" }}>
                  {selectedAccount.code.padStart(5, "0")}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: theme.textColor }}>Nombre:</strong>
                <div style={{ fontSize: "16px", marginTop: "4px" }}>
                  {selectedAccount.name}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: theme.textColor }}>Naturaleza:</strong>
                <div style={{ fontSize: "16px", marginTop: "4px" }}>
                  {selectedAccount.nature ? "Deudora" : "Acreedora"}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: theme.textColor }}>Saldo:</strong>
                <div style={{ fontSize: "16px", marginTop: "4px" }}>
                  ${selectedAccount.saldo.toLocaleString()}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: theme.textColor }}>Estado:</strong>
                <div style={{ fontSize: "16px", marginTop: "4px" }}>
                  <span
                    style={{
                      color: selectedAccount.status ? "#52c41a" : "#ff4d4f",
                      fontWeight: "600",
                    }}
                  >
                    {selectedAccount.status ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            background: theme.background,
            borderTop: `1px solid ${theme.textColorSecondary}20`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="warning"
            onClick={handleToggleStatus}
            disabled={saving}
            style={{
              background: selectedAccount?.status ? "#ff4d4f" : "#52c41a",
              border: "none",
              color: "white",
              boxShadow: theme.smallButtonShadowOut,
              opacity: saving ? 0.5 : 1,
            }}
          >
            {saving ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Procesando...
              </span>
            ) : (
              selectedAccount?.status ? "Inactivar Cuenta" : "Activar Cuenta"
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={handleCloseDetailModal}
            disabled={saving}
            style={{
              background: theme.background,
              color: theme.textColor,
              border: `1px solid ${theme.textColorSecondary}40`,
              boxShadow: theme.smallButtonShadowOut,
              opacity: saving ? 0.5 : 1,
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CuentaCrear;