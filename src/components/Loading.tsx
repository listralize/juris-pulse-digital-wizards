
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
      {/* Marble background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/lovable-uploads/36d1e670-c31a-4c66-ae2f-dfb952037683.png')`,
          opacity: isDark ? 0.7 : 0.9
        }}
      />
      
      {/* Dark overlay for better contrast */}
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-white/30'}`} 
        style={{ backdropFilter: 'blur(5px)' }}
      />

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
