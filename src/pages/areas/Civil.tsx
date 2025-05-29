
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Scale, Shield, FileText, Gavel, Users, Building2, BookOpen, Home } from 'lucide-react';

const CivilPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Controle de Constitucionalidade e Ações Estratégicas",
      icon: <Scale className="w-8 h-8" />,
      description: "Atuação de elite na condução de ações que definem o arcabouço legal do país, influenciando o próprio tecido da lei.",
      services: [
        {
          name: "Ações Diretas de Inconstitucionalidade (ADI/ADC/ADPF)",
          description: "Representação no STF para declarar inconstitucionalidade de leis ou confirmar conformidade com a Constituição, definindo o futuro da legislação.",
          path: "/servicos/adi-adc-adpf"
        },
        {
          name: "Ações Originárias em Tribunais Superiores",
          description: "Representação em processos complexos no STF e STJ, onde decisões têm impacto nacional e moldam interpretações legais.",
          path: "/servicos/acoes-originarias-tribunais-superiores"
        },
        {
          name: "Recursos Extraordinários e Especiais",
          description: "Atuação nos mais altos tribunais do país para defesa de teses jurídicas e estabelecimento de precedentes favoráveis.",
          path: "/servicos/recursos-extraordinarios-especiais"
        }
      ]
    },
    {
      title: "Remédios Constitucionais",
      icon: <Shield className="w-8 h-8" />,
      description: "Linha de defesa mais robusta contra abusos e injustiças, empunhada com precisão cirúrgica.",
      services: [
        {
          name: "Mandado de Segurança Individual e Coletivo",
          description: "Proteção de direitos líquidos e certos violados por autoridade pública, garantindo resposta rápida e eficaz contra ilegalidades.",
          path: "/servicos/mandado-seguranca-civil"
        },
        {
          name: "Habeas Corpus e Habeas Data",
          description: "Defesa da liberdade individual e acesso a informações pessoais, garantindo proteção contra coação ilegal e violação de privacidade.",
          path: "/servicos/habeas-corpus-data-civil"
        },
        {
          name: "Mandado de Injunção e Ação Popular",
          description: "Efetivação de direitos constitucionais e defesa do patrimônio público, permitindo atuação como guardião da coisa pública.",
          path: "/servicos/mandado-injuncao-acao-popular"
        }
      ]
    },
    {
      title: "Consultoria Constitucional Estratégica",
      icon: <FileText className="w-8 h-8" />,
      description: "Estratégia proativa com consultoria de alto nível para antecipar riscos e garantir conformidade com padrões legais.",
      services: [
        {
          name: "Pareceres Jurídicos e Análise de Constitucionalidade",
          description: "Pareceres técnicos sobre constitucionalidade de leis e atos normativos, fornecendo segurança jurídica para decisões estratégicas.",
          path: "/servicos/pareceres-constitucionalidade"
        },
        {
          name: "Assessoria em Processos Legislativos",
          description: "Acompanhamento e influência na tramitação de projetos de lei, assegurando representação de interesses desde a concepção da norma.",
          path: "/servicos/assessoria-processos-legislativos"
        },
        {
          name: "Defesa de Direitos Fundamentais",
          description: "Garantia de respeito às liberdades constitucionais em todas as esferas, protegendo direitos fundamentais contra violações.",
          path: "/servicos/defesa-direitos-fundamentais-civil"
        }
      ]
    },
    {
      title: "Contencioso Administrativo e Judicial",
      icon: <Gavel className="w-8 h-8" />,
      description: "Atuação implacável na defesa de direitos contra arbitrariedades do poder público, seja na esfera administrativa ou judicial.",
      services: [
        {
          name: "Defesa em Processos Administrativos Disciplinares",
          description: "Proteção de servidores públicos e agentes privados, garantindo devido processo legal e protegendo carreira e reputação.",
          path: "/servicos/defesa-pad-civil"
        },
        {
          name: "Ações de Improbidade Administrativa",
          description: "Defesa contra acusações e busca por responsabilização de agentes públicos por atos ilegais ou danosos ao patrimônio público.",
          path: "/servicos/acoes-improbidade-civil"
        },
        {
          name: "Contestação de Atos Administrativos",
          description: "Impugnação de decisões, multas e atos que violem a lei, utilizando todos os recursos administrativos e judiciais cabíveis.",
          path: "/servicos/contestacao-atos-administrativos"
        },
        {
          name: "Responsabilidade Civil do Estado",
          description: "Busca de reparação de danos causados por ações ou omissões do Estado, garantindo ressarcimento integral de prejuízos.",
          path: "/servicos/responsabilidade-civil-estado"
        }
      ]
    },
    {
      title: "Licitações e Contratos Públicos",
      icon: <Building2 className="w-8 h-8" />,
      description: "Navegação segura no mercado público, conquistando contratos e executando projetos com conformidade e eficiência.",
      services: [
        {
          name: "Assessoria Completa em Licitações",
          description: "Suporte estratégico em todas as modalidades licitatórias, desde análise de editais até apresentação de propostas e recursos.",
          path: "/servicos/assessoria-completa-licitacoes"
        },
        {
          name: "Elaboração e Gestão de Contratos Administrativos",
          description: "Contratos sólidos e protegidos com o poder público, minimizando riscos e maximizando segurança jurídica na execução.",
          path: "/servicos/gestao-contratos-administrativos"
        },
        {
          name: "Reequilíbrio Econômico-Financeiro",
          description: "Renegociação de condições contratuais e defesa em controvérsias, mantendo viabilidade e resolvendo disputas decisivamente.",
          path: "/servicos/reequilibrio-economico-financeiro"
        }
      ]
    },
    {
      title: "Regulação e Projetos Governamentais",
      icon: <Users className="w-8 h-8" />,
      description: "Estratégia para mercados complexos e altamente regulados, garantindo conformidade e sucesso em grandes projetos.",
      services: [
        {
          name: "Assessoria em Mercados Regulados",
          description: "Consultoria especializada para setores regulados, garantindo conformidade e representação perante agências reguladoras.",
          path: "/servicos/assessoria-mercados-regulados"
        },
        {
          name: "Estruturação de Concessões e PPPs",
          description: "Assessoria na estruturação de projetos de infraestrutura e parcerias, garantindo viabilidade jurídica e segurança do investimento.",
          path: "/servicos/estruturacao-concessoes-ppps"
        },
        {
          name: "Compliance Administrativo",
          description: "Programas de conformidade robustos e estratégias de relacionamento governamental, minimizando riscos de sanções.",
          path: "/servicos/compliance-administrativo-civil"
        }
      ]
    },
    {
      title: "Direito Urbanístico e Ambiental",
      icon: <Home className="w-8 h-8" />,
      description: "Viabilização de empreendimentos com navegação precisa pelas normas urbanísticas e ambientais.",
      services: [
        {
          name: "Licenciamentos e Regularização",
          description: "Obtenção de licenças e regularização de projetos urbanísticos, assegurando conformidade com legislação em todas as esferas.",
          path: "/servicos/licenciamentos-regularizacao"
        },
        {
          name: "Defesa em Processos Administrativos Ambientais",
          description: "Representação em defesas contra autos de infração e ações que envolvem direito urbanístico e ambiental.",
          path: "/servicos/defesa-processos-ambientais"
        },
        {
          name: "Consultoria em Adequação Legal",
          description: "Consultoria preventiva para conformidade com normas urbanísticas e ambientais, evitando litígios e atrasos.",
          path: "/servicos/consultoria-adequacao-legal"
        }
      ]
    },
    {
      title: "Direito dos Servidores Públicos",
      icon: <BookOpen className="w-8 h-8" />,
      description: "Garantia de direitos e proteção da carreira de servidores públicos, assegurando justiça e respeito às garantias.",
      services: [
        {
          name: "Assessoria em Concursos Públicos",
          description: "Orientação em todas as fases de concursos e questões do regime jurídico, desde a posse até a aposentadoria.",
          path: "/servicos/assessoria-concursos-publicos"
        },
        {
          name: "Defesa de Direitos e Progressões",
          description: "Garantia de reconhecimento de direitos, vantagens e progressões de carreira no serviço público.",
          path: "/servicos/defesa-direitos-progressoes"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Civil"
      description="A essência da advocacia constitucional e administrativa onde a maestria não se mede apenas pelo conhecimento, mas pela capacidade de antecipar movimentos, proteger ativos e garantir a vitória. Uma estratégia de blindagem e expansão para os interesses mais vitais."
      currentArea="civil"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            ⚖️ Serviços Jurídicos em Direito Civil
          </h2>
          <p className={`text-lg max-w-4xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em Direito Constitucional e Administrativo com estratégia de blindagem e expansão, 
            oferecendo soluções que redefinem o padrão de excelência jurídica no Brasil.
          </p>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/5'}`}>
            <p className={`text-base italic ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              "No complexo tabuleiro do Direito, a maestria não se mede apenas pelo conhecimento, mas pela capacidade de antecipar movimentos, 
              proteger ativos e garantir a vitória. Nossa atuação no Direito Constitucional e Administrativo não é meramente um serviço; 
              é uma estratégia de blindagem e expansão para os interesses mais vitais."
            </p>
          </div>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                {category.icon}
              </div>
              <div>
                <h3 className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  {category.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-6">
                    <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                      {service.name}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                      {service.description}
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                      Saiba mais →
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className={`p-8 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/5'}`}>
          <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Nossa Vantagem Competitiva: O Padrão Harvey Specter em Ação
          </h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Não nos contentamos em ser mais um escritório; somos a vantagem estratégica. Nossa atuação é marcada pela 
            agressividade tática, pela inteligência processual e pela busca incansável por resultados que superem as expectativas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Alcance Nacional</h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Atuação em qualquer tribunal ou instância administrativa do Brasil, do Oiapoque ao Chuí.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Estratégia Proativa</h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Minimização de riscos e maximização de oportunidades, transformando desafios em crescimento.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Inteligência Jurídica</h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Insights estratégicos que capacitam decisões baseadas em análise prospectiva e defesa robusta.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Resultado Garantido</h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Compromisso com agilidade, personalização e busca incansável por resultados superiores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PracticeAreaLayout>
  );
};

export default CivilPage;
