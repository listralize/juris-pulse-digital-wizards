
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
      acc[page.category] = (acc[page.category] || 0) + 1;
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

  // Filtrar serviços da categoria específica com comparação exata
  const areaServices = servicePages?.filter(page => {
    return page.category === areaKey;
  }) || [];

  console.log(`📄 SERVIÇOS FILTRADOS para ${areaKey}:`, {
    total: areaServices.length,
    servicos: areaServices.map(s => ({ title: s.title, category: s.category }))
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

        {areaServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaServices.map((service, serviceIndex) => (
              <Card 
                key={`${service.id}-${serviceIndex}`}
                className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                onClick={() => {
                  const href = service.href?.startsWith('/') ? service.href : `/servicos/${service.href}`;
                  navigate(href);
                }}
              >
                <CardContent className="p-6">
                  <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                    {service.title}
                  </h4>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                    {service.description}
                  </p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                    Saiba mais →
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Carregando serviços para esta área...
            </p>
            <div className={`text-sm mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Área: {areaKey} | Total de páginas no sistema: {servicePages?.length || 0}
              </p>
            </div>
          </div>
        )}
      </div>
    </PracticeAreaLayout>
  );
};
