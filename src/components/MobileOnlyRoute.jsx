// components/MobileOnlyRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function MobileOnlyRoute({ children }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const handleResize = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  if (!isMobile) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default MobileOnlyRoute;