export const storageService = {
  saveData: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Errore nel salvataggio dei dati:", error);
      return false;
    }
  },
  
  loadData: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Errore nel caricamento dei dati:", error);
      return null;
    }
  },
  
  clearData: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Errore nella cancellazione dei dati:", error);
      return false;
    }
  }
};