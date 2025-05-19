
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
        (path as SVGPathElement).style.transition = `stroke-dashoffset 2s ease-in-out ${index * 0.15}s`;
        path.setAttribute('stroke-dashoffset', '0');
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
      
      {/* Marble texture with varied thick white streaks */}
      {/* Major thick vein across upper section */}
      <path 
        className="marble-streak"
        d="M-100,320 Q480,270 960,330 T2020,280"
        fill="none"
        stroke="white"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.85"
      />
      
      {/* Medium thick veins */}
      <path 
        className="marble-streak"
        d="M-50,120 Q320,180 680,140 T1200,160 T1800,120"
        fill="none"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      <path 
        className="marble-streak"
        d="M400,0 Q650,180 500,400 T800,600"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.65"
      />
      
      <path 
        className="marble-streak"
        d="M1100,-50 Q1000,150 1200,300 T1300,500"
        fill="none"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Smaller veins with character */}
      <path 
        className="marble-streak"
        d="M1400,50 L1340,220 L1460,350"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M200,450 L280,410 L350,480 L300,550"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      <path 
        className="marble-streak"
        d="M880,50 Q910,120 890,190 T950,280"
        fill="none"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.75"
      />
      
      {/* Connecting veins */}
      <path 
        className="marble-streak"
        d="M700,250 L900,280"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      <path 
        className="marble-streak"
        d="M1150,200 L1320,170"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
      
      {/* Shorter accent veins */}
      <path 
        className="marble-streak"
        d="M600,100 L650,120"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      <path 
        className="marble-streak"
        d="M1500,250 L1560,230"
        fill="none"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.85"
      />
      
      <path 
        className="marble-streak"
        d="M300,180 L340,150"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Fine hairline cracks */}
      <path 
        className="marble-streak"
        d="M500,80 Q530,150 510,220"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      <path 
        className="marble-streak"
        d="M1100,110 Q1130,170 1080,230"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      <path 
        className="marble-streak"
        d="M800,350 L830,380 L810,420"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      
      {/* Larger dramatic vein across lower part */}
      <path 
        className="marble-streak"
        d="M50,500 Q480,450 960,480 T1920,430"
        fill="none"
        stroke="white"
        strokeWidth="15"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Subtle texture overlay */}
      <rect
        width="100%"
        height="100%"
        fill="url(#marbleTexture)"
        opacity="0.1"
      />
      
      <defs>
        <pattern id="marbleTexture" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill="#000000" />
          {/* Small white specs to simulate marble crystalline structure */}
          <rect width="1" height="1" fill="white" opacity="0.7" x="10" y="10" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="30" y="35" />
          <rect width="1.5" height="1.5" fill="white" opacity="0.8" x="50" y="20" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="70" y="45" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="90" y="15" />
          <rect width="1.5" height="1.5" fill="white" opacity="0.8" x="25" y="55" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="65" y="75" />
          <rect width="2" height="2" fill="white" opacity="0.9" x="85" y="60" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="15" y="80" />
          <rect width="1.5" height="1.5" fill="white" opacity="0.8" x="45" y="95" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="110" y="40" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="130" y="65" />
          <rect width="1.5" height="1.5" fill="white" opacity="0.8" x="150" y="25" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="170" y="85" />
          <rect width="2" height="2" fill="white" opacity="0.9" x="190" y="35" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="210" y="115" />
          <rect width="1.5" height="1.5" fill="white" opacity="0.8" x="230" y="75" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="250" y="45" />
          <rect width="1" height="1" fill="white" opacity="0.7" x="270" y="95" />
          <rect width="1.5" height="1.5" fill="white" opacity="0.8" x="280" y="10" />
        </pattern>
      </defs>
    </svg>
  );
};

export default MarbleBanner;
