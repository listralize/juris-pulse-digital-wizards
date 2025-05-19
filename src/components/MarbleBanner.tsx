
import React, { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const MarbleBanner = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Animate the marble streaks to grow/reveal
    const paths = document.querySelectorAll('.marble-streak');
    
    paths.forEach((path, index) => {
      const pathElement = path as SVGPathElement;
      const length = pathElement.getTotalLength();
      
      // Initially hide the path
      pathElement.setAttribute('stroke-dasharray', length.toString());
      pathElement.setAttribute('stroke-dashoffset', length.toString());
      
      // Animate with a slight delay for each path
      setTimeout(() => {
        pathElement.style.transition = `stroke-dashoffset 2.5s ease-in-out ${index * 0.12}s`;
        pathElement.setAttribute('stroke-dashoffset', '0');
      }, 300);
    });
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base dark texture */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Marble texture overlay */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          opacity: 0.9
        }}
      >
        {/* Fine angular white veins */}
        <g opacity="0.95">
          {/* Main diagonal vein patterns */}
          <path 
            className="marble-streak"
            d="M350,80 L650,380 L620,550 L900,730"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.7"
          />
          
          <path 
            className="marble-streak"
            d="M450,50 L380,150 L600,420 L500,600"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.65"
          />
          
          {/* Larger prominent vein */}
          <path 
            className="marble-streak"
            d="M-100,350 L300,300 L600,320 L900,270 L1200,330 L1500,290 L1950,310"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.8"
          />
          
          {/* Secondary diagonal veins */}
          <path 
            className="marble-streak"
            d="M800,50 L700,200 L820,350 L750,500"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.7"
          />
          
          <path 
            className="marble-streak"
            d="M950,100 L1100,250 L1000,500 L1150,600"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.75"
          />
          
          {/* Finer crossing veins */}
          <path 
            className="marble-streak"
            d="M300,200 L500,190"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.6"
          />
          
          <path 
            className="marble-streak"
            d="M400,400 L600,380"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.55"
          />
          
          {/* Additional diagonal patterns */}
          <path 
            className="marble-streak"
            d="M1200,80 L1100,230 L1300,350 L1200,500"
            fill="none"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="square" 
            strokeLinejoin="miter"
            opacity="0.65"
          />
          
          <path 
            className="marble-streak"
            d="M1400,120 L1350,300 L1500,450 L1400,600"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.6"
          />
          
          {/* Branching veins */}
          <path 
            className="marble-streak"
            d="M600,320 L650,280 L700,320"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.7"
          />
          
          <path 
            className="marble-streak"
            d="M900,270 L950,220 L980,270"
            fill="none"
            stroke="white"
            strokeWidth="0.9"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.65"
          />
          
          {/* Lower left area veins */}
          <path 
            className="marble-streak"
            d="M100,500 L300,520 L450,480 L600,520 L800,490"
            fill="none"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.7"
          />
          
          {/* Lower right area veins */}
          <path 
            className="marble-streak"
            d="M1000,450 L1200,470 L1350,430 L1600,460 L1800,430"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.65"
          />
          
          {/* Additional fine veins */}
          <path 
            className="marble-streak"
            d="M200,150 L250,250 L180,350"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.5"
          />
          
          <path 
            className="marble-streak"
            d="M1600,200 L1650,300 L1580,400"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.55"
          />
          
          {/* Thin horizontal veins */}
          <path 
            className="marble-streak"
            d="M300,370 L700,360"
            fill="none"
            stroke="white"
            strokeWidth="0.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.45"
          />
          
          <path 
            className="marble-streak"
            d="M1100,380 L1500,370"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.5"
          />
        </g>
        
        {/* More detailed thin veins */}
        <g opacity="0.8">
          {/* Additional detailed diagonal veins */}
          <path 
            className="marble-streak"
            d="M500,150 L600,280 L550,380 L650,470"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.6"
          />
          
          <path 
            className="marble-streak"
            d="M1050,150 L1150,280 L1100,380 L1200,470"
            fill="none"
            stroke="white"
            strokeWidth="0.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.55"
          />
          
          <path 
            className="marble-streak"
            d="M1350,100 L1300,230 L1380,320 L1330,450"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.5"
          />
        </g>
        
        {/* Texture noise overlay */}
        <rect
          width="100%"
          height="100%"
          fill="url(#noiseTexture)"
          opacity="0.05"
        />
        
        <defs>
          <pattern id="noiseTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="#000000" />
            {/* Tiny speckles for texture */}
            {Array(200).fill(0).map((_, i) => (
              <rect 
                key={i}
                width="0.5" 
                height="0.5" 
                fill="white" 
                opacity={Math.random() * 0.5 + 0.3}
                x={Math.random() * 100}
                y={Math.random() * 100}
              />
            ))}
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

export default MarbleBanner;
