import React from 'react';
import type { StepFormData } from '@/types/stepFormTypes';

interface StepFormHeaderProps {
  form: StepFormData;
  progress: number;
}

const getMotivationalText = (progress: number) => {
  if (progress <= 25) return 'Vamos começar!';
  if (progress <= 50) return 'Você está indo bem!';
  if (progress <= 75) return 'Quase lá!';
  return 'Falta pouco para finalizar!';
};

export const StepFormHeader: React.FC<StepFormHeaderProps> = ({ form, progress }) => {
  return (
    <>
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: form.styles.primary_color || '#4CAF50'
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-1 mb-6">
          <span className="text-xs font-medium opacity-70">{getMotivationalText(progress)}</span>
          <span className="text-xs font-bold" style={{ color: form.styles.primary_color || '#4CAF50' }}>
            {Math.round(progress)}%
          </span>
        </div>
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
