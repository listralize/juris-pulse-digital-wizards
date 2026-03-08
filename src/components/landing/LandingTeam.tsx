import React from 'react';
import { motion } from 'framer-motion';

interface LandingTeamProps {
  config: {
    title?: string;
    description?: string;
    members?: Array<{ name?: string; role?: string; image?: string; credentials?: string }>;
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingTeam: React.FC<LandingTeamProps> = ({ config, primaryColor }) => {
  const members = config.members || [];

  return (
    <section className="py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-4"
          >
            {config.title}
          </motion.h2>
        )}
        {config.description && <p className="text-center opacity-80 mb-10 max-w-2xl mx-auto">{config.description}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="text-center p-6 rounded-2xl border shadow-sm"
            >
              {m.image && (
                <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              )}
              {m.name && <h3 className="text-lg font-bold">{m.name}</h3>}
              {m.role && <p className="text-sm opacity-70">{m.role}</p>}
              {m.credentials && (
                <p className="text-xs mt-2 font-medium" style={{ color: primaryColor }}>{m.credentials}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
