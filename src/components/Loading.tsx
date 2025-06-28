
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const Loading = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);

  // Detectar mobile para otimizações máximas
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // Animações muito simplificadas no mobile
    const timer1 = setTimeout(() => {
      setLogoOpacity(1);
    }, isMobile ? 50 : 200);

    // Progress bar mais rápida no mobile
    const intervalId = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 85) {
          return oldProgress + (isMobile ? 15 : 8); // Muito mais rápido no mobile
        } else if (oldProgress < 99) {
          return oldProgress + (isMobile ? 5 : 2);
        }
        return 100;
      });
    }, isMobile ? 50 : 150); // Intervalo muito menor no mobile

    return () => {
      clearTimeout(timer1);
      clearInterval(intervalId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background muito simplificado no mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={`vein-${i}`} 
              className="absolute bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 40 + 20}%`,
                width: `${Math.random() * 0.8 + 0.2}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.3 + 0.1,
                filter: 'blur(3px)'
              }}
            />
          ))}
        </div>
      )}

      {/* Logo simplificado */}
      <div 
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: logoOpacity,
          transition: isMobile ? 'opacity 0.3s ease' : 'opacity 0.8s ease'
        }}
      >
        <img 
          src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
          alt="Serafim & Trombela" 
          className={`${isMobile ? 'w-48' : 'w-72'} h-auto mb-8 brightness-150`}
          style={{
            filter: isMobile ?
              'drop-shadow(0 0 8px rgba(255,255,255,0.2))' :
              'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
            objectFit: 'contain'
          }}
        />
        
        {/* Loading bar simplificada */}
        <div className={`${isMobile ? 'w-48' : 'w-80'} h-[1.5px] bg-white/10 relative overflow-hidden mb-6 rounded-full`}>
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-200 ease-out" 
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 100%)',
              boxShadow: isMobile ? 
                '0 0 3px 0.5px rgba(255,255,255,0.3)' : 
                '0 0 8px 1px rgba(255,255,255,0.4)'
            }}
          />
        </div>
        
        <p className={`${isMobile ? 'text-base' : 'text-xl'} font-canela text-white/80`}>
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
