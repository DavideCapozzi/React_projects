export const storageService = {
  saveData: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
      return false;
    }
  },
  
  loadData: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Errore nel caricamento:", error);
      return null;
    }
  },
  
  exportData: () => {
    try {
      const allData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
      }
      
      const blob = new Blob([JSON.stringify(allData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().split('T')[0];
      
      return { url, filename: `backup-calendar-${timestamp}.json` };
    } catch (error) {
      console.error("Errore nell'export:", error);
      return null;
    }
  },
  
  importData: (fileContent) => {
    try {
      const data = JSON.parse(fileContent);
      
      // Pulisci tutto e ricarica i nuovi dati
      localStorage.clear();
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });
      
      return true;
    } catch (error) {
      console.error("Errore nell'import:", error);
      return false;
    }
  }
};