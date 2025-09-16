import { useTheme } from "../../context/ThemeContext";

function TransaccionBuscar() {
  const { theme } = useTheme();
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Buscar Transacciones</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Interfaz de búsqueda y filtros para transacciones.
      </p>
    </div>
  );
}

export default TransaccionBuscar;