import api from './api';

const UserService = {
  // Obtener todos los usuarios
  getUsers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.status !== undefined) params.append('status', filters.status);
      if (filters.rol !== undefined) params.append('rol', filters.rol);
      if (filters.group) params.append('group', filters.group);

      const response = await api.get(`/users/?${params.toString()}`);
      return {
        success: true,
        users: response.data.results || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener usuarios',
      };
    }
  },

  // Obtener un usuario por ID
  getUser: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/`);
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener usuario',
      };
    }
  },

  // Crear usuario
  createUser: async (userData) => {
    try {
      const response = await api.post('/users/', userData);
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al crear usuario',
      };
    }
  },

  // Actualizar usuario
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/users/${userId}/`, userData);
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al actualizar usuario',
      };
    }
  },

  // Eliminar usuario
  deleteUser: async (userId) => {
    try {
      await api.delete(`/users/${userId}/`);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al eliminar usuario',
      };
    }
  },

  // Cambiar estado del usuario (activo/inactivo)
  toggleUserStatus: async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      const response = await api.patch(`/users/${userId}/`, {
        status: newStatus,
      });
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al cambiar estado',
      };
    }
  },
};

export default UserService;