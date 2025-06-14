
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';

const DynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();

  console.log('🚀 DynamicServiceRoutes:', {
    servicePagesCount: servicePages?.length || 0,
    categoriesCount: categories?.length || 0,
    isLoading
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Routes>
      {servicePages.map((page) => {
        if (!page.href) {
          console.warn('⚠️ Página sem href:', page.title);
          return null;
        }
        
        const path = page.href.startsWith('/servicos/') ? page.href.replace('/servicos/', '') : page.href;
        
        console.log('🔗 Criando rota:', { title: page.title, path, category: page.category });
        
        return (
          <Route 
            key={page.id} 
            path={path} 
            element={<DynamicServicePage pageData={page} categories={categories} />} 
          />
        );
      })}
    </Routes>
  );
};

export default DynamicServiceRoutes;
