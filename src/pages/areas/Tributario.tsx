
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Calculator, TrendingUp, Shield, FileText, AlertTriangle } from 'lucide-react';

const Tributario = () => {
  const { pageTexts, servicePages, isLoading } = useAdminData();
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

  // Filtrar serviços da categoria tributário
  const tributarioServices = servicePages.filter(page => page.category === 'tributario');

  // Agrupar serviços por categorias baseado nos títulos similares
  const serviceCategories = [
    {
      title: "Planejamento e Estratégia",
      icon: <Calculator className="w-8 h-8" />,
      description: "Estratégias avançadas para otimização tributária legal e eficiente.",
      services: tributarioServices.filter(service => 
        service.title.toLowerCase().includes('planejamento') ||
        service.title.toLowerCase().includes('elisão') ||
        service.title.toLowerCase().includes('estratégia')
      )
    },
    {
      title: "Recuperação e Créditos",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Recuperação de valores pagos indevidamente e gestão de créditos tributários.",
      services: tributarioServices.filter(service => 
        service.title.toLowerCase().includes('recuperação') ||
        service.title.toLowerCase().includes('crédito') ||
        service.title.toLowerCase().includes('parcelamento')
      )
    },
    {
      title: "Contencioso e Defesa",
      icon: <Shield className="w-8 h-8" />,
      description: "Defesa robusta em processos administrativos e judiciais tributários.",
      services: tributarioServices.filter(service => 
        service.title.toLowerCase().includes('contencioso') ||
        service.title.toLowerCase().includes('defesa')
      )
    },
    {
      title: "Consultoria e Compliance",
      icon: <FileText className="w-8 h-8" />,
      description: "Consultoria especializada e programas de conformidade tributária.",
      services: tributarioServices.filter(service => 
        service.title.toLowerCase().includes('consultoria') ||
        service.title.toLowerCase().includes('compliance') ||
        service.title.toLowerCase().includes('auditoria')
      )
    }
  ];

  // Adicionar serviços que não se encaixam em nenhuma categoria à primeira categoria
  const categorizedServiceIds = new Set();
  serviceCategories.forEach(category => {
    category.services.forEach(service => categorizedServiceIds.add(service.id));
  });

  const uncategorizedServices = tributarioServices.filter(service => 
    !categorizedServiceIds.has(service.id)
  );

  if (uncategorizedServices.length > 0) {
    serviceCategories[0].services.push(...uncategorizedServices);
  }

  // Filtrar categorias que têm serviços
  const categoriesWithServices = serviceCategories.filter(category => category.services.length > 0);

  return (
    <PracticeAreaLayout
      title={pageTexts.tributarioTitle}
      description={pageTexts.tributarioDescription}
      currentArea="tributario"
    >
      <div className="space-y-16">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            O Direito Tributário é uma área complexa e em constante evolução, que requer 
            conhecimento técnico especializado e atualização permanente. Nossa equipe oferece 
            consultoria estratégica e defesa técnica para empresas e pessoas físicas em todas 
            as esferas tributárias.
          </p>
          
          <p className="text-lg leading-relaxed">
            Atuamos tanto na consultoria preventiva, ajudando nossos clientes a estruturar 
            suas operações de forma eficiente e em conformidade com a legislação, quanto no 
            contencioso tributário, defendendo os direitos dos contribuintes perante os órgãos 
            fazendários e o Poder Judiciário.
          </p>
        </div>

        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            💰 Serviços Jurídicos em Direito Tributário
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Expertise em planejamento tributário, contencioso e recuperação de créditos, sempre buscando a máxima eficiência fiscal dentro da legalidade.
          </p>
        </div>

        {categoriesWithServices.map((category, categoryIndex) => (
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
                  onClick={() => {
                    const servicePath = service.href.startsWith('/') ? service.href : `/servicos/${service.href}`;
                    navigate(servicePath);
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
          </div>
        ))}

        {tributarioServices.length === 0 && (
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

export default Tributario;
