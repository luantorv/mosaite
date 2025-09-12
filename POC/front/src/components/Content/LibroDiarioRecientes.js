import { useTheme } from "../../context/ThemeContext";

function LibroDiarioRecientes() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h3 style={{ color: theme.textColor }}>Libros Diarios Recientes</h3>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Lista de libros diarios creados recientemente.
      </p>
    </div>
  );
}

export default LibroDiarioRecientes