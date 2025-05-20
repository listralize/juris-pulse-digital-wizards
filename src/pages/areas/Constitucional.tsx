
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const ConstitucionalPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const services = [
    {
      title: "Ações de Inconstitucionalidade",
      description: "Representação em ações que visam declarar a inconstitucionalidade de leis ou atos normativos perante o Supremo Tribunal Federal."
    },
    {
      title: "Direitos Fundamentais",
      description: "Proteção e defesa dos direitos fundamentais garantidos pela Constituição Federal, como liberdade, igualdade e dignidade."
    },
    {
      title: "Liberdades Constitucionais",
      description: "Atuação na defesa das liberdades asseguradas pela Constituição, como liberdade de expressão, de reunião e de associação."
    },
    {
      title: "Igualdade e Não-Discriminação",
      description: "Defesa do princípio constitucional da igualdade e combate à discriminação em todas as suas formas."
    },
    {
      title: "Processos de Natureza Constitucional",
      description: "Atuação especializada em processos que envolvem questões de natureza constitucional em diversas instâncias judiciais."
    },
    {
      title: "Ações de Controle de Constitucionalidade",
      description: "Atuação em ADI, ADC, ADPF e outras ações do sistema brasileiro de controle de constitucionalidade."
    },
    {
      title: "Mandados de Segurança",
      description: "Impetração de mandados de segurança para proteger direito líquido e certo ameaçado ou violado por autoridade pública."
    },
    {
      title: "Habeas Corpus",
      description: "Defesa da liberdade de locomoção contra prisões ilegais ou ameaças à liberdade individual."
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
          <Card key={index} className={`${
            isDark 
              ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' 
              : 'bg-gray-100 border-gray-200 hover:bg-gray-50'
            } transition-all duration-300`}>
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default ConstitucionalPage;
