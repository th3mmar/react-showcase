import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {};

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideClick;
