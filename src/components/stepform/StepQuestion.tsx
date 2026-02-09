import React from 'react';
import { Button } from '@/components/ui/button';
import { renderStepElement } from '@/components/StepFormElements';
import type { StepFormStep, StepFormData } from '@/types/stepFormTypes';

interface StepQuestionProps {
  step: StepFormStep;
  styles: StepFormData['styles'];
  onAnswer: (stepId: string, optionText: string) => void;
  onNext: (nextStepId?: string, actionType?: 'next_step' | 'external_url', selectedOption?: string) => void;
}

export const StepQuestion: React.FC<StepQuestionProps> = ({ step, styles, onAnswer, onNext }) => {
  return (
    <div className="space-y-6">
      {/* Media */}
      {(step.mediaUrl || step.imageUrl || step.videoUrl) && (
        <div className="mb-6">
          {renderStepElement({
            type: step.mediaType,
            content: step.mediaUrl || step.imageUrl || step.videoUrl,
            imageWidth: step.imageWidth,
            imageHeight: step.imageHeight,
            videoWidth: step.videoWidth,
            videoHeight: step.videoHeight,
            videoAutoplay: step.videoAutoplay,
            videoMuted: step.videoMuted,
            videoLoop: step.videoLoop
          })}
          {step.mediaCaption && (
            <p className="text-sm text-muted-foreground mt-2 text-center">{step.mediaCaption}</p>
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

      {/* Options */}
      {step.options && (
        <div className="space-y-3">
          {step.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start p-4 h-auto min-h-[44px] text-left"
              style={{
                borderColor: styles.primary_color || '#4CAF50',
                color: styles.primary_color || '#4CAF50',
                borderRadius: styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
              }}
              onClick={() => {
                onAnswer(step.id, option.text);
                onNext(option.nextStep, option.actionType, option.text);
              }}
            >
              {option.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
