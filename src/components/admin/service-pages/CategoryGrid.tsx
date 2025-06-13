
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { CategoryInfo, ServicePage } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface CategoryGridProps {
  categories: CategoryInfo[];
  servicePages: ServicePage[];
  onCategorySelect: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, servicePages, onCategorySelect }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  console.log('🎯 CategoryGrid DADOS ATUALIZADOS:', {
    categoriesReceived: categories?.length || 0,
    servicePagesReceived: servicePages?.length || 0,
    categoriesData: categories,
    servicePagesData: servicePages
  });

  // Se não há categorias do Supabase, mostrar categorias padrão
  const defaultCategories: CategoryInfo[] = [
    {
      id: 'familia-default',
      value: 'familia',
      label: 'Direito de Família',
      name: 'Direito de Família',
      description: 'Proteção e orientação em questões familiares',
      icon: 'Heart',
      color: 'bg-rose-500'
    },
    {
      id: 'tributario-default',
      value: 'tributario',
      label: 'Direito Tributário',
      name: 'Direito Tributário',
      description: 'Consultoria e planejamento tributário',
      icon: 'Calculator',
      color: 'bg-blue-500'
    },
    {
      id: 'empresarial-default',
      value: 'empresarial',
      label: 'Direito Empresarial',
      name: 'Direito Empresarial',
      description: 'Suporte jurídico para empresas',
      icon: 'Building2',
      color: 'bg-green-500'
    },
    {
      id: 'trabalho-default',
      value: 'trabalho',
      label: 'Direito do Trabalho',
      name: 'Direito do Trabalho',
      description: 'Defesa dos direitos trabalhistas',
      icon: 'Users',
      color: 'bg-orange-500'
    },
    {
      id: 'constitucional-default',
      value: 'constitucional',
      label: 'Direito Constitucional',
      name: 'Direito Constitucional',
      description: 'Defesa de direitos fundamentais',
      icon: 'Scale',
      color: 'bg-purple-500'
    },
    {
      id: 'administrativo-default',
      value: 'administrativo',
      label: 'Direito Administrativo',
      name: 'Direito Administrativo',
      description: 'Atuação junto ao poder público',
      icon: 'FileText',
      color: 'bg-indigo-500'
    },
    {
      id: 'previdenciario-default',
      value: 'previdenciario',
      label: 'Direito Previdenciário',
      name: 'Direito Previdenciário',
      description: 'Benefícios previdenciários',
      icon: 'Shield',
      color: 'bg-yellow-500'
    },
    {
      id: 'consumidor-default',
      value: 'consumidor',
      label: 'Direito do Consumidor',
      name: 'Direito do Consumidor',
      description: 'Proteção aos direitos do consumidor',
      icon: 'ShoppingCart',
      color: 'bg-teal-500'
    },
    {
      id: 'civil-default',
      value: 'civil',
      label: 'Direito Civil',
      name: 'Direito Civil',
      description: 'Questões civis e contratuais',
      icon: 'Home',
      color: 'bg-gray-500'
    }
  ];

  const categoriesToShow = categories && categories.length > 0 ? categories : defaultCategories;

  console.log('📂 Categorias que serão exibidas:', categoriesToShow.length);

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
          📋 Mostrando {categoriesToShow.length} categorias 
          {categories && categories.length > 0 ? ' (carregadas do Supabase)' : ' (padrão - aguardando sincronização)'}
        </p>
        <p className={`text-xs mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          📄 Total de {servicePages?.length || 0} páginas de serviços no sistema
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesToShow.map((category) => {
          // Buscar páginas que correspondem a esta categoria usando comparação mais flexível
          const currentCategoryPages = servicePages?.filter(page => {
            const pageCategory = page.category?.toLowerCase()?.trim();
            const catKey = category.value?.toLowerCase()?.trim();
            const catName = category.name?.toLowerCase()?.trim();
            const catLabel = category.label?.toLowerCase()?.trim();
            
            return pageCategory === catKey || 
                   pageCategory === catName || 
                   pageCategory === catLabel ||
                   page.category === category.value ||
                   page.category === category.name ||
                   page.category === category.label;
          }) || [];
          
          console.log(`📂 ${category.label}: ${currentCategoryPages.length} páginas encontradas`, {
            categoryValue: category.value,
            categoryName: category.name,
            categoryLabel: category.label,
            pagesFound: currentCategoryPages.map(p => ({ title: p.title, category: p.category }))
          });
          
          return (
            <Card 
              key={category.id || category.value}
              className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
              onClick={() => onCategorySelect(category.value)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                  {currentCategoryPages.length}
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.label}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentCategoryPages.length} página{currentCategoryPages.length !== 1 ? 's' : ''} disponível{currentCategoryPages.length !== 1 ? 'eis' : ''}
                </p>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
