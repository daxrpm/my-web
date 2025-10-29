import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * SEO Component for managing dynamic meta tags
 * Use this component when you need to update meta tags for specific routes/pages
 */
export const SEO = ({
  title,
  description,
  keywords,
  image = 'https://daxrpm.dev/logo.png',
  url = 'https://daxrpm.dev/',
  type = 'website',
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const tag = isProperty
        ? document.querySelector(`meta[property="${property}"]`)
        : document.querySelector(`meta[name="${property}"]`);

      if (tag) {
        tag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
      updateMetaTag('twitter:description', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, true);
      updateMetaTag('twitter:title', title);
    }
    updateMetaTag('og:image', image, true);
    updateMetaTag('twitter:image', image);
    updateMetaTag('og:url', url, true);
    updateMetaTag('twitter:url', url);
    updateMetaTag('og:type', type, true);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', url);
      document.head.appendChild(canonicalLink);
    }
  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;

