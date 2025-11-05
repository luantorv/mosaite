import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function UsuariosLista() {
  const { theme } = useTheme();
  const { users, loadUsers, createUser, updateUser, deleteUser, toggleUserStatus, roles, systemConfig } = useAuth();

  const [selectedRole, setSelectedRole] = useState("all");
  const [showInactive, setShowInactive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    group: "",
    rol: 0,
  });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Obtener roles disponibles según el modo del sistema
  const getAvailableRoles = () => {
    if (!systemConfig) return roles;
    
    // Si es modo educativo (false), solo mostrar roles 0 y 2
    if (!systemConfig.system_mode) {
      return Object.entries(roles)
        .filter(([key]) => key === "0" || key === "2")
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
    }
    
    return roles;
  };

  const availableRoles = getAvailableRoles();

  // Filtrar usuarios según rol y estado
  const filteredUsers = users.filter((user) => {
    const roleMatch = selectedRole === "all" || user.rol === parseInt(selectedRole);
    const statusMatch = showInactive || user.status === 0; // 0 es activo
    return roleMatch && statusMatch;
  });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // No mostramos la contraseña
        group: user.group || "",
        rol: user.rol,
      });
    } else {
      setEditingUser(null);
      const defaultRole = !systemConfig || !systemConfig.system_mode ? 2 : 0;
      setFormData({
        name: "",
        email: "",
        password: "",
        group: "",
        rol: defaultRole,
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      group: "",
      rol: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;
      
      if (editingUser) {
        // Si es edición y no hay contraseña, no enviarla
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        result = await updateUser(editingUser.user_id, updateData);
      } else {
        // Para crear, la contraseña es obligatoria
        if (!formData.password) {
          setError("La contraseña es obligatoria");
          setLoading(false);
          return;
        }
        result = await createUser(formData);
      }

      if (result.success) {
        handleCloseModal();
      } else {
        // Mostrar errores del backend
        if (typeof result.error === 'object') {
          const errorMessages = Object.entries(result.error)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          setError(errorMessages);
        } else {
          setError(result.error || "Error al guardar el usuario");
        }
      }
    } catch (err) {
      setError("Error inesperado al guardar el usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    setLoading(true);
    try {
      const result = await toggleUserStatus(userId);
      if (!result.success) {
        alert(result.error || "Error al cambiar el estado del usuario");
      }
    } catch (err) {
      alert("Error inesperado al cambiar el estado");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`¿Estás seguro de eliminar al usuario "${userName}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteUser(userId);
      if (!result.success) {
        alert(result.error || "Error al eliminar el usuario");
      }
    } catch (err) {
      alert("Error inesperado al eliminar");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    return status === 0 ? "#4CAF50" : "#f44336";
  };

  const getStatusText = (status) => {
    return status === 0 ? "Activo" : "Inactivo";
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h4
          style={{
            color: theme.textColor,
            fontSize: "20px",
            fontWeight: "600",
            margin: 0,
          }}
        >
          Usuarios ({filteredUsers.length})
        </h4>

        {/* Filtro por rol */}
        <div style={{ minWidth: "200px" }}>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "none",
              background: theme.background,
              color: theme.textColor,
              boxShadow: theme.cardShadowOut,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="all">Todos los roles</option>
            {Object.entries(availableRoles).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div
        style={{
          display: "grid",
          padding: "10px",
          gap: "16px",
          flex: 1,
          alignContent: "flex-start",
          overflow: "auto",
        }}
      >
        {filteredUsers.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: theme.textColorMuted,
              fontSize: "16px",
            }}
          >
            No se encontraron usuarios con los filtros seleccionados
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.user_id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: theme.background,
                boxShadow: theme.cardShadowOut,
                display: "flex",
                maxHeight: "120px",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      color: theme.textColor,
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    {user.name}
                  </h3>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      background: theme.background,
                      boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                      color: theme.textColorSecondary,
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {roles[user.rol] || `Rol ${user.rol}`}
                  </span>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      background: theme.background,
                      boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                      color: getStatusColor(user.status),
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {getStatusText(user.status)}
                  </span>
                </div>
                <p
                  style={{
                    color: theme.textColorSecondary,
                    fontSize: "14px",
                    margin: "4px 0",
                  }}
                >
                  {user.email}
                </p>
                {user.group && (
                  <p
                    style={{
                      color: theme.textColorSecondary,
                      fontSize: "13px",
                      margin: "4px 0",
                    }}
                  >
                    Grupo: {user.group}
                  </p>
                )}
                <p
                  style={{
                    color: theme.textColorMuted,
                    fontSize: "12px",
                    margin: "4px 0",
                  }}
                >
                  Creado: {formatDate(user.created_at)} | Actualizado: {formatDate(user.updated_at)}
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {/* Botón de estado */}
                <button
                  onClick={() => handleToggleStatus(user.user_id)}
                  disabled={loading}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    boxShadow: theme.cardShadowOut,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: getStatusColor(user.status),
                    fontSize: "20px",
                    fontWeight: "bold",
                    transition: "all 0.2s ease",
                    opacity: loading ? 0.5 : 1,
                  }}
                  title={`${getStatusText(user.status)} - Click para cambiar`}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {user.status === 0 ? "✓" : "✕"}
                </button>

                {/* Botón de editar */}
                <button
                  onClick={() => handleOpenModal(user)}
                  disabled={loading}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    boxShadow: theme.cardShadowOut,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.textColor,
                    fontSize: "18px",
                    transition: "all 0.2s ease",
                    opacity: loading ? 0.5 : 1,
                  }}
                  title="Editar usuario"
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  ✎
                </button>

                {/* Botón de eliminar */}
                <button
                  onClick={() => handleDeleteUser(user.user_id, user.name)}
                  disabled={loading}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    boxShadow: theme.cardShadowOut,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f44336",
                    fontSize: "18px",
                    transition: "all 0.2s ease",
                    opacity: loading ? 0.5 : 1,
                  }}
                  title="Eliminar usuario"
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          padding: "20px",
          background: theme.background,
          boxShadow: `0 -4px 8px rgba(0,0,0,0.1)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          borderRadius: "12px",
          marginTop: "0",
          flexShrink: 0,
        }}
      >
        {/* Toggle mostrar inactivos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <label
            style={{
              color: theme.textColor,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              userSelect: "none",
            }}
            htmlFor="show-inactive"
          >
            Mostrar Inactivos
          </label>
          <button
            id="show-inactive"
            onClick={() => setShowInactive(!showInactive)}
            style={{
              width: "48px",
              height: "24px",
              borderRadius: "12px",
              border: "none",
              background: showInactive ? "#4CAF50" : theme.background,
              boxShadow: showInactive ? "inset 2px 2px 4px rgba(0,0,0,0.2)" : theme.cardShadowOut,
              position: "relative",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: "3px",
                left: showInactive ? "27px" : "3px",
                transition: "left 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </button>
        </div>

        <button
          onClick={() => handleOpenModal()}
          disabled={loading}
          style={{
            background: theme.primaryColor || "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease",
            fontSize: "14px",
            fontWeight: "500",
            opacity: loading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          title="Crear nuevo usuario"
        >
          + Crear Usuario
        </button>
      </div>

      {/* Modal para crear/editar usuario */}
      {isModalOpen && (
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
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: theme.background,
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: theme.cardShadowOut,
              maxHeight: "90vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                color: theme.textColor,
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "24px",
              }}
            >
              {editingUser ? "Editar Usuario" : "Crear Usuario"}
            </h3>

            {error && (
              <div
                style={{
                  background: "#ffebee",
                  color: "#c62828",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  whiteSpace: "pre-line",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                    fontSize: "14px",
                  }}
                />
              </div>

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
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                    fontSize: "14px",
                  }}
                />
              </div>

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
                  Contraseña {editingUser ? "(dejar vacío para no cambiar)" : "*"}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  disabled={loading}
                  placeholder={editingUser ? "Dejar vacío para mantener actual" : "Ingresa la contraseña"}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                    fontSize: "14px",
                  }}
                />
              </div>

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
                  Grupo
                </label>
                <input
                  type="text"
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  disabled={loading}
                  placeholder="Ej: Curso A, Departamento Contable, etc."
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    color: theme.textColor,
                    fontSize: "14px",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Rol *
                </label>
                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: parseInt(e.target.value) })}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.1)`,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {Object.entries(availableRoles).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: theme.cardShadowOut,
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#4CAF50",
                    color: "#fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Guardando...
                    </span>
                  ) : (
                    editingUser ? "Guardar Cambios" : "Crear Usuario"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosLista;