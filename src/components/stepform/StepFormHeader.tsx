import React from 'react';
import type { StepFormData } from '@/types/stepFormTypes';

interface StepFormHeaderProps {
  form: StepFormData;
  progress: number;
}

export const StepFormHeader: React.FC<StepFormHeaderProps> = ({ form, progress }) => {
  return (
    <>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: form.styles.primary_color || '#4CAF50'
          }}
        />
      </div>

      {/* Logo */}
      {form.logo_url && (
        <div className="text-center mb-8">
          <img src={form.logo_url} alt="Logo" className="max-w-xs mx-auto h-auto" />
        </div>
      )}

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
        {form.subtitle && <p className="text-lg opacity-80">{form.subtitle}</p>}
      </div>
    </>
  );
};
