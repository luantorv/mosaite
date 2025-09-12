import { useTheme } from "../../context/ThemeContext";

function LibroDiarioCrear() {
  const { theme } = useTheme();

  return (
    <div>
      <h3 style={{ color: theme.textColor }}>Crear Libro Diario</h3>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Funcionalidad para crear nuevos libros diarios.
      </p>
    </div>
  );
}

export default LibroDiarioCrear;