import { useRef, useEffect } from 'react';

export const useForwardedRef = (ref: React.ForwardedRef<any>) => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
};
