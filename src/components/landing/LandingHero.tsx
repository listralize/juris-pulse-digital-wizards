import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  config: {
    headline?: string;
    subheadline?: string;
    body_text?: string;
    image_url?: string;
    cta_text?: string;
    cta_url?: string;
    background_color?: string;
    text_color?: string;
    layout?: 'split' | 'centered' | 'full_image';
    overlay_color?: string;
    overlay_opacity?: number;
    video_background_url?: string;
    badge_text?: string;
    badge_color?: string;
    cta_secondary_text?: string;
    cta_secondary_url?: string;
    min_height?: string;
  };
  primaryColor: string;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ config, primaryColor }) => {
  const layout = config.layout || 'split';
  const isCentered = layout === 'centered' || layout === 'full_image';
  const overlayOpacity = config.overlay_opacity ?? 0.4;
  const minH = config.min_height || (layout === 'full_image' ? '80vh' : undefined);

  const handleCta = (url?: string) => {
    if (!url) return;
    if (url.startsWith('#')) {
      document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section
      className="relative overflow-hidden px-4"
      style={{
        backgroundColor: config.background_color || 'transparent',
        color: config.text_color,
        minHeight: minH,
      }}
    >
      {/* Video background */}
      {config.video_background_url && (
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={config.video_background_url}
        />
      )}

      {/* Full image background */}
      {layout === 'full_image' && config.image_url && !config.video_background_url && (
        <img
          src={config.image_url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      )}

      {/* Overlay */}
      {(config.overlay_color || config.video_background_url || layout === 'full_image') && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: config.overlay_color || '#000',
            opacity: overlayOpacity,
          }}
        />
      )}

      <div
        className={`relative max-w-6xl mx-auto py-16 md:py-24 ${
          isCentered
            ? 'flex flex-col items-center text-center'
            : 'grid md:grid-cols-2 gap-8 items-center'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`space-y-6 ${isCentered ? 'max-w-3xl' : ''}`}
        >
          {config.badge_text && (
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: (config.badge_color || primaryColor) + '22',
                color: config.badge_color || primaryColor,
              }}
            >
              {config.badge_text}
            </span>
          )}
          {config.headline && (
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{config.headline}</h1>
          )}
          {config.subheadline && (
            <p className="text-lg md:text-xl opacity-90">{config.subheadline}</p>
          )}
          {config.body_text && (
            <p className="text-base opacity-80 leading-relaxed">{config.body_text}</p>
          )}
          <div className={`flex gap-3 ${isCentered ? 'justify-center' : ''} flex-wrap`}>
            {config.cta_text && (
              <Button
                size="lg"
                className="text-lg px-8 py-6 font-bold shadow-lg"
                style={{ backgroundColor: primaryColor, color: '#fff' }}
                onClick={() => handleCta(config.cta_url)}
                aria-label={config.cta_text}
              >
                {config.cta_text}
              </Button>
            )}
            {config.cta_secondary_text && (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 font-bold"
                onClick={() => handleCta(config.cta_secondary_url)}
                aria-label={config.cta_secondary_text}
              >
                {config.cta_secondary_text}
              </Button>
            )}
          </div>
        </motion.div>

        {layout === 'split' && config.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={config.image_url}
              alt={config.headline || 'Hero'}
              className="rounded-2xl shadow-2xl max-w-full h-auto"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
