
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

  console.log('🎯 CategoryGrid RENDER:', {
    categoriesReceived: categories?.length || 0,
    servicePagesReceived: servicePages?.length || 0,
    categoriesData: categories
  });

  // Se não há categorias, mostrar mensagem
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Nenhuma categoria encontrada.
        </p>
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          As categorias precisam ser migradas do localStorage para o Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => {
        const currentCategoryPages = servicePages.filter(page => page.category === category.value);
        
        console.log(`📂 ${category.label}: páginas encontradas=${currentCategoryPages.length}`);
        
        return (
          <Card 
            key={category.value}
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
