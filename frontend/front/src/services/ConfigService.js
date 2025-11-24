import api from './api';

const ConfigService = {
  // Obtener configuración actual
  getCurrentConfig: async () => {
    try {
      const response = await api.get('/config/current/');
      return {
        success: true,
        config: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener configuración',
      };
    }
  },

  // Obtener nombres de roles según el modo
  getRoleNames: async () => {
    try {
      const response = await api.get('/config/role_names/');
      return {
        success: true,
        roles: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener roles',
      };
    }
  },

  // Actualizar configuración
  updateConfig: async (configId, configData) => {
    try {
      const response = await api.patch(`/config/${configId}/`, configData);
      return {
        success: true,
        config: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al actualizar configuración',
      };
    }
  },
};

export default ConfigService;