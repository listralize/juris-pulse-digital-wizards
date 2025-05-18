
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const Loading = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);

  useEffect(() => {
    // Animate logo entrance
    let timer1 = setTimeout(() => {
      setLogoOpacity(1);
    }, 200);
    
    let timer2 = setTimeout(() => {
      setLogoScale(1);
    }, 400);

    // Progress bar animation
    const intervalId = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 8, 100);
        return newProgress;
      });
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Elegant marble veins effect */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
        {[...Array(25)].map((_, i) => (
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

      {/* Logo with animation */}
      <div 
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease-in-out'
        }}
      >
        <img 
          src="/lovable-uploads/69f01f04-0e29-4493-a363-b0f011029375.png" 
          alt="Serafim & Trombela" 
          className="w-64 h-64 mb-16"
        />
        
        {/* Elegant loading bar with marble-inspired design */}
        <div className="w-72 h-[2px] bg-white/10 relative overflow-hidden mb-8 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-lg font-canela text-white/80">
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
