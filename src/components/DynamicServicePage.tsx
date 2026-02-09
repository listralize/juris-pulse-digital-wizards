import React, { useEffect, useState } from 'react';
import ServiceLandingLayout from './ServiceLandingLayout';
import { ServicePage, CategoryInfo } from '../types/adminTypes';
import { useSupabaseData } from '../hooks/useSupabaseData';

interface DynamicServicePageProps {
  pageData: ServicePage;
  categories: CategoryInfo[];
}

const DynamicServicePage: React.FC<DynamicServicePageProps> = ({ pageData: initialPageData, categories }) => {
  const { servicePages } = useSupabaseData();
  const [pageData, setPageData] = useState<ServicePage>(initialPageData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update page data when servicePages changes
  useEffect(() => {
    if (servicePages && servicePages.length > 0) {
      const updatedPage = servicePages.find(page => 
        page.id === pageData.id || page.href === pageData.href
      );
      
      if (updatedPage && JSON.stringify(updatedPage) !== JSON.stringify(pageData)) {
        setPageData(updatedPage);
      }
    }
  }, [servicePages, pageData.id, pageData.href]);

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

  const transformedTestimonials = pageData.testimonials?.map(testimonial => ({
    name: testimonial.name,
    quote: testimonial.text,
    image: testimonial.image
  })) || [];

  const transformedBenefits = pageData.benefits?.map(benefit => ({
    title: benefit.title,
    description: benefit.description,
    icon: benefit.icon
  })) || [];

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
