
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

  const backgroundStyle = theme === 'dark' 
    ? { backgroundImage: 'radial-gradient(circle at 50% 50%, #000 0%, #000 100%)' }
    : { backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 0%, #f5f5f5 100%)' };
  
  const strokeColor = theme === 'dark' ? 'white' : 'black';
  const opacityBase = theme === 'dark' ? 0.3 : 0.15;
  const opacityHighlight = theme === 'dark' ? 0.65 : 0.3;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base dark texture - pure black background */}
      <div 
        className="absolute inset-0" 
        style={backgroundStyle}
      />
      
      {/* Marble texture overlay - positioned lower and more deformed */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          position: 'absolute', 
          top: '30%', // Moved down 30%
          left: 0, 
          width: '100%', 
          height: '100%',
          opacity: 0.8 // Increased opacity for more visibility
        }}
      >
        {/* Main thick veins with more deformation */}
        <g opacity="0.8">
          {/* Main diagonal vein patterns - thicker and more deformed */}
          <path 
            className="marble-streak"
            d="M350,80 C450,130 600,390 620,550 Q650,650 900,730"
            fill="none"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          <path 
            className="marble-streak"
            d="M450,50 C400,180 520,320 600,420 Q580,500 500,600"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          {/* Larger prominent vein with curves */}
          <path 
            className="marble-streak"
            d="M-100,350 C100,320 300,280 600,320 Q800,340 1200,330 T1950,310"
            fill="none"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          {/* Secondary diagonal veins with more curves */}
          <path 
            className="marble-streak"
            d="M800,50 C750,150 820,300 820,350 Q780,400 750,500"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          <path 
            className="marble-streak"
            d="M950,100 C1050,200 1050,350 1000,500 Q1050,550 1150,600"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          {/* Additional diagonal patterns with more distortion */}
          <path 
            className="marble-streak"
            d="M1200,80 C1150,180 1250,300 1300,350 Q1250,450 1200,500"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.3"
            strokeLinecap="round" 
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          <path 
            className="marble-streak"
            d="M1400,120 C1380,200 1480,380 1500,450 Q1450,520 1400,600"
            fill="none"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          {/* Lower area veins with more curvature */}
          <path 
            className="marble-streak"
            d="M100,500 C200,510 300,520 450,480 Q550,500 800,490"
            fill="none"
            stroke={strokeColor}
            strokeWidth="4.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          {/* Lower right area veins with distortion */}
          <path 
            className="marble-streak"
            d="M1000,450 C1100,460 1250,450 1350,430 Q1500,440 1800,430"
            fill="none"
            stroke={strokeColor}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacityHighlight}
          />
          
          {/* Add some cracks and finer details */}
          {Array.from({ length: 15 }).map((_, i) => (
            <path 
              key={`crack-${i}`}
              className="marble-streak"
              d={`M${Math.random() * 1800},${Math.random() * 500 + 100} C${Math.random() * 1800},${Math.random() * 500 + 100} ${Math.random() * 1800},${Math.random() * 500 + 100} ${Math.random() * 1800},${Math.random() * 500 + 100}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={Math.random() * 2 + 1}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={Math.random() * 0.3 + opacityBase}
            />
          ))}
        </g>
        
        {/* Smaller veins and details for texture */}
        <g opacity="0.7">
          {Array.from({ length: 20 }).map((_, i) => (
            <path 
              key={`detail-${i}`}
              className="marble-streak"
              d={`M${Math.random() * 1800},${Math.random() * 700 + 200} Q${Math.random() * 1800},${Math.random() * 500 + 200} ${Math.random() * 1800},${Math.random() * 700 + 200}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={Math.random() * 1.5 + 0.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={Math.random() * 0.25 + opacityBase}
            />
          ))}
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
            <rect width="100%" height="100%" fill={theme === 'dark' ? '#000000' : '#ffffff'} />
            {Array(300).fill(0).map((_, i) => (
              <rect 
                key={i}
                width="0.8" 
                height="0.8" 
                fill={strokeColor} 
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
