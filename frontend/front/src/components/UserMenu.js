import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { user, roles } = useAuth();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  // Función para obtener iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleName = (rolNumber) => {
    return roles[rolNumber] || `Rol ${rolNumber}`;
  };

  const getStatusText = (status) => {
    return status === 0 ? 'Activo' : 'Inactivo';
  };

  return (
    <>
      {/* Contenedor del botón y menú */}
      <div style={{ position: "relative" }}>
        <button
          className="btn"
          onClick={toggleUserMenu}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "10px",
            background: theme.background,
            boxShadow: isUserMenuOpen 
              ? theme.buttonShadowIn
              : theme.buttonShadowOut,
            transition: "all 0.3s ease",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "600",
            color: theme.textColor,
            marginLeft: "10px",
          }}
          onMouseEnter={(e) => {
            if (!isUserMenuOpen) {
              e.target.style.boxShadow = theme.buttonShadowIn;
            }
          }}
          onMouseLeave={(e) => {
            if (!isUserMenuOpen) {
              e.target.style.boxShadow = theme.buttonShadowOut;
            }
          }}
        >
          {getInitials(user?.name)}
        </button>

        {/* Menú flotante del usuario */}
        {isUserMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "0",
              width: "280px",
              background: theme.background,
              borderRadius: "15px",
              boxShadow: theme.cardShadowOut,
              zIndex: 1000,
              padding: "20px",
              transform: "translateY(0)",
              opacity: 1,
              transition: "all 0.3s ease",
            }}
          >
            {/* Contenido del menú de usuario */}
            <div style={{ color: theme.textColor }}>
              <div 
                style={{
                  padding: "10px 0",
                  borderBottom: `2px solid ${theme.border}`,
                  marginBottom: "15px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: theme.primaryColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "700"
                    }}
                  >
                    {getInitials(user?.name)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: "16px", 
                      fontWeight: "600",
                      marginBottom: "4px"
                    }}>
                      {user?.name || "Usuario"}
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      color: theme.textColorMuted,
                      marginBottom: "4px"
                    }}>
                      {user?.email || "usuario@ejemplo.com"}
                    </div>
                    <div style={{ 
                      fontSize: "13px", 
                      color: theme.textColorMuted,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <span>{getRoleName(user?.rol)}</span>
                      <span>•</span>
                      <span style={{ 
                        color: user?.status === 0 ? '#4caf50' : '#f44336',
                        fontWeight: "500"
                      }}>
                        {getStatusText(user?.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <LogoutButton />
            </div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isUserMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 999,
            background: "transparent",
          }}
          onClick={closeUserMenu}
        />
      )}
    </>
  );
}

export default UserMenu;