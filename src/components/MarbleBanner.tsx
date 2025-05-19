
import React, { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const MarbleBanner = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Animate the marble streaks to grow/reveal
    const paths = document.querySelectorAll('.marble-streak');
    
    paths.forEach((path, index) => {
      const length = (path as SVGPathElement).getTotalLength();
      
      // Initially hide the path
      path.setAttribute('stroke-dasharray', length.toString());
      path.setAttribute('stroke-dashoffset', length.toString());
      
      // Animate with a slight delay for each path
      setTimeout(() => {
        // Properly cast the path to SVGPathElement to access its style property
        (path as SVGPathElement).style.transition = `stroke-dashoffset 2.5s ease-in-out ${index * 0.2}s`;
        path.setAttribute('stroke-dashoffset', '0');
      }, 500);
    });
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Background - always black regardless of theme */}
      <rect width="100%" height="100%" fill="#000000" />
      
      {/* Marble texture with thicker white streaks of various sizes */}
      {/* Main streaks - thick lines across the width */}
      <path 
        className="marble-streak"
        d="M0,200 Q480,280 960,180 T1920,240"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="square"
        opacity="0.7"
      />
      
      <path 
        className="marble-streak"
        d="M0,400 Q480,320 960,390 T1920,320"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="square"
        opacity="0.8"
      />
      
      <path 
        className="marble-streak"
        d="M0,600 Q480,680 960,620 T1920,690"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="square"
        opacity="0.6"
      />
      
      {/* Diagonal streaks */}
      <path 
        className="marble-streak"
        d="M200,0 L600,1080"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.5"
      />
      
      <path 
        className="marble-streak"
        d="M1200,0 L800,1080"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
        opacity="0.6"
      />
      
      {/* Shorter streaks */}
      <path 
        className="marble-streak"
        d="M300,300 L700,350"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="square"
        opacity="0.75"
      />
      
      <path 
        className="marble-streak"
        d="M1100,500 L1600,470"
        fill="none"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="square"
        opacity="0.8"
      />
      
      <path 
        className="marble-streak"
        d="M400,800 L900,830"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="square"
        opacity="0.7"
      />
      
      {/* Vertical streaks */}
      <path 
        className="marble-streak"
        d="M500,0 L480,400"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M1300,200 L1320,700"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.5"
      />
      
      {/* Very thick feature streak */}
      <path 
        className="marble-streak"
        d="M0,500 Q960,380 1920,520"
        fill="none"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="square"
        opacity="0.9"
      />
      
      {/* Additional varied streaks */}
      <path 
        className="marble-streak"
        d="M100,700 L300,720 L500,690 L700,730"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="square"
        opacity="0.4"
      />
      
      <path 
        className="marble-streak"
        d="M1000,300 L1200,280 L1400,310 L1600,270"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="square"
        opacity="0.4"
      />
      
      {/* Shorter highlight streaks */}
      <path 
        className="marble-streak"
        d="M800,400 L860,405"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="square"
        opacity="1"
      />
      
      <path 
        className="marble-streak"
        d="M1500,600 L1560,610"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="square"
        opacity="1"
      />
      
      <path 
        className="marble-streak"
        d="M400,250 L420,260 L450,245"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="square"
        opacity="0.8"
      />
      
      {/* Noise texture overlay */}
      <rect
        width="100%"
        height="100%"
        fill="url(#noise)"
        opacity="0.03"
      />
      
      <defs>
        <pattern id="noise" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill="#000000" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="10" y="10" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="30" y="35" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="50" y="20" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="70" y="45" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="90" y="15" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="25" y="55" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="65" y="75" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="85" y="60" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="15" y="80" />
          <rect width="1" height="1" fill="white" opacity="0.5" x="45" y="95" />
        </pattern>
      </defs>
    </svg>
  );
};

export default MarbleBanner;
