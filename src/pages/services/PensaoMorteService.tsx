
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PensaoMorteService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito Previdenciário"
      serviceName="Pensão por Morte"
      serviceDescription="Assessoria especializada para obtenção da pensão por morte, garantindo suporte financeiro aos dependentes de segurado falecido."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Suporte aos Dependentes",
          description: "Garantia de renda mensal para cônjuge, companheiros e filhos dependentes."
        },
        {
          title: "Análise de Dependência",
          description: "Verificação e comprovação da condição de dependente junto ao INSS."
        },
        {
          title: "Cálculo Adequado",
          description: "Garantia do valor correto da pensão conforme as regras vigentes."
        },
        {
          title: "Recursos e Revisões",
          description: "Contestação de negativas e revisão de valores quando inadequados."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Verificação de Requisitos",
          description: "Análise da qualidade de segurado do falecido e condição de dependente dos requerentes."
        },
        {
          step: 2,
          title: "Documentação Necessária",
          description: "Organização de certidões, declarações e documentos comprobatórios da dependência."
        },
        {
          step: 3,
          title: "Cálculo da Pensão",
          description: "Determinação do valor correto conforme histórico contributivo e regras aplicáveis."
        },
        {
          step: 4,
          title: "Requerimento Administrativo",
          description: "Protocolo do pedido no INSS com toda documentação necessária."
        },
        {
          step: 5,
          title: "Acompanhamento do Processo",
          description: "Monitoramento até concessão e interposição de recursos se necessário."
        }
      ]}
      testimonials={[
        {
          name: "Maria C., Viúva",
          quote: "Consegui a pensão por morte após orientação sobre a documentação necessária. O suporte foi fundamental."
        },
        {
          name: "João S., Filho Dependente",
          quote: "A pensão foi concedida rapidamente com o acompanhamento profissional adequado."
        }
      ]}
      faq={[
        {
          question: "Quem tem direito à pensão por morte?",
          answer: "Têm direito cônjuge, companheiro(a), filhos menores de 21 anos ou inválidos, pais que comprovem dependência econômica, e irmãos menores de 21 anos ou inválidos (na ausência dos demais)."
        },
        {
          question: "Qual o valor da pensão por morte?",
          answer: "O valor é calculado sobre a aposentadoria que o segurado recebia ou teria direito. Para óbitos a partir de 13/11/2019, aplica-se cota de 50% + 10% por dependente, limitado a 100%."
        },
        {
          question: "A pensão por morte tem prazo de duração?",
          answer: "Para cônjuges/companheiros, a duração varia conforme idade do pensionista e tempo de casamento/união. Para filhos, até 21 anos (salvo invalidez). Pais e irmãos enquanto mantiverem a condição."
        }
      ]}
      relatedServices={[
        {
          name: "BPC/LOAS",
          path: "/servicos/bpc-loas"
        },
        {
          name: "Benefícios Previdenciários",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]}
      mainAreaPath="/previdenciario"
    />
  );
};

export default PensaoMorteService;
