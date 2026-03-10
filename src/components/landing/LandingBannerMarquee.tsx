import React from 'react';

interface LandingBannerMarqueeProps {
  config: Record<string, any>;
  primaryColor: string;
}

export const LandingBannerMarquee: React.FC<LandingBannerMarqueeProps> = ({ config, primaryColor }) => {
  const texts = config.texts?.length ? config.texts : ['Texto de exemplo'];
  const speed = config.speed || 30;
  const bgColor = config.background_color || primaryColor;
  const textColor = config.text_color || '#ffffff';
  const separator = config.separator || '·';
  const fontSize = config.font_size || '0.8rem';

  const content = texts.join(` ${separator} `);
  const animationDuration = `${Math.max(12, 60 - speed)}s`;

  return (
    <div
      className="w-full overflow-hidden py-2.5 relative"
      style={{ backgroundColor: bgColor }}
    >
      <style>{`
        @keyframes marquee-gpu {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-gpu ${animationDuration} linear infinite`,
          color: textColor,
          fontSize,
          willChange: 'transform',
          transform: 'translateZ(0)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <span className="inline-block px-4 font-medium tracking-widest">{content} {separator} {content} {separator} </span>
        <span className="inline-block px-4 font-medium tracking-widest">{content} {separator} {content} {separator} </span>
      </div>
    </div>
  );
};
