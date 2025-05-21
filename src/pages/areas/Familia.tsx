
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import FamilyServiceLinks from '../../components/FamilyServiceLinks';

const FamiliaPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const services = [
    {
      title: "Casamento e União Estável",
      description: "Assessoria jurídica para formalização e regularização de casamentos e uniões estáveis, incluindo contratos e acordos pré-nupciais."
    },
    {
      title: "Divórcio e Separação",
      description: "Orientação e representação em processos de divórcio e separação, buscando soluções amigáveis ou litigiosas conforme necessário."
    },
    {
      title: "Guarda de Filhos",
      description: "Assessoria em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental."
    },
    {
      title: "Pensão Alimentícia",
      description: "Atuação em ações de fixação, revisão e execução de pensão alimentícia para filhos e ex-cônjuges."
    },
    {
      title: "Adoção",
      description: "Orientação e acompanhamento jurídico em processos de adoção, nacional ou internacional, e seus requisitos legais."
    },
    {
      title: "Inventário e Partilha de Bens",
      description: "Assessoria em processos de inventário e partilha de bens após falecimento ou em casos de divórcio."
    },
    {
      title: "Proteção de Menores",
      description: "Atuação jurídica para proteção dos direitos de crianças e adolescentes em situações de vulnerabilidade."
    },
    {
      title: "Testamentos e Sucessões",
      description: "Planejamento sucessório, elaboração de testamentos e resolução de questões sucessórias."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito da Família"
      description="É uma área do direito que lida com questões relacionadas às relações familiares, incluindo casamento, divórcio, guarda de crianças, pensão alimentícia, adoção, proteção de menores, entre outras."
      currentArea="familia"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300`}>
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700' + ' leading-relaxed'}>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className={`text-3xl font-canela mt-20 mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
        Conheça Nossos Serviços Detalhados
      </h3>
      
      <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Oferecemos soluções jurídicas personalizadas para cada situação familiar. Clique em um dos serviços abaixo para obter informações mais detalhadas:
      </p>
      
      <FamilyServiceLinks />
      
    </PracticeAreaLayout>
  );
};

export default FamiliaPage;
