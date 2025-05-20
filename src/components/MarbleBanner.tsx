
import React, { useEffect } from 'react';

const MarbleBanner = () => {
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
          backgroundImage: 'radial-gradient(circle at 50% 50%, #000 0%, #000 100%)',
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
        {/* Fine angular white veins - more deformed and thicker */}
        <g opacity="0.95">
          {/* Main diagonal vein patterns - thicker */}
          <path 
            className="marble-streak"
            d="M350,80 C450,250 L650,380 C600,500 L620,550 C700,600 L900,730"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.7"
          />
          
          <path 
            className="marble-streak"
            d="M450,50 C420,120 L380,150 C500,250 L600,420 C550,520 L500,600"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.65"
          />
          
          {/* Larger prominent vein - more deformed */}
          <path 
            className="marble-streak"
            d="M-100,350 C50,320 L300,300 C450,330 L600,320 C750,280 L900,270 C1050,310 L1200,330 C1350,300 L1500,290 C1700,320 L1950,310"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.8"
          />
          
          {/* Secondary diagonal veins - thicker and more deformed */}
          <path 
            className="marble-streak"
            d="M800,50 C770,130 L700,200 C750,280 L820,350 C790,430 L750,500"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.7"
          />
          
          <path 
            className="marble-streak"
            d="M950,100 C1020,180 L1100,250 C1050,380 L1000,500 C1080,550 L1150,600"
            fill="none"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.75"
          />
          
          {/* Finer crossing veins */}
          <path 
            className="marble-streak"
            d="M300,200 C350,194 L500,190"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.6"
          />
          
          <path 
            className="marble-streak"
            d="M400,400 C450,388 L600,380"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.55"
          />
          
          {/* Additional diagonal patterns - thicker */}
          <path 
            className="marble-streak"
            d="M1200,80 C1170,160 L1100,230 C1200,280 L1300,350 C1250,430 L1200,500"
            fill="none"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round" 
            strokeLinejoin="bevel"
            opacity="0.65"
          />
          
          <path 
            className="marble-streak"
            d="M1400,120 C1380,220 L1350,300 C1420,380 L1500,450 C1450,530 L1400,600"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.6"
          />
          
          {/* Branching veins */}
          <path 
            className="marble-streak"
            d="M600,320 C630,295 L650,280 C670,305 L700,320"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.7"
          />
          
          <path 
            className="marble-streak"
            d="M900,270 C920,240 L950,220 C965,250 L980,270"
            fill="none"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.65"
          />
          
          {/* Lower left area veins - thicker */}
          <path 
            className="marble-streak"
            d="M100,500 C200,508 L300,520 C380,490 L450,480 C520,510 L600,520 C700,500 L800,490"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.7"
          />
          
          {/* Lower right area veins - thicker */}
          <path 
            className="marble-streak"
            d="M1000,450 C1100,458 L1200,470 C1280,440 L1350,430 C1450,450 L1600,460 C1700,440 L1800,430"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.65"
          />
          
          {/* Additional fine veins - thicker */}
          <path 
            className="marble-streak"
            d="M200,150 C220,200 L250,250 C220,310 L180,350"
            fill="none"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.5"
          />
          
          <path 
            className="marble-streak"
            d="M1600,200 C1620,250 L1650,300 C1620,360 L1580,400"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.55"
          />
          
          {/* Thin horizontal veins - slightly thicker */}
          <path 
            className="marble-streak"
            d="M300,370 C450,363 L700,360"
            fill="none"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.45"
          />
          
          <path 
            className="marble-streak"
            d="M1100,380 C1250,373 L1500,370"
            fill="none"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.5"
          />
          
          {/* New additional deformed veins */}
          <path 
            className="marble-streak"
            d="M100,200 C180,230 L250,190 C350,220 L420,180"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.6"
          />
          
          <path 
            className="marble-streak"
            d="M1500,600 C1580,570 L1650,620 C1750,580 L1820,630"
            fill="none"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.65"
          />
          
          <path 
            className="marble-streak"
            d="M300,700 C380,680 L450,720 C520,670 L600,730"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.7"
          />
        </g>
        
        {/* More detailed thin veins */}
        <g opacity="0.8">
          {/* Additional detailed diagonal veins - thicker */}
          <path 
            className="marble-streak"
            d="M500,150 C540,220 L600,280 C580,330 L550,380 C590,430 L650,470"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.6"
          />
          
          <path 
            className="marble-streak"
            d="M1050,150 C1090,220 L1150,280 C1130,330 L1100,380 C1140,430 L1200,470"
            fill="none"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.55"
          />
          
          <path 
            className="marble-streak"
            d="M1350,100 C1330,170 L1300,230 C1340,280 L1380,320 C1350,390 L1330,450"
            fill="none"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.5"
          />
          
          {/* New intersecting veins */}
          <path 
            className="marble-streak"
            d="M700,800 C780,750 L850,790 C920,730 L980,780"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.65"
          />
          
          <path 
            className="marble-streak"
            d="M1100,850 C1180,820 L1250,870 C1320,810 L1380,860"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            opacity="0.6"
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
                width="0.8" 
                height="0.8" 
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
