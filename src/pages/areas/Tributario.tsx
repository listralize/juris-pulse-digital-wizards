
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Tributario = () => {
  return (
    <DynamicAreaPage
      areaKey="tributario"
      title="Direito Tributário"
      description="Expertise em planejamento tributário, contencioso e recuperação de créditos, sempre buscando a máxima eficiência fiscal dentro da legalidade."
      icon="💰"
      introText={[
        "O Direito Tributário é uma área complexa e em constante evolução, que requer conhecimento técnico especializado e atualização permanente. Nossa equipe oferece consultoria estratégica e defesa técnica para empresas e pessoas físicas em todas as esferas tributárias.",
        "Atuamos tanto na consultoria preventiva, ajudando nossos clientes a estruturar suas operações de forma eficiente e em conformidade com a legislação, quanto no contencioso tributário, defendendo os direitos dos contribuintes perante os órgãos fazendários e o Poder Judiciário."
      ]}
    />
  );
};

export default Tributario;
