import React from 'react';
import { useTheme } from '../components/ThemeProvider';
import PageBanner from '../components/PageBanner';

const PoliticaPrivacidade = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <PageBanner 
        title="Política de Privacidade"
        subtitle="Como protegemos suas informações pessoais"
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose max-w-none">
          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            1. Coleta de Informações
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Coletamos informações que você nos fornece diretamente, como quando você entra em contato conosco através de formulários, e-mail ou telefone. Essas informações podem incluir seu nome, endereço de e-mail, telefone e detalhes sobre sua consulta jurídica.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            2. Uso das Informações
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Utilizamos suas informações para:
          </p>
          <ul className={`mb-6 pl-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>• Responder às suas consultas e fornecer serviços jurídicos</li>
            <li>• Comunicar sobre nossos serviços e atualizações relevantes</li>
            <li>• Melhorar nossos serviços e experiência do cliente</li>
            <li>• Cumprir obrigações legais e regulamentares</li>
          </ul>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            3. Proteção de Dados
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            4. Compartilhamento de Informações
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestar nossos serviços jurídicos ou quando exigido por lei.
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            5. Seus Direitos
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
          </p>
          <ul className={`mb-6 pl-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>• Acessar suas informações pessoais</li>
            <li>• Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>• Solicitar a exclusão de seus dados</li>
            <li>• Revogar o consentimento para o tratamento de dados</li>
          </ul>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            6. Contato
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Para questões relacionadas à privacidade ou para exercer seus direitos, entre em contato conosco:
          </p>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            E-mail: contato@stadv.com<br />
            Telefone: (62) 99459-4496
          </p>

          <h2 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            7. Alterações
          </h2>
          <p className={`mb-6 font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.
          </p>

          <p className={`text-sm font-satoshi ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Última atualização: Janeiro de 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;