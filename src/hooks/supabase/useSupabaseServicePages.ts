
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
  { 
    id: 'familia',
    name: 'Direito de Família',
    label: 'Direito de Família', 
    value: 'familia',
    description: 'Assessoria em questões familiares',
    icon: '👨‍👩‍👧‍👦',
    color: '#E11D48'
  },
  { 
    id: 'tributario',
    name: 'Direito Tributário',
    label: 'Direito Tributário', 
    value: 'tributario',
    description: 'Planejamento e consultoria tributária',
    icon: '💰',
    color: '#059669'
  },
  { 
    id: 'empresarial',
    name: 'Direito Empresarial',
    label: 'Direito Empresarial', 
    value: 'empresarial',
    description: 'Assessoria para empresas',
    icon: '🏢',
    color: '#0EA5E9'
  },
  { 
    id: 'trabalho',
    name: 'Direito do Trabalho',
    label: 'Direito do Trabalho', 
    value: 'trabalho',
    description: 'Relações trabalhistas',
    icon: '👷',
    color: '#DC2626'
  },
  { 
    id: 'civil',
    name: 'Direito Civil',
    label: 'Direito Civil', 
    value: 'civil',
    description: 'Questões civis diversas',
    icon: '📄',
    color: '#7C3AED'
  },
  { 
    id: 'previdenciario',
    name: 'Direito Previdenciário',
    label: 'Direito Previdenciário', 
    value: 'previdenciario',
    description: 'Benefícios previdenciários',
    icon: '👴',
    color: '#EA580C'
  },
  { 
    id: 'consumidor',
    name: 'Direito do Consumidor',
    label: 'Direito do Consumidor', 
    value: 'consumidor',
    description: 'Proteção do consumidor',
    icon: '🛡️',
    color: '#10B981'
  },
  { 
    id: 'constitucional',
    name: 'Direito Constitucional',
    label: 'Direito Constitucional', 
    value: 'constitucional',
    description: 'Direitos fundamentais',
    icon: '⚖️',
    color: '#F59E0B'
  },
  { 
    id: 'administrativo',
    name: 'Direito Administrativo',
    label: 'Direito Administrativo', 
    value: 'administrativo',
    description: 'Questões administrativas',
    icon: '🏛️',
    color: '#8B5CF6'
  }
];

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = () => {
    console.log('🔄 Carregando todas as páginas de serviço...');
    
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

  const saveServicePages = async (pages: ServicePage[]) => {
    console.log('💾 Salvando páginas de serviços...');
    setServicePages(pages);
    return Promise.resolve();
  };

  useEffect(() => {
    loadServicePages();
  }, []);

  return {
    servicePages,
    categories,
    isLoading,
    loadServicePages,
    saveServicePages,
    setServicePages,
    refetch: () => {
      setIsLoading(true);
      setTimeout(() => {
        loadServicePages();
      }, 100);
    }
  };
};
