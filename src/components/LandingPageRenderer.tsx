
import React from 'react';
import { LandingPage } from '../types/adminTypes';
import { useTheme } from './ThemeProvider';
import LandingHero from './landing/LandingHero';
import LandingSections from './landing/LandingSections';
import LandingForm from './landing/LandingForm';

interface LandingPageRendererProps {
  page: LandingPage;
}

export const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({ page }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <LandingHero 
        heroTitle={page.heroTitle}
        heroSubtitle={page.heroSubtitle}
        heroImage={page.heroImage}
        ctaButtonText={page.ctaButtonText}
        ctaButtonLink={page.ctaButtonLink}
        hasForm={page.hasForm}
      />
      
      <LandingSections sections={page.sections} isDark={isDark} />
      
      {page.hasForm && page.formSteps.length > 0 && (
        <LandingForm 
          formSteps={page.formSteps}
          webhookUrl={page.webhookUrl}
          redirectUrl={page.redirectUrl}
          pageSlug={page.slug}
          pageTitle={page.title}
          isDark={isDark}
        />
      )}
    </div>
  );
};
