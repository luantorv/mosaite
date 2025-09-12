import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function SidebarMenu({ onPanelChange, activePanel }) {
  const { theme } = useTheme();
  
  // Tu menuData para el sistema contable
  const menuData = {
    "Transacciones" : ["Crear", "Recientes", "Buscar"],
    "Libros Diarios" : ["Crear","Recientes","Buscar"],
    "Cuentas" : ["Crear"],
    "Usuarios" : ["Ver todos"],
    "Estadísticas": ["Panel"]
  };

  // Estado para controlar qué menú está abierto (solo uno a la vez)
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuKey) => {
    setOpenMenu(prev => prev === menuKey ? null : menuKey);
  };

  const handleOptionClick = (mainCategory, option) => {
    console.log(`Seleccionado: ${mainCategory} -> ${option}`);
    // Llamar a la función del Dashboard para cambiar el panel
    if (onPanelChange) {
      onPanelChange(mainCategory, option);
    }
  };

  // Función para verificar si una opción está activa
  const isOptionActive = (mainCategory, option) => {
    return activePanel === `${mainCategory}-${option}`;
  };

  return (
    <div style={{ padding: "20px 10px" }}>
      {/* Botón Dashboard/Inicio */}
      <div 
        style={{ 
          marginBottom: "16px",
          background: activePanel === "Dashboard" ? theme.primaryColor : theme.background,
          borderRadius: "12px",
          boxShadow: theme.smallButtonShadowOut,
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
        onClick={() => onPanelChange && onPanelChange("Dashboard", "")}
      >
        <div
          style={{
            padding: "12px 16px",
            color: activePanel === "Dashboard" ? "white" : theme.textColor,
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <span>Dashboard</span>
        </div>
      </div>

      {/* Menús dinámicos */}
      {Object.entries(menuData).map(([mainCategory, options]) => (
        <div 
          key={mainCategory} 
          style={{ 
            marginBottom: "12px",
            background: theme.background,
            borderRadius: "12px",
            boxShadow: theme.smallButtonShadowOut,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {/* Header del menú (siempre visible) */}
          <button
            className="btn w-100"
            onClick={() => toggleMenu(mainCategory)}
            style={{
              background: "transparent",
              border: "none",
              padding: "12px 16px",
              color: theme.textColor,
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "left",
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "0",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.hoverBackground;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>{getMenuIcon(mainCategory)}</span>
              <span>{mainCategory}</span>
            </span>
            <span
              style={{
                transform: openMenu === mainCategory ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                fontSize: "12px",
              }}
            >
              ▼
            </span>
          </button>

          {/* Contenido expandible dentro de la misma tarjeta */}
          <div
            style={{
              maxHeight: openMenu === mainCategory ? "200px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            {/* Separador visual */}
            <div 
              style={{
                height: "1px",
                background: theme.separatorGradient || "linear-gradient(90deg, transparent, #d0d7e3, transparent)",
                margin: "0 16px 8px 16px",
                opacity: openMenu === mainCategory ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
            
            {/* Lista de opciones */}
            <div style={{ padding: "0 16px 12px 16px" }}>
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(mainCategory, option)}
                  style={{
                    padding: "8px 12px",
                    color: isOptionActive(mainCategory, option) 
                      ? theme.primaryColor 
                      : theme.textColorSecondary || theme.textColor,
                    fontSize: "13px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    marginBottom: "4px",
                    background: isOptionActive(mainCategory, option) 
                      ? `${theme.primaryColor}15` 
                      : "transparent",
                    fontWeight: isOptionActive(mainCategory, option) ? "600" : "normal",
                    transition: "all 0.2s ease",
                    opacity: openMenu === mainCategory ? 1 : 0,
                    transform: openMenu === mainCategory ? "translateY(0)" : "translateY(-10px)",
                    transitionDelay: openMenu === mainCategory ? `${index * 50}ms` : "0ms",
                  }}
                  onMouseEnter={(e) => {
                    if (!isOptionActive(mainCategory, option)) {
                      e.target.style.background = theme.hoverBackground || "rgba(0,0,0,0.05)";
                    }
                    e.target.style.transform = "translateY(0) translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isOptionActive(mainCategory, option)) {
                      e.target.style.background = "transparent";
                    } else {
                      e.target.style.background = `${theme.primaryColor}15`;
                    }
                    e.target.style.transform = "translateY(0) translateX(0)";
                  }}
                >
                  • {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Función helper para obtener iconos según la categoría
function getMenuIcon(category) {
  const icons = {
    "Transacciones": "",
    "Libros Diarios": "",
    "Cuentas": "",
    "Usuarios": "",
    "Estadísticas": ""
  };
  return icons[category] || "";
}

export default SidebarMenu;