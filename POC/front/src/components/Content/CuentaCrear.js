import { useTheme } from "../../context/ThemeContext";

function CuentaCrear() {
  const { theme } = useTheme();
  
  return (
    <div>
      <h4 style={{ color: theme.textColor }}>Crear Nueva Cuenta</h4>
      <p style={{ color: theme.textColorSecondary }}>
        [POC] Formulario para crear nuevas cuentas contables.
      </p>
    </div>
  );
}

export default CuentaCrear;