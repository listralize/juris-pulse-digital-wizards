import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* CSS-only marble veins */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[10%] left-[20%] w-[0.5px] h-[60%] bg-white/40 rotate-[25deg] blur-[6px]" />
        <div className="absolute top-[30%] left-[50%] w-[0.3px] h-[50%] bg-white/30 rotate-[-15deg] blur-[4px]" />
        <div className="absolute top-[5%] left-[75%] w-[0.4px] h-[70%] bg-white/35 rotate-[40deg] blur-[5px]" />
        <div className="absolute top-[20%] left-[35%] w-[0.3px] h-[40%] bg-white/25 rotate-[-30deg] blur-[3px]" />
        <div className="absolute top-[15%] left-[60%] w-[0.4px] h-[55%] bg-white/30 rotate-[10deg] blur-[5px]" />
      </div>

      {/* Animated gradient sweep */}
      <div className="absolute inset-0 opacity-20 animate-loading-sweep" />

      {/* Logo and progress */}
      <div className="relative z-10 flex flex-col items-center animate-loading-entrance">
        <img 
          src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
          alt="Serafim & Trombela" 
          className="w-72 h-auto mb-16 brightness-150" 
          style={{
            filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.3)) drop-shadow(5px 8px 15px rgba(0,0,0,0.95))',
            objectFit: 'contain'
          }}
        />
        
        {/* CSS-only progress bar */}
        <div className="w-80 h-[2px] bg-white/10 relative overflow-hidden mb-8 rounded-full">
          <div className="absolute top-0 left-0 h-full rounded-full animate-loading-progress"
            style={{ 
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
