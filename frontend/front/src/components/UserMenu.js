import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
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
            fontSize: "18px",
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
          👤
        </button>

        {/* Menú flotante del usuario */}
        {isUserMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "0",
              width: "220px",
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
                <strong>Usuario Demo</strong>
                <div style={{ fontSize: "12px", color: theme.textColorMuted }}>
                  usuario@ejemplo.com
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
                
                <button
                  className="btn"
                  onClick={closeUserMenu}
                  style={{
                    background: theme.background,
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: theme.smallButtonShadowOut,
                    color: "#d73027",
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    marginTop: "5px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = theme.smallButtonShadowIn;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = theme.smallButtonShadowOut;
                  }}
                >
                  Cerrar Sesión
                </button>
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