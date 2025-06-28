
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const Loading = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);

  // Detectar mobile
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // Animação super simplificada no mobile
    if (isMobile) {
      setLogoOpacity(1);
      
      const intervalId = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 100) {
            return oldProgress + 10; // Muito mais rápido
          }
          return 100;
        });
      }, 50); // Intervalo muito menor
      
      return () => clearInterval(intervalId);
    }

    // Desktop - animação normal
    let timer1 = setTimeout(() => {
      setLogoOpacity(1);
    }, 200);

    const intervalId = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 85) {
          return oldProgress + Math.random() * 5;
        } else if (oldProgress < 99) {
          return oldProgress + Math.random() * 1.5;
        }
        return 100;
      });
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearInterval(intervalId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background simplificado no mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={`vein-${i}`} 
              className="absolute bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 50 + 30}%`,
                width: `${Math.random() * 1 + 0.3}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.3 + 0.1,
                filter: 'blur(4px)'
              }}
            />
          ))}
        </div>
      )}

      {/* Logo */}
      <div 
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: logoOpacity,
          transition: isMobile ? 'opacity 0.3s ease' : 'opacity 1s ease'
        }}
      >
        <img 
          src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
          alt="Serafim & Trombela" 
          className={`${isMobile ? 'w-48' : 'w-72'} h-auto mb-8 brightness-150`}
          style={{
            filter: isMobile ?
              'drop-shadow(0 0 10px rgba(255,255,255,0.2))' :
              'drop-shadow(0 0 25px rgba(255,255,255,0.3))'
          }}
        />
        
        {/* Loading bar */}
        <div className={`${isMobile ? 'w-48' : 'w-80'} h-[2px] bg-white/10 relative overflow-hidden mb-6 rounded-full`}>
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-200 ease-out" 
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 100%)',
              boxShadow: '0 0 5px 0.5px rgba(255,255,255,0.4)'
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
