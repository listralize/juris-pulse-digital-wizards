
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Building2, FileText, Users, Shield, Lightbulb } from 'lucide-react';

const Empresarial = () => {
  const { pageTexts, isLoading } = useAdminData();
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

  const serviceCategories = [
    {
      title: "Constituição e Estruturação",
      icon: <Building2 className="w-8 h-8" />,
      description: "Assessoria completa para criação e estruturação de empresas de todos os portes.",
      services: [
        {
          name: "Constituição de Empresas",
          description: "Assessoria completa na abertura e estruturação de empresas de todos os portes.",
          path: "/servicos/constituicao-empresas"
        },
        {
          name: "Reestruturação Societária",
          description: "Reorganização societária, fusões, aquisições e alterações contratuais.",
          path: "/servicos/reestruturacao-societaria"
        }
      ]
    },
    {
      title: "Contratos e Documentos",
      icon: <FileText className="w-8 h-8" />,
      description: "Elaboração e revisão de contratos empresariais estratégicos.",
      services: [
        {
          name: "Contratos Empresariais",
          description: "Elaboração e revisão de contratos comerciais, societários e de prestação de serviços.",
          path: "/servicos/contratos-empresariais"
        }
      ]
    },
    {
      title: "Compliance e Governança",
      icon: <Shield className="w-8 h-8" />,
      description: "Implementação de programas de conformidade e boas práticas corporativas.",
      services: [
        {
          name: "Compliance Empresarial",
          description: "Implementação de programas de conformidade e boas práticas corporativas.",
          path: "/servicos/compliance-empresarial"
        }
      ]
    },
    {
      title: "Propriedade Intelectual",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Proteção de ativos intangíveis e propriedade intelectual.",
      services: [
        {
          name: "Propriedade Intelectual",
          description: "Proteção de marcas, patentes e direitos autorais.",
          path: "/servicos/propriedade-intelectual"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title={pageTexts.empresarialTitle}
      description={pageTexts.empresarialDescription}
      currentArea="empresarial"
    >
      <div className="space-y-16">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            O Direito Empresarial é fundamental para o sucesso e crescimento de qualquer negócio. 
            Nossa equipe especializada oferece assessoria jurídica completa para empresas de todos 
            os portes, desde startups até grandes corporações, em todas as fases de seu ciclo de vida.
          </p>
          
          <p className="text-lg leading-relaxed">
            Atuamos de forma estratégica, entendendo o negócio de nossos clientes e oferecendo 
            soluções jurídicas que agregam valor e contribuem para o crescimento sustentável das empresas.
          </p>
        </div>

        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🏢 Serviços Jurídicos em Direito Empresarial
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Soluções jurídicas estratégicas para empresas de todos os portes, desde a constituição até operações complexas e governança corporativa.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
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
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-6">
                    <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                      {service.name}
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
      </div>
    </PracticeAreaLayout>
  );
};

export default Empresarial;
