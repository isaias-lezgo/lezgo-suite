'use client'
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';

const GtmRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    // GTM's gtm.js fires its Page View only on full document loads. Skip the
    // first render (already covered) and push a page_view to dataLayer on each
    // client-side route change. Requires a matching custom-event trigger in the
    // GTM container to fire tags. Mirrors PixelRouter for the Meta Pixel.
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const query = searchParams?.toString();
    sendGTMEvent({
      event: 'page_view',
      page_path: query ? `${pathname}?${query}` : pathname,
    });
  }, [pathname, searchParams]);

  return null;
};

export default GtmRouter;
