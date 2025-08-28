import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  useEffect(() => {
    document.title = "Mosaite - Dashboard";
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="d-flex" 
      style={{ 
        height: "100vh", 
        background: "#e0e5ec",
        position: "relative" 
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
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div
        className="flex-grow-1"
        style={{
          background: "#e0e5ec",
          padding: "20px",
          marginLeft: isOpen ? "0" : "-250px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Dashboard card principal */}
        <div
          className="h-100"
          style={{
            background: "#e0e5ec",
            borderRadius: "25px",
            boxShadow: "15px 15px 30px #a3b1c6, -15px -15px 30px #ffffff",
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
                    background: "#e0e5ec",
                    boxShadow: "8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff",
                    transition: "all 0.3s ease",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: "#666",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff";
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

            <div className="row">
              <div className="col">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
