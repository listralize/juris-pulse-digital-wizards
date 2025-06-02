
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { ServicePage } from '../types/adminTypes';
import DynamicServicePage from './DynamicServicePage';

export const useDynamicServiceRoutes = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);

  useEffect(() => {
    const loadServicePages = () => {
      try {
        const savedPages = localStorage.getItem('adminServicePages');
        if (savedPages) {
          const parsedPages = JSON.parse(savedPages);
          if (Array.isArray(parsedPages)) {
            setServicePages(parsedPages);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar páginas de serviços:', error);
      }
    };

    loadServicePages();

    // Escutar atualizações das páginas de serviços
    const handleServicePagesUpdate = (event: CustomEvent) => {
      setServicePages(event.detail);
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);

    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    };
  }, []);

  return servicePages.map((page) => {
    if (!page.href) return null;
    
    const path = page.href.startsWith('/') ? page.href : `/servicos/${page.href}`;
    
    return (
      <Route 
        key={page.id} 
        path={path} 
        element={<DynamicServicePage pageData={page} />} 
      />
    );
  }).filter(Boolean);
};
