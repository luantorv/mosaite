import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"

function Configuracion() {
  const { theme } = useTheme()

  const [config, setConfig] = useState({
    system_mode: true,
    date_format: "en-CA",
    currency: "ARS",
  })

  const [showModal, setShowModal] = useState(false)
  const [editField, setEditField] = useState(null)
  const [tempValue, setTempValue] = useState("")

  const handleEdit = (field) => {
    setEditField(field)
    setTempValue(config[field])
    setShowModal(true)
  }

  const handleSave = () => {
    setConfig({
      ...config,
      [editField]: tempValue,
    })
    setShowModal(false)
    setEditField(null)
    setTempValue("")
  }

  const handleCancel = () => {
    setShowModal(false)
    setEditField(null)
    setTempValue("")
  }

  const dateFormatOptions = [
    { value: "en-CA", label: "en-CA (YYYY-MM-DD)" },
    { value: "en-US", label: "en-US (MM/DD/YYYY)" },
    { value: "es-AR", label: "es-AR (DD/MM/YYYY)" },
  ]

  const currencyOptions = [
    { value: "ARS", label: "ARS (Peso Argentino)" },
    { value: "USD", label: "USD (Dólar)" },
    { value: "EUR", label: "EUR (Euro)" },
    { value: "BRL", label: "BRL (Real)" },
  ]

  return (
    <div className="container-fluid p-4">
      <div
        className="card"
        style={{
          backgroundColor: theme.background,
        }}
      >
        <div className="card-header">
          <h4 className="mb-0" style={{ color: theme.textColor }}>
            Configuración
          </h4>
        </div>

        <div className="card-body">
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <label className="form-label mb-0" style={{ color: theme.textColor }}>
              Modo del Sistema
            </label>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${config.system_mode ? "btn-secondary" : "btn-outline-secondary"}`}
                disabled
                style={{
                  cursor: "not-allowed",
                  opacity: 0.6,
                }}
              >
                Education
              </button>
              <button
                type="button"
                className={`btn ${!config.system_mode ? "btn-secondary" : "btn-outline-secondary"}`}
                disabled
                style={{
                  cursor: "not-allowed",
                  opacity: 0.6,
                }}
              >
                Business
              </button>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-center justify-content-between">
            <label className="form-label mb-0" style={{ color: theme.textColor }}>
              Formato de Fechas
            </label>
            <div
              className="d-flex align-items-center justify-content-between p-2 border rounded"
              onClick={() => handleEdit("date_format")}
              style={{
                backgroundColor: theme.buttonShadowOut,
                cursor: "pointer",
                minWidth: "250px",
              }}
            >
              <span style={{ color: theme.textColor }}>
                {dateFormatOptions.find((opt) => opt.value === config.date_format)?.label}
              </span>
              <i className="bi bi-chevron-down" style={{ color: theme.textColor }}></i>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-center justify-content-between">
            <label className="form-label mb-0" style={{ color: theme.textColor }}>
              Moneda
            </label>
            <div
              className="d-flex align-items-center justify-content-between p-2 border rounded"
              onClick={() => handleEdit("currency")}
              style={{
                backgroundColor: theme.buttonShadowOut,
                cursor: "pointer",
                minWidth: "250px",
              }}
            >
              <span style={{ color: theme.textColor }}>{config.currency}</span>
              <i className="bi bi-chevron-down" style={{ color: theme.textColor }}></i>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                backgroundColor: theme.cardBackground,
                color: theme.textColor,
              }}
            >
              <div className="modal-header" style={{ borderColor: theme.borderColor }}>
                <h5 className="modal-title">Editar {editField === "date_format" ? "Formato de Fecha" : "Moneda"}</h5>
                <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Seleccione el nuevo valor:</label>

                  {editField === "date_format" ? (
                    <select
                      className="form-select"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      style={{
                        backgroundColor: theme.inputBackground,
                        color: theme.textColor,
                        borderColor: theme.borderColor,
                      }}
                    >
                      {dateFormatOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="form-select"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      style={{
                        backgroundColor: theme.inputBackground,
                        color: theme.textColor,
                        borderColor: theme.borderColor,
                      }}
                    >
                      {currencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="alert alert-warning" role="alert">
                  <small>
                    <strong>POC:</strong> Este cambio es temporal y no se guardará permanentemente.
                  </small>
                </div>
              </div>

              <div className="modal-footer" style={{ borderColor: theme.borderColor }}>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Configuracion
