
import React, { useEffect } from 'react';
import ServiceLandingLayout from './ServiceLandingLayout';
import { ServicePage, CategoryInfo } from '../types/adminTypes';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';

interface DynamicServicePageProps {
  pageData: ServicePage;
  categories: CategoryInfo[];
}

const DynamicServicePage: React.FC<DynamicServicePageProps> = ({ pageData, categories }) => {
  const { servicePages } = useSupabaseDataNew();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryInfo = categories.find(cat => cat.value === pageData.category);
  const serviceArea = categoryInfo?.label || 'Serviços Jurídicos';
  const mainAreaPath = `/areas/${pageData.category}`;

  const getRelatedServices = (): Array<{ name: string; path: string }> => {
    return servicePages
      .filter(page => page.category === pageData.category && page.id !== pageData.id)
      .slice(0, 3)
      .map(page => ({
        name: page.title,
        path: page.href?.startsWith('/') ? page.href : `/servicos/${page.href}`
      }));
  };

  // Transform testimonials to match ServiceLandingLayout expectations
  const transformedTestimonials = pageData.testimonials?.map(testimonial => ({
    name: testimonial.name,
    quote: testimonial.text,
    image: testimonial.image
  })) || [];

  // Transform benefits with default values
  const transformedBenefits = pageData.benefits?.map(benefit => ({
    title: benefit.title,
    description: benefit.description,
    icon: benefit.icon
  })) || [];

  // Transform process with default values
  const transformedProcess = pageData.process?.map(step => ({
    step: step.step,
    title: step.title,
    description: step.description
  })) || [];

  return (
    <ServiceLandingLayout
      serviceArea={serviceArea}
      serviceName={pageData.title}
      serviceDescription={pageData.description}
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={transformedBenefits}
      process={transformedProcess}
      testimonials={transformedTestimonials}
      faq={pageData.faq || []}
      relatedServices={getRelatedServices()}
      mainAreaPath={mainAreaPath}
    />
  );
};

export default DynamicServicePage;
