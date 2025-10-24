import { useTheme } from "../../context/ThemeContext";

function Configuracion() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Panel de Configuracion</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Formulario con campos para la gestion de parámetros.
      </p>
    </div>
  );
}

export default Configuracion;