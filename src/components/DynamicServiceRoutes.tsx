
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';
import NotFound from '../pages/NotFound'; // Import NotFound for fallback
import { useTheme } from './ThemeProvider'; // For loading state styling

const DynamicServiceRoutes: React.FC = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();
  const { theme } = useTheme(); // For styling loading indicator
  const isDark = theme === 'dark';

  console.log('🚀 DynamicServiceRoutes Component:', {
    servicePagesCount: servicePages?.length || 0,
    categoriesCount: categories?.length || 0,
    isLoading
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        <p className={`ml-2 ${isDark ? 'text-white' : 'text-black'}`}>Carregando serviços...</p>
      </div>
    );
  }

  return (
    <Routes>
      {servicePages.map((page) => {
        if (!page.href) {
          console.warn('⚠️ Página de serviço sem href, não será roteada:', page.title);
          return null;
        }
        
        // Path should be relative to the parent /servicos/*
        // e.g., if href is "/servicos/meu-servico", relative path is "meu-servico"
        // if href is "meu-servico", relative path is "meu-servico"
        let relativePath = page.href;
        if (relativePath.startsWith('/servicos/')) {
          relativePath = relativePath.substring('/servicos/'.length);
        } else if (relativePath.startsWith('/')) {
          // If it starts with '/' but not '/servicos/', it might be an issue.
          // For now, we strip the leading '/' to make it relative.
          relativePath = relativePath.substring(1);
        }
        
        console.log('🔗 Criando rota dinâmica para:', { title: page.title, relativePath, category: page.category });
        
        return (
          <Route 
            key={page.id} 
            path={relativePath} 
            element={<DynamicServicePage pageData={page} categories={categories} />} 
          />
        );
      }).filter(Boolean)}
      {/* Fallback route for any path under /servicos/* not matched above */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DynamicServiceRoutes;
