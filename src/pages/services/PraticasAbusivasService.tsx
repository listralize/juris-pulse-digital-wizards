
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PraticasAbusivasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Práticas Abusivas"
      serviceDescription="Atuação especializada contra cobranças indevidas, vendas casadas e outras práticas comerciais abusivas, garantindo a proteção dos seus direitos enquanto consumidor."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação Especializada",
          description: "Reconhecimento preciso de práticas comerciais consideradas abusivas pela legislação e jurisprudência atual."
        },
        {
          title: "Cessação Imediata",
          description: "Estratégias para interromper prontamente as práticas abusivas, evitando danos continuados."
        },
        {
          title: "Compensação Adequada",
          description: "Busca de indenização proporcional aos danos sofridos, incluindo devolução em dobro de valores cobrados indevidamente."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise da Prática",
          description: "Verificação detalhada da conduta do fornecedor para confirmar sua caracterização como prática abusiva conforme a legislação."
        },
        {
          step: 2,
          title: "Documentação de Evidências",
          description: "Coleta e organização de provas como contratos, publicidades, gravações, testemunhas e outros elementos que comprovem a abusividade."
        },
        {
          step: 3,
          title: "Notificação Formal",
          description: "Envio de notificação ao fornecedor exigindo o fim da prática abusiva e reparação pelos danos causados."
        },
        {
          step: 4,
          title: "Reclamação nos Órgãos de Proteção",
          description: "Registro da reclamação em órgãos como Procon, plataformas de reclamação online e agências reguladoras específicas."
        },
        {
          step: 5,
          title: "Medidas Judiciais",
          description: "Quando necessário, ajuizamento de ação para obter tutela judicial que interrompa as práticas e garanta indenização."
        }
      ]}
      testimonials={[
        {
          name: "Luciana R.",
          quote: "Consegui cancelar um pacote de serviços que me foi imposto como condição para contratação do que eu realmente queria, além de receber de volta tudo o que paguei indevidamente."
        },
        {
          name: "Alexandre P.",
          quote: "Após anos sofrendo com cobranças indevidas em minha fatura de telefone, finalmente consegui não só o cancelamento como também a devolução em dobro de todos os valores."
        },
        {
          name: "Grupo de Consumidores",
          quote: "Nossa ação coletiva contra práticas abusivas de uma grande empresa resultou em mudanças significativas nas políticas comerciais e compensação para todos os afetados."
        }
      ]}
      faq={[
        {
          question: "O que são consideradas práticas abusivas no Código de Defesa do Consumidor?",
          answer: "O CDC considera abusivas diversas práticas, incluindo: condicionar o fornecimento de produto ou serviço ao fornecimento de outro (venda casada), recusar atendimento às demandas dos consumidores, enviar produtos ou serviços sem solicitação prévia, prevalecer-se da fraqueza ou ignorância do consumidor, exigir vantagem manifestamente excessiva, entre outras listadas no artigo 39 do CDC."
        },
        {
          question: "O que é a devolução em dobro em cobranças indevidas?",
          answer: "De acordo com o artigo 42 do CDC, o consumidor cobrado em quantia indevida tem direito à repetição do indébito (devolução do valor cobrado indevidamente) por valor igual ao dobro do que pagou em excesso, acrescido de correção monetária e juros legais. Essa penalidade não se aplica apenas em casos de erro justificável por parte do fornecedor."
        },
        {
          question: "É possível obter dano moral por práticas abusivas?",
          answer: "Sim, quando a prática abusiva causa frustração, constrangimento, perda de tempo produtivo significativa (teoria do desvio produtivo do consumidor) ou afeta a dignidade do consumidor de forma relevante. A jurisprudência tem reconhecido danos morais em casos como cobranças vexatórias, manutenção indevida em cadastros restritivos, ou descumprimento reiterado de ofertas e garantias."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos do Consumidor",
          path: "/servicos/direitos-consumidor"
        },
        {
          name: "Publicidade Enganosa",
          path: "/servicos/publicidade-enganosa"
        }
      ]}
      mainAreaPath="/consumidor"
    />
  );
};

export default PraticasAbusivasService;
