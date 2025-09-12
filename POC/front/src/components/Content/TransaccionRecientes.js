import { useTheme } from "../../context/ThemeContext";

function TransaccionRecientes() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h3 style={{ color: theme.textColor }}>Transacciones Recientes</h3>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Lista de las transacciones más recientes.
      </p>
    </div>
  );
}

export default TransaccionRecientes;