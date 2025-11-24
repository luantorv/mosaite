import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: theme.background }}
      >
        <div className="text-center">
          <div 
            className="spinner-border text-primary mb-3" 
            role="status"
            style={{ width: '3rem', height: '3rem' }}
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p style={{ color: theme.text }}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
}

export default ProtectedRoute;