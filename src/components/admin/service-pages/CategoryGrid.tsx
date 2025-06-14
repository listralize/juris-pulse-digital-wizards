
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

  console.log('🎯 CategoryGrid DADOS RECEBIDOS:', {
    categoriesCount: categories?.length || 0,
    servicePagesCount: servicePages?.length || 0,
    servicePages: servicePages?.slice(0, 3).map(p => ({ id: p.id, title: p.title, category: p.category }))
  });

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
          📋 Exibindo {categories.length} categorias | 📄 Total de {servicePages?.length || 0} páginas de serviços
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          // Filtrar páginas por categoria usando múltiplas comparações
          const categoryPages = servicePages?.filter(page => {
            const pageCategory = page.category?.toLowerCase?.()?.trim?.();
            const categoryValue = category.value?.toLowerCase?.()?.trim?.();
            const categoryName = category.name?.toLowerCase?.()?.trim?.();
            const categoryLabel = category.label?.toLowerCase?.()?.trim?.();
            
            return pageCategory === categoryValue || 
                   pageCategory === categoryName || 
                   pageCategory === categoryLabel;
          }) || [];
          
          console.log(`📂 ${category.label}: ${categoryPages.length} páginas`, {
            categoryValue: category.value,
            pagesSample: categoryPages.slice(0, 2).map(p => ({ title: p.title, category: p.category }))
          });
          
          return (
            <Card 
              key={category.id || category.value}
              className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
              onClick={() => onCategorySelect(category.value)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}
                     style={{ backgroundColor: category.color }}>
                  {categoryPages.length}
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.label}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {categoryPages.length} página{categoryPages.length !== 1 ? 's' : ''} disponível{categoryPages.length !== 1 ? 'eis' : ''}
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
