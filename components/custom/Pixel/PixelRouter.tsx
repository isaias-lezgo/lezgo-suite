import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PixelRouter = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to handle the page view event
    const handleRouteChange = () => {
      // Check if the fbq function exists before calling it
      // Using 'as any' to bypass TypeScript error
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'PageView');
      }
    };

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null; // This component doesn't render anything
};

export default PixelRouter;