
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';

const AssedioMoralSexualService = () => {
  return (
    <ServiceLandingLayout
      serviceArea="Direito do Trabalho"
      serviceName="Assédio Moral e Sexual"
      serviceDescription="Basta de silêncio. Se você sofreu humilhações, perseguições ou qualquer tipo de abuso no trabalho, nós somos sua voz. Agimos com discrição e ferocidade para coletar as provas e buscar a indenização por danos morais que você merece. O respeito não se negocia."
      mainImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      benefits={[
        {
          title: "Reparação por Danos Morais",
          description: "Buscamos indenização proporcional ao sofrimento causado, considerando a gravidade, duração do assédio, repercussões na saúde e posição hierárquica do agressor."
        },
        {
          title: "Proteção Contra Retaliações",
          description: "Garantimos que denúncias de assédio não resultem em perseguições ou demissões discriminatórias, protegendo sua estabilidade e dignidade no trabalho."
        },
        {
          title: "Coleta Estratégica de Provas",
          description: "Utilizamos métodos legais e eficazes para documentar o assédio: testemunhas, gravações permitidas, mensagens, e-mails e laudos médicos."
        }
      ]}
      process={[
        {
          step: 1,
          title: "Avaliação Técnica do Caso",
          description: "Analisamos os fatos relatados para caracterizar o assédio moral ou sexual, identificando elementos como sistematicidade, abuso de poder e dano à dignidade."
        },
        {
          step: 2,
          title: "Estratégia de Documentação",
          description: "Orientamos sobre como documentar episódios futuros e coletamos evidências existentes: e-mails, mensagens, testemunhas e registros médicos."
        },
        {
          step: 3,
          title: "Proteção da Vítima",
          description: "Implementamos medidas protetivas para evitar retaliações, orientando sobre direitos e procedimentos internos da empresa quando aplicável."
        },
        {
          step: 4,
          title: "Ação Judicial Especializada",
          description: "Ajuizamos ação trabalhista com pedido de indenização por danos morais, utilizando jurisprudência consolidada e fundamentação técnica robusta."
        },
        {
          step: 5,
          title: "Acompanhamento Integral",
          description: "Mantemos suporte durante todo o processo, incluindo orientação psicológica quando necessário e acompanhamento da execução da sentença."
        }
      ]}
      testimonials={[
        {
          name: "Mariana Oliveira - Ex-Assistente Administrativa",
          quote: "Sofri assédio moral por meses do meu chefe. A equipe me ajudou a documentar tudo e consegui R$ 80.000 de indenização. Minha dignidade foi restaurada."
        },
        {
          name: "Patricia Santos - Analista de TI",
          quote: "O assédio sexual do supervisor me deixou traumatizada. A ação não só garantiu indenização como resultou na demissão dele por justa causa."
        },
        {
          name: "Carlos Eduardo - Ex-Vendedor",
          quote: "Sofria humilhações públicas diárias. Além da indenização por danos morais, consegui reverter a justa causa aplicada em retaliação à denúncia."
        }
      ]}
      faq={[
        {
          question: "Como caracterizar assédio moral no trabalho?",
          answer: "Assédio moral caracteriza-se por condutas abusivas, repetitivas e sistemáticas que visam humilhar, constranger ou isolar o trabalhador. Exemplos: humilhações públicas, sobrecarga proposital, isolamento, críticas excessivas, ameaças veladas ou exposição vexatória."
        },
        {
          question: "Que provas preciso para comprovar assédio?",
          answer: "Diversas evidências podem ser usadas: testemunhas, e-mails e mensagens ofensivas, gravações (quando legais), atestados médicos de depressão/ansiedade, registros de procedimentos internos, histórico de mudanças injustificadas de função ou setor."
        },
        {
          question: "Posso gravar conversas como prova de assédio?",
          answer: "Sim, desde que você seja parte da conversa. Gravações próprias são consideradas prova lícita quando destinadas à defesa de direitos. É importante orientação jurídica sobre como proceder adequadamente."
        },
        {
          question: "Qual valor posso receber por danos morais?",
          answer: "O valor varia conforme gravidade, duração, repercussões na saúde, posição hierárquica do agressor e capacidade econômica da empresa. Casos graves podem resultar em indenizações de R$ 50.000 a R$ 200.000 ou mais, dependendo das circunstâncias."
        }
      ]}
      relatedServices={[
        {
          name: "Direitos da Gestante",
          path: "/servicos/direitos-gestante"
        },
        {
          name: "Defesa do Trabalhador",
          path: "/servicos/defesa-trabalhador"
        }
      ]}
      mainAreaPath="/trabalho"
    />
  );
};

export default AssedioMoralSexualService;
