import React from 'react';
import { sanitizeHtml } from '@/utils/sanitize';

interface LandingCustomHtmlProps {
  config: {
    html_content?: string;
  };
}

export const LandingCustomHtml: React.FC<LandingCustomHtmlProps> = ({ config }) => {
  if (!config.html_content) return null;

  return (
    <section
      className="py-8 px-4"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(config.html_content) }}
    />
  );
};
