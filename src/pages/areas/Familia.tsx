
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const FamiliaPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Casamento e União Estável",
      description: "Assessoria jurídica para formalização e regularização de casamentos e uniões estáveis, incluindo contratos e acordos pré-nupciais.",
      path: "/servicos/casamento-uniao-estavel"
    },
    {
      title: "Divórcio e Separação",
      description: "Orientação e representação em processos de divórcio e separação, buscando soluções amigáveis ou litigiosas conforme necessário.",
      path: "/servicos/divorcio-separacao"
    },
    {
      title: "Guarda de Filhos",
      description: "Assessoria em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental.",
      path: "/servicos/guarda-filhos"
    },
    {
      title: "Pensão Alimentícia",
      description: "Atuação em ações de fixação, revisão e execução de pensão alimentícia para filhos e ex-cônjuges.",
      path: "/servicos/pensao-alimenticia"
    },
    {
      title: "Adoção",
      description: "Orientação e acompanhamento jurídico em processos de adoção, nacional ou internacional, e seus requisitos legais.",
      path: "/servicos/adocao"
    },
    {
      title: "Inventário e Partilha de Bens",
      description: "Assessoria em processos de inventário e partilha de bens após falecimento ou em casos de divórcio.",
      path: "/servicos/inventario-partilha"
    },
    {
      title: "Proteção de Menores",
      description: "Atuação jurídica para proteção dos direitos de crianças e adolescentes em situações de vulnerabilidade.",
      path: "/servicos/protecao-menores"
    },
    {
      title: "Testamentos e Sucessões",
      description: "Planejamento sucessório, elaboração de testamentos e resolução de questões sucessórias.",
      path: "/servicos/testamentos-sucessoes"
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
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700' + ' leading-relaxed'}>{service.description}</p>
              <p className={`mt-4 font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                Saiba mais →
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default FamiliaPage;
