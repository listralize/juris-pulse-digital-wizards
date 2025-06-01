
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { useAdminData } from '../../hooks/useAdminData';
import { Briefcase, Shield, FileCheck, Scale } from 'lucide-react';

const Trabalho = () => {
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
      title: "Consultoria e Assessoria",
      icon: <Briefcase className="w-8 h-8" />,
      description: "Consultoria preventiva e estratégica em relações trabalhistas.",
      services: [
        {
          name: "Assessoria Trabalhista",
          description: "Consultoria preventiva e estratégica em relações trabalhistas.",
          path: "/servicos/assessoria-trabalhista"
        }
      ]
    },
    {
      title: "Contencioso e Defesa",
      icon: <Scale className="w-8 h-8" />,
      description: "Defesa especializada em ações trabalhistas e processos na Justiça do Trabalho.",
      services: [
        {
          name: "Contencioso Trabalhista",
          description: "Defesa em ações trabalhistas e processos perante a Justiça do Trabalho.",
          path: "/servicos/contencioso-trabalhista"
        }
      ]
    },
    {
      title: "Compliance e Conformidade",
      icon: <FileCheck className="w-8 h-8" />,
      description: "Adequação às normas trabalhistas e implementação de boas práticas.",
      services: [
        {
          name: "Compliance Trabalhista",
          description: "Adequação às normas trabalhistas e implementação de boas práticas.",
          path: "/servicos/compliance-trabalhista"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title={pageTexts.trabalhoTitle}
      description={pageTexts.trabalhoDescription}
      currentArea="trabalho"
    >
      <div className="space-y-16">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            O Direito do Trabalho é uma área dinâmica que exige conhecimento atualizado das 
            constantes mudanças na legislação trabalhista. Nossa equipe oferece assessoria 
            completa tanto para empregadores quanto para empregados, sempre buscando soluções 
            equilibradas e juridicamente seguras.
          </p>
          
          <p className="text-lg leading-relaxed">
            Atuamos tanto na consultoria preventiva, ajudando empresas a adequar suas práticas 
            às normas trabalhistas, quanto na defesa em processos trabalhistas, sempre com foco 
            na eficiência e na proteção dos direitos de nossos clientes.
          </p>
        </div>

        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            ⚖️ Serviços Jurídicos em Direito do Trabalho
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Assessoria completa em relações trabalhistas, desde consultoria preventiva até defesa em processos, sempre buscando soluções equilibradas e eficazes.
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

export default Trabalho;
