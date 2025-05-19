
import React, { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const MarbleBanner = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        (path as SVGPathElement).style.transition = `stroke-dashoffset 2s ease-in-out ${index * 0.15}s`;
        path.setAttribute('stroke-dashoffset', '0');
      }, 500);
    });
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 300"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="100%" height="100%" fill={isDark ? "#000000" : "#f5f5f5"} />
      
      {/* Marble texture with white streaks */}
      {/* Main streaks */}
      <path 
        className="marble-streak"
        d="M50,50 Q120,80 200,50 T350,70 T450,50"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isDark ? "0.8" : "0.4"}
      />
      
      <path 
        className="marble-streak"
        d="M70,100 Q150,130 250,90 T380,110 T470,90"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={isDark ? "0.6" : "0.3"}
      />
      
      <path 
        className="marble-streak"
        d="M30,150 Q100,180 180,140 T320,160 T450,130"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={isDark ? "0.7" : "0.35"}
      />
      
      {/* Secondary streaks */}
      <path 
        className="marble-streak"
        d="M80,80 Q130,60 170,85 T240,65"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={isDark ? "0.5" : "0.25"}
      />
      
      <path 
        className="marble-streak"
        d="M270,180 Q320,160 360,185 T420,165"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={isDark ? "0.5" : "0.25"}
      />
      
      <path 
        className="marble-streak"
        d="M150,200 Q200,220 250,190 T350,210 T400,190"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={isDark ? "0.7" : "0.35"}
      />
      
      {/* Subtle connecting streaks */}
      <path 
        className="marble-streak"
        d="M120,70 L150,130"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity={isDark ? "0.4" : "0.2"}
      />
      
      <path 
        className="marble-streak"
        d="M280,90 L260,140"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity={isDark ? "0.4" : "0.2"}
      />
      
      <path 
        className="marble-streak"
        d="M380,70 L370,130"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round" 
        opacity={isDark ? "0.4" : "0.2"}
      />
      
      {/* Small details */}
      <path 
        className="marble-streak"
        d="M200,120 Q220,130 240,115"
        fill="none"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity={isDark ? "0.5" : "0.25"}
      />
      
      <path 
        className="marble-streak"
        d="M300,200 Q320,210 340,195"
        fill="none"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity={isDark ? "0.5" : "0.25"}
      />
      
      {/* Central feature streak */}
      <path 
        className="marble-streak"
        d="M100,160 Q250,120 400,160"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity={isDark ? "0.9" : "0.45"}
      />
      
      {/* Shine effects */}
      <path 
        className="marble-streak"
        d="M180,70 L190,75"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isDark ? "1" : "0.5"}
      />
      
      <path 
        className="marble-streak"
        d="M320,110 L330,115"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isDark ? "1" : "0.5"}
      />
      
      {/* Apply a subtle blur filter to the entire SVG for a more natural look */}
      <filter id="blur">
        <feGaussianBlur stdDeviation="0.3" />
      </filter>
      
      <rect
        width="100%"
        height="100%"
        fill="url(#noise)"
        opacity="0.1"
        filter="url(#blur)"
      />
      
      {/* Add noise texture */}
      <defs>
        <pattern id="noise" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill={isDark ? "#000000" : "#f5f5f5"} />
          <rect width="1" height="1" fill="white" opacity="0.1" x="10" y="10" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="30" y="35" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="50" y="20" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="70" y="45" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="90" y="15" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="25" y="55" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="65" y="75" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="85" y="60" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="15" y="80" />
          <rect width="1" height="1" fill="white" opacity="0.1" x="45" y="95" />
        </pattern>
      </defs>
    </svg>
  );
};

export default MarbleBanner;
