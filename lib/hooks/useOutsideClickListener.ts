import { RefObject, useEffect } from 'react';

const useOutsideClickListener = (
  ref: RefObject<HTMLDivElement>,
  onOutsideClick: () => void,
): void => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideClickListener;
