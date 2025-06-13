
import React from 'react';
import { Route } from 'react-router-dom';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';

export const useDynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();

  console.log('🚀 DynamicServiceRoutes:', {
    servicePagesCount: servicePages?.length || 0,
    categoriesCount: categories?.length || 0,
    isLoading
  });

  if (isLoading) {
    return [];
  }

  const routes = servicePages.map((page) => {
    if (!page.href) {
      console.warn('⚠️ Página sem href:', page.title);
      return null;
    }
    
    const path = page.href.startsWith('/') ? page.href : `/servicos/${page.href}`;
    
    console.log('🔗 Criando rota:', { title: page.title, path, category: page.category });
    
    return (
      <Route 
        key={page.id} 
        path={path} 
        element={<DynamicServicePage pageData={page} categories={categories} />} 
      />
    );
  }).filter(Boolean);

  console.log('✅ Rotas criadas:', routes.length);
  
  return routes;
};
