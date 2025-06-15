
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';
import { ServicePage } from '../types/adminTypes';

const DynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();
  const [currentPages, setCurrentPages] = useState<ServicePage[]>([]);

  console.log('🚀 DynamicServiceRoutes:', {
    servicePagesCount: servicePages?.length || 0,
    categoriesCount: categories?.length || 0,
    isLoading
  });

  // Atualizar páginas quando servicePages mudar
  useEffect(() => {
    if (servicePages && servicePages.length > 0) {
      setCurrentPages([...servicePages]);
    }
  }, [servicePages]);

  // Escutar mudanças nas páginas
  useEffect(() => {
    const handleServicePagesUpdate = (event: CustomEvent) => {
      console.log('🔄 DynamicServiceRoutes detectou atualização');
      const updatedPages = event.detail?.pages;
      if (updatedPages && Array.isArray(updatedPages)) {
        setCurrentPages([...updatedPages]);
      }
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const pagesToRender = currentPages.length > 0 ? currentPages : servicePages || [];

  return (
    <Routes>
      {pagesToRender.map((page) => {
        if (!page.href) {
          console.warn('⚠️ Página sem href:', page.title);
          return null;
        }
        
        const path = page.href.startsWith('/servicos/') ? page.href.replace('/servicos/', '') : page.href;
        
        console.log('🔗 Criando rota:', { title: page.title, path, category: page.category });
        
        return (
          <Route 
            key={`${page.id}-${Date.now()}`} 
            path={path} 
            element={<DynamicServicePage pageData={page} categories={categories} />} 
          />
        );
      })}
    </Routes>
  );
};

export default DynamicServiceRoutes;
