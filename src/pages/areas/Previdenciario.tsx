
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const PrevidenciarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Benefícios Previdenciários",
      description: "Assessoria na obtenção de aposentadorias por idade, tempo de contribuição, especial e por invalidez.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Pensões",
      description: "Orientação e representação em processos de concessão de pensão por morte e outros benefícios a dependentes.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Benefícios por Incapacidade",
      description: "Assessoria para obtenção e manutenção de benefícios por incapacidade temporária ou permanente.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Auxílio-Doença",
      description: "Representação em casos de solicitação, prorrogação ou restabelecimento de auxílio-doença.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Benefícios Assistenciais",
      description: "Orientação sobre o BPC/LOAS e outros benefícios assistenciais para idosos e pessoas com deficiência.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Revisão de Benefícios",
      description: "Análise e revisão de benefícios previdenciários já concedidos para correção de valores.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Planejamento Previdenciário",
      description: "Elaboração de estratégias personalizadas para maximizar os benefícios previdenciários futuros.",
      path: "/servicos/beneficios-previdenciarios"
    },
    {
      title: "Contencioso Previdenciário",
      description: "Representação em litígios administrativos e judiciais contra o INSS e outras entidades previdenciárias.",
      path: "/servicos/beneficios-previdenciarios"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Previdenciário"
      description="Esta área lida com a seguridade social, incluindo benefícios como aposentadoria, pensões, auxílio-doença e assistência social. A ST te auxilia na obtenção desses benefícios e na resolução de questões relacionadas."
      currentArea="previdenciario"
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

export default PrevidenciarioPage;
