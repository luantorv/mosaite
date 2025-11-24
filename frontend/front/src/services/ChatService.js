import api from './api';

const ChatService = {
  // Enviar consulta al chat
  query: async (question) => {
    try {
      const response = await api.post('/chat/query/', {
        question: question,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // Si el servicio no está disponible (503)
      if (error.response?.status === 503) {
        return {
          success: false,
          error: error.response.data.error,
          is_rebuilding: error.response.data.is_rebuilding,
          unavailable: true,
        };
      }

      return {
        success: false,
        error: error.response?.data?.error || 'Error al procesar la consulta',
      };
    }
  },

  // Cancelar consulta (para implementación futura de streaming)
  cancelQuery: async (requestId) => {
    try {
      const response = await api.post('/chat/cancel/', {
        request_id: requestId,
      });

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al cancelar la consulta',
      };
    }
  },

  // Obtener estado del servicio
  getStatus: async () => {
    try {
      const response = await api.get('/chat/status/');

      return {
        success: true,
        status: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener estado',
      };
    }
  },

  // Reconstruir índice (solo Admin/Profesor)
  rebuildIndex: async () => {
    try {
      const response = await api.post('/chat/rebuild/', {
        confirm: true,
      });

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      // Si ya está reconstruyendo (409)
      if (error.response?.status === 409) {
        return {
          success: false,
          error: 'Ya hay una reconstrucción en curso',
          is_rebuilding: true,
        };
      }

      return {
        success: false,
        error: error.response?.data?.error || 'Error al reconstruir índice',
      };
    }
  },

  // Obtener historial de consultas
  getHistory: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.user) params.append('user', filters.user);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);

      const response = await api.get(`/chat/history/?${params.toString()}`);

      return {
        success: true,
        history: response.data.results || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener historial',
      };
    }
  },
};

export default ChatService;