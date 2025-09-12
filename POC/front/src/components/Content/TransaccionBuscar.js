import { useTheme } from "../../context/ThemeContext";

function TransaccionBuscar() {
  const { theme } = useTheme();
  return (
    <div>
      <h3 style={{ color: theme.textColor }}>Buscar Transacciones</h3>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Interfaz de búsqueda y filtros para transacciones.
      </p>
    </div>
  );
}

export default TransaccionBuscar;