import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState<T>(() => {
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return initialValue;
  });

  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, updateValue };
}

export default useLocalStorage;
