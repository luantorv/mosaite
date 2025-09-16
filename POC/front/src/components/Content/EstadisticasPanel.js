import { useTheme } from "../../context/ThemeContext";

function EstadisticasPanel() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Panel de Estadísticas</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Dashboard con métricas y estadísticas de la empresa.
      </p>
    </div>
  );
}

export default EstadisticasPanel;