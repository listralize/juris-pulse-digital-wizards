
import React from 'react';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import ServiceLinksMapper from '../../components/ServiceLinksMapper';
import { useAdminData } from '../../hooks/useAdminData';

const Empresarial = () => {
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
      title={pageTexts.empresarialTitle}
      description={pageTexts.empresarialDescription}
      currentArea="empresarial"
    >
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">
          O Direito Empresarial é fundamental para o sucesso e crescimento de qualquer negócio. 
          Nossa equipe especializada oferece assessoria jurídica completa para empresas de todos 
          os portes, desde startups até grandes corporações, em todas as fases de seu ciclo de vida.
        </p>
        
        <p className="text-lg leading-relaxed">
          Atuamos de forma estratégica, entendendo o negócio de nossos clientes e oferecendo 
          soluções jurídicas que agregam valor e contribuem para o crescimento sustentável das empresas.
        </p>
      </div>
      
      <ServiceLinksMapper category="empresarial" title="Direito Empresarial" />
    </PracticeAreaLayout>
  );
};

export default Empresarial;
