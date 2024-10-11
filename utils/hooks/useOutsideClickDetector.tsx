import { useEffect, useRef } from 'react';

// Custom hook to detect clicks outside an element
export default function useOutsideClickDetector(callback : () => void) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleClick = (event : any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [callback]);

  return ref;
}