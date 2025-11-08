import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import configService from "../../services/ConfigService";

function Configuracion() {
  const { theme } = useTheme();
  const { user, systemConfig, loadConfig } = useAuth();

  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // Cargar configuración al montar
  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    setLoading(true);
    setError("");
    
    const result = await configService.getCurrentConfig();
    
    if (result.success) {
      setConfig(result.config);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleEdit = (field) => {
    if (!config) return;
    
    setEditField(field);
    setTempValue(config[field]);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    setError("");

    const updateData = {
      [editField]: tempValue,
    };

    const result = await configService.updateConfig(config.config_id, updateData);

    if (result.success) {
      setConfig(result.config);
      setShowModal(false);
      setEditField(null);
      setTempValue("");
      
      // Recargar configuración en el contexto global
      loadConfig();
    } else {
      if (typeof result.error === 'object') {
        const errorMessages = Object.entries(result.error)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
        setError(errorMessages);
      } else {
        setError(result.error || "Error al actualizar configuración");
      }
    }

    setSaving(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditField(null);
    setTempValue("");
    setError("");
  };

  const dateFormatOptions = [
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY (Español)" },
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY (Inglés US)" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)" },
    { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
  ];

  const currencyOptions = [
    { value: "ARS", label: "ARS - Peso Argentino" },
    { value: "USD", label: "USD - Dólar Estadounidense" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "BRL", label: "BRL - Real Brasileño" },
    { value: "CLP", label: "CLP - Peso Chileno" },
    { value: "UYU", label: "UYU - Peso Uruguayo" },
    { value: "MXN", label: "MXN - Peso Mexicano" },
  ];

  const getSystemModeLabel = (mode) => {
    return mode ? "Empresarial" : "Educativo";
  };

  const getSystemModeDescription = (mode) => {
    return mode 
      ? "Acceso completo a todas las funcionalidades (5 roles)" 
      : "Modo simplificado para educación (2 roles: Profesor y Alumno)";
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            color: theme.textColor,
          }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando configuración...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="container-fluid p-4">
        <div
          className="alert alert-danger"
          role="alert"
        >
          Error al cargar la configuración. Por favor, recarga la página.
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div
        style={{
          backgroundColor: theme.background,
          borderRadius: "16px",
          //boxShadow: theme.cardShadowOut,
          padding: "24px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              color: theme.textColor,
              fontSize: "20px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            Configuración del Sistema
          </h4>
          <p
            style={{
              color: theme.textColorMuted,
              fontSize: "14px",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            Administra la configuración global de la aplicación
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Modo del Sistema */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            backgroundColor: theme.background,
            borderRadius: "12px",
            boxShadow: theme.cardShadowIn,
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                color: theme.textColor,
                fontSize: "15px",
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Modo del Sistema
            </label>
            <p
              style={{
                color: theme.textColorMuted,
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              {getSystemModeDescription(config.system_mode)}
            </p>
          </div>

          <div
            style={{
              display: "inline-flex",
              gap: "8px",
              padding: "4px",
              backgroundColor: theme.background,
              borderRadius: "10px",
              boxShadow: theme.smallButtonShadowIn,
            }}
          >
            <div
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                backgroundColor: !config.system_mode ? theme.primaryColor : "transparent",
                color: !config.system_mode ? "white" : theme.textColor,
                fontWeight: "500",
                fontSize: "14px",
                boxShadow: !config.system_mode ? theme.smallButtonShadowOut : "none",
              }}
            >
              Educativo
            </div>
            <div
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                backgroundColor: config.system_mode ? theme.primaryColor : "transparent",
                color: config.system_mode ? "white" : theme.textColor,
                fontWeight: "500",
                fontSize: "14px",
                boxShadow: config.system_mode ? theme.smallButtonShadowOut : "none",
              }}
            >
              Empresarial
            </div>
          </div>

          <div
            style={{
              marginTop: "12px",
              padding: "10px 12px",
              backgroundColor: "#fff3cd",
              color: "#856404",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          >
            <strong>⚠️ Nota:</strong> El modo del sistema no se puede cambiar después de la instalación inicial.
          </div>
        </div>

        {/* Formato de Fechas */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            backgroundColor: theme.background,
            borderRadius: "12px",
            boxShadow: theme.cardShadowIn,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  color: theme.textColor,
                  fontSize: "15px",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Formato de Fechas
              </label>
              <p
                style={{
                  color: theme.textColorMuted,
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                Formato utilizado para mostrar fechas en el sistema
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  color: theme.textColor,
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "8px 16px",
                  backgroundColor: theme.background,
                  borderRadius: "8px",
                  boxShadow: theme.smallButtonShadowOut,
                }}
              >
                {config.date_format || "DD/MM/YYYY"}
              </span>
              <button
                onClick={() => handleEdit("date_format")}
                disabled={saving}
                style={{
                  backgroundColor: theme.background,
                  color: theme.textColor,
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: saving ? "not-allowed" : "pointer",
                  boxShadow: theme.smallButtonShadowOut,
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity: saving ? 0.5 : 1,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.target.style.boxShadow = theme.smallButtonShadowIn;
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = theme.smallButtonShadowOut;
                }}
              >
                ✎ Editar
              </button>
            </div>
          </div>
        </div>

        {/* Moneda */}
        <div
          style={{
            marginBottom: "24px",
            padding: "20px",
            backgroundColor: theme.background,
            borderRadius: "12px",
            boxShadow: theme.cardShadowIn,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  color: theme.textColor,
                  fontSize: "15px",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Moneda
              </label>
              <p
                style={{
                  color: theme.textColorMuted,
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                Moneda utilizada en transacciones y reportes
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  color: theme.textColor,
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "8px 16px",
                  backgroundColor: theme.background,
                  borderRadius: "8px",
                  boxShadow: theme.smallButtonShadowOut,
                }}
              >
                {config.currency || "ARS"}
              </span>
              <button
                onClick={() => handleEdit("currency")}
                disabled={saving}
                style={{
                  backgroundColor: theme.background,
                  color: theme.textColor,
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: saving ? "not-allowed" : "pointer",
                  boxShadow: theme.smallButtonShadowOut,
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity: saving ? 0.5 : 1,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.target.style.boxShadow = theme.smallButtonShadowIn;
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = theme.smallButtonShadowOut;
                }}
              >
                ✎ Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={handleCancel}
        >
          <div
            style={{
              background: theme.background,
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: theme.cardShadowOut,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5
              style={{
                color: theme.textColor,
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Editar {editField === "date_format" ? "Formato de Fecha" : "Moneda"}
            </h5>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: theme.textColor,
                  fontSize: "14px",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                Seleccione el nuevo valor:
              </label>

              <select
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                disabled={saving}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  background: theme.background,
                  color: theme.textColor,
                  boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                  fontSize: "14px",
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {editField === "date_format"
                  ? dateFormatOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : currencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleCancel}
                disabled={saving}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: theme.background,
                  color: theme.textColor,
                  boxShadow: theme.cardShadowOut,
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity: saving ? 0.5 : 1,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#4CAF50",
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity: saving ? 0.5 : 1,
                }}
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Configuracion;
