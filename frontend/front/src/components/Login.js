function Login() {
  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card p-5">
        <h2 className="login-title text-center mb-4">Mosaite</h2>
        <h4>Iniciar sesión</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input type="email" className="form-control neumorphic-input" />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control neumorphic-input" />
          </div>
          <button type="submit" className="btn btn-primary w-100 neumorphic-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login