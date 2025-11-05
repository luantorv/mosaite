import api from './api';

const AuthService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login/', {
        email,
        password,
      });

      const { access, refresh } = response.data;
      
      // Guardar tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Obtener información del usuario
      const userResponse = await api.get('/users/me/');
      return {
        success: true,
        user: userResponse.data,
        tokens: { access, refresh },
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al iniciar sesión',
      };
    }
  },

  // Logout
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        await api.post('/auth/logout/', {
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Siempre limpiar tokens del localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  // Verificar si hay sesión activa
  checkAuth: async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      return { isAuthenticated: false, user: null };
    }

    try {
      const response = await api.get('/users/me/');
      return {
        isAuthenticated: true,
        user: response.data,
      };
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return { isAuthenticated: false, user: null };
    }
  },

  // Refrescar token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh/', {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem('access_token', access);
      
      return { success: true, access };
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return { success: false, error: error.message };
    }
  },
};

export default AuthService;