import { useTheme } from "../../context/ThemeContext";

function UsuariosLista() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h3 style={{ color: theme.textColor }}>Lista de Usuarios</h3>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Gestión y visualización de usuarios del sistema.
      </p>
    </div>
  );
}

export default UsuariosLista;