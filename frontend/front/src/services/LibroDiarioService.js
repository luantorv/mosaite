import api from './api';

const libroDiarioService = {
  // Obtener los libros diarios (opcionalmente filtrados por rango de fechas)
  getLedgers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);

      const response = await api.get(`/daily/?${params.toString()}`);
      return {
        success: true,
        ledgers: response.data.results || response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener los libros diarios',
      };
    }
  },

  // Previsualizar las transacciones que entrarían en el libro diario de una fecha
  previewLedger: async (date) => {
    try {
      const response = await api.get(`/daily/preview/?date=${date}`);
      return {
        success: true,
        preview: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.detail ||
          'Error al previsualizar el libro diario',
      };
    }
  },

  // Generar (crear y almacenar) el libro diario de una fecha
  createLedger: async (date) => {
    try {
      const response = await api.post('/daily/', { date });
      return {
        success: true,
        ledger: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.detail ||
          'Error al generar el libro diario',
      };
    }
  },

  // Descargar el PDF de un libro diario y disparar la descarga en el navegador
  downloadLedger: async (ledger) => {
    try {
      const response = await api.get(`/daily/${ledger.ledger_id}/download/`, {
        responseType: 'blob',
      });

      const filename = ledger.pdf_filename || `libro_diario_${ledger.date}.pdf`;
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al descargar el libro diario',
      };
    }
  },

  // Eliminar un libro diario (reabre sus transacciones a "verificado")
  deleteLedger: async (ledgerId) => {
    try {
      await api.delete(`/daily/${ledgerId}/`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al eliminar el libro diario',
      };
    }
  },
};

export default libroDiarioService;
