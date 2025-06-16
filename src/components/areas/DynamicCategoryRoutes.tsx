
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import CategoryAreaPage from './CategoryAreaPage';
import NotFound from '../../pages/NotFound';

const DynamicCategoryRoutes = () => {
  const { categories, isLoading } = useSupabaseLawCategories();

  console.log('🗺️ DynamicCategoryRoutes: Criando rotas para categorias:', categories?.length || 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    console.log('⚠️ DynamicCategoryRoutes: Nenhuma categoria encontrada');
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {categories.map((category) => {
        if (!category || !category.value) {
          console.warn('⚠️ Categoria inválida:', category);
          return null;
        }
        
        console.log('🔗 Criando rota para categoria:', { 
          value: category.value, 
          label: category.label,
          path: `${category.value}`
        });
        
        return (
          <Route 
            key={category.id || category.value} 
            path={category.value} 
            element={<CategoryAreaPage categorySlug={category.value} />} 
          />
        );
      })}
      
      {/* Rota de fallback para URLs não encontradas dentro de /areas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DynamicCategoryRoutes;
