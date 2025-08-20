import React from 'react';
import { ArrowRight } from './ui/icons';
import { useTranslation } from '../hooks/useTranslation';

interface HeroCTAButtonsProps {
  onNavigate: (page: string) => void;
}

export function HeroCTAButtons({ onNavigate }: HeroCTAButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onClick={() => onNavigate('contact')}
        className="group px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue font-semibold rounded-lg hover:scale-105 transition-all duration-300 neon-glow flex items-center gap-2"
      >
        {t.hero.ctaContact}
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
      
      <button
        onClick={() => onNavigate('services')}
        className="group px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-deep-blue transition-all duration-300 flex items-center gap-2"
      >
        {t.hero.ctaServices}
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
}