import { useCallback } from "react";

function useDebouncer(callback, delay: number) {
  let timeoutId: undefined | NodeJS.Timeout;
  const debounced = useCallback(function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  }, []);

  return debounced;
}

export default useDebouncer;
