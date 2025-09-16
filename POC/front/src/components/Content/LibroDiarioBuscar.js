import { useTheme } from "../../context/ThemeContext";

function LibroDiarioBuscar() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Buscar Libros Diarios</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Interfaz para buscar y consultar libros diarios existentes.
      </p>
    </div>
  );
}

export default LibroDiarioBuscar;