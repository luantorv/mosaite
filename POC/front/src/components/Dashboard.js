import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import Content from "./Content/index";
import { useTheme } from "../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  useEffect(() => {
    document.title = "Mosaite - Dashboard";
  }, []);

  const [isOpen, setIsOpen] = useState(true);
  // Estado para manejar qué panel está activo
  const [activePanel, setActivePanel] = useState("Dashboard"); // Panel por defecto

  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Función para cambiar el panel activo
  const handlePanelChange = (mainCategory, option) => {
    const panelKey = `${mainCategory}-${option}`;
    setActivePanel(panelKey);
    console.log(`Panel activo: ${panelKey}`);
  };

  return (
    <div 
      className="d-flex" 
      style={{ 
        height: "100vh", 
        background: theme.background,
        position: "relative",
        transition: "background 0.3s ease"
      }}
    >
      {/* Sidebar con animación */}
      <div
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          width: "250px",
          flexShrink: 0,
        }}
      >
        <Sidebar onPanelChange={handlePanelChange} activePanel={activePanel} />
      </div>

      {/* Contenido principal */}
      <div
        className="flex-grow-1"
        style={{
          background: theme.background,
          padding: "20px",
          marginLeft: isOpen ? "0" : "-250px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Dashboard card principal */}
        <div
          className="h-100"
          style={{
            background: theme.background,
            borderRadius: "25px",
            boxShadow: theme.cardShadowOut,
            position: "relative",
            padding: "20px",
          }}
        >
          {/* Bootstrap Grid Container */}
          <div className="container-fluid h-100">
            {/* Fila superior con botón sidebar y theme toggle */}
            <div className="row">
              {/* Columna izquierda - Botón Sidebar */}
              <div className="col-auto">
                <button
                  className="btn"
                  onClick={toggleSidebar}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "10px",
                    background: theme.background,
                    boxShadow: theme.cardShadowOut,
                    transition: "all 0.3s ease",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: theme.textColor,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = theme.cardShadowOut
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = theme.cardShadowOut
                  }}
                >
                  {isOpen ? "←" : "→"}
                </button>
              </div>

              {/* Columna central - SearchBar */}
              <div className="col">
                <div className="d-flex justify-content-center">
                  <SearchBar />
                </div>
              </div>

              {/* Columna Theme Toggle */}
              <div className="col-auto align-content-center" style={{ position: "relative"}}>
                <ThemeToggle />
              </div>

              {/* Columna derecha - User Menu */}
              <div className="col-auto">
                  <UserMenu />
              </div>
            </div>
            {/* Segunda Fila - Contenido dinámico */}
            <div className="row flex-grow-1" style={{ height: "calc(100% - 80px)" }}>
              {/* Única columna para contenido */}
              <div className="col">
                <Content activePanel={activePanel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;