import { useTheme } from "../../context/ThemeContext";

function UsuariosLista() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Lista de Usuarios</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Gestión y visualización de usuarios del sistema.
      </p>
    </div>
  );
}

export default UsuariosLista;