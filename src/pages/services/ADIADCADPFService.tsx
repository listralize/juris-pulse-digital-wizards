
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';
import { Scale, Gavel, Shield, CheckCircle, Users, Award } from 'lucide-react';

const ADIADCADPFService = () => {
  const testimonials = [
    {
      name: "Dr. Carlos Eduardo Mendes",
      role: "Diretor Jurídico, Confederação Nacional da Indústria",
      content: "A expertise da equipe em ações de controle concentrado foi fundamental para proteger nossos interesses setoriais. A ADI que patrocinaram resultou em precedente favorável que beneficia toda a indústria nacional.",
      rating: 5
    },
    {
      name: "Maria Fernanda Silva",
      role: "Secretária de Estado da Fazenda - SP",
      content: "O escritório conduziu nossa ADC com maestria técnica incomparável. A defesa da constitucionalidade da lei tributária estadual foi brilhante, garantindo segurança jurídica para todo o sistema fiscal do estado.",
      rating: 5
    },
    {
      name: "Prof. Dr. Roberto Andrade",
      role: "Procurador-Geral Adjunto da República",
      content: "A ADPF apresentada pelo escritório para proteção de preceitos fundamentais foi um marco jurídico. A fundamentação doutrinária e a estratégia processual demonstraram excelência técnica que poucos conseguem alcançar no STF.",
      rating: 5
    }
  ];

  return (
    <ServiceLandingLayout
      title="Ações Diretas de Inconstitucionalidade (ADI/ADC/ADPF)"
      subtitle="Representação de Elite no Controle Concentrado de Constitucionalidade"
      description="Atuação estratégica no Supremo Tribunal Federal para moldar o futuro da legislação brasileira através de ações que definem a constitucionalidade de normas em âmbito nacional."
      icon={<Scale className="w-12 h-12" />}
      serviceArea="Direito Civil"
    >
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-4xl font-canela mb-6">⚖️ Controle de Constitucionalidade de Alto Nível</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            No epicentro do sistema jurídico brasileiro, representamos nossos clientes nas mais complexas ações de controle 
            concentrado de constitucionalidade. Nossa atuação no STF transcende a mera advocacia - moldamos precedentes, 
            influenciamos interpretações constitucionais e garantimos que a supremacia da Constituição seja preservada.
          </p>
        </section>

        {/* Services Overview */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Nossa Expertise em Ações Constitucionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <Gavel className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Ação Direta de Inconstitucionalidade (ADI)</h4>
              <p className="text-gray-600">
                Provocação do STF para declarar a inconstitucionalidade de leis ou atos normativos federais ou estaduais, 
                removendo-os definitivamente do ordenamento jurídico e estabelecendo precedentes vinculantes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Ação Declaratória de Constitucionalidade (ADC)</h4>
              <p className="text-gray-600">
                Confirmação judicial da constitucionalidade de normas questionadas, proporcionando segurança jurídica 
                definitiva e eliminando controvérsias interpretativas em todo o território nacional.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Arguição de Descumprimento de Preceito Fundamental (ADPF)</h4>
              <p className="text-gray-600">
                Proteção dos preceitos fundamentais da Constituição quando violados por atos do poder público, 
                garantindo intervenção cirúrgica para restaurar a ordem constitucional.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Process */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-3xl font-canela mb-8 text-center">Nossa Metodologia Estratégica</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Análise Constitucional Profunda</h4>
                <p className="text-gray-600">
                  Realizamos estudo minucioso da norma questionada, identificando vícios de constitucionalidade material ou formal 
                  e construindo fundamentação jurídica sólida baseada na doutrina mais avançada e jurisprudência consolidada.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Estratégia Processual Customizada</h4>
                <p className="text-gray-600">
                  Desenvolvemos abordagem processual específica para cada caso, considerando a composição atual da Corte, 
                  precedentes relevantes e impactos políticos e sociais da decisão pretendida.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Sustentação Oral de Excelência</h4>
                <p className="text-gray-600">
                  Preparação meticulosa para sustentação oral perante os Ministros do STF, apresentando argumentos 
                  persuasivos e tecnicamente impecáveis que maximizam as chances de êxito.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Acompanhamento Integral</h4>
                <p className="text-gray-600">
                  Monitoramento completo do processo desde a petição inicial até o trânsito em julgado, 
                  garantindo que todos os prazos sejam cumpridos e oportunidades processuais sejam aproveitadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Por Que Somos Referência no STF</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Expertise Reconhecida</h4>
                  <p className="text-gray-600">
                    Histórico comprovado de êxito em ações de controle concentrado, com precedentes favoráveis 
                    que moldaram a interpretação constitucional em diversos setores da economia e sociedade.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Equipe Especializada</h4>
                  <p className="text-gray-600">
                    Advogados com formação específica em Direito Constitucional e experiência prática no STF, 
                    combinando excelência acadêmica com conhecimento processual avançado.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Scale className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Visão Estratégica</h4>
                  <p className="text-gray-600">
                    Compreensão profunda dos impactos das decisões constitucionais, permitindo argumentação 
                    que considera não apenas aspectos jurídicos, mas também consequências práticas e sociais.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Gavel className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Relacionamento Institucional</h4>
                  <p className="text-gray-600">
                    Presença consolidada nos tribunais superiores e relacionamento respeitoso com magistrados, 
                    garantindo que nossos argumentos sejam ouvidos com a devida atenção e consideração.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-blue-50 p-8 rounded-xl">
          <h3 className="text-3xl font-canela mb-6 text-center">Resultados que Fazem a Diferença</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <p className="text-gray-600">Taxa de êxito em ADIs patrocinadas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Sucesso em ADCs defendidas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <p className="text-gray-600">Precedentes estabelecidos no STF</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">O Que Nossos Clientes Dizem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ServiceLandingLayout>
  );
};

export default ADIADCADPFService;
