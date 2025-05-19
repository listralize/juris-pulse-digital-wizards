
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
        pathElement.style.transition = `stroke-dashoffset 2s ease-in-out ${index * 0.15}s`;
        pathElement.setAttribute('stroke-dashoffset', '0');
      }, 300);
    });
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Background - always black regardless of theme */}
      <rect width="100%" height="100%" fill="#000000" />
      
      {/* Marble texture with thick white irregular streaks - with straight lines and sharp angles */}
      
      {/* Major thick horizontal streaks */}
      <path 
        className="marble-streak"
        d="M-100,320 L500,330 L960,350 L1400,300 L2020,280"
        fill="none"
        stroke="white"
        strokeWidth="22"
        strokeLinecap="square"
        opacity="0.85"
      />
      
      <path 
        className="marble-streak"
        d="M-50,120 L320,180 L680,140 L1200,160 L1600,140 L1800,120"
        fill="none"
        stroke="white"
        strokeWidth="15"
        strokeLinecap="square"
        opacity="0.7"
      />
      
      {/* Angular streaks with sharp turns */}
      <path 
        className="marble-streak"
        d="M400,50 L650,180 L500,400 L800,600"
        fill="none"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="square"
        opacity="0.65"
      />
      
      <path 
        className="marble-streak"
        d="M1100,-50 L1000,150 L1200,300 L1300,500"
        fill="none"
        stroke="white"
        strokeWidth="18"
        strokeLinecap="square"
        opacity="0.7"
      />
      
      {/* Straight line segments with abrupt angles */}
      <path 
        className="marble-streak"
        d="M1400,50 L1340,220 L1460,350"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M200,450 L280,410 L350,480 L300,550"
        fill="none"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.7"
      />
      
      <path 
        className="marble-streak"
        d="M880,50 L910,120 L890,190 L950,280"
        fill="none"
        stroke="white"
        strokeWidth="14"
        strokeLinecap="square"
        opacity="0.75"
      />
      
      {/* Connecting angular lines */}
      <path 
        className="marble-streak"
        d="M700,250 L900,280"
        fill="none"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="square"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M1150,200 L1320,170"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="square"
        opacity="0.55"
      />
      
      {/* Short angular accents */}
      <path 
        className="marble-streak"
        d="M600,100 L650,120"
        fill="none"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="square"
        opacity="0.8"
      />
      
      <path 
        className="marble-streak"
        d="M1500,250 L1560,230"
        fill="none"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="square"
        opacity="0.85"
      />
      
      <path 
        className="marble-streak"
        d="M300,180 L340,150"
        fill="none"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="square"
        opacity="0.7"
      />
      
      {/* Thicker angular streaks */}
      <path 
        className="marble-streak"
        d="M500,80 L530,150 L510,220"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.5"
      />
      
      <path 
        className="marble-streak"
        d="M1100,110 L1130,170 L1080,230"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M800,350 L830,380 L810,420"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.65"
      />
      
      {/* Large angular streaks across lower part */}
      <path 
        className="marble-streak"
        d="M-50,500 L480,450 L960,480 L1400,440 L1920,430"
        fill="none"
        stroke="white"
        strokeWidth="25"
        strokeLinecap="square"
        opacity="0.8"
      />
      
      {/* Add some straight thin lines crossing others */}
      <path 
        className="marble-streak"
        d="M100,200 L300,205"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.5"
      />
      
      <path 
        className="marble-streak"
        d="M1600,350 L1800,345"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M400,520 L700,525"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="square"
        opacity="0.7"
      />
      
      {/* Subtle texture overlay */}
      <rect
        width="100%"
        height="100%"
        fill="url(#marbleTexture)"
        opacity="0.15"
      />
      
      <defs>
        <pattern id="marbleTexture" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill="#000000" />
          {/* Small white specs to simulate marble crystalline structure */}
          <rect width="2" height="2" fill="white" opacity="0.8" x="10" y="10" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="30" y="35" />
          <rect width="3" height="3" fill="white" opacity="0.9" x="50" y="20" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="70" y="45" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="90" y="15" />
          <rect width="3" height="3" fill="white" opacity="0.9" x="25" y="55" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="65" y="75" />
          <rect width="4" height="4" fill="white" opacity="0.95" x="85" y="60" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="15" y="80" />
          <rect width="3" height="3" fill="white" opacity="0.9" x="45" y="95" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="110" y="40" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="130" y="65" />
          <rect width="3" height="3" fill="white" opacity="0.9" x="150" y="25" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="170" y="85" />
          <rect width="4" height="4" fill="white" opacity="0.95" x="190" y="35" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="210" y="115" />
          <rect width="3" height="3" fill="white" opacity="0.9" x="230" y="75" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="250" y="45" />
          <rect width="2" height="2" fill="white" opacity="0.8" x="270" y="95" />
          <rect width="3" height="3" fill="white" opacity="0.9" x="280" y="10" />
        </pattern>
      </defs>
    </svg>
  );
};

export default MarbleBanner;
