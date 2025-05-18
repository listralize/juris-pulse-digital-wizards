
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const Loading = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    // Animate logo entrance
    let timer1 = setTimeout(() => {
      setLogoOpacity(1);
    }, 200);
    
    let timer2 = setTimeout(() => {
      setLogoScale(1.2);
    }, 400);

    // Animate gradient position - smooth movement without repetition
    const gradientInterval = setInterval(() => {
      setGradientPosition(prev => {
        // Move from 0 to 100 and then stop
        if (prev < 100) return prev + 0.5;
        return 100;
      });
    }, 50);

    // Progress bar animation - smooth and without repetition
    const intervalId = setInterval(() => {
      setProgress((oldProgress) => {
        // Increase progressively and decelerate near the end
        if (oldProgress < 85) {
          return oldProgress + Math.random() * 5;
        } else if (oldProgress < 99) {
          return oldProgress + Math.random() * 1.5;
        }
        return 100; // Cap at 100%
      });
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(intervalId);
      clearInterval(gradientInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Animated marbled background veins */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`vein-main-${i}`} 
            className="absolute bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 70 + 30}%`,
              width: `${Math.random() * 1 + 0.3}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})`,
              opacity: Math.random() * 0.4 + 0.2,
              filter: 'blur(8px)',
              transition: 'all 0.5s ease-in-out'
            }}
          />
        ))}
        {[...Array(30)].map((_, i) => (
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
              filter: 'blur(4px)',
              transition: 'all 0.8s ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${gradientPosition}% 50%, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 50%)`,
          transition: 'background 0.5s ease'
        }}
      />

      {/* Logo with enhanced animation */}
      <div 
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1.2s ease-in-out'
        }}
      >
        <img 
          src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
          alt="Serafim & Trombela" 
          className="w-72 h-72 mb-16"
        />
        
        {/* Elegant loading bar with marble-inspired design */}
        <div className="w-80 h-[2px] bg-white/10 relative overflow-hidden mb-8 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out" 
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 100%)',
              boxShadow: '0 0 10px 1px rgba(255,255,255,0.5)'
            }}
          />
        </div>
        
        <p className="text-xl font-canela text-white/80">
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
