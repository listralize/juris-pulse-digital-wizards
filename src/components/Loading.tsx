
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const Loading = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100);
        return newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Marble-like background effect */}
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`}
      />
      
      {/* Marble veins effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute ${isDark ? 'bg-white/30' : 'bg-black/10'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 40 + 10}%`,
                width: `${Math.random() * 1 + 0.2}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: '50%',
                filter: 'blur(8px)',
                opacity: 0.6
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div 
              key={`vein-${i}`} 
              className={`absolute ${isDark ? 'bg-white/20' : 'bg-black/5'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 20 + 5}%`,
                width: `${Math.random() * 0.8 + 0.1}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: '50%',
                filter: 'blur(4px)',
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <img 
          src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
          alt="Serafim & Trombela" 
          className="h-32 mb-12 animate-pulse"
        />
        
        {/* Luxurious loading bar with marble-inspired design */}
        <div className={`w-64 h-1 ${isDark ? 'bg-white/20' : 'bg-black/10'} relative overflow-hidden mb-6 rounded-full`}>
          <div 
            className={`absolute top-0 left-0 h-full ${isDark ? 'bg-white' : 'bg-black'} rounded-full transition-all duration-300`} 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className={`text-lg font-canela ${isDark ? 'text-white/80' : 'text-black/80'}`}>
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
