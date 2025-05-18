
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';

const TrabalhoPage = () => {
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
      <div className="mt-8 md:mt-16">
        <h2 className="text-3xl md:text-4xl font-canela mb-8 inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Serviços Especializados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-canela mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PracticeAreaLayout>
  );
};

export default TrabalhoPage;
