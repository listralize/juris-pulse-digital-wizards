import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';
import { CategoryInfo, ServicePage } from '../../types/adminTypes';
import { ExternalLink } from 'lucide-react';
import NotFound from '../../pages/NotFound';
import Navbar from '../navbar';
import PageBanner from '../PageBanner';
import WhatsAppButton from '../WhatsAppButton';
import Footer from '../sections/Footer';
import CtaSection from '../serviceLanding/CtaSection';

interface CategoryAreaPageProps {
  categorySlug?: string;
}

const CategoryAreaPage: React.FC<CategoryAreaPageProps> = ({ categorySlug: propCategorySlug }) => {
  const { '*': urlSlug } = useParams();
  const categorySlug = propCategorySlug || urlSlug;
  const { servicePages, isLoading: pagesLoading } = useSupabaseData();
  const { categories, isLoading: categoriesLoading } = useSupabaseLawCategories();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [categoryPages, setCategoryPages] = useState<ServicePage[]>([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0 && categorySlug) {
      const foundCategory = categories.find(cat => cat.value === categorySlug);
      setCategory(foundCategory || null);
    }
  }, [categories, categoriesLoading, categorySlug]);

  useEffect(() => {
    if (!pagesLoading && servicePages.length > 0 && categorySlug) {
      const filteredPages = servicePages.filter(page => page.category === categorySlug);
      setCategoryPages(filteredPages);
    }
  }, [servicePages, pagesLoading, categorySlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLoading = categoriesLoading || pagesLoading;

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  if (!category) {
    return <NotFound />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <Navbar />
      
      <PageBanner 
        title={category.bannerTitle || category.label}
        subtitle={category.bannerSubtitle || category.description}
        bgImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      />
      
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="max-w-6xl mx-auto">
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

          {categoryPages.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${
                    isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
                  }`}
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
                    <div className={`p-6 rounded-lg border transition-all duration-300 group-hover:scale-105 h-full ${
                      isDark 
                        ? 'bg-black/50 border-white/10 hover:border-white/30' 
                        : 'bg-white/80 border-gray-200 hover:border-gray-400'
                    }`}>
                      <h3 className={`text-xl font-canela mb-3 transition-colors ${
                        isDark 
                          ? 'text-white group-hover:text-gray-200' 
                          : 'text-black group-hover:text-gray-800'
                      }`}>
                        {page.title}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-3 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {page.description}
                      </p>
                      <div className={`flex items-center gap-2 text-sm transition-colors ${
                        isDark 
                          ? 'text-blue-400 group-hover:text-blue-300' 
                          : 'text-blue-600 group-hover:text-blue-500'
                      }`}>
                        <span>Ver detalhes</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {category && <CtaSection serviceArea={category.label} respectTheme={true} />}
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};

export default CategoryAreaPage;
