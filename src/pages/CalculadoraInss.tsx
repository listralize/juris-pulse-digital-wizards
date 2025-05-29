
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import PageBanner from '../components/PageBanner';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/sections/Footer';
import InssCalculator from '../components/InssCalculator';
import { useTheme } from '../components/ThemeProvider';
import CtaSection from '../components/serviceLanding/CtaSection';

const CalculadoraInssPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      <PageBanner 
        title="Calculadora INSS 2025"
        subtitle="Calcule a contribuição previdenciária dos seus colaboradores com base nas novas tabelas do INSS. Ferramenta atualizada com as alíquotas vigentes."
        bgImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      />
      
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <InssCalculator />
          
          <div className={`mt-12 p-6 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
            <h3 className={`text-xl font-canela mb-4 text-left ${isDark ? 'text-white' : 'text-black'}`}>
              📋 Tabela INSS 2025 - Contribuição do Empregado
            </h3>
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${isDark ? 'border-white/20' : 'border-black/20'}`}>
                <thead>
                  <tr className={`${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                    <th className={`border p-3 text-left ${isDark ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>
                      Faixa Salarial
                    </th>
                    <th className={`border p-3 text-left ${isDark ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>
                      Alíquota
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      Até R$ 1.412,00
                    </td>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      7,5%
                    </td>
                  </tr>
                  <tr>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      De R$ 1.412,01 até R$ 2.666,68
                    </td>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      9%
                    </td>
                  </tr>
                  <tr>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      De R$ 2.666,69 até R$ 4.000,03
                    </td>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      12%
                    </td>
                  </tr>
                  <tr>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      De R$ 4.000,04 até R$ 7.786,02
                    </td>
                    <td className={`border p-3 ${isDark ? 'border-white/20 text-gray-300' : 'border-black/20 text-gray-700'}`}>
                      14%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              * A contribuição é calculada de forma progressiva, aplicando cada alíquota apenas sobre a parcela do salário que se enquadra na respectiva faixa.
            </p>
          </div>
        </div>
      </section>
      
      <CtaSection serviceArea="Direito Previdenciário" respectTheme={true} />
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};

export default CalculadoraInssPage;
