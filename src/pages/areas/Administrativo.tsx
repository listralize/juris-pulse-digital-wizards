
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Administrativo = () => {
  return (
    <DynamicAreaPage
      areaKey="administrativo"
      title="Direito Administrativo"
      description="Assessoria especializada na relação entre administração pública e particulares, licitações, contratos administrativos e serviços públicos."
      icon="🏛️"
      introText={[
        "O Direito Administrativo regula as relações entre a Administração Pública e os particulares, bem como a organização e funcionamento dos órgãos públicos. Nossa equipe oferece assessoria especializada em todas as questões que envolvem o direito público.",
        "Atuamos em licitações, contratos administrativos, processos administrativos, responsabilidade civil do Estado e demais questões relacionadas ao direito público, sempre com foco na eficiência e legalidade."
      ]}
    />
  );
};

export default Administrativo;
