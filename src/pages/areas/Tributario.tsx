
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import ServiceLinksMapper from '../../components/ServiceLinksMapper';
import { useAdminData } from '../../hooks/useAdminData';

const Tributario = () => {
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
      title={pageTexts.tributarioTitle}
      description={pageTexts.tributarioDescription}
      currentArea="tributario"
    >
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">
          O Direito Tributário é uma área complexa e em constante evolução, que requer 
          conhecimento técnico especializado e atualização permanente. Nossa equipe oferece 
          consultoria estratégica e defesa técnica para empresas e pessoas físicas em todas 
          as esferas tributárias.
        </p>
        
        <p className="text-lg leading-relaxed">
          Atuamos tanto na consultoria preventiva, ajudando nossos clientes a estruturar 
          suas operações de forma eficiente e em conformidade com a legislação, quanto no 
          contencioso tributário, defendendo os direitos dos contribuintes perante os órgãos 
          fazendários e o Poder Judiciário.
        </p>
      </div>
      
      <ServiceLinksMapper category="tributario" title="Direito Tributário" />
    </PracticeAreaLayout>
  );
};

export default Tributario;
