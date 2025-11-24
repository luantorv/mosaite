import api from './api';

const transactionService = {
  // Obtener todas las transacciones
  getTransactions: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.status !== undefined) params.append('status', filters.status);
      if (filters.user) params.append('user', filters.user);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/trans/?${params.toString()}`);
      return {
        success: true,
        transactions: response.data.results || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener transacciones',
      };
    }
  },

  // Obtener transacciones recientes
  getRecentTransactions: async (limit = 10) => {
    try {
      const response = await api.get(`/trans/recent/?limit=${limit}`);
      return {
        success: true,
        transactions: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener transacciones recientes',
      };
    }
  },

  // Obtener una transacción específica
  getTransaction: async (transactionId) => {
    try {
      const response = await api.get(`/trans/${transactionId}/`);
      return {
        success: true,
        transaction: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener transacción',
      };
    }
  },

  // Crear transacción
  createTransaction: async (transactionData) => {
    try {
      const response = await api.post('/trans/', transactionData);
      return {
        success: true,
        transaction: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al crear transacción',
      };
    }
  },

  // Actualizar transacción
  updateTransaction: async (transactionId, transactionData) => {
    try {
      const response = await api.patch(`/trans/${transactionId}/`, transactionData);
      return {
        success: true,
        transaction: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al actualizar transacción',
      };
    }
  },

  // Eliminar transacción
  deleteTransaction: async (transactionId) => {
    try {
      await api.delete(`/trans/${transactionId}/`);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al eliminar transacción',
      };
    }
  },

  // Toggle estado de transacción (borrador/completada)
  toggleTransactionStatus: async (transactionId) => {
    try {
      const response = await api.post(`/trans/${transactionId}/toggle_status/`);
      return {
        success: true,
        transaction: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al cambiar estado',
      };
    }
  },
};

export default transactionService;