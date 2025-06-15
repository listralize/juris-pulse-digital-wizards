
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

  console.log('🎯 CategoryGrid RENDERIZANDO:', {
    categoriesCount: categories?.length || 0,
    servicePagesCount: servicePages?.length || 0,
    firstPage: servicePages?.[0] ? { id: servicePages[0].id, title: servicePages[0].title, category: servicePages[0].category } : 'nenhuma'
  });

  // Garantir que temos arrays válidos
  const validCategories = categories || [];
  const validServicePages = servicePages || [];

  // Debug: mostrar todas as categorias das páginas
  const allPageCategories = validServicePages.map(p => p.category);
  console.log('📋 Todas as categorias das páginas:', allPageCategories);
  console.log('📂 Categorias únicas:', [...new Set(allPageCategories)]);

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
          📋 Exibindo {validCategories.length} categorias | 📄 Total de {validServicePages.length} páginas de serviços
        </p>
        {validServicePages.length > 0 && (
          <p className={`text-xs mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            ✅ Páginas carregadas: {validServicePages.slice(0, 3).map(p => p.title).join(', ')}...
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {validCategories.map((category) => {
          // Usar múltiplas estratégias de filtro para encontrar páginas
          const categoryPages = validServicePages.filter(page => {
            // Estratégia 1: Match exato com category.value
            if (page.category === category.value) return true;
            
            // Estratégia 2: Match exato com category.id (UUID)
            if (page.category === category.id) return true;
            
            // Estratégia 3: Match com category.name (backwards compatibility)
            if (page.category === category.name) return true;
            
            // Estratégia 4: Match case-insensitive
            const pageCategory = page.category?.toLowerCase().trim();
            const categoryValue = category.value?.toLowerCase().trim();
            if (pageCategory === categoryValue) return true;
            
            return false;
          });
          
          console.log(`📂 ${category.label}: ${categoryPages.length} páginas encontradas`, {
            categoryValue: category.value,
            categoryId: category.id,
            categoryName: category.name,
            foundPages: categoryPages.map(p => ({ title: p.title, category: p.category }))
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
