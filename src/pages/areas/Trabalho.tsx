
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import ServiceLinksMapper from '../../components/ServiceLinksMapper';
import { useAdminData } from '../../hooks/useAdminData';

const Trabalho = () => {
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
      title={pageTexts.trabalhoTitle}
      description={pageTexts.trabalhoDescription}
      currentArea="trabalho"
    >
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">
          O Direito do Trabalho é uma área dinâmica que exige conhecimento atualizado das 
          constantes mudanças na legislação trabalhista. Nossa equipe oferece assessoria 
          completa tanto para empregadores quanto para empregados, sempre buscando soluções 
          equilibradas e juridicamente seguras.
        </p>
        
        <p className="text-lg leading-relaxed">
          Atuamos tanto na consultoria preventiva, ajudando empresas a adequar suas práticas 
          às normas trabalhistas, quanto na defesa em processos trabalhistas, sempre com foco 
          na eficiência e na proteção dos direitos de nossos clientes.
        </p>
      </div>
      
      <ServiceLinksMapper category="trabalho" title="Direito do Trabalho" />
    </PracticeAreaLayout>
  );
};

export default Trabalho;
