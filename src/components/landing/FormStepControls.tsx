
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormStepControlsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const FormStepControls: React.FC<FormStepControlsProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevStep,
  onNextStep,
  onSubmit
}) => {
  return (
    <div className="flex justify-between pt-6">
      <Button 
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 0}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Anterior
      </Button>
      
      {currentStep === totalSteps - 1 ? (
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      ) : (
        <Button onClick={onNextStep}>
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default FormStepControls;
