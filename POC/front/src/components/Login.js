import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Mosaite - Login";
  }, []);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('')

    // Simulación de delay de autenticación
    setTimeout(() => {
      try {
        // Validación básica para el POC
        if (!email || !password) {
          setError('Por favor, completa todos los campos');
          setLoading(false);
          return;
        }

        // Simular autenticación exitosa - siempre acepta cualquier credencial
        const userData = {
          email: email,
          name: email.split('@')[0], // Usar la parte antes del @ como nombre
          // Agregar datos adicionales del "usuario" para mostrar en el header
          company: 'Empresa Demo',
          role: 'Administrador'
        };

        const result = login(userData); // Pasar los datos del usuario al context

        if (result && result.success) {
          navigate('/');
        } else {
          setError('Error al iniciar sesión');
        }
      } catch {
        setError('Error inesperado al iniciar sesión');
      } finally {
        setLoading(false);
      }
    }, 1000); // Simular delay de red
  }

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: theme.background }}
    >
      <div 
        className="card p-4"
        style={{
          height:'95%',
          width: '100%',
          maxWidth: '400px',
          background: theme.background,
          borderRadius: '20px',
          boxShadow: theme.cardShadowOut,
          border: 'none'
        }}
      >
        <div className="card-body">
          <img src={logo} alt="Mosaite" style={{ width:'100%'}}></img>
          
          {/* Mensaje informativo para el POC */}
          <div className="alert alert-info mt-3" style={{ fontSize: '0.85rem' }}>
            <strong>POC:</strong> Ingresa cualquier email y contraseña para acceder
          </div>
          
          <div style={{ height: '50px'}}>
            {error && (
              <div className="alert alert-danger d-flex justify-content-center align-items-center" role="alert" style={{ width: '100%', height:'50px'}}>
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label 
                htmlFor="email" 
                className="form-label"
                style={{ color: theme.text }}
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="usuario@empresa.com"
                style={{
                  background: theme.background,
                  color: theme.text,
                  border: `2px solid ${theme.border}`,
                  borderRadius: '10px',
                  boxShadow: theme.cardShadowIn,
                }}
              />
            </div>

            <div className="mb-3">
              <label 
                htmlFor="password" 
                className="form-label"
                style={{ color: theme.text }}
              >
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Cualquier contraseña"
                style={{
                  background: theme.background,
                  color: theme.text,
                  border: `2px solid ${theme.border}`,
                  borderRadius: '10px',
                  boxShadow: theme.cardShadowIn,
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 mt-3"
              disabled={loading}
              style={{
                background: theme.primaryColor,
                color: theme.textColor,
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontWeight: '600',
                boxShadow: theme.buttonShadow,
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 8px 25px rgba(0,0,0,0.2)`;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = theme.buttonShadow;
              }}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;