import { useState } from 'react';

type UseLocalStorageReturn = {
  value: string,
  updateValue: (newValue: string) => void
};

function useLocalStorage(key: string, initialValue: string): UseLocalStorageReturn {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(storedValue || initialValue);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return { value, updateValue };
}

export default useLocalStorage;
