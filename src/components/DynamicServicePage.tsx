
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useServicePageData } from '../hooks/useServicePageData';
import ServiceLandingLayout from './ServiceLandingLayout';
import { useTheme } from './ThemeProvider';

const DynamicServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { servicePage, isLoading } = useServicePageData(serviceId);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  if (!servicePage) {
    return <Navigate to="/404" replace />;
  }

  // Determine service area based on category
  const getServiceAreaTitle = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      familia: 'Direito de Família',
      tributario: 'Direito Tributário',
      empresarial: 'Direito Empresarial',
      trabalho: 'Direito do Trabalho',
      constitucional: 'Direito Constitucional',
      administrativo: 'Direito Administrativo',
      previdenciario: 'Direito Previdenciário',
      consumidor: 'Direito do Consumidor',
      civil: 'Direito Civil'
    };
    return categoryMap[category] || 'Serviços Jurídicos';
  };

  const getMainAreaPath = (category: string) => {
    return `/${category}`;
  };

  return (
    <ServiceLandingLayout
      serviceArea={getServiceAreaTitle(servicePage.category)}
      serviceName={servicePage.title}
      serviceDescription={servicePage.description}
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={servicePage.benefits}
      process={servicePage.process}
      testimonials={servicePage.testimonials}
      faq={servicePage.faq}
      relatedServices={[]}
      mainAreaPath={getMainAreaPath(servicePage.category)}
    />
  );
};

export default DynamicServicePage;
