
import React from 'react';

interface NoiseTextureProps {
  speckleCount?: number;
}

const NoiseTexture: React.FC<NoiseTextureProps> = ({ speckleCount = 200 }) => {
  // Generate array of random speckles
  const speckles = Array(speckleCount).fill(0).map((_, i) => ({
    key: i,
    width: 0.8,
    height: 0.8,
    opacity: Math.random() * 0.5 + 0.3,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));
  
  return (
    <>
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
          {speckles.map(speckle => (
            <rect 
              key={speckle.key}
              width={speckle.width} 
              height={speckle.height} 
              fill="white" 
              opacity={speckle.opacity}
              x={speckle.x}
              y={speckle.y}
            />
          ))}
        </pattern>
      </defs>
    </>
  );
};

export default NoiseTexture;
