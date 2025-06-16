
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../PracticeAreaLayout';
import { Card, CardContent } from '../ui/card';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';

interface DynamicAreaPageProps {
  areaKey: string;
  title: string;
  description: string;
  icon: string;
  introText: string[];
}

export const DynamicAreaPage: React.FC<DynamicAreaPageProps> = ({
  areaKey,
  title,
  description,
  icon,
  introText
}) => {
  const { servicePages, categories, isLoading } = useSupabaseDataNew();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  console.log('🎯 DynamicAreaPage DADOS:', {
    areaKey,
    totalServicePages: servicePages?.length || 0,
    categoriesCount: categories?.length || 0,
    paginasPorCategoria: servicePages?.reduce((acc, page) => {
      if (page && page.category) {
        acc[page.category] = (acc[page.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>) || {}
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  // Encontrar a categoria correspondente
  const targetCategory = categories?.find(cat => 
    cat && cat.value === areaKey
  );

  console.log('🎯 Categoria encontrada:', targetCategory);

  // Filtrar serviços da categoria específica - correção da lógica de filtragem
  const areaServices = servicePages?.filter(page => {
    if (!page || !page.category) {
      return false;
    }
    
    // Usar category como está definido no tipo ServicePage
    const categoryToMatch = page.category;
    
    console.log(`🔍 Comparando: "${categoryToMatch}" === "${areaKey}" = ${categoryToMatch === areaKey}`);
    console.log('🔍 Página completa:', {
      id: page.id,
      title: page.title,
      category: page.category,
      benefits: page.benefits?.length || 0,
      process: page.process?.length || 0,
      faq: page.faq?.length || 0,
      testimonials: page.testimonials?.length || 0
    });
    
    return categoryToMatch === areaKey;
  }) || [];

  console.log(`📄 SERVIÇOS FILTRADOS para ${areaKey}:`, {
    total: areaServices.length,
    servicos: areaServices.map(s => ({ 
      title: s?.title || 'Sem título', 
      category: s?.category || 'Sem categoria',
      id: s?.id || 'Sem ID',
      hasContent: {
        benefits: s?.benefits?.length || 0,
        process: s?.process?.length || 0,
        faq: s?.faq?.length || 0,
        testimonials: s?.testimonials?.length || 0
      }
    }))
  });

  return (
    <PracticeAreaLayout
      title={title}
      description={description}
      currentArea={areaKey}
    >
      <div className="space-y-16">
        <div className="prose max-w-none">
          {introText.map((paragraph, index) => (
            <p key={index} className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {icon} Serviços Jurídicos em {title}
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Nossos serviços especializados em {title.toLowerCase()} para atender todas as suas necessidades jurídicas.
          </p>
        </div>

        {areaServices && areaServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaServices.map((service, serviceIndex) => {
              if (!service || !service.id) {
                return null;
              }
              
              return (
                <Card 
                  key={`${service.id}-${serviceIndex}`}
                  className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  onClick={() => {
                    if (service.href) {
                      const href = service.href.startsWith('/') ? service.href : `/servicos/${service.href}`;
                      navigate(href);
                    }
                  }}
                >
                  <CardContent className="p-6">
                    <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                      {service.title || 'Sem título'}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                      {service.description || 'Sem descrição'}
                    </p>
                    
                    {/* Debug: Mostrar se tem conteúdo */}
                    <div className={`text-xs mb-3 p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <p>Debug: Benefits: {service.benefits?.length || 0} | Process: {service.process?.length || 0} | FAQ: {service.faq?.length || 0} | Testimonials: {service.testimonials?.length || 0}</p>
                    </div>
                    
                    <p className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'} group-hover:underline`}>
                      Saiba mais →
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhum serviço encontrado para esta área.
            </p>
            <div className={`text-sm mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Debug: Área: {areaKey} | Categoria encontrada: {targetCategory?.name || 'N/A'} | Total de páginas no sistema: {servicePages?.length || 0}
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2`}>
                Categorias disponíveis: {servicePages?.map(p => p?.category).filter((v, i, a) => v && a.indexOf(v) === i).join(', ') || 'Nenhuma'}
              </p>
            </div>
          </div>
        )}
      </div>
    </PracticeAreaLayout>
  );
};
