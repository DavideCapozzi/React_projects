import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = storageService.loadData(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    storageService.saveData(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useStorage;