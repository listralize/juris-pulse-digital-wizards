
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Empresarial = () => {
  return (
    <DynamicAreaPage
      areaKey="empresarial"
      title="Direito Empresarial"
      description="Soluções jurídicas estratégicas para empresas de todos os portes, desde a constituição até operações complexas e governança corporativa."
      icon="🏢"
      introText={[
        "O Direito Empresarial é fundamental para o sucesso e crescimento de qualquer negócio. Nossa equipe especializada oferece assessoria jurídica completa para empresas de todos os portes, desde startups até grandes corporações, em todas as fases de seu ciclo de vida.",
        "Atuamos de forma estratégica, entendendo o negócio de nossos clientes e oferecendo soluções jurídicas que agregam valor e contribuem para o crescimento sustentável das empresas."
      ]}
    />
  );
};

export default Empresarial;
