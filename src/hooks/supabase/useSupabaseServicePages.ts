import { useState, useEffect } from 'react';
import { ServicePage, CategoryInfo } from '../../types/adminTypes';
import { createFamiliaServicePages } from './servicePagesData/familiaServicePages';
import { createTributarioServicePages } from './servicePagesData/tributarioServicePages';
import { createEmpresarialServicePages } from './servicePagesData/empresarialServicePages';
import { createTrabalhoServicePages } from './servicePagesData/trabalhoServicePages';
import { createCivilServicePages } from './servicePagesData/civilServicePages';
import { createPrevidenciarioServicePages } from './servicePagesData/previdenciarioServicePages';
import { createConsumidorServicePages } from './servicePagesData/consumidorServicePages';
import { createConstitucionalServicePages } from './servicePagesData/constitucionalServicePages';
import { createAdministrativoServicePages } from './servicePagesData/administrativoServicePages';

const categories: CategoryInfo[] = [
  { label: 'Direito de Família', value: 'familia' },
  { label: 'Direito Tributário', value: 'tributario' },
  { label: 'Direito Empresarial', value: 'empresarial' },
  { label: 'Direito do Trabalho', value: 'trabalho' },
  { label: 'Direito Civil', value: 'civil' },
  { label: 'Direito Previdenciário', value: 'previdenciario' },
  { label: 'Direito do Consumidor', value: 'consumidor' },
  { label: 'Direito Constitucional', value: 'constitucional' },
  { label: 'Direito Administrativo', value: 'administrativo' }
];

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServicePages = () => {
      console.log('🔄 Carregando todas as 122 páginas de serviço...');
      
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

      console.log('✅ Total de páginas carregadas:', allPages.length);
      console.log('📊 Páginas por categoria:', {
        familia: allPages.filter(p => p.category === 'familia').length,
        tributario: allPages.filter(p => p.category === 'tributario').length,
        empresarial: allPages.filter(p => p.category === 'empresarial').length,
        trabalho: allPages.filter(p => p.category === 'trabalho').length,
        civil: allPages.filter(p => p.category === 'civil').length,
        previdenciario: allPages.filter(p => p.category === 'previdenciario').length,
        consumidor: allPages.filter(p => p.category === 'consumidor').length,
        constitucional: allPages.filter(p => p.category === 'constitucional').length,
        administrativo: allPages.filter(p => p.category === 'administrativo').length
      });

      setServicePages(allPages);
      setIsLoading(false);
    };

    loadServicePages();
  }, []);

  return {
    servicePages,
    categories,
    isLoading,
    refetch: () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
};
