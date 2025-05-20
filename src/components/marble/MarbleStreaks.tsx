
import React, { useEffect } from 'react';

interface MarbleStreakProps {
  streakDelay?: number;
}

const MarbleStreaks: React.FC<MarbleStreakProps> = ({ streakDelay = 300 }) => {
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
      }, streakDelay);
    });
  }, [streakDelay]);

  return (
    <>
      {/* Main diagonal veins */}
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
      
      {/* Larger prominent vein */}
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
      
      {/* Secondary diagonal veins */}
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
      
      {/* Additional diagonal patterns */}
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
    </>
  );
};

export default MarbleStreaks;
