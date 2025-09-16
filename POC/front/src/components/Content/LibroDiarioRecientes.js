import { useTheme } from "../../context/ThemeContext";

function LibroDiarioRecientes() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Libros Diarios Recientes</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Lista de libros diarios creados recientemente.
      </p>
    </div>
  );
}

export default LibroDiarioRecientes