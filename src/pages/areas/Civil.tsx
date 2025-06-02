
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Civil = () => {
  return (
    <DynamicAreaPage
      areaKey="civil"
      title="Direito Civil"
      description="Assessoria abrangente em questões cíveis, contratos, responsabilidade civil, direitos reais e sucessões."
      icon="⚖️"
      introText={[
        "O Direito Civil é a base das relações privadas, regulamentando os direitos e deveres dos indivíduos em suas relações pessoais e patrimoniais. Nossa equipe oferece assessoria completa em todas as áreas do direito civil.",
        "Atuamos em contratos, responsabilidade civil, direitos reais, sucessões, direito de família e demais questões cíveis, sempre com foco na proteção dos direitos e interesses de nossos clientes."
      ]}
    />
  );
};

export default Civil;
