import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function LogoutButton({ className = '', style = {} }) {
  const [loading, setLoading] = useState(false);
  const { logout, user } = useAuth();
  const { theme } = useTheme();

  const handleLogout = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const result = await logout();
      if (!result.success) {
        console.error('Error al cerrar sesión:', result.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      {user && (
        <span 
          className="me-3 text-sm"
          style={{ color: theme.text }}
        >
          {user.first_name || user.username} ({user.role})
        </span>
      )}
      
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`btn ${className}`}
        style={{
          width: '100%',
          background: theme.background,
          color: '#d73027',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: theme.smallButtonShadowOut,
          transition: 'all 0.2s ease',
          marginTop: '5px',
          textAlign: 'left',
          fontSize: '13px',
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
            <span className="spinner-border spinner-border-sm me-1" role="status"></span>
            Saliendo...
          </span>
        ) : (
          'Cerrar Sesión'
        )}
      </button>
    </div>
  );
}

export default LogoutButton;