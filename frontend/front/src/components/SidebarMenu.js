import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function SidebarMenu({ onPanelChange, activePanel, closeMenuTrigger }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  // Estado para controlar qué menú está abierto (solo uno a la vez)
  const [openMenu, setOpenMenu] = useState(null);

  // Cerrar el menú cuando se cambie la propiedad closeMenuTrigger
  useEffect(() => {
    setOpenMenu(null);
  }, [closeMenuTrigger]);

  // Función para obtener el menú filtrado según el rol del usuario
  const getFilteredMenuData = () => {
    const userRole = user?.rol ?? 4; // Por defecto rol 4 (menor acceso)

    const baseMenu = {
      "Transacciones": ["Recientes", "Buscar"],
      "Libros Diarios": ["Recientes"],
      "Plan de Cuentas": null,
      "Ayuda": null
    };

    // Agregar "Crear" a Transacciones si rol NO es 4 (Viewer)
    if (userRole !== 4) {
      baseMenu["Transacciones"].unshift("Crear");
    }

    // Agregar "Crear" a Libros Diarios si rol es 0 (Admin) o 2 (Accountant)
    if (userRole === 0 || userRole === 2) {
      baseMenu["Libros Diarios"].unshift("Crear");
    }

    // Agregar "Usuarios" si rol es 0 (Admin) o 1 (Manager)
    if (userRole === 0 || userRole === 1) {
      baseMenu["Usuarios"] = null;
    }

    // Agregar "Configuración" solo si rol es 0 (Admin)
    if (userRole === 0) {
      baseMenu["Configuración"] = null;
    }

    return baseMenu;
  };

  const toggleMenu = (menuKey) => {
    // Si el menú que se va a abrir es diferente al actual, cierra el anterior
    if (openMenu !== menuKey) {
      setOpenMenu(menuKey);
    } else {
      setOpenMenu(null);
    }
  };

  const handleOptionClick = (mainCategory, option) => {
    console.log(`Seleccionado: ${mainCategory} -> ${option}`);
    // No cerrar el menú, solo cambiar el panel
    if (onPanelChange) {
      onPanelChange(mainCategory, option);
    }
  };

  // Función para verificar si una opción está activa
  const isOptionActive = (mainCategory, option) => {
    return activePanel === `${mainCategory}-${option}`;
  };

  // Función para verificar si un menú directo está activo
  const isDirectMenuActive = (mainCategory) => {
    return activePanel === mainCategory;
  };

  // Obtener el menú filtrado según el rol
  const menuData = getFilteredMenuData();

  return (
    <div style={{ padding: "20px 10px" }}>
      {/* Menús dinámicos */}
      {Object.entries(menuData).map(([mainCategory, options]) => {
        // Si options es null, renderizar como botón directo
        if (options === null) {
          return (
            <div 
              key={mainCategory}
              style={{ 
                marginBottom: "12px",
                background: isDirectMenuActive(mainCategory) ? theme.primaryColor : theme.background,
                borderRadius: "12px",
                boxShadow: theme.smallButtonShadowOut,
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onClick={() => {
                console.log('Click en menú directo:', mainCategory);
                // Cierra el menú abierto al hacer click en otra categoría
                setOpenMenu(null);
                if (onPanelChange) {
                  onPanelChange(mainCategory, "");
                }
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  color: isDirectMenuActive(mainCategory) ? "white" : theme.textColor,
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  if (!isDirectMenuActive(mainCategory)) {
                    e.currentTarget.parentElement.style.background = theme.hoverBackground || "rgba(0,0,0,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDirectMenuActive(mainCategory)) {
                    e.currentTarget.parentElement.style.background = theme.background;
                  }
                }}
              >
                <span>{getMenuIcon(mainCategory)}</span>
                <span>{mainCategory}</span>
              </div>
            </div>
          );
        }

        // Si options tiene valores, renderizar como menú desplegable
        return (
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
        );
      })}
    </div>
  );
}

// Función helper para obtener iconos según la categoría
function getMenuIcon(category) {
  const icons = {
    "Transacciones": "",
    "Libros Diarios": "",
    "Plan de Cuentas": "",
    "Usuarios": "",
    "Configuración": "",
    "Ayuda": ""
  };
  return icons[category] || "";
}

export default SidebarMenu;