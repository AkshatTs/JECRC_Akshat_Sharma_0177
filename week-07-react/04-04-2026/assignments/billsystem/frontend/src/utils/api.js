import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7160/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bill API endpoints
export const billAPI = {
  getAllBills: () => apiClient.get('/bills'),
  getBillById: (id) => apiClient.get(`/bills/${id}`),
  createBill: (bill) => apiClient.post('/bills', bill),
  updateBill: (id, bill) => apiClient.put(`/bills/${id}`, bill),
  deleteBill: (id) => apiClient.delete(`/bills/${id}`),
  searchBills: (invoiceNumber) => apiClient.get(`/bills/search/${invoiceNumber}`),
  getBillsByDateRange: (startDate, endDate) => 
    apiClient.get('/bills/date-range', { 
      params: { startDate, endDate } 
    }),
  getDailySalesReport: (date) => apiClient.get(`/bills/daily-report/${date}`),
  saveDraft: (bill) => apiClient.post('/bills/draft', bill),
  getDrafts: () => apiClient.get('/bills/drafts/all'),
  deleteDraft: (id) => apiClient.delete(`/bills/draft/${id}`),
};

// Catalog API endpoints
export const catalogAPI = {
  getAllCatalogItems: () => apiClient.get('/catalogs'),
  getCatalogItemsByType: (type) => apiClient.get(`/catalogs/type/${type}`),
  getCatalogItemById: (id) => apiClient.get(`/catalogs/${id}`),
  createCatalogItem: (item) => apiClient.post('/catalogs', item),
  updateCatalogItem: (id, item) => apiClient.put(`/catalogs/${id}`, item),
  deleteCatalogItem: (id) => apiClient.delete(`/catalogs/${id}`),
};

export default apiClient;
