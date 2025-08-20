import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, ArrowRight } from './ui/icons';
import { useTranslation } from '../hooks/useTranslation';
import { socialLinks } from '../utils/contactData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t.nav.home, page: 'home' },
    { label: t.nav.about, page: 'about' },
    { label: t.nav.services, page: 'services' },
    { label: t.nav.cases, page: 'cases' }
  ];

  const companyLinks = [
    { label: t.nav.blog, page: 'blog' },
    { label: t.nav.careers, page: 'careers' },
    { label: t.nav.contact, page: 'contact' },
    { label: t.footer.privacy, page: 'privacy' }
  ];

  const serviceLinks = [
    { label: t.services.software.title, page: 'services' },
    { label: t.services.games.title, page: 'services' },
    { label: t.services.ai.title, page: 'services' },
    { label: t.services.consulting.title, page: 'services' }
  ];

  const socialIcons = [
    { Icon: Github, url: socialLinks.github, label: 'GitHub' },
    { Icon: Linkedin, url: socialLinks.linkedin, label: 'LinkedIn' },
    { Icon: Twitter, url: socialLinks.twitter, label: 'Twitter' },
    { Icon: Instagram, url: socialLinks.instagram, label: 'Instagram' }
  ];

  return (
    <footer className="bg-gradient-to-t from-deep-blue to-medium-blue border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-lg flex items-center justify-center neon-glow">
                  <span className="font-bold text-deep-blue">N</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-warm-white gradient-text">Navilon Dev</h3>
                  <p className="text-xs text-soft-gray -mt-1">Navigating Innovation</p>
                </div>
              </div>
              
              <p className="text-soft-gray mb-6 leading-relaxed">
                {t.footer.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-soft-gray">
                  <Mail className="h-4 w-4 text-neon-blue" />
                  <span>contact@navilon-dev.com</span>
                </div>
                <div className="flex items-center gap-3 text-soft-gray">
                  <Phone className="h-4 w-4 text-neon-blue" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-soft-gray">
                  <MapPin className="h-4 w-4 text-neon-blue" />
                  <span>Global Offices Worldwide</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialIcons.map(({ Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-soft-gray hover:text-neon-blue hover:neon-glow transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-warm-white font-semibold mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-soft-gray hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-warm-white font-semibold mb-6">{t.footer.services}</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-soft-gray hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-warm-white font-semibold mb-6">{t.footer.company}</h4>
              <ul className="space-y-3 mb-6">
                {companyLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-soft-gray hover:text-neon-blue transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="glass-effect rounded-lg p-4">
                <h5 className="text-warm-white font-medium mb-2">{t.footer.newsletter}</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-deep-blue border border-border rounded px-3 py-2 text-warm-white placeholder-soft-gray text-sm focus:outline-none focus:ring-1 focus:ring-neon-blue"
                  />
                  <button className="bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue p-2 rounded hover:scale-105 transition-transform duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-soft-gray text-sm">
              © 2024 Navilon Dev. {t.footer.rights}
            </div>
            
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => onNavigate('privacy')}
                className="text-soft-gray hover:text-neon-blue transition-colors duration-300"
              >
                {t.footer.privacy}
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="text-soft-gray hover:text-neon-blue transition-colors duration-300"
              >
                {t.footer.terms}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}