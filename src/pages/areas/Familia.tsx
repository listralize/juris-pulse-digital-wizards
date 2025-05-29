
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Heart, Users, Shield, FileText, Home, Baby } from 'lucide-react';

const FamiliaPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Relações Conjugais",
      icon: <Heart className="w-8 h-8" />,
      description: "Assessoria jurídica completa para formalização, regulamentação e dissolução de relações conjugais.",
      services: [
        {
          name: "Casamento e União Estável",
          description: "Assessoria jurídica para formalização e regularização de casamentos e uniões estáveis, incluindo contratos e acordos pré-nupciais.",
          path: "/servicos/casamento-uniao-estavel"
        },
        {
          name: "Divórcio e Separação",
          description: "Orientação e representação em processos de divórcio e separação, buscando soluções amigáveis ou litigiosas conforme necessário.",
          path: "/servicos/divorcio-separacao"
        }
      ]
    },
    {
      title: "Direitos dos Filhos",
      icon: <Baby className="w-8 h-8" />,
      description: "Proteção integral dos direitos de crianças e adolescentes em todas as situações familiares.",
      services: [
        {
          name: "Guarda de Filhos",
          description: "Assessoria em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental.",
          path: "/servicos/guarda-filhos"
        },
        {
          name: "Pensão Alimentícia",
          description: "Atuação em ações de fixação, revisão e execução de pensão alimentícia para filhos e ex-cônjuges.",
          path: "/servicos/pensao-alimenticia"
        },
        {
          name: "Adoção",
          description: "Orientação e acompanhamento jurídico em processos de adoção, nacional ou internacional, e seus requisitos legais.",
          path: "/servicos/adocao"
        },
        {
          name: "Proteção de Menores",
          description: "Atuação jurídica para proteção dos direitos de crianças e adolescentes em situações de vulnerabilidade.",
          path: "/servicos/protecao-menores"
        }
      ]
    },
    {
      title: "Patrimônio e Sucessões",
      icon: <Home className="w-8 h-8" />,
      description: "Gestão patrimonial familiar, planejamento sucessório e resolução de questões hereditárias.",
      services: [
        {
          name: "Inventário e Partilha de Bens",
          description: "Assessoria em processos de inventário e partilha de bens após falecimento ou em casos de divórcio.",
          path: "/servicos/inventario-partilha"
        },
        {
          name: "Testamentos e Sucessões",
          description: "Planejamento sucessório, elaboração de testamentos e resolução de questões sucessórias.",
          path: "/servicos/testamentos-sucessoes"
        }
      ]
    }
  ];

  // Add auto-scroll to top when page loads
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PracticeAreaLayout
      title="Direito da Família"
      description="É uma área do direito que lida com questões relacionadas às relações familiares, incluindo casamento, divórcio, guarda de crianças, pensão alimentícia, adoção, proteção de menores, entre outras."
      currentArea="familia"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            👨‍👩‍👧‍👦 Serviços Jurídicos em Direito da Família
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as questões familiares, desde a constituição até a dissolução de vínculos, sempre priorizando o bem-estar familiar e a proteção dos direitos de todos os envolvidos.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                {category.icon}
              </div>
              <div className="text-center">
                <h3 className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-6 text-center">
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

export default FamiliaPage;
