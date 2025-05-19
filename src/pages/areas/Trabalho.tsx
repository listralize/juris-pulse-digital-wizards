
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const TrabalhoPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const services = [
    {
      title: "Assessoria em Relações Trabalhistas",
      description: "Orientação preventiva para empregadores sobre questões trabalhistas cotidianas e estratégicas."
    },
    {
      title: "Contencioso Trabalhista",
      description: "Defesa em reclamações trabalhistas individuais e coletivas em todas as instâncias."
    },
    {
      title: "Acordos Coletivos",
      description: "Negociação e elaboração de acordos e convenções coletivas com sindicatos."
    },
    {
      title: "Rescisões Contratuais",
      description: "Assessoria em demissões individuais e coletivas, minimizando riscos e passivos."
    },
    {
      title: "Compliance Trabalhista",
      description: "Implementação de programas de conformidade com a legislação trabalhista e previdenciária."
    },
    {
      title: "Consultoria Previdenciária",
      description: "Orientação sobre contribuições previdenciárias, benefícios e impactos nas relações de trabalho."
    },
    {
      title: "Defesa em Reclamações",
      description: "Representação legal de empresas e empregadores em processos trabalhistas."
    },
    {
      title: "Saúde e Segurança",
      description: "Consultoria sobre normas de segurança ocupacional e prevenção de acidentes de trabalho."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Trabalho"
      description="O Direito do Trabalho se concentra nas relações laborais, incluindo contratos de trabalho, salários, direitos e deveres de empregadores e empregados, segurança no trabalho e solução de conflitos trabalhistas."
      currentArea="trabalho"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className={`${
            isDark 
              ? 'bg-black border-white/10 hover:bg-white/5' 
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

export default TrabalhoPage;
