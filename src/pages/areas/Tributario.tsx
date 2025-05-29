
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const TributarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Planejamento Tributário",
      description: "Estruturação de estratégias legais para otimizar a carga tributária de pessoas físicas e jurídicas.",
      path: "/servicos/planejamento-tributario"
    },
    {
      title: "Contencioso Administrativo e Judicial",
      description: "Defesa em processos fiscais junto aos órgãos administrativos e Poder Judiciário.",
      path: "/servicos/contencioso-tributario"
    },
    {
      title: "Recuperação de Créditos Tributários",
      description: "Identificação e recuperação de créditos fiscais pagos indevidamente ou a maior.",
      path: "/servicos/recuperacao-creditos"
    },
    {
      title: "Consultoria em Impostos",
      description: "Orientação especializada sobre a aplicação de impostos federais, estaduais e municipais.",
      path: "/servicos/consultoria-impostos"
    },
    {
      title: "Elisão Fiscal",
      description: "Estratégias legais para redução da carga tributária através de planejamento estruturado.",
      path: "/servicos/elisao-fiscal"
    },
    {
      title: "Auditoria Tributária",
      description: "Revisão completa da situação fiscal para identificar riscos e oportunidades de otimização.",
      path: "/servicos/auditoria-tributaria"
    },
    {
      title: "Parcelamento de Débitos",
      description: "Negociação e estruturação de parcelamentos fiscais junto aos órgãos competentes.",
      path: "/servicos/parcelamento-debitos"
    },
    {
      title: "Compliance Tributário",
      description: "Implementação de rotinas e controles para garantir conformidade com as obrigações fiscais.",
      path: "/servicos/compliance-tributario"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Tributário"
      description="Trata das leis e regulamentos relacionados a impostos e tributos. Isso inclui a interpretação e aplicação de leis fiscais, planejamento tributário, disputas fiscais e recursos relacionados a impostos."
      currentArea="tributario"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60 border-white/20' : 'bg-white/60 border-black/20'} transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{service.description}</p>
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

export default TributarioPage;
