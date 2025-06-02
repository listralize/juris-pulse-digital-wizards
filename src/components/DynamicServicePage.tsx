
import React, { useEffect } from 'react';
import ServiceLandingLayout from './ServiceLandingLayout';
import { ServicePage } from '../types/adminTypes';
import { categories } from '../types/adminTypes';

interface DynamicServicePageProps {
  pageData: ServicePage;
}

const DynamicServicePage: React.FC<DynamicServicePageProps> = ({ pageData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Encontrar a categoria e área correspondente
  const categoryInfo = categories.find(cat => cat.value === pageData.category);
  const serviceArea = categoryInfo?.label || 'Serviços Jurídicos';
  const mainAreaPath = `/areas/${pageData.category}`;

  // Gerar serviços relacionados baseado na mesma categoria
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
            path: page.href.startsWith('/') ? page.href : `/servicos/${page.href}`
          }));
      }
    } catch (error) {
      console.error('Erro ao carregar serviços relacionados:', error);
    }
    return [];
  };

  return (
    <ServiceLandingLayout
      serviceArea={serviceArea}
      serviceName={pageData.title}
      serviceDescription={pageData.description}
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={pageData.benefits || []}
      process={pageData.process || []}
      testimonials={pageData.testimonials || []}
      faq={pageData.faq || []}
      relatedServices={getRelatedServices()}
      mainAreaPath={mainAreaPath}
    />
  );
};

export default DynamicServicePage;
