
import React from 'react';
import { LandingPageSection } from '../../types/adminTypes';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface LandingSectionsProps {
  sections: LandingPageSection[];
  isDark: boolean;
}

const LandingSections: React.FC<LandingSectionsProps> = ({ sections, isDark }) => {
  return (
    <>
      {sections.map((section) => (
        <div key={section.id} className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {section.type === 'text' && (
              <TextSection section={section} isDark={isDark} />
            )}
            
            {section.type === 'image' && (
              <ImageSection section={section} isDark={isDark} />
            )}
            
            {section.type === 'cta' && (
              <CtaSection section={section} isDark={isDark} />
            )}
            
            {section.type === 'testimonial' && (
              <TestimonialSection section={section} isDark={isDark} />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

const TextSection: React.FC<{ section: LandingPageSection; isDark: boolean }> = ({ section, isDark }) => (
  <div className="text-center">
    <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
      {section.title}
    </h2>
    <div className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
      {section.content.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-4">{paragraph}</p>
      ))}
    </div>
  </div>
);

const ImageSection: React.FC<{ section: LandingPageSection; isDark: boolean }> = ({ section, isDark }) => (
  <div className="text-center">
    <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
      {section.title}
    </h2>
    {section.image && (
      <img 
        src={section.image} 
        alt={section.title}
        className="mx-auto max-w-full h-auto rounded-lg shadow-lg mb-6"
      />
    )}
    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
      {section.content}
    </p>
  </div>
);

const CtaSection: React.FC<{ section: LandingPageSection; isDark: boolean }> = ({ section, isDark }) => (
  <Card className={`${isDark ? 'bg-black/50 border-white/20' : 'bg-gray-50 border-gray-200'}`}>
    <CardContent className="p-8 text-center">
      <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
        {section.title}
      </h2>
      <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {section.content}
      </p>
      {section.image && (
        <img 
          src={section.image} 
          alt={section.title}
          className="mx-auto max-w-sm h-auto rounded-lg mb-6"
        />
      )}
      <Button 
        size="lg"
        onClick={() => window.open(section.buttonLink, '_blank')}
      >
        {section.buttonText}
      </Button>
    </CardContent>
  </Card>
);

const TestimonialSection: React.FC<{ section: LandingPageSection; isDark: boolean }> = ({ section, isDark }) => (
  <Card className={`${isDark ? 'bg-black/50 border-white/20' : 'bg-gray-50 border-gray-200'}`}>
    <CardContent className="p-8 text-center">
      <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        {section.title}
      </h2>
      <blockquote className={`text-xl italic mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        "{section.content}"
      </blockquote>
      {section.image && (
        <img 
          src={section.image} 
          alt="Depoimento"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
      )}
      <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
        {section.buttonText || 'Cliente'}
      </p>
    </CardContent>
  </Card>
);

export default LandingSections;
