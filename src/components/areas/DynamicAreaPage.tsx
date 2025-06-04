
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../PracticeAreaLayout';
import { Card, CardContent } from '../ui/card';
import { useTheme } from '../ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { ServicePage } from '../../types/adminTypes';

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
  const { servicePages, isLoading } = useAdminData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  // Filtrar serviços da categoria específica
  const areaServices = servicePages.filter(page => page.category === areaKey);

  // Adicionar serviços estáticos para áreas específicas
  const getStaticServices = () => {
    if (areaKey === 'familia') {
      return [
        {
          id: 'divorcio-separacao',
          title: 'Divórcio e Separação',
          description: 'Assessoria completa em processos de divórcio consensual e litigioso, dissolução de união estável e partilha de bens.',
          category: 'familia',
          href: '/servicos/divorcio-separacao',
          benefits: [],
          process: [],
          faq: [],
          testimonials: []
        },
        {
          id: 'guarda-filhos',
          title: 'Guarda de Filhos',
          description: 'Assessoria especializada em ações de guarda, regulamentação de visitas e proteção dos interesses das crianças.',
          category: 'familia',
          href: '/servicos/guarda-filhos',
          benefits: [],
          process: [],
          faq: [],
          testimonials: []
        },
        {
          id: 'pensao-alimenticia',
          title: 'Pensão Alimentícia',
          description: 'Cálculo, revisão e execução de pensão alimentícia para filhos e ex-cônjuges.',
          category: 'familia',
          href: '/servicos/pensao-alimenticia',
          benefits: [],
          process: [],
          faq: [],
          testimonials: []
        },
        {
          id: 'inventario-partilha',
          title: 'Inventário e Partilha',
          description: 'Resolução de sucessão familiar com inventários judiciais e extrajudiciais.',
          category: 'familia',
          href: '/servicos/inventario-partilha',
          benefits: [],
          process: [],
          faq: [],
          testimonials: []
        }
      ];
    }
    return [];
  };

  const staticServices = getStaticServices();
  const allServices = [...areaServices, ...staticServices];

  return (
    <PracticeAreaLayout
      title={title}
      description={description}
      currentArea={areaKey}
    >
      <div className="space-y-16">
        <div className="prose max-w-none">
          {introText.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
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

        {allServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, serviceIndex) => (
              <Card 
                key={serviceIndex}
                className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                onClick={() => {
                  navigate(service.href);
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
              Nenhum serviço cadastrado para esta área ainda.
            </p>
          </div>
        )}
      </div>
    </PracticeAreaLayout>
  );
};
