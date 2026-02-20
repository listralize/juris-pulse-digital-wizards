import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { renderStepElement } from '@/components/StepFormElements';
import type { StepFormStep, StepFormData } from '@/types/stepFormTypes';

interface StepQuestionProps {
  step: StepFormStep;
  styles: StepFormData['styles'];
  onAnswer: (stepId: string, optionText: string) => void;
  onNext: (nextStepId?: string, actionType?: 'next_step' | 'external_url', selectedOption?: string) => void;
}

export const StepQuestion: React.FC<StepQuestionProps> = ({ step, styles, onAnswer, onNext }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (option: any, index: number) => {
    setSelectedIndex(index);
    onAnswer(step.id, option.text);
    setTimeout(() => {
      onNext(option.nextStep, option.actionType, option.text);
    }, 350);
  };

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
          {step.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const primaryColor = styles.primary_color || '#4CAF50';
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between p-4 h-auto min-h-[48px] text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                style={{
                  borderColor: isSelected ? primaryColor : `${primaryColor}66`,
                  color: isSelected ? '#fff' : primaryColor,
                  backgroundColor: isSelected ? primaryColor : 'transparent',
                  borderRadius: styles.button_style === 'rounded' ? '0.5rem' : '0.25rem',
                  borderWidth: '2px',
                }}
                onClick={() => handleSelect(option, index)}
              >
                <span>{option.text}</span>
                {isSelected && <Check className="w-5 h-5 flex-shrink-0" />}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
