
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Consumidor = () => {
  return (
    <DynamicAreaPage
      areaKey="consumidor"
      title="Direito do Consumidor"
      description="Proteção dos direitos dos consumidores em relações de consumo, defesa contra práticas abusivas e busca por indenizações."
      icon="🛒"
      introText={[
        "O Direito do Consumidor protege a parte mais vulnerável nas relações de consumo, garantindo direitos essenciais como qualidade, segurança e informação adequada sobre produtos e serviços. Nossa equipe atua na defesa dos consumidores contra práticas abusivas.",
        "Oferecemos assessoria completa em questões consumeristas, desde problemas com produtos e serviços defeituosos até práticas comerciais abusivas, sempre buscando a reparação integral dos danos sofridos."
      ]}
    />
  );
};

export default Consumidor;
