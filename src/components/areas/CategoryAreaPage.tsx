
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { CategoryInfo, ServicePage } from '../../types/adminTypes';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import NotFound from '../../pages/NotFound';

interface CategoryAreaPageProps {
  categorySlug?: string;
}

const CategoryAreaPage: React.FC<CategoryAreaPageProps> = ({ categorySlug: propCategorySlug }) => {
  const { '*': urlSlug } = useParams();
  const categorySlug = propCategorySlug || urlSlug;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { servicePages, isLoading: pagesLoading } = useSupabaseDataNew();
  const { categories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [categoryPages, setCategoryPages] = useState<ServicePage[]>([]);

  console.log('🔍 CategoryAreaPage: categoria slug:', categorySlug);

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0 && categorySlug) {
      const foundCategory = categories.find(cat => cat.value === categorySlug);
      setCategory(foundCategory || null);
      console.log('🔍 Categoria encontrada:', foundCategory);
    }
  }, [categories, categoriesLoading, categorySlug]);

  useEffect(() => {
    if (!pagesLoading && servicePages.length > 0 && categorySlug) {
      const filteredPages = servicePages.filter(page => page.category === categorySlug);
      setCategoryPages(filteredPages);
      console.log('📄 Páginas da categoria:', filteredPages.length);
    }
  }, [servicePages, pagesLoading, categorySlug]);

  const isLoading = categoriesLoading || pagesLoading;

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  if (!category) {
    console.log('❌ Categoria não encontrada para slug:', categorySlug);
    return <NotFound />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDark ? 'border-white/10' : 'border-gray-200'} py-6`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-24">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/"
              className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: category.color }}
            >
              {category.icon}
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                {category.label}
              </h1>
              <p className={`text-lg mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-24 py-12">
        {categoryPages.length > 0 ? (
          <>
            <h2 className={`text-2xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
              Serviços Disponíveis ({categoryPages.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPages.map((page) => (
                <Link
                  key={page.id}
                  to={`/services/${page.href}`}
                  className="group block"
                >
                  <div className={`p-6 rounded-lg border ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-white border-gray-200 hover:border-gray-400'} transition-all duration-300 group-hover:scale-105 h-full`}>
                    <h3 className={`text-xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {page.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-3`}>
                      {page.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-500 group-hover:text-blue-400">
                      <span>Ver detalhes</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {category.icon}
            </div>
            <h2 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Área em Desenvolvimento
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Estamos preparando conteúdo especializado para {category.label}.
            </p>
            <Link
              to="/#areas"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} transition-colors`}
            >
              Ver outras áreas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryAreaPage;
