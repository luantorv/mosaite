import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { useAuth, ROLES } from "../../context/AuthContext"

function UsuariosLista() {
  const { theme } = useTheme()
  const { users, createUser, updateUser, deleteUser, toggleUserStatus } = useAuth()

  const [selectedRole, setSelectedRole] = useState("all")
  const [showInactive, setShowInactive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: 0,
  })

  // Filtrar usuarios según rol y estado
  const filteredUsers = users.filter((user) => {
    const roleMatch = selectedRole === "all" || user.role === Number.parseInt(selectedRole)
    const statusMatch = showInactive || user.status
    return roleMatch && statusMatch
  })

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: "",
        email: "",
        role: 0,
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
    setFormData({
      name: "",
      email: "",
      role: 0,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      updateUser(editingUser.id, formData)
    } else {
      createUser(formData)
    }
    handleCloseModal()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

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
          Usuarios
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
            <option value="all">Todos</option>
            {Object.entries(ROLES).map(([value, label]) => (
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
          overflow: "auto",
        }}
      >
        {filteredUsers.length === 0 ? (
          <div
            style={{
              padding: "10px",
              textAlign: "center",
              color: theme.textColorSecondary,
            }}
          >
            No se encontraron usuarios con los filtros seleccionados
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: theme.background,
                boxShadow: theme.cardShadowOut,
                display: "flex",
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
                    {ROLES[user.role]}
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
                <p
                  style={{
                    color: theme.textColorSecondary,
                    fontSize: "12px",
                    margin: "4px 0",
                  }}
                >
                  Creado: {formatDate(user.createdAt)} | Editado: {formatDate(user.updatedAt)}
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {/* Botón de estado */}
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    boxShadow: theme.cardShadowOut,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: user.status ? "#4CAF50" : "#f44336",
                    fontSize: "20px",
                    fontWeight: "bold",
                    transition: "all 0.2s ease",
                  }}
                  title={user.status ? "Usuario activo" : "Usuario inactivo"}
                >
                  {user.status ? "✓" : "✕"}
                </button>

                {/* Botón de editar */}
                <button
                  onClick={() => handleOpenModal(user)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    boxShadow: theme.cardShadowOut,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.textColor,
                    fontSize: "18px",
                    transition: "all 0.2s ease",
                  }}
                  title="Editar usuario"
                >
                  ✎
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
          style={{
            background: theme.primaryColor || "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            boxShadow: theme.cardShadowOut,
            transition: "all 0.3s ease",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
          }}
          title="Crear nuevo usuario"
        >
          Crear
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
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
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
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
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
                  Rol
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: Number.parseInt(e.target.value) })}
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
                  {Object.entries(ROLES).map(([value, label]) => (
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
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.background,
                    color: theme.textColor,
                    boxShadow: theme.cardShadowOut,
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#4CAF50",
                    color: "#fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {editingUser ? "Guardar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsuariosLista