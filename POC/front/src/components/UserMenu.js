import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { user } = useAuth(); // Obtener datos reales del usuario

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
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt="Avatar" 
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          ) : (
            getInitials(user?.name)
          )}
        </button>

        {/* Menú flotante del usuario */}
        {isUserMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "0",
              width: "250px",
              background: theme.background,
              borderRadius: "15px",
              boxShadow: theme.cardShadowOut,
              zIndex: 1000,
              padding: "15px",
              transform: "translateY(0)",
              opacity: 1,
              transition: "all 0.3s ease",
            }}
          >
            {/* Contenido del menú de usuario */}
            <div style={{ color: theme.textColor, fontSize: "14px" }}>
              <div 
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #d0d7e3",
                  marginBottom: "10px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: theme.primaryColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                      />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </div>
                  <div>
                    <strong>{user?.name || "Usuario"}</strong>
                    <div style={{ fontSize: "12px", color: theme.textColorMuted }}>
                      {user?.email || "usuario@ejemplo.com"}
                    </div>
                    <div style={{ fontSize: "11px", color: theme.textColorMuted }}>
                      {user?.company || "Empresa"} • {user?.role || "Usuario"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  className="btn"
                  onClick={closeUserMenu}
                  style={{
                    background: theme.background,
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: theme.smallButtonShadowOut,
                    color: theme.textColor,
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = theme.smallButtonShadowIn;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = theme.smallButtonShadowOut;
                  }}
                >
                  Mi Perfil
                </button>
                
                <button
                  className="btn"
                  onClick={closeUserMenu}
                  style={{
                    background: theme.background,
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: theme.smallButtonShadowOut,
                    color: theme.textColor,
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = theme.smallButtonShadowIn;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = theme.smallButtonShadowOut;
                  }}
                >
                  Configuración
                </button>

                <LogoutButton />
              </div>
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