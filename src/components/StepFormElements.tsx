import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Timer as TimerIcon, Gift, TrendingUp, CheckCircle } from 'lucide-react';

interface OfferElementProps {
  config: {
    title?: string;
    originalPrice?: string;
    salePrice?: string;
    discount?: string;
    features?: string[];
    ctaText?: string;
    ctaUrl?: string;
    urgencyText?: string;
  };
  onAction: (url?: string) => void;
  primaryColor: string;
  buttonStyle: string;
}

export const OfferElement: React.FC<OfferElementProps> = ({ config, onAction, primaryColor, buttonStyle }) => {
  return (
    <div className="space-y-6">
      {/* Offer Header */}
      <div className="text-center space-y-4">
        {config.discount && (
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {config.discount}
          </Badge>
        )}
        {config.title && (
          <h3 className="text-2xl font-bold">{config.title}</h3>
        )}
        {config.urgencyText && (
          <div className="flex items-center justify-center gap-2 text-red-600">
            <TimerIcon className="w-4 h-4" />
            <span className="font-medium">{config.urgencyText}</span>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="text-center space-y-2">
        {config.originalPrice && (
          <div className="text-lg text-muted-foreground line-through">
            {config.originalPrice}
          </div>
        )}
        {config.salePrice && (
          <div className="text-4xl font-bold" style={{ color: primaryColor }}>
            {config.salePrice}
          </div>
        )}
      </div>

      {/* Features */}
      {config.features && config.features.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {config.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* CTA Button */}
      <Button
        className="w-full text-lg py-6"
        style={{
          backgroundColor: primaryColor,
          borderRadius: buttonStyle === 'rounded' ? '0.5rem' : '0.25rem'
        }}
        onClick={() => onAction(config.ctaUrl)}
      >
        <Gift className="w-5 h-5 mr-2" />
        {config.ctaText || 'Garantir Oferta'}
      </Button>
    </div>
  );
};

interface TimerElementProps {
  config: {
    duration?: number;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    onExpireAction?: string;
    onExpireUrl?: string;
  };
  onExpire: (action?: string, url?: string) => void;
  primaryColor: string;
}

export const TimerElement: React.FC<TimerElementProps> = ({ config, onExpire, primaryColor }) => {
  const [timeLeft, setTimeLeft] = useState(config.duration ? config.duration * 60 : 1800); // default 30min

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire(config.onExpireAction, config.onExpireUrl);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, config.onExpireAction, config.onExpireUrl, onExpire]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (config.showHours !== false && hours > 0) {
      parts.push(`${hours.toString().padStart(2, '0')}h`);
    }
    if (config.showMinutes !== false) {
      parts.push(`${minutes.toString().padStart(2, '0')}m`);
    }
    if (config.showSeconds !== false) {
      parts.push(`${remainingSeconds.toString().padStart(2, '0')}s`);
    }

    return parts.join(' : ');
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2 text-red-600">
        <TimerIcon className="w-6 h-6" />
        <span className="font-semibold">Tempo Restante</span>
      </div>
      
      <div 
        className="text-4xl font-bold font-mono p-6 rounded-lg border-2"
        style={{ 
          borderColor: primaryColor,
          color: timeLeft <= 300 ? '#ef4444' : primaryColor // Red when < 5 minutes
        }}
      >
        {formatTime(timeLeft)}
      </div>
      
      {timeLeft <= 300 && (
        <div className="animate-pulse text-red-600 font-medium">
          ⚠️ Oferta expira em breve!
        </div>
      )}
    </div>
  );
};

interface SocialProofElementProps {
  config: {
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
  primaryColor: string;
}

export const SocialProofElement: React.FC<SocialProofElementProps> = ({ config, primaryColor }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      {config.stats && config.stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {config.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonials */}
      {config.testimonials && config.testimonials.length > 0 && (
        <div className="space-y-4">
          {config.testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{testimonial.name}</span>
                      {testimonial.rating && (
                        <div className="flex gap-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};