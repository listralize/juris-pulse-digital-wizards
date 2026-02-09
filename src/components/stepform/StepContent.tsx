import React from 'react';
import { Button } from '@/components/ui/button';
import { renderStepElement } from '@/components/StepFormElements';
import type { StepFormStep, StepFormData } from '@/types/stepFormTypes';

interface StepContentProps {
  step: StepFormStep;
  styles: StepFormData['styles'];
  onNext: (nextStepId?: string, actionType?: 'next_step' | 'external_url') => void;
}

export const StepContent: React.FC<StepContentProps> = ({ step, styles, onNext }) => {
  return (
    <div className="text-center space-y-6">
      {/* Media */}
      {(step.mediaUrl || step.imageUrl || step.videoUrl) && (
        <div className="mb-6">
          {renderStepElement({
            type: step.mediaType,
            content: step.mediaUrl || step.imageUrl || step.videoUrl,
            imageWidth: step.imageWidth,
            imageHeight: step.imageHeight,
            videoWidth: step.videoWidth,
            videoHeight: step.videoHeight
          })}
          {step.mediaCaption && (
            <p className="text-sm text-muted-foreground mt-2">{step.mediaCaption}</p>
          )}
        </div>
      )}

      {/* Carousel */}
      {step.mediaType === 'carousel' && step.carouselImages && (
        <div className="mb-6">
          {renderStepElement({
            type: 'carousel',
            images: step.carouselImages,
            autoplay: step.carouselAutoplay,
            showDots: step.carouselShowDots,
            interval: step.carouselInterval
          })}
        </div>
      )}

      <Button
        className="px-8 h-12"
        style={{
          backgroundColor: styles.primary_color || '#4CAF50',
          borderRadius: styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
        }}
        onClick={() => onNext(step.buttonAction, step.buttonActionType)}
      >
        {step.buttonText || 'Continuar'}
      </Button>
    </div>
  );
};
