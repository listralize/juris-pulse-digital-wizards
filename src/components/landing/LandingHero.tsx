
import React from 'react';
import { Button } from '../ui/button';

interface LandingHeroProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  hasForm: boolean;
}

const LandingHero: React.FC<LandingHeroProps> = ({
  heroTitle,
  heroSubtitle,
  heroImage,
  ctaButtonText,
  ctaButtonLink,
  hasForm
}) => {
  const handleCtaClick = () => {
    if (hasForm) {
      document.getElementById('landing-form')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(ctaButtonLink, '_blank');
    }
  };

  return (
    <div className="relative py-20 px-4">
      {heroImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-80">
          {heroSubtitle}
        </p>
        <Button 
          size="lg"
          onClick={handleCtaClick}
        >
          {ctaButtonText}
        </Button>
      </div>
    </div>
  );
};

export default LandingHero;
