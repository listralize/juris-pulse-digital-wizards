import React from 'react';
import { motion } from 'framer-motion';

interface LandingVideoProps {
  config: {
    title?: string;
    subtitle?: string;
    video_url?: string;
    video_type?: 'youtube' | 'vimeo' | 'direct';
    autoplay?: boolean;
    background_color?: string;
    text_color?: string;
    max_width?: string;
  };
  primaryColor: string;
}

const getEmbedUrl = (url: string, type?: string, autoplay?: boolean) => {
  const ap = autoplay ? 1 : 0;
  if (type === 'vimeo' || url.includes('vimeo.com')) {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}?autoplay=${ap}` : url;
  }
  if (type === 'direct') return url;
  // default youtube
  const ytId = url.match(/(?:youtu\.be\/|v=)([^&\s]+)/)?.[1];
  return ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=${ap}&rel=0` : url;
};

export const LandingVideo: React.FC<LandingVideoProps> = ({ config, primaryColor }) => {
  const isDirectVideo = config.video_type === 'direct';

  return (
    <section
      className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="mx-auto space-y-6" style={{ maxWidth: config.max_width || '800px' }}>
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center"
          >
            {config.title}
          </motion.h2>
        )}
        {config.subtitle && <p className="text-center text-lg opacity-80">{config.subtitle}</p>}
        {config.video_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            {isDirectVideo ? (
              <video
                src={config.video_url}
                controls
                autoPlay={config.autoplay}
                muted={config.autoplay}
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={getEmbedUrl(config.video_url, config.video_type, config.autoplay)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={config.title || 'Video'}
              />
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
