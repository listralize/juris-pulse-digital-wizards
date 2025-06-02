
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Previdenciario = () => {
  return (
    <DynamicAreaPage
      areaKey="previdenciario"
      title="Direito Previdenciário"
      description="Assessoria completa em benefícios previdenciários, aposentadorias, pensões e questões relacionadas à seguridade social."
      icon="🛡️"
      introText={[
        "O Direito Previdenciário é essencial para garantir a proteção social dos trabalhadores e seus dependentes. Nossa equipe especializada atua em todas as questões relacionadas aos benefícios previdenciários, sempre buscando os melhores resultados para nossos clientes.",
        "Oferecemos assessoria completa desde o planejamento previdenciário até a concessão e revisão de benefícios, incluindo aposentadorias, pensões, auxílios e demais prestações da seguridade social."
      ]}
    />
  );
};

export default Previdenciario;
