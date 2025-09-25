'use client'
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PixelRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    // Skip the initial page load
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    // Function to handle the page view event on route changes
    const handleRouteChange = () => {
      // Check if the fbq function exists before calling it
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'PageView');
      }
    };

    // Track page view only on route changes (not initial load)
    handleRouteChange();
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
};

export default PixelRouter;