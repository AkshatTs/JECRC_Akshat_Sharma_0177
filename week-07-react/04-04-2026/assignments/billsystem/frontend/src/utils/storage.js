// Local Storage management utilities

const STORAGE_KEYS = {
  BILLS: 'bills',
  CATALOGS: 'catalogs',
  DRAFTS: 'drafts',
  SETTINGS: 'settings',
};

export const storageUtils = {
  // Bills
  getBills: () => {
    try {
      const bills = localStorage.getItem(STORAGE_KEYS.BILLS);
      return bills ? JSON.parse(bills) : [];
    } catch (error) {
      console.error('Error retrieving bills:', error);
      return [];
    }
  },

  saveBills: (bills) => {
    try {
      localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills));
      return true;
    } catch (error) {
      console.error('Error saving bills:', error);
      return false;
    }
  },

  addBill: (bill) => {
    const bills = storageUtils.getBills();
    bills.push(bill);
    return storageUtils.saveBills(bills);
  },

  deleteBill: (billId) => {
    const bills = storageUtils.getBills();
    const filtered = bills.filter(b => b.id !== billId);
    return storageUtils.saveBills(filtered);
  },

  searchBills: (term) => {
    const bills = storageUtils.getBills();
    return bills.filter(b => b.id.toLowerCase().includes(term.toLowerCase()));
  },

  getBillsByDateRange: (startDate, endDate) => {
    const bills = storageUtils.getBills();
    return bills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate >= startDate && billDate <= endDate;
    });
  },

  // Catalogs
  getCatalogs: () => {
    try {
      const catalogs = localStorage.getItem(STORAGE_KEYS.CATALOGS);
      return catalogs ? JSON.parse(catalogs) : null;
    } catch (error) {
      console.error('Error retrieving catalogs:', error);
      return null;
    }
  },

  saveCatalogs: (catalogs) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOGS, JSON.stringify(catalogs));
      return true;
    } catch (error) {
      console.error('Error saving catalogs:', error);
      return false;
    }
  },

  // Drafts
  getDrafts: () => {
    try {
      const drafts = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error('Error retrieving drafts:', error);
      return [];
    }
  },

  saveDraft: (draft) => {
    try {
      const drafts = storageUtils.getDrafts();
      drafts.push(draft);
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      return false;
    }
  },

  deleteDraft: (draftId) => {
    try {
      const drafts = storageUtils.getDrafts();
      const filtered = drafts.filter(d => d.id !== draftId);
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting draft:', error);
      return false;
    }
  },

  // Export data
  exportAllData: () => {
    return {
      bills: storageUtils.getBills(),
      catalogs: storageUtils.getCatalogs(),
      drafts: storageUtils.getDrafts(),
      exportedAt: new Date().toISOString(),
    };
  },

  // Clear all data
  clearAllData: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },

  // Get storage stats
  getStorageStats: () => {
    const bills = storageUtils.getBills();
    const drafts = storageUtils.getDrafts();
    
    return {
      totalBills: bills.length,
      totalRevenue: bills.reduce((sum, b) => sum + b.total, 0),
      totalDrafts: drafts.length,
      storageUsed: JSON.stringify(localStorage).length,
    };
  },
};

export default storageUtils;
