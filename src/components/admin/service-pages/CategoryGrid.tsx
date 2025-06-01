
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { categories } from '../../../types/adminTypes';
import { ServicePage } from '../../../types/adminTypes';
import { defaultServicePages } from '../../../data/defaultServicePages';
import { useTheme } from '../../ThemeProvider';

interface CategoryGridProps {
  servicePages: ServicePage[];
  onCategorySelect: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ servicePages, onCategorySelect }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => {
        // Conta páginas dos dados padrão para mostrar quantas páginas deveriam existir
        const defaultCategoryPages = defaultServicePages.filter(page => page.category === category.value);
        // Conta páginas atuais que o usuário já tem
        const currentCategoryPages = servicePages.filter(page => page.category === category.value);
        
        return (
          <Card 
            key={category.value}
            className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
            onClick={() => onCategorySelect(category.value)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                {defaultCategoryPages.length}
              </div>
              <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                {category.label}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {defaultCategoryPages.length} página{defaultCategoryPages.length !== 1 ? 's' : ''}
              </p>
              {currentCategoryPages.length !== defaultCategoryPages.length && (
                <p className={`text-xs mt-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  ({currentCategoryPages.length} carregadas)
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
