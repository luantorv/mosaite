import { useTheme } from "../../context/ThemeContext";

function LibroDiarioBuscar() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h3 style={{ color: theme.textColor }}>Buscar Libros Diarios</h3>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Interfaz para buscar y consultar libros diarios existentes.
      </p>
    </div>
  );
}

export default LibroDiarioBuscar;