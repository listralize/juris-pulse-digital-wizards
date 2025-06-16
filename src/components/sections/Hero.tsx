
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { PageTexts } from '../../types/adminTypes';

interface HeroProps {
  pageTexts: PageTexts;
}

const Hero: React.FC<HeroProps> = ({ pageTexts: initialPageTexts }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pageTexts, setPageTexts] = useState(initialPageTexts);

  // Escutar por atualizações dos pageTexts
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🎯 Hero: Recebendo atualização de pageTexts:', event.detail);
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

  const heroTitle = pageTexts?.heroTitle || 'Excelência em Advocacia';
  const heroSubtitle = pageTexts?.heroSubtitle || 'Defendemos seus direitos com dedicação e expertise jurídica';
  const heroBackgroundImage = pageTexts?.heroBackgroundImage || '/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png';

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-black' : 'bg-white'}`}
      style={{
        backgroundImage: `url(${heroBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-canela text-white mb-6 leading-tight">
          {heroTitle}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed">
          {heroSubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3">
            Fale Conosco
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black font-medium px-8 py-3"
          >
            Conheça Nossos Serviços
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
