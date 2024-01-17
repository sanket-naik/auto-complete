/* Custom hook used to debounce a function */
import { useEffect, useRef } from "react";

const useDebounce = (
  callbackFunc: (searchQuery: string) => void,
  timeout: number
) => {
  const timeoutRef = useRef(null) as any;

  /* clear the existing instance while the component is about to be distroyed or closed */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /* Clear existing timeout from the memory if available & set a new timeout */
  const debouncedCallback = (searchQuery: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackFunc(searchQuery);
    }, timeout);
  };

  return debouncedCallback;
};

export default useDebounce;
