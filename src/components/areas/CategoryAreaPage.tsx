
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
  const { servicePages, isLoading: pagesLoading } = useSupabaseDataNew();
  const { categories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [categoryPages, setCategoryPages] = useState<ServicePage[]>([]);

  console.log('🔍 CategoryAreaPage: categoria slug:', categorySlug);
  console.log('🔍 CategoryAreaPage: categorias disponíveis:', categories.map(c => ({ key: c.value, name: c.name })));

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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
              <p key={index} className="mb-6 text-lg leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-lg leading-relaxed text-gray-300">
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
            <h2 className="text-2xl xl:text-3xl font-canela text-white">
              Serviços Jurídicos em {category.label}
            </h2>
          </div>
          
          <p className="text-lg mb-8 text-gray-300">
            Nossos serviços especializados em {category.label.toLowerCase()} para atender todas as suas necessidades jurídicas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPages.map((page) => (
              <Link
                key={page.id}
                to={`/services/${page.href}`}
                className="group block"
              >
                <div className="p-6 rounded-lg border bg-black/50 border-white/10 hover:border-white/30 transition-all duration-300 group-hover:scale-105 h-full">
                  <h3 className="text-xl font-canela mb-3 text-white group-hover:text-gray-200">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
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
