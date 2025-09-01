import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function SidebarMenu() {
  const { theme } = useTheme();
  
  // JSON de datos del menú
  const menuData = {
    "Compra": ["Nueva Compra", "Historial Compras", "Proveedores"],
    "Venta": ["Nueva Venta", "Historial Ventas", "Clientes"],
    "Estadísticas": ["Ventas del Mes", "Productos Top", "Reportes"]
  };

  // Estado para controlar qué menú está abierto (solo uno a la vez)
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuKey) => {
    setOpenMenu(prev => prev === menuKey ? null : menuKey);
  };

  const handleOptionClick = (mainCategory, option) => {
    console.log(`Seleccionado: ${mainCategory} -> ${option}`);
    // Aquí irá la funcionalidad específica después
  };

  return (
    <div style={{ padding: "20px 0" }}>
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
            <span>{mainCategory}</span>
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
                background: theme.separatorGradient,
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
                    color: theme.textColorSecondary,
                    fontSize: "13px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    marginBottom: "4px",
                    transition: "all 0.2s ease",
                    opacity: openMenu === mainCategory ? 1 : 0,
                    transform: openMenu === mainCategory ? "translateY(0)" : "translateY(-10px)",
                    transitionDelay: openMenu === mainCategory ? `${index * 50}ms` : "0ms",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = theme.hoverBackground;
                    e.target.style.transform = "translateY(0) translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0) translateX(0)";
                  }}
                >
                  • {option || `Opción ${index + 1}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarMenu;