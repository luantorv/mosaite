import api from './api';

const accountService = {
  // Obtener todas las cuentas
  getAccounts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.status !== undefined) params.append('status', filters.status);
      if (filters.nature !== undefined) params.append('nature', filters.nature);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/accounts/?${params.toString()}`);
      return {
        success: true,
        accounts: response.data.results || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener cuentas',
      };
    }
  },

  // Obtener solo cuentas activas
  getActiveAccounts: async () => {
    try {
      const response = await api.get('/accounts/active/');
      return {
        success: true,
        accounts: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener cuentas activas',
      };
    }
  },

  // Obtener una cuenta específica
  getAccount: async (accountId) => {
    try {
      const response = await api.get(`/accounts/${accountId}/`);
      return {
        success: true,
        account: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener cuenta',
      };
    }
  },

  // Crear cuenta
  createAccount: async (accountData) => {
    try {
      const response = await api.post('/accounts/', accountData);
      return {
        success: true,
        account: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al crear cuenta',
      };
    }
  },

  // Actualizar cuenta
  updateAccount: async (accountId, accountData) => {
    try {
      const response = await api.patch(`/accounts/${accountId}/`, accountData);
      return {
        success: true,
        account: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al actualizar cuenta',
      };
    }
  },

  // Eliminar cuenta
  deleteAccount: async (accountId) => {
    try {
      await api.delete(`/accounts/${accountId}/`);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al eliminar cuenta',
      };
    }
  },

  // Cambiar estado de cuenta
  toggleAccountStatus: async (accountId, currentStatus) => {
    try {
      const response = await api.patch(`/accounts/${accountId}/`, {
        status: !currentStatus,
      });
      return {
        success: true,
        account: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Error al cambiar estado',
      };
    }
  },
};

export default accountService;