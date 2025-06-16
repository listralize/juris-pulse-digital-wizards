
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { PageTexts } from '../../types/adminTypes';

interface AboutProps {
  pageTexts: PageTexts;
}

const About: React.FC<AboutProps> = ({ pageTexts: initialPageTexts }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pageTexts, setPageTexts] = useState(initialPageTexts);

  // Escutar por atualizações dos pageTexts
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🎯 About: Recebendo atualização de pageTexts:', event.detail);
      setPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Atualizar quando props mudarem
  useEffect(() => {
    setPageTexts(initialPageTexts);
  }, [initialPageTexts]);

  const aboutTitle = pageTexts?.aboutTitle || 'Sobre Nós';
  const aboutDescription = pageTexts?.aboutDescription || 'Somos um escritório de advocacia dedicado a oferecer soluções jurídicas inovadoras e eficazes...';
  const aboutImage = pageTexts?.aboutImage || '/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png';

  return (
    <section className={`py-16 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {aboutTitle}
            </h2>
            
            <p className={`text-lg md:text-xl leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {aboutDescription}
            </p>
          </div>
          
          <div className="relative">
            <img
              src={aboutImage}
              alt="Sobre nós"
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
