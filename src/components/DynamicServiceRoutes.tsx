
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';
import { ServicePage } from '../types/adminTypes';

const DynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();
  const [currentPages, setCurrentPages] = useState<ServicePage[]>([]);
  const [routeKey, setRouteKey] = useState(0);

  console.log('🚀 DynamicServiceRoutes renderizando:', {
    servicePagesCount: servicePages?.length || 0,
    currentPagesCount: currentPages.length,
    isLoading,
    routeKey,
    servicePages: servicePages?.slice(0, 3)?.map(p => ({ id: p.id, title: p.title, href: p.href }))
  });

  // Atualizar páginas quando servicePages mudar
  useEffect(() => {
    if (servicePages && servicePages.length > 0) {
      console.log('🔄 DynamicServiceRoutes: Atualizando páginas do useSupabaseDataNew');
      console.log('📄 Páginas recebidas:', servicePages.map(p => ({ id: p.id, title: p.title, href: p.href })));
      setCurrentPages([...servicePages]);
      setRouteKey(prev => prev + 1); // Força re-render das rotas
    }
  }, [servicePages]);

  // Escutar eventos de atualização
  useEffect(() => {
    const handleServicePagesUpdate = (event: CustomEvent) => {
      console.log('📡 DynamicServiceRoutes: Evento servicePagesUpdated recebido');
      const updatedPages = event.detail?.pages;
      if (updatedPages && Array.isArray(updatedPages)) {
        console.log('📄 Páginas do evento:', updatedPages.map(p => ({ id: p.id, title: p.title, href: p.href })));
        setCurrentPages([...updatedPages]);
        setRouteKey(prev => prev + 1); // Força re-render das rotas
      }
    };

    const handleRoutesUpdate = (event: CustomEvent) => {
      console.log('📡 DynamicServiceRoutes: Evento routesNeedUpdate recebido');
      const updatedPages = event.detail?.pages;
      if (updatedPages && Array.isArray(updatedPages)) {
        console.log('📄 Páginas do evento routes:', updatedPages.map(p => ({ id: p.id, title: p.title, href: p.href })));
        setCurrentPages([...updatedPages]);
        setRouteKey(prev => prev + 1); // Força re-render das rotas
      }
    };

    const handlePagesLoaded = (event: CustomEvent) => {
      console.log('📡 DynamicServiceRoutes: Evento servicePagesLoaded recebido');
      const loadedPages = event.detail?.pages;
      if (loadedPages && Array.isArray(loadedPages)) {
        console.log('📄 Páginas carregadas:', loadedPages.map(p => ({ id: p.id, title: p.title, href: p.href })));
        setCurrentPages([...loadedPages]);
        setRouteKey(prev => prev + 1);
      }
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    window.addEventListener('routesNeedUpdate', handleRoutesUpdate as EventListener);
    window.addEventListener('servicePagesLoaded', handlePagesLoaded as EventListener);
    
    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
      window.removeEventListener('routesNeedUpdate', handleRoutesUpdate as EventListener);
      window.removeEventListener('servicePagesLoaded', handlePagesLoaded as EventListener);
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

  console.log('🗺️ DynamicServiceRoutes: Criando rotas para', pagesToRender.length, 'páginas');

  return (
    <Routes key={`routes-${routeKey}`}>
      {pagesToRender.map((page) => {
        if (!page.href) {
          console.warn('⚠️ Página sem href:', page.title);
          return null;
        }
        
        // Normalizar o path para garantir formato correto
        let path = page.href;
        
        // Se já tem o prefixo /servicos/, remover
        if (path.startsWith('/servicos/')) {
          path = path.replace('/servicos/', '');
        }
        
        // Se tem apenas /, remover
        if (path.startsWith('/')) {
          path = path.substring(1);
        }
        
        console.log('🔗 Criando rota:', { 
          title: page.title, 
          originalHref: page.href,
          normalizedPath: path, 
          fullPath: `/services/${path}`,
          category: page.category 
        });
        
        return (
          <Route 
            key={`${page.id}-${routeKey}-${page.href}`} 
            path={path} 
            element={<DynamicServicePage pageData={page} categories={categories || []} />} 
          />
        );
      })}
    </Routes>
  );
};

export default DynamicServiceRoutes;
