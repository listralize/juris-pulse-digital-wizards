
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Constitucional = () => {
  return (
    <DynamicAreaPage
      areaKey="constitucional"
      title="Direito Constitucional"
      description="Atuação especializada em questões constitucionais complexas, defesa de direitos fundamentais e controle de constitucionalidade."
      icon="📜"
      introText={[
        "O Direito Constitucional é a base de todo o ordenamento jurídico, estabelecendo os princípios fundamentais que regem a sociedade. Nossa equipe atua em questões constitucionais complexas, sempre com foco na proteção dos direitos e garantias fundamentais.",
        "Oferecemos assessoria especializada em controle de constitucionalidade, direitos fundamentais e questões que envolvem a interpretação da Constituição Federal, sempre com a expertise necessária para atuar nos tribunais superiores."
      ]}
    />
  );
};

export default Constitucional;
