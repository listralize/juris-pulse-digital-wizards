
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Scale, Shield, FileText, Gavel, Users, Building2 } from 'lucide-react';

const ConstitucionalPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Ações de Controle de Constitucionalidade",
      icon: <Scale className="w-8 h-8" />,
      description: "Atuação especializada no STF em ações que questionam ou confirmam a constitucionalidade de normas jurídicas.",
      services: [
        {
          name: "Ação Direta de Inconstitucionalidade (ADI)",
          description: "Questiona a constitucionalidade de leis ou atos normativos federais ou estaduais, buscando sua declaração de inconstitucionalidade perante o Supremo Tribunal Federal.",
          path: "/servicos/adi"
        },
        {
          name: "Ação Declaratória de Constitucionalidade (ADC)",
          description: "Busca confirmar a constitucionalidade de determinada norma federal, assegurando sua validade e segurança jurídica.",
          path: "/servicos/adc"
        },
        {
          name: "ADI por Omissão (ADO)",
          description: "Visa suprir lacunas legislativas que impeçam a efetivação de preceitos constitucionais, garantindo o pleno exercício de direitos.",
          path: "/servicos/ado"
        },
        {
          name: "Arguição de Descumprimento de Preceito Fundamental (ADPF)",
          description: "Destinada a prevenir ou reparar lesão a preceito fundamental resultante de ato do poder público, atuando como instrumento de defesa da Constituição.",
          path: "/servicos/adpf"
        },
        {
          name: "Reclamação Constitucional",
          description: "Instrumento para preservar a competência do STF e garantir a autoridade de suas decisões, assegurando a ordem jurídica.",
          path: "/servicos/reclamacao-constitucional"
        }
      ]
    },
    {
      title: "Writs Constitucionais",
      icon: <Shield className="w-8 h-8" />,
      description: "Remédios constitucionais para proteção imediata de direitos fundamentais contra abusos e ilegalidades.",
      services: [
        {
          name: "Mandado de Segurança",
          description: "Protege direito líquido e certo não amparado por habeas corpus ou habeas data, ameaçado ou violado por ato de autoridade pública.",
          path: "/servicos/mandado-seguranca"
        },
        {
          name: "Mandado de Injunção",
          description: "Utilizado quando a falta de norma regulamentadora torna inviável o exercício de direitos, liberdades constitucionais e prerrogativas inerentes à nacionalidade, soberania e cidadania.",
          path: "/servicos/mandado-injuncao"
        },
        {
          name: "Habeas Corpus",
          description: "Garante a liberdade de locomoção quando alguém sofre ou está na iminência de sofrer violência ou coação ilegal, defendendo o direito fundamental à liberdade.",
          path: "/servicos/habeas-corpus"
        },
        {
          name: "Habeas Data",
          description: "Assegura o conhecimento e a retificação de informações pessoais constantes de registros ou bancos de dados de entidades governamentais ou de caráter público.",
          path: "/servicos/habeas-data"
        }
      ]
    },
    {
      title: "Defesa de Direitos Fundamentais",
      icon: <Users className="w-8 h-8" />,
      description: "Proteção abrangente dos direitos e garantias fundamentais assegurados pela Constituição Federal.",
      services: [
        {
          name: "Liberdade de Expressão e Imprensa",
          description: "Atuação em casos de censura ou restrições indevidas à manifestação do pensamento, garantindo a plenitude da liberdade de expressão.",
          path: "/servicos/liberdade-expressao"
        },
        {
          name: "Igualdade e Não Discriminação",
          description: "Ações contra práticas discriminatórias por motivo de raça, gênero, orientação sexual, religião, entre outros, assegurando o princípio da igualdade.",
          path: "/servicos/igualdade-nao-discriminacao"
        },
        {
          name: "Direitos Sociais",
          description: "Defesa do acesso a direitos essenciais como saúde, educação, moradia, trabalho digno e previdência social, garantindo a efetivação das garantias constitucionais.",
          path: "/servicos/direitos-sociais"
        },
        {
          name: "Direitos das Minorias",
          description: "Proteção jurídica a grupos vulneráveis, assegurando que seus direitos e garantias constitucionais sejam plenamente respeitados e efetivados.",
          path: "/servicos/direitos-minorias"
        }
      ]
    },
    {
      title: "Consultoria e Pareceres Jurídicos",
      icon: <FileText className="w-8 h-8" />,
      description: "Inteligência jurídica preventiva para antecipação de riscos e garantia de conformidade constitucional.",
      services: [
        {
          name: "Análise de Constitucionalidade",
          description: "Avaliação de leis, projetos de lei ou atos normativos quanto à sua conformidade com a Constituição, antecipando riscos e garantindo segurança jurídica.",
          path: "/servicos/analise-constitucionalidade"
        },
        {
          name: "Pareceres Técnicos",
          description: "Opiniões jurídicas fundamentadas sobre questões constitucionais específicas, oferecendo clareza e direcionamento estratégico para suas decisões.",
          path: "/servicos/pareceres-tecnicos"
        },
        {
          name: "Assessoria em Políticas Públicas",
          description: "Orientação jurídica na formulação e implementação de políticas públicas alinhadas aos preceitos constitucionais, garantindo conformidade e eficácia.",
          path: "/servicos/assessoria-politicas-publicas"
        }
      ]
    },
    {
      title: "Atuação em Tribunais Superiores",
      icon: <Gavel className="w-8 h-8" />,
      description: "Representação especializada nos mais altos tribunais do país para defesa de interesses constitucionais.",
      services: [
        {
          name: "Supremo Tribunal Federal (STF)",
          description: "Representação em ações de controle de constitucionalidade e recursos extraordinários, atuando no mais alto tribunal do país para defender seus interesses.",
          path: "/servicos/atuacao-stf"
        },
        {
          name: "Superior Tribunal de Justiça (STJ)",
          description: "Atuação em recursos especiais e outras matérias de competência do tribunal, garantindo a aplicação uniforme da lei federal.",
          path: "/servicos/atuacao-stj"
        }
      ]
    },
    {
      title: "Advocacia Parlamentar e Legislativa",
      icon: <Building2 className="w-8 h-8" />,
      description: "Assessoria estratégica no processo legislativo para proteção e promoção de interesses através da lei.",
      services: [
        {
          name: "Elaboração e Análise de Projetos de Lei",
          description: "Redação e revisão de propostas legislativas sob a ótica constitucional, assegurando sua solidez jurídica.",
          path: "/servicos/projetos-lei"
        },
        {
          name: "Emendas Parlamentares",
          description: "Formulação de alterações a projetos de lei em tramitação, buscando aprimorar ou proteger seus interesses no processo legislativo.",
          path: "/servicos/emendas-parlamentares"
        },
        {
          name: "Lobby Legislativo",
          description: "Atuação estratégica junto a parlamentares para influenciar a elaboração e aprovação de normas jurídicas, defendendo seus objetivos com inteligência.",
          path: "/servicos/lobby-legislativo"
        },
        {
          name: "Monitoramento Legislativo",
          description: "Acompanhamento de proposições legislativas e identificação de impactos constitucionais, permitindo uma ação proativa e estratégica.",
          path: "/servicos/monitoramento-legislativo"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Constitucional"
      description="O alicerce inabalável sobre o qual a segurança jurídica, as liberdades individuais e coletivas, e a própria estrutura do Estado são edificadas. Dominamos a Constituição como ferramenta estratégica para vitórias decisivas."
      currentArea="constitucional"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🏛️ Serviços Jurídicos em Direito Constitucional
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as esferas do Direito Constitucional, desde o controle de constitucionalidade no STF até a advocacia parlamentar, garantindo a proteção integral de direitos e interesses constitucionais.
          </p>
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
      </div>
    </PracticeAreaLayout>
  );
};

export default ConstitucionalPage;
