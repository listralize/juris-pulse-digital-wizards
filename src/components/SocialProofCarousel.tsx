import React from 'react';
import { TestimonialCarousel } from './TestimonialCarousel';

interface SocialProofCarouselProps {
  className?: string;
  showTitle?: boolean;
  title?: string;
}

export const SocialProofCarousel: React.FC<SocialProofCarouselProps> = ({
  className = '',
  showTitle = true,
  title = 'O que nossos clientes dizem'
}) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja o que nossos clientes satisfeitos têm a dizer sobre nossos serviços
            </p>
          </div>
        )}
        
        <TestimonialCarousel
          showDots={true}
          autoPlay={true}
          interval={6000}
        />
      </div>
    </section>
  );
};