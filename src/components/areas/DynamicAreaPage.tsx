
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
  const { servicePages, isLoading } = useSupabaseDataNew();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  console.log('🔍 DynamicAreaPage dados:', {
    areaKey,
    servicePages: servicePages?.length || 0,
    allCategories: servicePages?.map(p => p.category) || []
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  // Filtrar serviços da categoria específica com verificações de segurança
  const areaServices = servicePages?.filter(page => {
    if (!page) return false;
    
    // Verificar se a categoria corresponde
    const pageCategory = page.category_id || page.category;
    return pageCategory === areaKey;
  }) || [];

  console.log('📄 Serviços filtrados:', {
    areaKey,
    found: areaServices.length,
    services: areaServices.map(s => ({ title: s.title, category: s.category_id || s.category, href: s.href }))
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
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Área procurada: {areaKey}
            </p>
          </div>
        )}
      </div>
    </PracticeAreaLayout>
  );
};
