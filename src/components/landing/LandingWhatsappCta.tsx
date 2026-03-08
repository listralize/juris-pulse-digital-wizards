import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface LandingWhatsappCtaProps {
  config: {
    title?: string;
    subtitle?: string;
    phone_number?: string;
    message?: string;
    button_text?: string;
    background_color?: string;
    text_color?: string;
    button_color?: string;
    style?: 'banner' | 'card' | 'minimal';
  };
  primaryColor: string;
}

export const LandingWhatsappCta: React.FC<LandingWhatsappCtaProps> = ({ config, primaryColor }) => {
  const phone = (config.phone_number || '').replace(/\D/g, '');
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(config.message || '')}`;
  const btnColor = config.button_color || '#25D366';
  const style = config.style || 'banner';

  return (
    <section
      className="py-10 md:py-14 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`max-w-3xl mx-auto text-center space-y-4 ${
          style === 'card' ? 'p-8 rounded-2xl shadow-xl' : style === 'minimal' ? '' : 'p-8'
        }`}
        style={style === 'card' ? { backgroundColor: btnColor + '0D' } : undefined}
      >
        {config.title && <h2 className="text-2xl md:text-3xl font-bold">{config.title}</h2>}
        {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: btnColor }}
        >
          <MessageCircle className="w-6 h-6" />
          {config.button_text || 'Falar no WhatsApp'}
        </a>
      </motion.div>
    </section>
  );
};
