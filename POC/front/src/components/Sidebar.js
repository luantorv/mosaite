import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import SidebarMenu from "./SidebarMenu";
import { useTheme } from "../context/ThemeContext";

function Sidebar({ onPanelChange, activePanel }) {
  const { theme } = useTheme();

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
        {/* Logo container */}
        <div
          className="mb-4 d-flex justify-content-center"
          style={{
            width: "100%",
            padding: "10px 10px 20px 10px",
            marginTop: "10px",
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
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
