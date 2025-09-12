import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// Componentes de paneles individuales
function DashboardHome() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <div>
      <h2 style={{ color: theme.textColor, marginBottom: "20px" }}>
        ¡Bienvenido, {user?.name}!
      </h2>
      <div className="row">
        <div className="col-md-6">
          <div style={{ 
            background: theme.background,
            borderRadius: "10px",
            boxShadow: theme.cardShadowOut,
            padding: "20px",
            marginBottom: "20px"
          }}>
            <h5 style={{ color: theme.textColor }}>Resumen Rápido</h5>
            <p style={{ color: theme.textColorSecondary }}>
              Sistema contable - Proof of Concept
            </p>
            <ul style={{ color: theme.textColorSecondary }}>
              <li>Empresa: {user?.company}</li>
              <li>Rol: {user?.role}</li>
              <li>Email: {user?.email}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ 
            background: theme.background,
            borderRadius: "10px",
            boxShadow: theme.cardShadowOut,
            padding: "20px",
            marginBottom: "20px"
          }}>
            <h5 style={{ color: theme.textColor }}>Accesos Rápidos</h5>
            <p style={{ color: theme.textColorSecondary }}>
              Utiliza el menú lateral para navegar por las diferentes funcionalidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;