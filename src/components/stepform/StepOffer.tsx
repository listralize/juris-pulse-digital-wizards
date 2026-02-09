import React from 'react';
import { OfferElement } from '@/components/StepFormElements';
import type { StepFormStep, StepFormData } from '@/types/stepFormTypes';

interface StepOfferProps {
  step: StepFormStep;
  styles: StepFormData['styles'];
  onNext: (nextStepId?: string, actionType?: 'next_step' | 'external_url') => void;
}

export const StepOffer: React.FC<StepOfferProps> = ({ step, styles, onNext }) => {
  if (!step.offerConfig) return null;

  return (
    <OfferElement
      config={step.offerConfig}
      onAction={(url) => {
        if (url) {
          onNext(url, 'external_url');
        } else if (step.buttonAction) {
          onNext(step.buttonAction, step.buttonActionType);
        }
      }}
      primaryColor={styles.primary_color || '#4CAF50'}
      buttonStyle={styles.button_style || 'rounded'}
    />
  );
};
