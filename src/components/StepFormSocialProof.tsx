import React from 'react';
import { Star } from 'lucide-react';
import GlobalSocialProof from './GlobalSocialProof';

interface StepFormSocialProofProps {
  socialProofConfig?: {
    enabled?: boolean;
    testimonials?: Array<{
      name: string;
      text: string;
      rating?: number;
      image?: string;
    }>;
    stats?: Array<{
      number: string;
      label: string;
    }>;
  };
  className?: string;
}

const StepFormSocialProof: React.FC<StepFormSocialProofProps> = ({ 
  socialProofConfig,
  className = ""
}) => {
  // Se não há configuração local, usar a global
  if (!socialProofConfig?.enabled) {
    return <GlobalSocialProof showOnStepForms={true} autoHide={true} hideAfterSeconds={15} />;
  }

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 ${className}`}>
      <div className="grid grid-cols-1 gap-4">
        {/* Stats Section */}
        {socialProofConfig.stats && socialProofConfig.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {socialProofConfig.stats.slice(0, 2).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials Section */}
        {socialProofConfig.testimonials && socialProofConfig.testimonials.length > 0 && (
          <div className="space-y-3">
            {socialProofConfig.testimonials.slice(0, 1).map((testimonial, index) => (
              <div key={index} className="bg-white/10 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-1 mr-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="font-medium text-white text-sm">{testimonial.name}</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepFormSocialProof;