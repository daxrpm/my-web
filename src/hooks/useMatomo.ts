import { useEffect } from 'react';

interface MatomoConfig {
  url: string;
  siteId: number;
}

export const useMatomo = (config: MatomoConfig) => {
  useEffect(() => {
    const _paq = window._paq = window._paq || [];
    
    // Configure tracker before tracking (Matomo best practice)
    _paq.push(['setTrackerUrl', `${config.url}matomo.php`]);
    _paq.push(['setSiteId', config.siteId]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    
    // Inject script
    (function() {
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = `${config.url}matomo.js`;
      if (s?.parentNode) s.parentNode.insertBefore(g, s);
    })();
  }, [config.url, config.siteId]);
};

export const trackEvent = (
  category: string,
  action: string,
  name?: string,
  value?: number
) => {
  const _paq = window._paq || [];
  const params: (string | number)[] = [category, action];
  if (name) params.push(name);
  if (value !== undefined) params.push(value);
  _paq.push(['trackEvent', ...params]);
};

export const trackPageView = (customTitle?: string) => {
  const _paq = window._paq || [];
  if (customTitle) _paq.push(['setDocumentTitle', customTitle]);
  _paq.push(['trackPageView']);
};

