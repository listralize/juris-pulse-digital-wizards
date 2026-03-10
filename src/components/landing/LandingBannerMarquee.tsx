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
  const separator = config.separator || '★';
  const fontSize = config.font_size || '1rem';

  // Duplicate texts for seamless loop
  const repeatedTexts = [...texts, ...texts, ...texts];
  const content = repeatedTexts.join(` ${separator} `);
  const animationDuration = `${Math.max(10, 60 - speed)}s`;

  return (
    <div
      className="w-full overflow-hidden py-3 relative"
      style={{ backgroundColor: bgColor }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${animationDuration} linear infinite`,
          color: textColor,
          fontSize,
        }}
      >
        <span className="inline-block px-4 font-semibold tracking-wide">{content}</span>
        <span className="inline-block px-4 font-semibold tracking-wide">{content}</span>
      </div>
    </div>
  );
};
