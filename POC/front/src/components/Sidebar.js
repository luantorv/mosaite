import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import SidebarMenu from "./SidebarMenu";
import { useTheme } from "../context/ThemeContext";

function Sidebar({ onPanelChange, activePanel }) {
  const { theme } = useTheme();
  const [closeMenuTrigger, setCloseMenuTrigger] = useState(0);

  const handleLogoClick = () => {
    // Trigger para cerrar el menú
    setCloseMenuTrigger(prev => prev + 1);
    // Cambiar al Dashboard
    onPanelChange && onPanelChange("Dashboard", "");
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "250px",
        height: "100vh",
        background: theme.background,
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        transition: "transform 0.3s ease",
        zIndex: 1000,
      }}
    >
      {/* Contenedor con efecto neumórfico para el sidebar */}
      <div
        style={{
          background: theme.background,
          borderRadius: "20px",
          boxShadow: theme.cardShadowOut,
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo container - ahora clickeable */}
        <div
          className="mb-4 d-flex justify-content-center"
          onClick={handleLogoClick}
          style={{
            width: "100%",
            padding: "10px 10px 20px 10px",
            marginTop: "10px",
            cursor: "pointer",
            transition: "transform 0.2s ease, opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Menú con scroll si es necesario */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <SidebarMenu 
            onPanelChange={onPanelChange} 
            activePanel={activePanel}
            closeMenuTrigger={closeMenuTrigger}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;