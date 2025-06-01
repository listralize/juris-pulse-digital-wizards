
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Calculator, FileText, Shield, TrendingUp, Search, AlertTriangle } from 'lucide-react';
import { useServicePageData } from '../../hooks/useServicePageData';

const TributarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { servicePages, isLoading } = useServicePageData();
  
  // Filtrar apenas páginas da categoria tributário
  const tributarioPages = servicePages.filter(page => page.category === 'tributario');
  
  // Agrupar páginas por categoria de serviço
  const serviceCategories = [
    {
      title: "Planejamento e Otimização Tributária",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Estratégias legais para redução da carga tributária e otimização fiscal de pessoas físicas e jurídicas.",
      services: tributarioPages.filter(page => 
        page.title?.toLowerCase().includes('planejamento') || 
        page.title?.toLowerCase().includes('elisão') ||
        page.title?.toLowerCase().includes('consultoria')
      )
    },
    {
      title: "Contencioso e Defesa Fiscal",
      icon: <Shield className="w-8 h-8" />,
      description: "Representação em processos fiscais e defesa contra autuações e cobranças tributárias.",
      services: tributarioPages.filter(page => 
        page.title?.toLowerCase().includes('contencioso') || 
        page.title?.toLowerCase().includes('recuperação') ||
        page.title?.toLowerCase().includes('parcelamento')
      )
    },
    {
      title: "Auditoria e Compliance Fiscal",
      icon: <Search className="w-8 h-8" />,
      description: "Revisão, auditoria e implementação de controles para garantir conformidade tributária.",
      services: tributarioPages.filter(page => 
        page.title?.toLowerCase().includes('auditoria') || 
        page.title?.toLowerCase().includes('compliance')
      )
    },
    {
      title: "Outros Serviços Tributários",
      icon: <Calculator className="w-8 h-8" />,
      description: "Demais serviços especializados em Direito Tributário.",
      services: tributarioPages.filter(page => 
        !page.title?.toLowerCase().includes('planejamento') && 
        !page.title?.toLowerCase().includes('elisão') &&
        !page.title?.toLowerCase().includes('consultoria') &&
        !page.title?.toLowerCase().includes('contencioso') && 
        !page.title?.toLowerCase().includes('recuperação') &&
        !page.title?.toLowerCase().includes('parcelamento') &&
        !page.title?.toLowerCase().includes('auditoria') && 
        !page.title?.toLowerCase().includes('compliance')
      )
    }
  ];

  if (isLoading) {
    return (
      <PracticeAreaLayout
        title="Direito Tributário"
        description="Carregando serviços..."
        currentArea="tributario"
      >
        <div className="flex justify-center items-center py-12">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
        </div>
      </PracticeAreaLayout>
    );
  }

  return (
    <PracticeAreaLayout
      title="Direito Tributário"
      description="Trata das leis e regulamentos relacionados a impostos e tributos. Isso inclui a interpretação e aplicação de leis fiscais, planejamento tributário, disputas fiscais e recursos relacionados a impostos."
      currentArea="tributario"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            💼 Serviços Jurídicos em Direito Tributário
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as esferas do Direito Tributário, desde planejamento fiscal estratégico até defesa em contencioso, garantindo a otimização da carga tributária e conformidade legal.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => {
          // Só mostra a categoria se ela tiver serviços
          if (category.services.length === 0) return null;
          
          return (
            <div key={categoryIndex} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                    {category.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card 
                    key={serviceIndex}
                    className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                    onClick={() => navigate(service.href || `/servicos/${service.id}`)}
                  >
                    <CardContent className="p-6">
                      <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                        {service.title || 'Título não definido'}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                        {service.description || 'Descrição não definida'}
                      </p>
                      <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                        Saiba mais →
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {tributarioPages.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhuma página de serviço foi criada ainda para Direito Tributário.
              <br />
              Acesse o painel administrativo para criar novas páginas de serviços.
            </p>
          </div>
        )}
      </div>
    </PracticeAreaLayout>
  );
};

export default TributarioPage;
