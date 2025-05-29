
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { Users, Heart, Calendar, TrendingUp, Shield, FileCheck, Calculator, Search, Award } from 'lucide-react';

const PrevidenciarioPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Aposentadorias",
      icon: <Calendar className="w-8 h-8" />,
      description: "Assessoria especializada para obtenção de todos os tipos de aposentadoria, garantindo o melhor benefício para sua situação.",
      services: [
        {
          name: "Aposentadoria por Idade",
          description: "Garante renda após atingir idade mínima e tempo de contribuição necessário.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Aposentadoria por Tempo de Contribuição",
          description: "Renda após cumprir tempo mínimo de contribuição, com regras de transição.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Aposentadoria Especial",
          description: "Benefício para quem trabalhou em condições insalubres ou perigosas.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Aposentadoria por Invalidez",
          description: "Renda para trabalhador permanentemente incapaz de trabalhar.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Aposentadoria Rural",
          description: "Benefício especial para trabalhadores do campo com regras diferenciadas.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Aposentadoria da Pessoa com Deficiência",
          description: "Benefício com idade ou tempo de contribuição reduzido para pessoas com deficiência.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Benefícios por Incapacidade",
      icon: <Heart className="w-8 h-8" />,
      description: "Proteção integral em casos de incapacidade temporária ou permanente, com acompanhamento em perícias médicas.",
      services: [
        {
          name: "Auxílio-Doença",
          description: "Renda temporária por incapacidade para o trabalho com acompanhamento médico.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Auxílio-Acidente",
          description: "Indenização por sequela de acidente que reduza capacidade de trabalho.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Benefícios por Incapacidade",
          description: "Acompanhamento completo em perícias e processos de incapacidade laboral.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Isenção de IR por Doença Grave",
          description: "Orientação para obtenção de isenção fiscal em casos de doenças graves.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Benefícios aos Dependentes",
      icon: <Users className="w-8 h-8" />,
      description: "Suporte completo para dependentes em processos de pensão e benefícios assistenciais.",
      services: [
        {
          name: "Pensão por Morte",
          description: "Suporte financeiro a dependentes de segurado falecido com análise de elegibilidade.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Auxílio-Reclusão",
          description: "Benefício para dependentes de segurado em regime de reclusão.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "BPC/LOAS",
          description: "Assistência a idosos e deficientes em situação de vulnerabilidade social.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Salário-Maternidade",
          description: "Renda para mulheres em licença-maternidade, nascimento ou adoção.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Planejamento e Consultoria",
      icon: <Calculator className="w-8 h-8" />,
      description: "Estratégias avançadas para otimização de benefícios e planejamento previdenciário inteligente.",
      services: [
        {
          name: "Planejamento Previdenciário",
          description: "Estratégias personalizadas para maximizar benefícios futuros com análise detalhada.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Planejamento de Aposentadoria",
          description: "Elaboração de cenários e projeções para otimizar o valor da aposentadoria.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Simulação de Renda",
          description: "Cálculos precisos para projeção de valores de benefícios futuros.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Análise de Elegibilidade",
          description: "Verificação detalhada de direitos e condições para concessão de benefícios.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Contagem de Tempo de Serviço",
          description: "Levantamento e comprovação de períodos contributivos e especiais.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Consultoria Jurídica",
          description: "Orientação especializada em direito previdenciário com suporte técnico.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Revisões e Correções",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Análise e correção de benefícios concedidos com valores incorretos ou injustiças.",
      services: [
        {
          name: "Revisão da Vida Toda",
          description: "Revisão completa considerando todo histórico contributivo para majorar benefícios.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Revisões de Aposentadoria",
          description: "Correção de valores com base em jurisprudência favorável e novas regras.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Diagnóstico de Revisões",
          description: "Análise técnica para identificar possibilidades de revisão de benefícios.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Buraco Negro",
          description: "Correção de benefícios concedidos no período de 1999 a 2009 com regras prejudiciais.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Buraco Verde",
          description: "Revisão de benefícios rurais com aplicação de regras mais vantajosas.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Revisão do Teto",
          description: "Aplicação de novos tetos previdenciários em benefícios já concedidos.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Reconhecimento de Direitos",
      icon: <Award className="w-8 h-8" />,
      description: "Comprovação e reconhecimento de períodos especiais e atividades diferenciadas.",
      services: [
        {
          name: "Reconhecimento de Tempo Especial",
          description: "Comprovação de atividades insalubres ou perigosas para conversão em tempo comum.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Atividades Concomitantes",
          description: "Reconhecimento de períodos trabalhados simultaneamente em diferentes vínculos.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Análise de Laudo e Formulário de Atividade Especial",
          description: "Avaliação técnica de documentos para comprovação de condições especiais.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Contribuição em Atraso",
          description: "Regularização de contribuições pendentes para completar carência.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Contencioso e Recursos",
      icon: <Shield className="w-8 h-8" />,
      description: "Representação judicial e administrativa em litígios contra o INSS e outros órgãos.",
      services: [
        {
          name: "Recursos contra o INSS",
          description: "Interposição de recursos administrativos contra decisões desfavoráveis.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Ações Judiciais",
          description: "Ajuizamento de ações para processos indeferidos ou com valores incorretos.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Mandado de Segurança",
          description: "Impetração de mandados de segurança para correção de atos ilegais.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Representação no INSS",
          description: "Acompanhamento e representação em procedimentos administrativos.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Peças Administrativas",
          description: "Elaboração de petições e documentos para procedimentos administrativos.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    },
    {
      title: "Serviços Especializados",
      icon: <Search className="w-8 h-8" />,
      description: "Atendimento especializado para servidores públicos, militares e situações específicas.",
      services: [
        {
          name: "SPPREV - Servidores Públicos",
          description: "Assessoria especializada para regimes próprios de previdência social.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Especialização em Servidores e Militares",
          description: "Atendimento específico para servidores públicos e militares com regras próprias.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Melhores Condições em RPPS",
          description: "Otimização de benefícios em regimes próprios de previdência social.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Efeito COVID-19 no INSS",
          description: "Orientação sobre impactos da pandemia em benefícios previdenciários.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Reforma da Previdência",
          description: "Assessoria sobre mudanças nas regras previdenciárias e regras de transição.",
          path: "/servicos/beneficios-previdenciarios"
        },
        {
          name: "Consulta Online Nacional",
          description: "Atendimento por videochamada em todo o Brasil com especialistas.",
          path: "/servicos/beneficios-previdenciarios"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Previdenciário"
      description="Navegando pelo labirinto previdenciário brasileiro com expertise e estratégia. Atuação nacional especializada em planejamento, concessão, revisões e contencioso previdenciário, garantindo resultados inigualáveis para nossos clientes."
      currentArea="previdenciario"
    >
      <div className="space-y-16">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🏥 Serviços Previdenciários Especializados
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            O cenário previdenciário brasileiro constitui um labirinto de regulamentações complexas, reformas constantes e cálculos intrincados. 
            Nossa atuação transcende a assistência jurídica reativa, operando como consultores estratégicos e planejadores financeiros 
            sob a ótica jurídica, garantindo resultados inigualáveis em todo o território nacional.
          </p>
          <div className={`p-6 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'} text-left`}>
            <h3 className={`text-xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Nossa Missão
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Entregar resultados inigualáveis através de uma abordagem sofisticada que combina planejamento estratégico, 
              expertise jurídica e tecnologia avançada. Cada cliente recebe representação de elite, seja para planejamento 
              previdenciário inteligente, concessão de benefícios ou contencioso especializado.
            </p>
          </div>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                  {category.icon}
                </div>
              </div>
              <h3 className={`text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                {category.title}
              </h3>
              <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group h-full`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                    <div>
                      <h4 className={`text-lg font-canela mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                        {service.name}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                        {service.description}
                      </p>
                    </div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                      Saiba mais →
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className={`text-center p-8 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'} max-w-5xl mx-auto`}>
          <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Atendimento Nacional
          </h3>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Com abrangência nacional, nossa expertise transcende fronteiras geográficas. 
            Consultas online por videochamada garantem que cada cliente, de Manaus a Porto Alegre, 
            receba o mesmo calibre de representação jurídica de elite. Especialização adicional 
            em servidores públicos e militares com regras específicas.
          </p>
        </div>
      </div>
    </PracticeAreaLayout>
  );
};

export default PrevidenciarioPage;
