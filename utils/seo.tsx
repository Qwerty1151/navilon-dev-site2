import React, { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface SEOHeadProps {
  currentPage: string;
}

export function SEOHead({ currentPage }: SEOHeadProps) {
  const { t, currentLanguage } = useTranslation();

  useEffect(() => {
    const seoData = t.seo[currentPage as keyof typeof t.seo] || t.seo.home;
    
    // Update document title
    document.title = seoData.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = seoData.description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = seoData.keywords;
      document.head.appendChild(meta);
    }

    // Update Open Graph meta tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateMeta('og:title', seoData.title);
    updateOrCreateMeta('og:description', seoData.description);
    updateOrCreateMeta('og:type', 'website');
    updateOrCreateMeta('og:site_name', 'Navilon Dev');
    updateOrCreateMeta('og:locale', currentLanguage);

    // Update Twitter Card meta tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', seoData.title);
    updateOrCreateTwitterMeta('twitter:description', seoData.description);

    // Update language meta tag
    document.documentElement.lang = currentLanguage;

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}/#${currentPage}`);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', `${window.location.origin}/#${currentPage}`);
      document.head.appendChild(canonical);
    }

    // Add JSON-LD structured data
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Navilon Dev",
      "description": t.footer.description,
      "url": window.location.origin,
      "sameAs": [
        "https://linkedin.com/company/navilon-dev",
        "https://github.com/navilon-dev",
        "https://twitter.com/navilon_dev"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "Russian", "German", "French", "Spanish", "Polish", "Chinese"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Multiple"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

  }, [currentPage, t, currentLanguage]);

  return null;
}