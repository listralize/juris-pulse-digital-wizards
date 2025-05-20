
import React from 'react';
import MarbleBanner from './MarbleBanner';
import { useTheme } from './ThemeProvider';

interface PageBannerProps {
  title: string;
  subtitle?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: '450px' }}>
      {/* Marble Banner Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <MarbleBanner />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6">
        <div className="w-full max-w-xs md:max-w-sm mx-auto mb-6">
          <img 
            src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png"
            alt="Serafim & Trombela Advocacia Logo"
            className="w-full h-auto relative z-10"
            style={{
              filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.3)) drop-shadow(5px 8px 15px rgba(0,0,0,0.95))'
            }}
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-center max-w-3xl mx-auto font-canela tracking-tight text-white">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl text-white/80 mb-8 text-center max-w-lg mx-auto font-satoshi">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
