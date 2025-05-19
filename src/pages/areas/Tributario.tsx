
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const TributarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const services = [
    {
      title: "Planejamento Tributário",
      description: "Estruturação de estratégias legais para otimizar a carga tributária de pessoas físicas e jurídicas."
    },
    {
      title: "Contencioso Administrativo e Judicial",
      description: "Defesa em processos fiscais junto aos órgãos administrativos e Poder Judiciário."
    },
    {
      title: "Recuperação de Créditos Tributários",
      description: "Identificação e recuperação de créditos fiscais pagos indevidamente ou a maior."
    },
    {
      title: "Consultoria em Impostos",
      description: "Orientação especializada sobre a aplicação de impostos federais, estaduais e municipais."
    },
    {
      title: "Análise de Benefícios Fiscais",
      description: "Avaliação e implementação de incentivos e benefícios fiscais aplicáveis ao negócio."
    },
    {
      title: "Gestão de Passivos Tributários",
      description: "Assessoria na administração e negociação de dívidas tributárias e parcelamentos."
    },
    {
      title: "Defesas em Autuações Fiscais",
      description: "Elaboração de defesas administrativas e judiciais contra autos de infração."
    },
    {
      title: "Recursos Administrativos e Judiciais",
      description: "Interposição de recursos em todas as instâncias administrativas e judiciais."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Tributário"
      description="Trata das leis e regulamentos relacionados a impostos e tributos. Isso inclui a interpretação e aplicação de leis fiscais, planejamento tributário, disputas fiscais e recursos relacionados a impostos."
      currentArea="tributario"
    >
      <h2 className="text-4xl font-canela mb-16 text-white">Serviços Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="bg-black/80 border-white/10 border hover:bg-black/60 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-canela mb-4 text-white">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default TributarioPage;
