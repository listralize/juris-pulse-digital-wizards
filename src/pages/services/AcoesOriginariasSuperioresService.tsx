
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';
import { Building2, Gavel, Scale, CheckCircle, Users, Award } from 'lucide-react';

const AcoesOriginariasSuperioresService = () => {
  const testimonials = [
    {
      name: "Dra. Ana Paula Rocha",
      role: "Procuradora-Geral do Estado de Minas Gerais",
      content: "A representação do escritório em nossa ação originária no STF foi magistral. O conhecimento técnico e a estratégia processual resultaram em decisão favorável que protegeu os interesses do estado em questão de alta complexidade federativa.",
      rating: 5
    },
    {
      name: "Carlos Alberto Santos",
      role: "Presidente da Assembleia Legislativa - RS",
      content: "A defesa em conflito de competência no STJ demonstrou a excelência técnica da equipe. A compreensão das nuances processuais e a argumentação precisa garantiram resultado que estabeleceu precedente favorável para outros casos similares.",
      rating: 5
    },
    {
      name: "Dr. Fernando Oliveira",
      role: "Desembargador do TJSP (aposentado)",
      content: "Como magistrado, reconheço a qualidade excepcional das peças processuais apresentadas pelo escritório em ações originárias. A fundamentação jurídica e a técnica processual demonstram nível de excelência raramente observado nos tribunais superiores.",
      rating: 5
    }
  ];

  return (
    <ServiceLandingLayout
      title="Ações Originárias em Tribunais Superiores"
      subtitle="Representação Estratégica no STF e STJ"
      description="Atuação especializada em processos de competência originária dos tribunais superiores, onde decisões têm impacto nacional e moldam interpretações jurídicas fundamentais."
      icon={<Building2 className="w-12 h-12" />}
      serviceArea="Direito Civil"
    >
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-4xl font-canela mb-6">🏛️ Competência Originária de Alto Nível</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nos tribunais superiores, onde as questões mais complexas do direito brasileiro são decididas, nossa equipe 
            atua com precisão cirúrgica em ações de competência originária. Representamos clientes em conflitos 
            federativos, disputas entre entes públicos e questões constitucionais de máxima relevância.
          </p>
        </section>

        {/* Types of Actions */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Modalidades de Ações Originárias</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <Scale className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Ações Originárias no STF</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Conflitos entre União e Estados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Disputas entre Estados-membros</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Reclamações Constitucionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Extradição e Deportação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Habeas Corpus em casos específicos</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <Gavel className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Ações Originárias no STJ</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Conflitos de Competência</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Habeas Corpus e Mandados de Segurança</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Homologação de Sentenças Estrangeiras</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Revisão Criminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Uniformização de Jurisprudência</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process Methodology */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-3xl font-canela mb-8 text-center">Nossa Abordagem Estratégica</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Análise de Competência</h4>
                <p className="text-gray-600">
                  Estudo detalhado das regras de competência originária para determinar a corte adequada e 
                  a viabilidade processual da demanda, garantindo que o caso seja proposto no tribunal correto.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Estratégia Processual Específica</h4>
                <p className="text-gray-600">
                  Desenvolvimento de estratégia processual adaptada às particularidades da competência originária, 
                  considerando prazos diferenciados e procedimentos especiais dos tribunais superiores.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Fundamentação Técnica Avançada</h4>
                <p className="text-gray-600">
                  Construção de fundamentação jurídica sólida baseada em precedentes dos próprios tribunais superiores 
                  e doutrina especializada, maximizando as chances de êxito na demanda.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Acompanhamento Processual Integral</h4>
                <p className="text-gray-600">
                  Monitoramento completo do processo desde a petição inicial até a decisão final, 
                  com aproveitamento de todas as oportunidades processuais disponíveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Diferenciais da Nossa Atuação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Conhecimento Especializado</h4>
                  <p className="text-gray-600">
                    Domínio das regras específicas de competência originária e dos procedimentos especiais 
                    dos tribunais superiores, garantindo atuação tecnicamente impecável.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Experiência Comprovada</h4>
                  <p className="text-gray-600">
                    Histórico consolidado de atuação em ações originárias, com resultados expressivos 
                    e reconhecimento pela qualidade técnica das peças apresentadas.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building2 className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Visão Institucional</h4>
                  <p className="text-gray-600">
                    Compreensão profunda das relações institucionais e do impacto das decisões 
                    nos diversos níveis federativos e setores da administração pública.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Scale className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Argumentação Persuasiva</h4>
                  <p className="text-gray-600">
                    Capacidade de construir argumentos convincentes que consideram não apenas 
                    aspectos legais, mas também impactos práticos e consequências sistêmicas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="bg-blue-50 p-8 rounded-xl">
          <h3 className="text-3xl font-canela mb-6 text-center">Resultados nos Tribunais Superiores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-600">Taxa de êxito em ações originárias STF</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-gray-600">Sucesso em conflitos de competência STJ</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <p className="text-gray-600">Ações originárias patrocinadas</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Depoimentos de Excelência</h3>
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

export default AcoesOriginariasSuperioresService;
