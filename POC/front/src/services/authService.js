import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/auth';

// Configurar axios para incluir cookies en las requests
axios.defaults.withCredentials = true;

// Obtener token CSRF antes de hacer requests que lo requieran
const getCSRFToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/csrf/`);
    const token = response.data.csrfToken;
    // Configurar el token CSRF en los headers por defecto
    axios.defaults.headers.common['X-CSRFToken'] = token;
    return token;
  } catch (error) {
    console.error('Error obteniendo token CSRF:', error);
    throw error;
  }
};

export const authAPI = {
  // Inicializar CSRF token
  async initializeCSRF() {
    return await getCSRFToken();
  },

  // Login
  async login(email, password) {
    try {
      // Asegurar que tenemos el token CSRF
      const csrfToken = await getCSRFToken();
      console.log('CSRF Token obtenido:', csrfToken);
      
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        email,
        password
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Response data:', error.response?.data);
      console.error('Headers enviados:', error.config?.headers);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      const csrfToken = getCSRFTokenFromCookie() || await getCSRFToken();
      const response = await axios.post(`${API_BASE_URL}/logout/`, {}, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  },

  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_BASE_URL}/me/`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      throw error;
    }
  }
};

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Usuario no autenticado, redirigir al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);