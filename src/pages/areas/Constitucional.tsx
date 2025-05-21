
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const ConstitucionalPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Ações de Inconstitucionalidade",
      description: "Representação em ações que visam declarar a inconstitucionalidade de leis ou atos normativos perante o Supremo Tribunal Federal.",
      path: "/servicos/direitos-fundamentais"
    },
    {
      title: "Direitos Fundamentais",
      description: "Proteção e defesa dos direitos fundamentais garantidos pela Constituição Federal, como liberdade, igualdade e dignidade.",
      path: "/servicos/direitos-fundamentais"
    },
    {
      title: "Liberdades Constitucionais",
      description: "Atuação na defesa das liberdades asseguradas pela Constituição, como liberdade de expressão, de reunião e de associação.",
      path: "/servicos/liberdades-constitucionais"
    },
    {
      title: "Igualdade e Não-Discriminação",
      description: "Defesa do princípio constitucional da igualdade e combate à discriminação em todas as suas formas.",
      path: "/servicos/direitos-fundamentais"
    },
    {
      title: "Processos de Natureza Constitucional",
      description: "Atuação especializada em processos que envolvem questões de natureza constitucional em diversas instâncias judiciais.",
      path: "/servicos/direitos-fundamentais"
    },
    {
      title: "Ações de Controle de Constitucionalidade",
      description: "Atuação em ADI, ADC, ADPF e outras ações do sistema brasileiro de controle de constitucionalidade.",
      path: "/servicos/direitos-fundamentais"
    },
    {
      title: "Mandados de Segurança",
      description: "Impetração de mandados de segurança para proteger direito líquido e certo ameaçado ou violado por autoridade pública.",
      path: "/servicos/liberdades-constitucionais"
    },
    {
      title: "Habeas Corpus",
      description: "Defesa da liberdade de locomoção contra prisões ilegais ou ameaças à liberdade individual.",
      path: "/servicos/liberdades-constitucionais"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Constitucional"
      description="Trata das leis fundamentais que regem um país, incluindo a Constituição. Essa área abrange a estrutura do governo, os direitos individuais e coletivos, a organização dos poderes e as garantias fundamentais."
      currentArea="constitucional"
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

export default ConstitucionalPage;
