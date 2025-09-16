import { useTheme } from "../../context/ThemeContext";

function LibroDiarioCrear() {
  const { theme } = useTheme();

  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Crear Libro Diario</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Funcionalidad para crear nuevos libros diarios.
      </p>
    </div>
  );
}

export default LibroDiarioCrear;