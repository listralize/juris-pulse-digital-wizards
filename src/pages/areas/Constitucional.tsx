
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeAreaLayout from '../../components/PracticeAreaLayout';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../components/ThemeProvider';

const ConstitucionalPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Ações de Inconstitucionalidade",
      description: "Quando a validade de uma lei está em jogo, o STF é o palco. Nossa equipe não apenas conhece as regras; nós as dominamos. Atuação em ADI, ADC, ADPF e ADO com estratégia implacável.",
      path: "/servicos/acoes-inconstitucionalidade"
    },
    {
      title: "Direitos e Liberdades Fundamentais",
      description: "Direitos fundamentais não são sugestões; são o cerne da sua existência. Defendemos com ferocidade a dignidade, liberdade e igualdade que a Constituição exige.",
      path: "/servicos/direitos-fundamentais"
    },
    {
      title: "Mandado de Segurança",
      description: "Quando o direito é cristalino e a burocracia tenta obscurecê-lo, o Mandado de Segurança é a resposta imediata. Protegemos direito líquido e certo sem delongas.",
      path: "/servicos/mandado-seguranca"
    },
    {
      title: "Habeas Corpus",
      description: "A liberdade não é um privilégio; é um direito fundamental. Defendemos a liberdade de locomoção com a força que for necessária contra prisões ilegais.",
      path: "/servicos/habeas-corpus"
    },
    {
      title: "Habeas Data",
      description: "No mundo de hoje, informação é poder. Garantimos o controle sobre seus dados pessoais, exigindo transparência e precisão das entidades públicas.",
      path: "/servicos/habeas-data"
    },
    {
      title: "Mandado de Injunção",
      description: "A Constituição concede direitos, mas por vezes a lei omite a forma de exercê-los. Destravamos direitos bloqueados por omissões legislativas.",
      path: "/servicos/mandado-injuncao"
    },
    {
      title: "Liberdades Constitucionais",
      description: "Atuação na defesa das liberdades asseguradas pela Constituição, como liberdade de expressão, reunião e associação. Sua voz será ouvida.",
      path: "/servicos/liberdades-constitucionais"
    },
    {
      title: "Consultoria Constitucional Preventiva",
      description: "O melhor ataque é uma defesa impecável. Nossa consultoria não é reativa; é preditiva. Eliminamos problemas antes que comecem.",
      path: "/servicos/consultoria-constitucional"
    }
  ];

  return (
    <PracticeAreaLayout
      title="Direito Constitucional"
      description="O alicerce inabalável sobre o qual a segurança jurídica, as liberdades individuais e coletivas, e a própria estrutura do Estado são edificadas. Dominamos a Constituição como ferramenta estratégica para vitórias decisivas."
      currentArea="constitucional"
    >
      <h2 className={`text-4xl font-canela mb-16 ${isDark ? 'text-white' : 'text-black'}`}>Serviços Constitucionais Especializados</h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} border hover:${isDark ? 'bg-black/60' : 'bg-white/60'} transition-all duration-300 cursor-pointer`}
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-8">
              <h3 className={`text-2xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{service.title}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700' + ' leading-relaxed'}>{service.description}</p>
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

export default ConstitucionalPage;
