import api from './api';

const dashboardService = {
  // Obtener estadísticas del dashboard
  getStats: async () => {
    try {
      const response = await api.get('/dash/stats/');
      return {
        success: true,
        stats: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener estadísticas del dashboard',
      };
    }
  },
};

export default dashboardService;