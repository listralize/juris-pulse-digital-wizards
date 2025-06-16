
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';
import NotFound from '../pages/NotFound';
import { ServicePage } from '../types/adminTypes';

const DynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();
  const [currentPages, setCurrentPages] = useState<ServicePage[]>([]);
  const location = useLocation();

  console.log('🚀 DynamicServiceRoutes renderizando:', {
    servicePagesCount: servicePages?.length || 0,
    currentPagesCount: currentPages.length,
    isLoading,
    currentPath: location.pathname,
    servicePages: servicePages?.slice(0, 3)?.map(p => ({ id: p.id, title: p.title, href: p.href }))
  });

  // Atualizar páginas quando servicePages mudar
  useEffect(() => {
    if (servicePages && Array.isArray(servicePages) && servicePages.length > 0) {
      console.log('🔄 DynamicServiceRoutes: Atualizando páginas do useSupabaseDataNew');
      console.log('📄 Páginas recebidas:', servicePages.map(p => ({ id: p.id, title: p.title, href: p.href })));
      setCurrentPages([...servicePages]);
    } else {
      console.log('⚠️ DynamicServiceRoutes: Nenhuma página válida recebida');
      setCurrentPages([]);
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
      }
    };

    const handleRoutesUpdate = (event: CustomEvent) => {
      console.log('📡 DynamicServiceRoutes: Evento routesNeedUpdate recebido');
      const updatedPages = event.detail?.pages;
      if (updatedPages && Array.isArray(updatedPages)) {
        console.log('📄 Páginas do evento routes:', updatedPages.map(p => ({ id: p.id, title: p.title, href: p.href })));
        setCurrentPages([...updatedPages]);
      }
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    window.addEventListener('routesNeedUpdate', handleRoutesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
      window.removeEventListener('routesNeedUpdate', handleRoutesUpdate as EventListener);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const pagesToRender = currentPages && currentPages.length > 0 ? currentPages : servicePages || [];

  console.log('🗺️ DynamicServiceRoutes: Criando rotas para', pagesToRender.length, 'páginas');

  if (!pagesToRender || pagesToRender.length === 0) {
    console.log('⚠️ DynamicServiceRoutes: Nenhuma página para renderizar');
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {pagesToRender.map((page) => {
        if (!page || !page.href || !page.id) {
          console.warn('⚠️ Página inválida:', page);
          return null;
        }
        
        // Normalizar o path - garantir que não há duplicação de prefixos
        let path = page.href;
        
        // Remover todos os prefixos conhecidos
        if (path.startsWith('/services/')) {
          path = path.replace('/services/', '');
        } else if (path.startsWith('/servicos/')) {
          path = path.replace('/servicos/', '');
        } else if (path.startsWith('services/')) {
          path = path.replace('services/', '');
        } else if (path.startsWith('servicos/')) {
          path = path.replace('servicos/', '');
        }
        
        // Remover barra inicial se existir
        if (path.startsWith('/')) {
          path = path.substring(1);
        }
        
        // Garantir que não está vazio
        if (!path) {
          console.warn('⚠️ Path vazio após normalização para página:', page.title);
          return null;
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
            key={`${page.id}-${path}`} 
            path={path} 
            element={<DynamicServicePage pageData={page} categories={categories || []} />} 
          />
        );
      })}
      
      {/* Rota de fallback para URLs não encontradas dentro de /services */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DynamicServiceRoutes;
