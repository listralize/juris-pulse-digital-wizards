
import React from 'react';
import { DynamicAreaPage } from '../../components/areas/DynamicAreaPage';

const Trabalho = () => {
  return (
    <DynamicAreaPage
      areaKey="trabalho"
      title="Direito do Trabalho"
      description="Assessoria completa em relações trabalhistas, desde consultoria preventiva até defesa em processos, sempre buscando soluções equilibradas e eficazes."
      icon="⚖️"
      introText={[
        "O Direito do Trabalho é uma área dinâmica que exige conhecimento atualizado das constantes mudanças na legislação trabalhista. Nossa equipe oferece assessoria completa tanto para empregadores quanto para empregados, sempre buscando soluções equilibradas e juridicamente seguras.",
        "Atuamos tanto na consultoria preventiva, ajudando empresas a adequar suas práticas às normas trabalhistas, quanto na defesa em processos trabalhistas, sempre com foco na eficiência e na proteção dos direitos de nossos clientes."
      ]}
    />
  );
};

export default Trabalho;
