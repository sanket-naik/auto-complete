import { useEffect } from "react";

/**
 * Hook that alerts click events that are outside of the curent passed ref
 */
function useOutsideAlerter(ref: any, callback: () => void) {
  useEffect(() => {
    /**
     * JS registers this event to call on event fire
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Add new event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}

export default useOutsideAlerter;
