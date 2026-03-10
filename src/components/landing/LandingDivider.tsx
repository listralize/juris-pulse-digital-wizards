import React from 'react';

interface LandingDividerProps {
  config: Record<string, any>;
  primaryColor: string;
}

export const LandingDivider: React.FC<LandingDividerProps> = ({ config, primaryColor }) => {
  const style = config.style || 'line';
  const height = config.height || '40px';
  const color = config.color || primaryColor;
  const lineWidth = config.line_width || '60%';

  if (style === 'space') {
    return <div style={{ height }} />;
  }

  if (style === 'wave') {
    return (
      <div className="w-full overflow-hidden" style={{ height }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
            fill={color}
            opacity="0.15"
          />
        </svg>
      </div>
    );
  }

  if (style === 'diagonal') {
    return (
      <div className="w-full overflow-hidden" style={{ height }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 1200,120 0,120" fill={color} opacity="0.1" />
        </svg>
      </div>
    );
  }

  if (style === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2 py-4" style={{ minHeight: height }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.4 + i * 0.2 }} />
        ))}
      </div>
    );
  }

  // default: line
  return (
    <div className="flex items-center justify-center" style={{ minHeight: height }}>
      <div
        className="rounded-full"
        style={{
          width: lineWidth,
          height: config.line_thickness || '2px',
          background: config.use_gradient
            ? `linear-gradient(90deg, transparent, ${color}, transparent)`
            : color,
          opacity: 0.3,
        }}
      />
    </div>
  );
};
