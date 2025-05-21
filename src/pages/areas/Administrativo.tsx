
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const AdministrativoPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const services = [
    {
      title: "Licitações e Contratos Públicos",
      description: "Assessoria completa em participação de licitações e execução de contratos administrativos."
    },
    {
      title: "Processos Administrativos",
      description: "Representação em processos e procedimentos junto à Administração Pública."
    },
    {
      title: "Responsabilidade do Estado",
      description: "Atuação em casos de responsabilização civil do Estado por danos causados a particulares."
    },
    {
      title: "Direito dos Servidores Públicos",
      description: "Defesa de direitos e interesses de servidores em relações estatutárias."
    },
    {
      title: "Desapropriação e Intervenção",
      description: "Assessoria em processos de desapropriação, requisição e outras formas de intervenção estatal."
    },
    {
      title: "Atos Administrativos",
      description: "Contestação e anulação de atos administrativos ilegais ou abusivos."
    },
    {
      title: "Improbidade Administrativa",
      description: "Defesa em processos de improbidade e atuação preventiva para compliance público."
    },
    {
      title: "Regulação e Fiscalização",
      description: "Assessoria nas relações com agências reguladoras e órgãos de fiscalização."
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Administrativo"
      description="Trata das relações entre os cidadãos e a administração pública. Isso inclui questões como licitações, contratos públicos, responsabilidade do Estado, direitos dos administrados e a atuação de órgãos governamentais."
      currentArea="administrativo"
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
    </PracticeAreaLayout>
  );
};

export default AdministrativoPage;
