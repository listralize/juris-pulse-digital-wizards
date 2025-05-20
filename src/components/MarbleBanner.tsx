
import React from 'react';
import MarbleStreaks from './marble/MarbleStreaks';
import AdditionalMarbleStreaks from './marble/AdditionalMarbleStreaks';
import DetailedStreaks from './marble/DetailedStreaks';
import NoiseTexture from './marble/NoiseTexture';

interface MarbleBannerProps {
  streakDelay?: number;
  speckleCount?: number;
}

const MarbleBanner: React.FC<MarbleBannerProps> = ({ 
  streakDelay = 300,
  speckleCount = 200
}) => {
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
          <MarbleStreaks streakDelay={streakDelay} />
          <AdditionalMarbleStreaks />
        </g>
        
        {/* More detailed thin veins */}
        <g opacity="0.8">
          <DetailedStreaks />
        </g>
        
        {/* Texture noise overlay */}
        <NoiseTexture speckleCount={speckleCount} />
      </svg>
    </div>
  );
};

export default MarbleBanner;
