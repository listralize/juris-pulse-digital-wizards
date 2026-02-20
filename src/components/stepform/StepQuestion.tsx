import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Circle } from 'lucide-react';
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
    }, 400);
  };

  const primaryColor = styles.primary_color || '#4CAF50';

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
            return (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-4 min-h-[52px] text-left transition-all duration-200 rounded-xl border-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: isSelected ? primaryColor : `${primaryColor}40`,
                  color: isSelected ? '#fff' : 'inherit',
                  backgroundColor: isSelected ? primaryColor : 'transparent',
                  boxShadow: isSelected ? `0 4px 14px ${primaryColor}40` : undefined,
                }}
                onClick={() => handleSelect(option, index)}
              >
                {/* Icon: circle or check */}
                <span className="flex-shrink-0">
                  {isSelected ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5 opacity-40" style={{ color: primaryColor }} />
                  )}
                </span>
                <span className="flex-1 font-medium">{option.text}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
