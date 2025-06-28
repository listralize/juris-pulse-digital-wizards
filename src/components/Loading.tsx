
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const Loading = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [gradientPosition, setGradientPosition] = useState(0);

  // Detectar mobile para otimizações
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // Animate logo entrance - otimizado para mobile
    let timer1 = setTimeout(() => {
      setLogoOpacity(1);
    }, isMobile ? 100 : 200);
    
    let timer2 = setTimeout(() => {
      setLogoScale(isMobile ? 1.1 : 1.2); // Menos escala no mobile
    }, isMobile ? 200 : 400);

    // Animate gradient position - otimizado
    const gradientInterval = setInterval(() => {
      setGradientPosition(prev => {
        if (prev < 100) return prev + (isMobile ? 1 : 0.5); // Mais rápido no mobile
        return 100;
      });
    }, isMobile ? 30 : 50); // Intervalo menor no mobile

    // Progress bar animation - otimizado
    const intervalId = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 85) {
          return oldProgress + Math.random() * (isMobile ? 8 : 5); // Mais rápido no mobile
        } else if (oldProgress < 99) {
          return oldProgress + Math.random() * (isMobile ? 3 : 1.5);
        }
        return 100;
      });
    }, isMobile ? 100 : 150); // Intervalo menor no mobile

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(intervalId);
      clearInterval(gradientInterval);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Animated marbled background veins - reduzido no mobile */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div 
            key={`vein-main-${i}`} 
            className="absolute bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * (isMobile ? 50 : 70) + 30}%`,
              width: `${Math.random() * 1 + 0.3}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})`,
              opacity: Math.random() * 0.4 + 0.2,
              filter: isMobile ? 'blur(4px)' : 'blur(8px)',
              transition: 'all 0.5s ease-in-out'
            }}
          />
        ))}
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <div 
            key={`vein-small-${i}`} 
            className="absolute bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 20 + 5}%`,
              width: `${Math.random() * 0.5 + 0.1}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: isMobile ? 'blur(2px)' : 'blur(4px)',
              transition: 'all 0.8s ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient overlay - simplificado no mobile */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: isMobile ? 
            `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)` :
            `radial-gradient(circle at ${gradientPosition}% 50%, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 50%)`,
          transition: isMobile ? 'none' : 'background 0.5s ease'
        }}
      />

      {/* Logo with enhanced animation - otimizado */}
      <div 
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transition: isMobile ? 
            'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease-in-out' :
            'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1.2s ease-in-out'
        }}
      >
        <img 
          src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
          alt="Serafim & Trombela" 
          className={`${isMobile ? 'w-64' : 'w-72'} h-auto mb-16 brightness-150`}
          style={{
            filter: isMobile ?
              'drop-shadow(0 0 15px rgba(255,255,255,0.2)) drop-shadow(3px 5px 10px rgba(0,0,0,0.8))' :
              'drop-shadow(0 0 25px rgba(255,255,255,0.3)) drop-shadow(5px 8px 15px rgba(0,0,0,0.95))',
            objectFit: 'contain'
          }}
        />
        
        {/* Elegant loading bar - otimizado */}
        <div className={`${isMobile ? 'w-64' : 'w-80'} h-[2px] bg-white/10 relative overflow-hidden mb-8 rounded-full`}>
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out" 
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 100%)',
              boxShadow: isMobile ? 
                '0 0 5px 0.5px rgba(255,255,255,0.4)' : 
                '0 0 10px 1px rgba(255,255,255,0.5)'
            }}
          />
        </div>
        
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-canela text-white/80`}>
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
