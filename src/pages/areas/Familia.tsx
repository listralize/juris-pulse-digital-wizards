
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import ServiceLinksMapper from '../../components/ServiceLinksMapper';
import { useAdminData } from '../../hooks/useAdminData';

const Familia = () => {
  const { pageTexts, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <PracticeAreaLayout
      title={pageTexts.familiaTitle}
      description={pageTexts.familiaDescription}
      currentArea="familia"
    >
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">
          O Direito de Família é uma das áreas mais sensíveis e importantes do direito civil, 
          pois trata das relações familiares e dos aspectos mais íntimos da vida das pessoas. 
          Nossa equipe especializada oferece assessoria completa e humanizada para todas as 
          questões que envolvem as relações familiares.
        </p>
        
        <p className="text-lg leading-relaxed">
          Trabalhamos sempre priorizando o diálogo e a busca por soluções amigáveis, mas quando 
          necessário, oferecemos uma defesa técnica sólida e estratégica para proteger os direitos 
          e interesses de nossos clientes.
        </p>
      </div>
      
      <ServiceLinksMapper category="familia" title="Direito de Família" />
    </PracticeAreaLayout>
  );
};

export default Familia;
