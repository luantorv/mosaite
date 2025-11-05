import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ className = '', style = {} }) {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión:', result.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`btn ${className}`}
      style={{
        width: '100%',
        background: theme.background,
        color: '#d73027',
        border: 'none',
        borderRadius: '10px',
        padding: '12px 16px',
        boxShadow: theme.smallButtonShadowOut,
        transition: 'all 0.2s ease',
        fontSize: '14px',
        fontWeight: '600',
        ...style
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = theme.smallButtonShadowIn;
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = theme.smallButtonShadowOut;
      }}
    >
      {loading ? (
        <span>
          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          Cerrando sesión...
        </span>
      ) : (
        'Cerrar Sesión'
      )}
    </button>
  );
}

export default LogoutButton;