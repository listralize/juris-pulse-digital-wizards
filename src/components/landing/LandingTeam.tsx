import React from 'react';
import { motion } from 'framer-motion';

interface LandingTeamProps {
  config: {
    title?: string;
    subtitle?: string;
    description?: string;
    members?: Array<{
      name: string;
      role?: string;
      credentials?: string;
      image?: string;
      social_links?: Array<{ label: string; url: string }>;
    }>;
    layout?: 'grid' | 'carousel';
    columns?: number;
    show_social_links?: boolean;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
  };
  primaryColor: string;
}

export const LandingTeam: React.FC<LandingTeamProps> = ({ config, primaryColor }) => {
  const members = config.members || [];
  const layout = config.layout || 'grid';
  const cols = config.columns || Math.min(members.length, 3);
  const accent = config.accent_color || primaryColor;

  const renderMember = (m: typeof members[0], idx: number) => (
    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
      className="text-center space-y-3 p-6 rounded-2xl" style={{ backgroundColor: accent + '06' }}>
      {m.image ? (
        <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg" />
      ) : (
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white"
          style={{ backgroundColor: accent }}>{m.name.charAt(0)}</div>
      )}
      <h3 className="font-bold text-lg">{m.name}</h3>
      {m.role && <p className="text-sm opacity-70">{m.role}</p>}
      {m.credentials && <p className="text-xs font-medium" style={{ color: accent }}>{m.credentials}</p>}
      {config.show_social_links && m.social_links && m.social_links.length > 0 && (
        <div className="flex justify-center gap-3 pt-1">
          {m.social_links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs underline opacity-60 hover:opacity-100">{l.label}</a>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <section className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {(config.subtitle || config.description) && <p className="text-lg opacity-80 max-w-2xl mx-auto">{config.subtitle || config.description}</p>}
        </div>
        {layout === 'carousel' ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {members.map((m, idx) => (
              <div key={idx} className="min-w-[250px] max-w-[300px] snap-center flex-shrink-0">{renderMember(m, idx)}</div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {members.map(renderMember)}
          </div>
        )}
      </div>
    </section>
  );
};
