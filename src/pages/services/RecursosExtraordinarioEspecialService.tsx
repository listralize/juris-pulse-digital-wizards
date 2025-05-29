
import React from 'react';
import ServiceLandingLayout from '../../components/ServiceLandingLayout';
import { TrendingUp, Gavel, Scale, CheckCircle, Users, Award } from 'lucide-react';

const RecursosExtraordinarioEspecialService = () => {
  const testimonials = [
    {
      name: "Dr. Roberto Silva",
      role: "Sócio-Diretor, Indústria Metalúrgica Nacional",
      content: "O recurso extraordinário interposto pelo escritório reverteu decisão desfavorável e estabeleceu tese jurídica que beneficiou todo o setor industrial. A expertise em temas constitucionais complexos foi determinante para o sucesso.",
      rating: 5
    },
    {
      name: "Dra. Mariana Costa",
      role: "Procuradora do Município de São Paulo",
      content: "O recurso especial patrocinado pela equipe garantiu interpretação favorável de lei federal que impactava diretamente as finanças municipais. A fundamentação técnica e a estratégia processual foram impecáveis.",
      rating: 5
    },
    {
      name: "Prof. Dr. Eduardo Mendes",
      role: "Consultor Jurídico, Petrobras",
      content: "A atuação nos tribunais superiores demonstrou domínio excepcional das nuances processuais. O recurso extraordinário resultou em precedente favorável que protegeu investimentos bilionários da companhia.",
      rating: 5
    }
  ];

  return (
    <ServiceLandingLayout
      title="Recursos Extraordinários e Especiais"
      subtitle="Expertise nos Tribunais Superiores para Estabelecer Precedentes"
      description="Atuação estratégica no STF e STJ através de recursos extraordinários e especiais, moldando interpretações jurídicas e estabelecendo precedentes favoráveis aos nossos clientes."
      icon={<TrendingUp className="w-12 h-12" />}
      serviceArea="Direito Civil"
    >
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-4xl font-canela mb-6">📈 Recursos de Alto Impacto</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nos tribunais superiores do Brasil, onde se definem as interpretações definitivas do direito constitucional 
            e infraconstitucional, nossa equipe atua com excelência técnica em recursos extraordinários e especiais. 
            Cada recurso é uma oportunidade de moldar precedentes e garantir vitórias estratégicas.
          </p>
        </section>

        {/* Types of Resources */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Modalidades de Recursos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <Scale className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Recurso Extraordinário (STF)</h4>
              <p className="text-gray-600 mb-4">
                Interposição perante o Supremo Tribunal Federal para questões constitucionais, buscando 
                interpretação definitiva da Constituição Federal e estabelecimento de precedentes vinculantes.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Violação direta à Constituição</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Declaração de inconstitucionalidade</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Repercussão geral reconhecida</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <Gavel className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-semibold mb-4">Recurso Especial (STJ)</h4>
              <p className="text-gray-600 mb-4">
                Interposição perante o Superior Tribunal de Justiça para uniformização da interpretação 
                de leis federais e garantia da aplicação correta do direito infraconstitucional.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Violação à lei federal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Divergência jurisprudencial</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Negativa de vigência à lei federal</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strategic Process */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-3xl font-canela mb-8 text-center">Nossa Metodologia de Excelência</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Análise de Admissibilidade</h4>
                <p className="text-gray-600">
                  Avaliação criteriosa dos requisitos de admissibilidade, incluindo repercussão geral para 
                  recursos extraordinários e relevância para recursos especiais, garantindo viabilidade processual.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Fundamentação Técnica Robusta</h4>
                <p className="text-gray-600">
                  Construção de fundamentação jurídica sólida baseada em precedentes consolidados e 
                  doutrina especializada, demonstrando claramente a violação legal ou constitucional.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Estratégia de Precedentes</h4>
                <p className="text-gray-600">
                  Desenvolvimento de argumentação que considera não apenas o caso específico, mas também 
                  o potencial de criação de precedentes favoráveis para casos futuros similares.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Acompanhamento Processual</h4>
                <p className="text-gray-600">
                  Monitoramento integral do processamento do recurso, incluindo eventual sustentação oral 
                  e aproveitamento de todas as oportunidades processuais disponíveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Nossa Vantagem Competitiva</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Expertise Reconhecida</h4>
                  <p className="text-gray-600">
                    Domínio das complexidades processuais dos tribunais superiores e conhecimento 
                    aprofundado das tendências jurisprudenciais do STF e STJ.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Equipe Especializada</h4>
                  <p className="text-gray-600">
                    Advogados com formação específica em recursos especiais e extraordinários, 
                    combinando experiência prática com conhecimento acadêmico avançado.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Resultados Superiores</h4>
                  <p className="text-gray-600">
                    Taxa de êxito acima da média nacional em recursos interpostos, demonstrando 
                    qualidade técnica excepcional e estratégia processual eficaz.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Scale className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Visão Estratégica</h4>
                  <p className="text-gray-600">
                    Compreensão do impacto sistêmico das decisões dos tribunais superiores, 
                    permitindo argumentação que transcende o caso específico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="bg-blue-50 p-8 rounded-xl">
          <h3 className="text-3xl font-canela mb-6 text-center">Resultados que Impressionam</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
              <p className="text-gray-600">Taxa de provimento em recursos extraordinários</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">80%</div>
              <p className="text-gray-600">Sucesso em recursos especiais</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">300+</div>
              <p className="text-gray-600">Recursos interpostos nos tribunais superiores</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h3 className="text-3xl font-canela mb-8 text-center">Clientes Satisfeitos</h3>
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

export default RecursosExtraordinarioEspecialService;
