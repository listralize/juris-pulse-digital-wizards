
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const TrabalhoPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Defesa do Trabalhador",
      description: "Transformamos sua insatisfação em reivindicação poderosa. Não deixamos um centavo do que é seu na mesa.",
      path: "/servicos/defesa-trabalhador"
    },
    {
      title: "Cálculo de Verbas Rescisórias",
      description: "Foi demitido? Analisamos cada detalhe da rescisão e garantimos que cada valor seja quitado com a força necessária.",
      path: "/servicos/verbas-rescissorias"
    },
    {
      title: "Horas Extras e Intervalos",
      description: "Seu tempo vale ouro. Exigimos o reconhecimento e pagamento de cada hora extra não remunerada.",
      path: "/servicos/horas-extras"
    },
    {
      title: "Reconhecimento de Vínculo",
      description: "Trabalho informal não anula direitos. Transformamos informalidade em segurança jurídica.",
      path: "/servicos/reconhecimento-vinculo"
    },
    {
      title: "Defesa Contra Justa Causa",
      description: "Sua reputação é seu maior ativo. Defendemos sua honra contra acusações infundadas.",
      path: "/servicos/defesa-justa-causa"
    },
    {
      title: "Direitos da Gestante",
      description: "A maternidade é intocável. Garantimos estabilidade e combatemos discriminação com ferocidade.",
      path: "/servicos/direitos-gestante"
    },
    {
      title: "Assédio Moral e Sexual",
      description: "Basta de silêncio. Somos sua voz contra humilhações e abusos. O respeito não se negocia.",
      path: "/servicos/assedio-moral-sexual"
    },
    {
      title: "Acidentes e Doenças Ocupacionais",
      description: "Sua saúde é um direito. Lutamos por estabilidade, indenizações e pensão vitalícia quando necessário.",
      path: "/servicos/acidentes-doencas"
    },
    {
      title: "Adicionais e Insalubridade",
      description: "Riscos devem ser compensados. Exigimos pagamento retroativo com provas irrefutáveis.",
      path: "/servicos/adicionais-insalubridade"
    },
    {
      title: "Desvio de Função",
      description: "Suas responsabilidades aumentaram, seu salário também deveria. Sua dedicação não será subvalorizada.",
      path: "/servicos/desvio-funcao"
    },
    {
      title: "Consultoria Empresarial",
      description: "Construímos a blindagem jurídica que sua empresa precisa. Prevenção é o seu maior ativo.",
      path: "/servicos/consultoria-empresarial-trabalhista"
    },
    {
      title: "Compliance Trabalhista",
      description: "Transformamos o risco em segurança, garantindo conformidade e longe de passivos desnecessários.",
      path: "/servicos/compliance-trabalhista"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito do Trabalho"
      description="Quando a relação de trabalho falha em reconhecer seu esforço, a ação se torna inevitável. Transformamos sua insatisfação em reivindicação poderosa, garantindo que cada direito seja respeitado e cada valor seja quitado."
      currentArea="trabalho"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Estratégicos</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60 border-white/20' : 'bg-white/60 border-black/20'} transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{service.description}</p>
              <p className={`mt-4 font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                Saiba mais →
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PracticeAreaLayout>
  );
};

export default TrabalhoPage;
