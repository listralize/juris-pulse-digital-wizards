
import React, { useEffect } from 'react';
import ServiceLandingLayout from './ServiceLandingLayout';
import { ServicePage, CategoryInfo } from '../types/adminTypes';

interface DynamicServicePageProps {
  pageData: ServicePage;
  categories: CategoryInfo[];
}

const DynamicServicePage: React.FC<DynamicServicePageProps> = ({ pageData, categories }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryInfo = categories.find(cat => cat.value === pageData.category);
  const serviceArea = categoryInfo?.label || 'Serviços Jurídicos';
  const mainAreaPath = `/areas/${pageData.category}`;

  const getRelatedServices = (): Array<{ name: string; path: string }> => {
    try {
      const savedPages = localStorage.getItem('adminServicePages');
      if (savedPages) {
        const allPages: ServicePage[] = JSON.parse(savedPages);
        return allPages
          .filter(page => page.category === pageData.category && page.id !== pageData.id)
          .slice(0, 3)
          .map(page => ({
            name: page.title,
            path: page.href?.startsWith('/') ? page.href : `/servicos/${page.href}`
          }));
      }
    } catch (error) {
      console.error('Erro ao carregar serviços relacionados:', error);
    }
    return [];
  };

  // Transform testimonials to match ServiceLandingLayout expectations
  const transformedTestimonials = pageData.testimonials?.map(testimonial => ({
    name: testimonial.name,
    quote: testimonial.text, // Map 'text' to 'quote'
    image: testimonial.image
  })) || [];

  return (
    <ServiceLandingLayout
      serviceArea={serviceArea}
      serviceName={pageData.title}
      serviceDescription={pageData.description}
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={pageData.benefits || []}
      process={pageData.process || []}
      testimonials={transformedTestimonials}
      faq={pageData.faq || []}
      relatedServices={getRelatedServices()}
      mainAreaPath={mainAreaPath}
    />
  );
};

export default DynamicServicePage;
