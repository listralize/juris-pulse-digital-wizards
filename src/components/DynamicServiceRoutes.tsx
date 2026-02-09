import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSupabaseData } from '../hooks/useSupabaseData';
import DynamicServicePage from './DynamicServicePage';
import NotFound from '../pages/NotFound';
import { ServicePage } from '../types/adminTypes';
import { logger } from '@/utils/logger';

const DynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseData();
  const [currentPages, setCurrentPages] = useState<ServicePage[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (servicePages && Array.isArray(servicePages) && servicePages.length > 0) {
      setCurrentPages([...servicePages]);
    } else {
      setCurrentPages([]);
    }
  }, [servicePages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const pagesToRender = currentPages && currentPages.length > 0 ? currentPages : servicePages || [];

  if (!pagesToRender || pagesToRender.length === 0) {
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  const normalizePath = (href: string): string => {
    if (!href) return '';
    let path = href.replace(/\/+/g, '/');
    
    const prefixes = [
      '/services/services/', '/servicos/servicos/',
      '/services/', '/servicos/',
      'services/services/', 'servicos/servicos/',
      'services/', 'servicos/'
    ];
    for (const prefix of prefixes) {
      if (path.startsWith(prefix)) {
        path = path.slice(prefix.length);
        break;
      }
    }
    
    if (path.startsWith('/')) path = path.substring(1);
    if (path.endsWith('/')) path = path.slice(0, -1);
    return path;
  };

  return (
    <Routes>
      {pagesToRender.map((page) => {
        if (!page || !page.href || !page.id) return null;
        const normalizedPath = normalizePath(page.href);
        if (!normalizedPath) return null;

        if (page.redirectEnabled && page.redirectUrl) {
          const target = page.redirectUrl.trim();
          const isExternal = /^https?:\/\//i.test(target);
          const RedirectElement = () => {
            useEffect(() => {
              if (isExternal) {
                window.location.replace(target);
              }
            }, []);
            return isExternal ? (
              <div className="min-h-[40vh] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                  Redirecionando...
                </div>
              </div>
            ) : (
              <Navigate to={target.startsWith('/') ? target : `/${target}`} replace />
            );
          };

          return (
            <Route 
              key={`${page.id}-${normalizedPath}-redirect`} 
              path={normalizedPath} 
              element={<RedirectElement />} 
            />
          );
        }

        return (
          <Route 
            key={`${page.id}-${normalizedPath}`} 
            path={normalizedPath} 
            element={<DynamicServicePage pageData={page} categories={categories || []} />} 
          />
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DynamicServiceRoutes;
