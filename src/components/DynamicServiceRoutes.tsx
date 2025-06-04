
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { ServicePage, CategoryInfo } from '../types/adminTypes';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import DynamicServicePage from './DynamicServicePage';

export const useDynamicServiceRoutes = () => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();

  if (isLoading) {
    return [];
  }

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
