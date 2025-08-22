import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { CasesPage } from './components/pages/CasesPage';
import { BlogPage } from './components/pages/BlogPage';
import { CareersPage } from './components/pages/CareersPage';
import { ContactPage } from './components/pages/ContactPage';
import { AmbassadorPage } from './components/pages/AmbassadorPage';
import { SEOHead } from './utils/seo.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Load page from URL hash or localStorage
    const hash = window.location.hash.slice(1);
    const savedPage = localStorage.getItem('navilon-dev-current-page');
    
    if (hash && ['home', 'about', 'services', 'cases', 'blog', 'careers', 'contact'].includes(hash)) {
      setCurrentPage(hash);
    } else if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    localStorage.setItem('navilon-dev-current-page', page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} />;
      case 'about':
        return <AboutPage onNavigate={handlePageChange} />;
      case 'services':
        return <ServicesPage onNavigate={handlePageChange} />;
      case 'cases':
        return <CasesPage onNavigate={handlePageChange} />;
      case 'blog':
        return <BlogPage onNavigate={handlePageChange} />;
      case 'careers':
        return <CareersPage onNavigate={handlePageChange} />;
      case 'contact':
        return <ContactPage onNavigate={handlePageChange} />;
      default:
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-deep-blue">
      <SEOHead currentPage={currentPage} />
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="pt-16 lg:pt-20">
        {renderPage()}
      </main>
      <Footer onNavigate={handlePageChange} />
    </div>
  );
}