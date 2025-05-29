
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';
import { UserCheck, Clock, Shield, Heart, Building, AlertTriangle } from 'lucide-react';

const TrabalhoPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const serviceCategories = [
    {
      title: "Direitos do Trabalhador",
      icon: <UserCheck className="w-8 h-8" />,
      description: "Defesa integral dos direitos trabalhistas e representação em conflitos com empregadores.",
      services: [
        {
          name: "Defesa do Trabalhador",
          description: "Transformamos sua insatisfação em reivindicação poderosa. Não deixamos um centavo do que é seu na mesa.",
          path: "/servicos/defesa-trabalhador"
        },
        {
          name: "Cálculo de Verbas Rescisórias",
          description: "Foi demitido? Analisamos cada detalhe da rescisão e garantimos que cada valor seja quitado com a força necessária.",
          path: "/servicos/verbas-rescissorias"
        },
        {
          name: "Reconhecimento de Vínculo",
          description: "Trabalho informal não anula direitos. Transformamos informalidade em segurança jurídica.",
          path: "/servicos/reconhecimento-vinculo"
        },
        {
          name: "Defesa Contra Justa Causa",
          description: "Sua reputação é seu maior ativo. Defendemos sua honra contra acusações infundadas.",
          path: "/servicos/defesa-justa-causa"
        }
      ]
    },
    {
      title: "Jornada e Remuneração",
      icon: <Clock className="w-8 h-8" />,
      description: "Garantia do cumprimento das normas sobre jornada de trabalho e remuneração adequada.",
      services: [
        {
          name: "Horas Extras e Intervalos",
          description: "Seu tempo vale ouro. Exigimos o reconhecimento e pagamento de cada hora extra não remunerada.",
          path: "/servicos/horas-extras"
        },
        {
          name: "Adicionais e Insalubridade",
          description: "Riscos devem ser compensados. Exigimos pagamento retroativo com provas irrefutáveis.",
          path: "/servicos/adicionais-insalubridade"
        },
        {
          name: "Desvio de Função",
          description: "Suas responsabilidades aumentaram, seu salário também deveria. Sua dedicação não será subvalorizada.",
          path: "/servicos/desvio-funcao"
        }
      ]
    },
    {
      title: "Proteção e Dignidade no Trabalho",
      icon: <Shield className="w-8 h-8" />,
      description: "Combate a práticas abusivas e garantia de ambiente de trabalho digno e respeitoso.",
      services: [
        {
          name: "Assédio Moral e Sexual",
          description: "Basta de silêncio. Somos sua voz contra humilhações e abusos. O respeito não se negocia.",
          path: "/servicos/assedio-moral-sexual"
        },
        {
          name: "Direitos da Gestante",
          description: "A maternidade é intocável. Garantimos estabilidade e combatemos discriminação com ferocidade.",
          path: "/servicos/direitos-gestante"
        },
        {
          name: "Acidentes e Doenças Ocupacionais",
          description: "Sua saúde é um direito. Lutamos por estabilidade, indenizações e pensão vitalícia quando necessário.",
          path: "/servicos/acidentes-doencas"
        }
      ]
    },
    {
      title: "Consultoria Empresarial",
      icon: <Building className="w-8 h-8" />,
      description: "Assessoria preventiva para empresas em questões trabalhistas e compliance.",
      services: [
        {
          name: "Consultoria Empresarial",
          description: "Construímos a blindagem jurídica que sua empresa precisa. Prevenção é o seu maior ativo.",
          path: "/servicos/consultoria-empresarial-trabalhista"
        },
        {
          name: "Compliance Trabalhista",
          description: "Transformamos o risco em segurança, garantindo conformidade e longe de passivos desnecessários.",
          path: "/servicos/compliance-trabalhista"
        }
      ]
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Trabalho"
      description="Quando a relação de trabalho falha em reconhecer seu esforço, a ação se torna inevitável. Transformamos sua insatisfação em reivindicação poderosa, garantindo que cada direito seja respeitado e cada valor seja quitado."
      currentArea="trabalho"
    >
      <div className="space-y-16">
        <div className="text-center">
          <h2 className={`text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            ⚖️ Serviços Jurídicos em Direito do Trabalho
          </h2>
          <p className={`text-lg max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Atuação especializada na defesa dos direitos trabalhistas, desde questões individuais até consultoria empresarial, garantindo justiça e dignidade nas relações de trabalho.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                  {category.icon}
                </div>
              </div>
              <h3 className={`text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                {category.title}
              </h3>
              <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {category.services.map((service, serviceIndex) => (
                <Card 
                  key={serviceIndex}
                  className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer group h-full`}
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <h4 className={`text-xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
                        {service.name}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-base leading-relaxed mb-6`}>
                        {service.description}
                      </p>
                    </div>
                    <p className={`text-base font-medium ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'}`}>
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

export default TrabalhoPage;
