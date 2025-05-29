
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { FileText, Scale, Shield, Users, Building2, MapPin, Leaf, Hammer, Eye, FileCheck, Gavel, AlertTriangle } from 'lucide-react';

const AdministrativoPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Licitações e Contratos Públicos",
      icon: <FileText className="w-8 h-8" />,
      description: "Assessoria completa para vencer contratos públicos e dominar processos licitatórios com excelência estratégica.",
      services: [
        {
          name: "Assessoria Estratégica e Consultoria",
          description: "Vencer contratos públicos exige mais do que uma proposta; demanda previsão jurídica. Assessoria abrangente desde análise de editais até estruturação empresarial.",
          path: "/servicos/assessoria-licitacoes"
        },
        {
          name: "Litígios e Defesa em Processos Licitatórios",
          description: "Defesa incansável em disputas licitatórias, desde contestação de editais até defesa contra penalidades e enfrentamento de licitações direcionadas.",
          path: "/servicos/defesa-licitacoes"
        },
        {
          name: "Gestão e Reequilíbrio Contratual",
          description: "Orientação especializada em interpretação de contratos, modificações, reequilíbrio econômico-financeiro e resolução de disputas contratuais.",
          path: "/servicos/gestao-contratos-publicos"
        }
      ]
    },
    {
      title: "Processos Administrativos e Disciplinares",
      icon: <Scale className="w-8 h-8" />,
      description: "Defesa robusta em processos administrativos disciplinares e sindicâncias para proteção de carreiras e reputações.",
      services: [
        {
          name: "Processos Administrativos Disciplinares (PAD)",
          description: "Defesa inabalável para servidores públicos em todas as fases do PAD, desde investigação inicial até recurso final, garantindo devido processo legal.",
          path: "/servicos/pad-sindicancia"
        }
      ]
    },
    {
      title: "Responsabilidade e Direitos dos Servidores",
      icon: <Shield className="w-8 h-8" />,
      description: "Proteção jurídica abrangente para servidores públicos e responsabilização do Estado por danos causados.",
      services: [
        {
          name: "Responsabilidade Civil do Estado",
          description: "Garantia de responsabilização quando ações ou omissões do Estado causam danos, construindo casos convincentes para compensação justa.",
          path: "/servicos/responsabilidade-estado"
        },
        {
          name: "Direito dos Servidores Públicos",
          description: "Suporte jurídico especializado desde admissão até aposentadoria, defendendo direitos, benefícios e estabilidade na carreira pública.",
          path: "/servicos/direitos-servidores"
        }
      ]
    },
    {
      title: "Intervenção Estatal na Propriedade",
      icon: <Building2 className="w-8 h-8" />,
      description: "Proteção de direitos de propriedade contra intervenções estatais e garantia de compensação justa.",
      services: [
        {
          name: "Desapropriação e Intervenção na Propriedade",
          description: "Avaliação da legalidade de intervenções estatais e luta pela indenização máxima possível, protegendo ativos e interesses patrimoniais.",
          path: "/servicos/desapropriacao"
        }
      ]
    },
    {
      title: "Atos e Probidade Administrativa",
      icon: <Gavel className="w-8 h-8" />,
      description: "Análise rigorosa de atos administrativos e defesa estratégica contra alegações de improbidade.",
      services: [
        {
          name: "Atos Administrativos",
          description: "Escrutínio legal rigoroso, contestando atos ilegais ou abusivos e validando aqueles que servem aos seus interesses.",
          path: "/servicos/atos-administrativos"
        },
        {
          name: "Improbidade Administrativa",
          description: "Defesa agressiva e estratégica para agentes públicos e indivíduos privados em ações de improbidade, protegendo integridade e reputação.",
          path: "/servicos/improbidade-administrativa"
        }
      ]
    },
    {
      title: "Regulação e Setores Especializados",
      icon: <Eye className="w-8 h-8" />,
      description: "Orientação especializada em conformidade regulatória e atuação perante agências reguladoras.",
      services: [
        {
          name: "Regulação e Fiscalização",
          description: "Orientação em conformidade regulatória, obtenção de autorizações e representação perante agências reguladoras federais, estaduais e municipais.",
          path: "/servicos/regulacao-fiscalizacao"
        },
        {
          name: "Direito Ambiental Administrativo",
          description: "Consultoria para licenciamento ambiental, defesa em litígios ambientais e garantia de alinhamento com práticas sustentáveis.",
          path: "/servicos/direito-ambiental-administrativo"
        },
        {
          name: "Direito Urbanístico Administrativo",
          description: "Assessoria abrangente para projetos imobiliários, garantindo conformidade com legislação urbanística e licenças administrativas.",
          path: "/servicos/direito-urbanistico"
        }
      ]
    },
    {
      title: "Infraestrutura e Grandes Projetos",
      icon: <Hammer className="w-8 h-8" />,
      description: "Expertise em estruturação e execução de grandes projetos de infraestrutura e parcerias governamentais.",
      services: [
        {
          name: "Infraestrutura e Projetos Governamentais",
          description: "Expertise na estruturação, modelagem e execução de projetos complexos, incluindo concessões, PPPs e privatizações.",
          path: "/servicos/infraestrutura-projetos"
        }
      ]
    },
    {
      title: "Consultoria e Tribunais de Contas",
      icon: <FileCheck className="w-8 h-8" />,
      description: "Assessoria estratégica preventiva e defesa especializada perante órgãos de controle.",
      services: [
        {
          name: "Consultoria e Pareceres em Direito Administrativo",
          description: "Pareceres jurídicos perspicazes e consultoria estratégica proativa em todas as facetas do direito administrativo.",
          path: "/servicos/consultoria-administrativo"
        },
        {
          name: "Defesa perante Tribunais de Contas",
          description: "Defesa especializada em processos de prestação de contas, auditorias e processos sancionatórios nos Tribunais de Contas.",
          path: "/servicos/tribunais-contas"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Administrativo"
      description="Domínio estratégico nas relações com o poder público. Transformamos desafios administrativos em vitórias decisivas, protegendo seus interesses com a força da lei e a inteligência da estratégia."
      currentArea="administrativo"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            🏛️ Serviços Jurídicos em Direito Administrativo
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada em todas as esferas do Direito Administrativo, desde licitações e contratos públicos até defesa em tribunais de contas, garantindo proteção integral dos interesses em todas as relações com o poder público.
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

export default AdministrativoPage;
