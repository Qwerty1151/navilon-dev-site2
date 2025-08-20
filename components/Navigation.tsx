import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Gamepad2, Brain, Users, Building, Mail } from './ui/icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: null },
    { id: 'about', label: t.nav.about, icon: Users },
    { id: 'services', label: t.nav.services, icon: Code },
    { id: 'cases', label: t.nav.cases, icon: Building },
    { id: 'blog', label: t.nav.blog, icon: Brain },
    { id: 'careers', label: t.nav.careers, icon: Users },
    { id: 'contact', label: t.nav.contact, icon: Mail }
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-lg flex items-center justify-center group-hover:animate-pulse-neon transition-all duration-300 neon-glow">
              <span className="font-bold text-deep-blue">N</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-warm-white gradient-text">Navilon Dev</h1>
              <p className="text-xs text-soft-gray -mt-1">Navigating Innovation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:text-neon-blue hover:bg-medium-blue/50 hover:neon-glow ${
                  currentPage === item.id 
                    ? 'text-neon-blue bg-medium-blue neon-glow' 
                    : 'text-warm-white'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side - Language Switcher and Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-warm-white hover:text-neon-blue transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 hover:text-neon-blue hover:bg-medium-blue/50 ${
                  currentPage === item.id 
                    ? 'text-neon-blue bg-medium-blue' 
                    : 'text-warm-white'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}