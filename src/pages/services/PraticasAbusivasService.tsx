
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const PraticasAbusivasService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Consumidor"
      serviceName="Práticas Abusivas"
      serviceDescription="Atuação especializada contra cobranças indevidas, vendas casadas, negativação ilegítima e outras práticas comerciais abusivas. Nossa intervenção é rigorosa contra condutas que cerceiam a liberdade de escolha do consumidor, garantindo não apenas a cessação da prática, mas a reparação integral dos danos causados."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Identificação Especializada de Condutas Abusivas",
          description: "Reconhecimento preciso de práticas comerciais consideradas abusivas pela legislação e jurisprudência atual, incluindo venda casada, recusa de atendimento e envio de produtos não solicitados."
        },
        {
          title: "Cessação Imediata e Reparação",
          description: "Estratégias para interromper prontamente as práticas abusivas, evitando danos continuados, com foco na restauração da dignidade do consumidor lesado."
        },
        {
          title: "Compensação em Dobro e Danos Morais",
          description: "Busca de indenização proporcional aos danos sofridos, incluindo devolução em dobro de valores cobrados indevidamente e reparação por danos morais e desvio produtivo."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Análise Técnica da Prática Abusiva",
          description: "Verificação detalhada da conduta do fornecedor para confirmar sua caracterização como prática abusiva conforme artigo 39 do CDC e jurisprudência consolidada."
        },
        {
          step: 2,
          title: "Documentação Estratégica de Evidências",
          description: "Coleta e organização meticulosa de provas como contratos, publicidades, gravações, testemunhas e outros elementos que comprovem inequivocamente a abusividade."
        },
        {
          step: 3,
          title: "Notificação Formal e Estratégica",
          description: "Envio de notificação técnica ao fornecedor exigindo o fim imediato da prática abusiva e reparação pelos danos causados, estabelecendo prazo para cumprimento."
        },
        {
          step: 4,
          title: "Atuação em Órgãos de Proteção",
          description: "Registro estratégico da reclamação em órgãos como Procon, plataformas de reclamação online e agências reguladoras específicas, criando histórico oficial."
        },
        {
          step: 5,
          title: "Medidas Judiciais Decisivas",
          description: "Quando necessário, ajuizamento de ação para obter tutela judicial que interrompa as práticas, garanta indenização e contribua para precedentes protetivos."
        }
      ]}
      testimonials={[
        {
          name: "Luciana R.",
          quote: "Consegui cancelar um pacote de serviços que me foi imposto como condição para contratação do que eu realmente queria. Além de receber de volta tudo o que paguei indevidamente, ainda recebi indenização por danos morais. O mais impressionante foi descobrir que essa prática era sistemática da empresa."
        },
        {
          name: "Alexandre P.",
          quote: "Após anos sofrendo com cobranças indevidas em minha fatura de telefone, finalmente consegui não só o cancelamento como também a devolução em dobro de todos os valores. O processo foi além da minha expectativa - incluiu compensação pelo tempo que perdi tentando resolver sozinho."
        },
        {
          name: "Grupo de Consumidores",
          quote: "Nossa ação coletiva contra práticas abusivas de uma grande empresa resultou em mudanças significativas nas políticas comerciais e compensação para todos os afetados. Foi gratificante ver que nossa luta protegeu milhares de outros consumidores."
        },
        {
          name: "Roberto M.",
          quote: "O banco me ofereceu um empréstimo 'pré-aprovado' que na verdade estava condicionado à contratação de um seguro caríssimo. Com a assessoria jurídica, não só cancelei tudo sem custo, como recebi indenização por ter sido induzido ao erro."
        },
        {
          name: "Fernanda S.",
          quote: "Meu nome foi negativado por uma dívida que eu não reconhecia. A equipe não só conseguiu limpar meu nome rapidamente, como também uma indenização substancial por danos morais. Descobrimos que era uma prática recorrente da empresa."
        }
      ]}
      faq={[
        {
          question: "O que são consideradas práticas abusivas no Código de Defesa do Consumidor?",
          answer: "O CDC considera abusivas diversas práticas listadas no artigo 39, incluindo: condicionar o fornecimento de produto ou serviço ao fornecimento de outro (venda casada), recusar atendimento às demandas dos consumidores, enviar produtos ou serviços sem solicitação prévia, prevalecer-se da fraqueza ou ignorância do consumidor, exigir vantagem manifestamente excessiva, entre outras. Nossa expertise permite identificar essas práticas mesmo quando disfarçadas."
        },
        {
          question: "O que é a devolução em dobro em cobranças indevidas e quando se aplica?",
          answer: "De acordo com o artigo 42 do CDC, o consumidor cobrado em quantia indevida tem direito à repetição do indébito por valor igual ao dobro do que pagou em excesso, acrescido de correção monetária e juros legais. Essa penalidade não se aplica apenas em casos de erro justificável por parte do fornecedor. Nossa atuação garante a aplicação correta dessa regra, maximizando a reparação devida."
        },
        {
          question: "Como vocês comprovam que uma prática é sistemática e não um caso isolado?",
          answer: "Utilizamos diversas estratégias: análise de reclamações em órgãos de proteção ao consumidor, pesquisa de processos similares, coleta de depoimentos de outros consumidores afetados e monitoramento de redes sociais. Quando identificamos padrões sistemáticos, podemos atuar tanto em ações individuais quanto coletivas, potencializando o impacto da defesa."
        },
        {
          question: "É possível obter dano moral por práticas abusivas e qual o valor?",
          answer: "Sim, quando a prática abusiva causa frustração, constrangimento, perda de tempo produtivo significativa ou afeta a dignidade do consumidor. A jurisprudência reconhece danos morais em casos como cobranças vexatórias, negativação indevida, ou descumprimento reiterado de ofertas. O valor varia conforme a gravidade, mas nossa expertise permite buscar indenizações condizentes com o dano efetivamente sofrido."
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
