
import { useState, useEffect, useCallback } from 'react';
import { ServicePage, CategoryInfo, categories as defaultCategoriesList } from '../../types/adminTypes';
import {
  createFamiliaServicePages,
  createTributarioServicePages,
  createEmpresarialServicePages,
  createTrabalhoServicePages,
  createCivilServicePages,
  createPrevidenciarioServicePages,
  createConsumidorServicePages,
  createConstitucionalServicePages,
  createAdministrativoServicePages
} from './servicePagesData';

// Use the imported categories list which has the full CategoryInfo type
const categories: CategoryInfo[] = defaultCategoriesList;

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePagesState] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = useCallback(() => {
    console.log('🔄 (useSupabaseServicePages) Carregando todas as páginas de serviço estáticas...');
    setIsLoading(true);
    
    const allPages: ServicePage[] = [
      ...createFamiliaServicePages(),
      ...createTributarioServicePages(),
      ...createEmpresarialServicePages(),
      ...createTrabalhoServicePages(),
      ...createCivilServicePages(),
      ...createPrevidenciarioServicePages(),
      ...createConsumidorServicePages(),
      ...createConstitucionalServicePages(),
      ...createAdministrativoServicePages()
    ];

    console.log('✅ (useSupabaseServicePages) Total de páginas carregadas:', allPages.length);

    setServicePagesState(allPages);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadServicePages();
  }, [loadServicePages]);

  // Placeholder save function, as this data is static for now
  const saveServicePages = async (pagesToSave: ServicePage[]) => {
    console.log('💾 (useSupabaseServicePages) Tentativa de salvar páginas (placeholder):', pagesToSave.length);
    setServicePagesState(pagesToSave);
    return Promise.resolve();
  };

  const setServicePages = (newPages: ServicePage[]) => {
    console.log('🔄 (useSupabaseServicePages) Definindo páginas de serviço (placeholder):', newPages.length);
    setServicePagesState(newPages);
  };
  
  const refetch = useCallback(() => {
    console.log('🔄 (useSupabaseServicePages) Refetch chamado.');
    loadServicePages();
  }, [loadServicePages]);

  return {
    servicePages,
    categories,
    isLoading,
    loadServicePages,
    saveServicePages,
    setServicePages,
    refetch
  };
};
