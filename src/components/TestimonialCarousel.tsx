import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image_url?: string;
  position?: string;
  company?: string;
}

interface TestimonialCarouselProps {
  className?: string;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  className = '',
  showDots = true,
  autoPlay = true,
  interval = 5000
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    if (autoPlay && testimonials.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, testimonials.length]);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg ${className}`}>
      <div className="relative">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Rating */}
              <div className="flex justify-center items-center gap-1 mb-4">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {currentTestimonial.image_url && (
                  <img
                    src={currentTestimonial.image_url}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                )}
                <div className="text-center md:text-left">
                  <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                  {(currentTestimonial.position || currentTestimonial.company) && (
                    <p className="text-muted-foreground">
                      {currentTestimonial.position} 
                      {currentTestimonial.company && ` - ${currentTestimonial.company}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
              onClick={goToNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && testimonials.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && testimonials.length > 1 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-100"
              style={{ 
                width: `${((currentIndex + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};