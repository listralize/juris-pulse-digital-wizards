import React from 'react';
import { useTheme } from '../components/ThemeProvider';
import PageBanner from '../components/PageBanner';

const TermosUso = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <PageBanner 
        title="Termos de Uso"
        subtitle="Condições para uso de nossos serviços"
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose max-w-none">
          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            1. Aceitação dos Termos
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Ao acessar e usar este website, você aceita e concorda em ficar vinculado aos termos e condições deste acordo. Se você não concordar com qualquer parte destes termos, não deve usar nosso website.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            2. Uso do Website
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Este website é fornecido apenas para fins informativos sobre nossos serviços jurídicos. O uso deste site não estabelece uma relação advogado-cliente. Para questões jurídicas específicas, entre em contato conosco diretamente.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            3. Propriedade Intelectual
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Todo o conteúdo incluído neste site, como textos, gráficos, logos, imagens e software, é propriedade de Serafim & Trombela Advocacia ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            4. Limitação de Responsabilidade
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            As informações neste website são fornecidas "como estão" sem garantias de qualquer tipo. Não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso deste website.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            5. Privacidade
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Sua privacidade é importante para nós. Por favor, revise nossa Política de Privacidade, que também rege seu uso do website, para entender nossas práticas.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            6. Links para Sites de Terceiros
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Nosso website pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites externos.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            7. Modificações
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após a publicação no website.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            8. Lei Aplicável
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes de Goiânia, GO.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            9. Contato
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
          </p>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            E-mail: contato@stadv.com<br />
            Telefone: (62) 99459-4496<br />
            Endereço: World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040
          </p>

          <p className={`text-sm font-satoshi ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Última atualização: Janeiro de 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermosUso;