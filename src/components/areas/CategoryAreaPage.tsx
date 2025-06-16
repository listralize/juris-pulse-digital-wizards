
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { CategoryInfo, ServicePage } from '../../types/adminTypes';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import NotFound from '../../pages/NotFound';
import PracticeAreaLayout from '../PracticeAreaLayout';

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
    <PracticeAreaLayout 
      title={category.bannerTitle || category.label}
      description={category.bannerSubtitle || category.description}
      currentArea={category.label}
    >
      {/* Conteúdo Principal */}
      <div className="mb-12">
        {category.fullContent ? (
          <div className="prose prose-lg max-w-none">
            {category.fullContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className={`mb-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {category.description}
          </p>
        )}
      </div>

      {/* Serviços Especializados */}
      {categoryPages.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: category.color }}
            >
              {category.icon}
            </div>
            <h2 className={`text-2xl xl:text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              Serviços Jurídicos em {category.label}
            </h2>
          </div>
          
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Nossos serviços especializados em {category.label.toLowerCase()} para atender todas as suas necessidades jurídicas.
          </p>
          
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
        </div>
      )}
    </PracticeAreaLayout>
  );
};

export default CategoryAreaPage;
