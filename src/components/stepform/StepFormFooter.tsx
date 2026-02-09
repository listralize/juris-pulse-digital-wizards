import React from 'react';
import type { StepFormData } from '@/types/stepFormTypes';

interface StepFormFooterProps {
  footerConfig: StepFormData['footer_config'];
}

export const StepFormFooter: React.FC<StepFormFooterProps> = ({ footerConfig }) => {
  if (!footerConfig?.enabled) return null;

  return (
    <div
      className="text-center mt-8 p-4 rounded-lg"
      style={{
        backgroundColor: footerConfig.background_color || '#1a1a1a',
        color: footerConfig.text_color || '#ffffff'
      }}
    >
      <p className={footerConfig.font_size || 'text-sm'}>
        {footerConfig.text || 'Atendemos todo o Brasil ✅'}
      </p>
    </div>
  );
};
