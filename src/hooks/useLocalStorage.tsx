import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLocalStorage(key: string, initialValue: any) {

  // It should try to retrieve the value from localStorage using the provided key.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // read from local storage
      const value = localStorage.getItem(key);

      // If a value exists in localStorage, it should be parsed (assume JSON) and used as the initial state.
      if (value) {
        return JSON.parse(value);
      } else {
        // If no value exists or if parsing fails, initialValue should be used.
        return initialValue;
      }

    } catch (error) {
      // handle Errors
      console.error(error);
      return initialValue;
    }
  });

  // When the state or the key changes the useEffect run again.
  useEffect(() => {
    try {
        localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
        console.error(error);
    }
  }, [storedValue, key]);


  return [storedValue, setStoredValue];
}

export default useLocalStorage;