import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación
    console.log('Login:', { email, password });
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: theme.background,
        transition: "background 0.3s ease",
      }}
    >
      <div 
        style={{
          background: theme.background,
          borderRadius: "20px",
          boxShadow: theme.cardShadowOut,
          width: "350px",
          padding: "3rem",
          transition: "all 0.3s ease",
        }}
      >
        {/* Título principal */}
        <img src={logo} alt="Mosaite" width="100%"></img>
        
        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label 
              className="form-label"
              style={{
                color: theme.textColor,
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
            >
              Usuario
            </label>
            <input 
              type="email" 
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: theme.background,
                border: "none",
                borderRadius: "12px",
                boxShadow: theme.cardShadowIn,
                padding: "12px 16px",
                color: theme.textColor,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `${theme.cardShadowIn}, 0 0 0 2px ${theme.name === 'light' ? '#7C9A5D' : '#93B676'}`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = theme.cardShadowIn;
              }}
            />
          </div>
          
          <div className="mb-4">
            <label 
              className="form-label"
              style={{
                color: theme.textColor,
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
            >
              Contraseña
            </label>
            <input 
              type="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: theme.background,
                border: "none",
                borderRadius: "12px",
                boxShadow: theme.cardShadowIn,
                padding: "12px 16px",
                color: theme.textColor,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `${theme.cardShadowIn}, 0 0 0 2px ${theme.name === 'light' ? '#7C9A5D' : '#93B676'}`;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = theme.cardShadowIn;
              }}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn w-100"
            style={{
              background: theme.name === 'light' ? '#7C9A5D' : '#93B676',
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              fontWeight: "600",
              padding: "12px",
              fontSize: "1rem",
              boxShadow: theme.buttonShadowOut,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = "brightness(1.1)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = "brightness(1)";
              e.target.style.transform = "translateY(0)";
            }}
            onMouseDown={(e) => {
              e.target.style.boxShadow = theme.buttonShadowIn;
              e.target.style.transform = "translateY(0)";
            }}
            onMouseUp={(e) => {
              e.target.style.boxShadow = theme.buttonShadowOut;
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;