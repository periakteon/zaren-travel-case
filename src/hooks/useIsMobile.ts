import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth <= 640);
    }

    updateIsMobile();

    const handleResize = () => updateIsMobile();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return isMobile;
}
