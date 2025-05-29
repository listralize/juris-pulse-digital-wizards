import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const EmpresarialPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Constituição e Estruturação de Empresas",
      description: "Arquitetamos seu império desde a fundação, garantindo que cada cláusula seja uma peça estratégica no plano de dominação de mercado. Não apenas registramos empresas; criamos fortalezas jurídicas.",
      path: "/servicos/constituicao-empresas"
    },
    {
      title: "Contratos Empresariais",
      description: "Forjamos seus acordos como armas estratégicas, dominando negociações e garantindo execução impecável. Cada palavra é uma fortaleza, cada cláusula um escudo.",
      path: "/servicos/contratos-empresariais"
    },
    {
      title: "Fusões e Aquisições",
      description: "Orquestramos sua expansão como um golpe de mestre, garantindo domínio de mercado. No jogo de alto risco do M&A, a vitória é para quem pensa mais rápido e executa com precisão.",
      path: "/servicos/fusoes-aquisicoes"
    },
    {
      title: "Reestruturação Societária",
      description: "Governamos as relações internas, protegendo seu legado e garantindo a continuidade do poder. Estruturamos reorganizações que otimizam operações e blindam o futuro.",
      path: "/servicos/reestruturacao-societaria"
    },
    {
      title: "Governança Corporativa",
      description: "Implementamos práticas de governança que não apenas atendem regulamentações, mas criam vantagem competitiva e atraem investidores exigentes que valorizam excelência operacional.",
      path: "/servicos/governanca-corporativa"
    },
    {
      title: "Compliance Empresarial",
      description: "Antecipamos riscos e transformamos conformidade em vantagem competitiva. Desenvolvemos programas que blindam operações e fortalecem reputação no mercado.",
      path: "/servicos/compliance-empresarial"
    },
    {
      title: "Propriedade Intelectual",
      description: "Seu gênio criativo é ouro. Blindamos suas inovações e as transformamos em fonte de receita, protegendo marcas e patentes com a ferocidade de quem entende seu valor estratégico.",
      path: "/servicos/propriedade-intelectual"
    },
    {
      title: "Contencioso Empresarial",
      description: "A batalha é nossa, a vitória é sua. Conflitos são resolvidos com precisão cirúrgica e domínio estratégico, protegendo ativos e reputação com força implacável.",
      path: "/servicos/contencioso-empresarial"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Empresarial"
      description="No tabuleiro de xadrez do mundo corporativo, onde cada movimento pode definir o destino de um império, a mediocridade não é uma opção. Empresas não buscam apenas advogados; buscam estrategistas, negociadores implacáveis e parceiros que transformam desafios em vitórias."
      currentArea="empresarial"
    >
      <div className="mb-16">
        <h2 className={`text-4xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
          O Alicerce da Sua Segurança e Crescimento
        </h2>
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Oferecemos serviços fundamentais que toda empresa de sucesso exige, apresentados com a clareza, 
          confiança e foco em resultados que definem uma abordagem de excelência.
        </p>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-red-900/40 border-red-700/30' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-red-300' : 'text-blue-600'} transition-colors`}>
                {service.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
                {service.description}
              </p>
              <p className={`font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-red-300' : 'text-blue-600'} transition-colors`}>
                Saiba mais →
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
        <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
          Nossa Abordagem: A Diferença que Vence
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
          Não se trata apenas de advogados; trata-se de arquitetos de vitórias. Nossa abordagem reflete a mentalidade 
          de quem não joga para empatar, mas para dominar. Cada caso, cada negociação, cada conselho é guiado pelos 
          princípios que separam os vencedores dos demais.
        </p>
      </div>
    </PracticeAreaLayout>
  );
};

export default EmpresarialPage;
