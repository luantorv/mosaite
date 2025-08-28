import { useState } from "react";

function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
            background: "#e0e5ec",
            boxShadow: isUserMenuOpen 
              ? "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff"
              : "8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff",
            transition: "all 0.3s ease",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: "#666",
            marginLeft: "10px",
          }}
          onMouseEnter={(e) => {
            if (!isUserMenuOpen) {
              e.target.style.boxShadow = "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff";
            }
          }}
          onMouseLeave={(e) => {
            if (!isUserMenuOpen) {
              e.target.style.boxShadow = "8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff";
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
              background: "#e0e5ec",
              borderRadius: "15px",
              boxShadow: "15px 15px 30px #a3b1c6, -15px -15px 30px #ffffff",
              zIndex: 1000,
              padding: "15px",
              transform: "translateY(0)",
              opacity: 1,
              transition: "all 0.3s ease",
            }}
          >
            {/* Contenido del menú de usuario */}
            <div style={{ color: "#666", fontSize: "14px" }}>
              <div 
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #d0d7e3",
                  marginBottom: "10px"
                }}
              >
                <strong>Usuario Demo</strong>
                <div style={{ fontSize: "12px", color: "#999" }}>
                  usuario@ejemplo.com
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  className="btn"
                  onClick={closeUserMenu}
                  style={{
                    background: "#e0e5ec",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff",
                    color: "#666",
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff";
                  }}
                >
                  Mi Perfil
                </button>
                
                <button
                  className="btn"
                  onClick={closeUserMenu}
                  style={{
                    background: "#e0e5ec",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff",
                    color: "#666",
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff";
                  }}
                >
                  Configuración
                </button>
                
                <button
                  className="btn"
                  onClick={closeUserMenu}
                  style={{
                    background: "#e0e5ec",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff",
                    color: "#d73027",
                    fontSize: "13px",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    marginTop: "5px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff";
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