
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Familia = () => {
  return (
    <DynamicAreaPage
      areaKey="familia"
      title="Direito de Família"
      description="Assessoria completa e humanizada em todas as questões que envolvem as relações familiares."
      icon="👨‍👩‍👧‍👦"
      introText={[
        "O Direito de Família é uma das áreas mais sensíveis e importantes do direito civil, pois trata das relações familiares e dos aspectos mais íntimos da vida das pessoas. Nossa equipe especializada oferece assessoria completa e humanizada para todas as questões que envolvem as relações familiares.",
        "Trabalhamos sempre priorizando o diálogo e a busca por soluções amigáveis, mas quando necessário, oferecemos uma defesa técnica sólida e estratégica para proteger os direitos e interesses de nossos clientes."
      ]}
    />
  );
};

export default Familia;
