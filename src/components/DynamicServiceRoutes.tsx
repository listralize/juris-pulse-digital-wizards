
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { ServicePage, CategoryInfo } from '../types/adminTypes';
import { categories as defaultCategories } from '../types/adminTypes';
import DynamicServicePage from './DynamicServicePage';

export const useDynamicServiceRoutes = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>(defaultCategories);

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

    const loadCategories = () => {
      try {
        const savedCategories = localStorage.getItem('adminCategories');
        if (savedCategories) {
          const parsedCategories = JSON.parse(savedCategories);
          if (Array.isArray(parsedCategories)) {
            setCategories(parsedCategories);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    loadServicePages();
    loadCategories();

    const handleServicePagesUpdate = (event: CustomEvent) => {
      setServicePages(event.detail);
    };

    const handleCategoriesUpdate = (event: CustomEvent) => {
      setCategories(event.detail);
    };

    window.addEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
    window.addEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);

    return () => {
      window.removeEventListener('servicePagesUpdated', handleServicePagesUpdate as EventListener);
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdate as EventListener);
    };
  }, []);

  return servicePages.map((page) => {
    if (!page.href) return null;
    
    const path = page.href.startsWith('/') ? page.href : `/servicos/${page.href}`;
    
    return (
      <Route 
        key={page.id} 
        path={path} 
        element={<DynamicServicePage pageData={page} categories={categories} />} 
      />
    );
  }).filter(Boolean);
};
