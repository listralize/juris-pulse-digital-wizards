import { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { ServicePage } from '../../types/adminTypes';

// Dados de exemplo completos para páginas de serviços de família
const createSampleServicePages = (): ServicePage[] => [
  {
    id: crypto.randomUUID(),
    title: "Divórcio e Separação",
    description: "Assessoria completa em processos de divórcio consensual e litigioso, garantindo seus direitos e dos filhos.",
    category: "familia",
    href: "divorcio-separacao",
    benefits: [
      { title: "Rapidez no Processo", description: "Agilizamos todos os trâmites legais", icon: "Clock" },
      { title: "Proteção dos Filhos", description: "Garantimos o melhor para as crianças", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Consulta", description: "Analisamos seu caso" },
      { step: 2, title: "Documentação", description: "Preparamos os documentos" }
    ],
    faq: [
      { question: "Quanto tempo demora?", answer: "Depende do tipo de divórcio, mas agilizamos o processo." }
    ],
    testimonials: [
      { name: "Maria Silva", text: "Excelente atendimento durante meu divórcio." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Pensão Alimentícia",
    description: "Solicitação, revisão e execução de pensão alimentícia com foco no bem-estar familiar.",
    category: "familia",
    href: "pensao-alimenticia",
    benefits: [
      { title: "Cálculo Justo", description: "Definimos valores adequados à realidade", icon: "Calculator" },
      { title: "Execução Eficaz", description: "Cobramos pensões em atraso", icon: "Gavel" }
    ],
    process: [
      { step: 1, title: "Avaliação", description: "Analisamos a situação financeira" },
      { step: 2, title: "Cálculo", description: "Definimos o valor adequado" }
    ],
    faq: [
      { question: "Como é calculado o valor?", answer: "Com base na renda e necessidades dos filhos." }
    ],
    testimonials: [
      { name: "João Santos", text: "Consegui regularizar a pensão dos meus filhos." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Guarda de Filhos",
    description: "Definição de guarda compartilhada, unilateral e regulamentação de visitas.",
    category: "familia",
    href: "guarda-filhos",
    benefits: [
      { title: "Interesse da Criança", description: "Priorizamos sempre o bem-estar dos menores", icon: "Heart" },
      { title: "Mediação", description: "Buscamos acordos amigáveis", icon: "Users" }
    ],
    process: [
      { step: 1, title: "Mediação", description: "Tentamos acordo entre as partes" },
      { step: 2, title: "Ação Judicial", description: "Se necessário, entramos na justiça" }
    ],
    faq: [
      { question: "O que é guarda compartilhada?", answer: "Ambos os pais participam das decisões importantes." }
    ],
    testimonials: [
      { name: "Ana Costa", text: "Conseguimos um acordo justo para todos." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Casamento e União Estável",
    description: "Formalização de relacionamentos, pactos antenupciais e conversão de união estável.",
    category: "familia",
    href: "casamento-uniao-estavel",
    benefits: [
      { title: "Pactos Personalizados", description: "Proteção patrimonial adequada ao seu perfil", icon: "FileText" },
      { title: "Assessoria Completa", description: "Do planejamento à formalização", icon: "CheckCircle" }
    ],
    process: [
      { step: 1, title: "Planejamento", description: "Definimos a melhor estratégia" },
      { step: 2, title: "Documentação", description: "Preparamos todos os documentos" },
      { step: 3, title: "Formalização", description: "Acompanhamos os procedimentos" }
    ],
    faq: [
      { question: "Preciso de pacto antenupcial?", answer: "Recomendamos para proteção patrimonial." }
    ],
    testimonials: [
      { name: "Carlos e Marina", text: "Nos ajudaram a proteger nosso patrimônio familiar." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Inventário e Sucessões",
    description: "Inventário judicial e extrajudicial, partilha de bens e testamentos.",
    category: "familia",
    href: "inventario-sucessoes",
    benefits: [
      { title: "Rapidez", description: "Inventário extrajudicial quando possível", icon: "Zap" },
      { title: "Economia", description: "Reduzimos custos e tempo", icon: "DollarSign" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Verificamos a documentação" },
      { step: 2, title: "Estratégia", description: "Definimos o melhor caminho" },
      { step: 3, title: "Execução", description: "Conduzimos o processo" }
    ],
    faq: [
      { question: "Quanto tempo demora?", answer: "Extrajudicial: 30-60 dias. Judicial: 6-12 meses." }
    ],
    testimonials: [
      { name: "Família Santos", text: "Processo rápido e sem complicações." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Adoção",
    description: "Assessoria completa em processos de adoção nacional e internacional.",
    category: "familia",
    href: "adocao",
    benefits: [
      { title: "Suporte Emocional", description: "Acompanhamento humanizado", icon: "Heart" },
      { title: "Expertise Técnica", description: "Conhecimento especializado", icon: "Award" }
    ],
    process: [
      { step: 1, title: "Orientação", description: "Explicamos todo o processo" },
      { step: 2, title: "Documentação", description: "Preparamos a habilitação" },
      { step: 3, title: "Acompanhamento", description: "Suporte durante todo o processo" }
    ],
    faq: [
      { question: "Quais os requisitos?", answer: "Idade mínima 18 anos, diferença de 16 anos do adotando." }
    ],
    testimonials: [
      { name: "Paulo e Rita", text: "Realizaram nosso sonho de ser pais." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Violência Doméstica",
    description: "Medidas protetivas e defesa de vítimas de violência doméstica e familiar.",
    category: "familia",
    href: "violencia-domestica",
    benefits: [
      { title: "Urgência", description: "Medidas protetivas imediatas", icon: "Shield" },
      { title: "Sigilo", description: "Atendimento confidencial", icon: "Lock" }
    ],
    process: [
      { step: 1, title: "Acolhimento", description: "Escuta qualificada da vítima" },
      { step: 2, title: "Medidas Urgentes", description: "Solicitação de proteção" },
      { step: 3, title: "Acompanhamento", description: "Suporte jurídico contínuo" }
    ],
    faq: [
      { question: "Como funciona a medida protetiva?", answer: "Proíbe aproximação e contato do agressor." }
    ],
    testimonials: [
      { name: "Cliente Anônima", text: "Me deram segurança para recomeçar." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Investigação de Paternidade",
    description: "Ações de investigação e negatória de paternidade com DNA.",
    category: "familia",
    href: "investigacao-paternidade",
    benefits: [
      { title: "Certeza Científica", description: "Exame de DNA 99,9% de precisão", icon: "Search" },
      { title: "Direitos Garantidos", description: "Reconhecimento de filiação", icon: "Scale" }
    ],
    process: [
      { step: 1, title: "Petição", description: "Entramos com a ação" },
      { step: 2, title: "Exame DNA", description: "Realizamos o teste" },
      { step: 3, title: "Sentença", description: "Reconhecimento judicial" }
    ],
    faq: [
      { question: "E se o suposto pai se recusar?", answer: "O juiz pode decretar a paternidade pela recusa." }
    ],
    testimonials: [
      { name: "Ana Paula", text: "Meu filho teve o pai reconhecido." }
    ]
  },
  // Adicionar alguns serviços de outras áreas para teste
  {
    id: crypto.randomUUID(),
    title: "Planejamento Tributário",
    description: "Estratégias legais para redução da carga tributária de pessoas físicas e jurídicas.",
    category: "tributario",
    href: "planejamento-tributario",
    benefits: [
      { title: "Economia Legal", description: "Redução de até 40% nos impostos", icon: "TrendingDown" },
      { title: "Conformidade", description: "Sempre dentro da lei", icon: "CheckCircle" }
    ],
    process: [
      { step: 1, title: "Diagnóstico", description: "Analisamos sua situação tributária" },
      { step: 2, title: "Estratégia", description: "Definimos as melhores práticas" }
    ],
    faq: [
      { question: "É legal reduzir impostos?", answer: "Sim, através de planejamento tributário lícito." }
    ],
    testimonials: [
      { name: "Empresa ABC", text: "Reduziram significativamente nossos impostos." }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: "Constituição de Empresas",
    description: "Abertura e estruturação de empresas com escolha do melhor regime tributário.",
    category: "empresarial",
    href: "constituicao-empresas",
    benefits: [
      { title: "Regime Ideal", description: "Escolhemos o melhor enquadramento", icon: "Building" },
      { title: "Rapidez", description: "Empresa aberta em poucos dias", icon: "Zap" }
    ],
    process: [
      { step: 1, title: "Planejamento", description: "Definimos a estrutura ideal" },
      { step: 2, title: "Registro", description: "Formalizamos a empresa" }
    ],
    faq: [
      { question: "Qual o melhor regime?", answer: "Depende da atividade e faturamento previsto." }
    ],
    testimonials: [
      { name: "Startup XYZ", text: "Nos ajudaram a estruturar nossa empresa perfeitamente." }
    ]
  }
];

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = async () => {
    try {
      console.log('📄 CARREGANDO PÁGINAS...');
      setIsLoading(true);
      
      const { data: pagesData, error: pagesError } = await supabase
        .from('service_pages')
        .select(`
          *,
          law_categories!service_pages_category_id_fkey(id, category_key, name),
          service_benefits(*),
          service_process_steps(*),
          service_faq(*),
          service_testimonials(*)
        `)
        .eq('is_active', true)
        .order('display_order');

      if (pagesError) {
        console.error('❌ Erro ao carregar páginas:', pagesError);
        console.log('🔄 Usando dados de exemplo completos...');
        const samplePages = createSampleServicePages();
        console.log('📋 Total de páginas de exemplo:', samplePages.length);
        console.log('👨‍👩‍👧‍👦 Páginas de família:', samplePages.filter(p => p.category === 'familia').length);
        setServicePages(samplePages);
        return;
      }

      if (pagesData && pagesData.length > 0) {
        console.log('📄 Páginas carregadas do Supabase:', pagesData.length);
        
        const formattedPages: ServicePage[] = pagesData.map((page: any) => ({
          id: page.id,
          title: page.title || '',
          description: page.description || '',
          category: page.law_categories?.category_key || 'geral',
          href: page.href || '',
          benefits: (page.service_benefits || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((benefit: any) => ({
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon
            })),
          process: (page.service_process_steps || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((step: any) => ({
              step: step.step_number,
              title: step.title,
              description: step.description
            })),
          faq: (page.service_faq || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((faq: any) => ({
              question: faq.question,
              answer: faq.answer
            })),
          testimonials: (page.service_testimonials || [])
            .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
            .map((testimonial: any) => ({
              name: testimonial.name,
              text: testimonial.text,
              image: testimonial.image
            }))
        }));
        
        console.log('✅ Páginas formatadas do Supabase:', formattedPages.length);
        setServicePages(formattedPages);
      } else {
        console.log('⚠️ Nenhuma página encontrada no Supabase, usando dados de exemplo completos...');
        const samplePages = createSampleServicePages();
        console.log('📋 Total de páginas de exemplo:', samplePages.length);
        console.log('👨‍👩‍👧‍👦 Páginas de família:', samplePages.filter(p => p.category === 'familia').length);
        setServicePages(samplePages);
      }
    } catch (error) {
      console.error('💥 Erro ao carregar páginas:', error);
      console.log('🔄 Usando dados de exemplo completos devido ao erro...');
      const samplePages = createSampleServicePages();
      console.log('📋 Total de páginas de exemplo:', samplePages.length);
      console.log('👨‍👩‍👧‍👦 Páginas de família:', samplePages.filter(p => p.category === 'familia').length);
      setServicePages(samplePages);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('💾 SALVANDO PÁGINAS:', pages);
      
      if (!pages || pages.length === 0) return;

      // Buscar categorias para mapear category_key -> id
      const { data: categoriesData } = await supabase
        .from('law_categories')
        .select('id, category_key');

      const categoryMap = new Map<string, string>();
      categoriesData?.forEach(cat => {
        categoryMap.set(cat.category_key, cat.id);
      });

      console.log('📂 Mapeamento categorias:', Object.fromEntries(categoryMap));

      for (const page of pages) {
        const categoryId = categoryMap.get(page.category);
        
        if (!categoryId) {
          console.warn(`⚠️ Categoria '${page.category}' não encontrada`);
          continue;
        }

        // Gerar UUID válido se necessário
        let validPageId = page.id;
        if (page.id.includes('-') && page.id.length < 32) {
          validPageId = crypto.randomUUID();
          console.log(`🔄 Novo UUID para ${page.title}: ${validPageId}`);
        }

        const pageData = {
          id: validPageId,
          title: page.title,
          description: page.description,
          href: page.href || `${page.category}-${Date.now()}`,
          category_id: categoryId,
          is_active: true,
          display_order: 0
        };

        console.log('💾 Salvando página:', pageData);

        const { error: pageError } = await supabase
          .from('service_pages')
          .upsert(pageData, { onConflict: 'id' });

        if (pageError) {
          console.error('❌ Erro ao salvar página:', pageError);
          continue;
        }

        console.log('✅ Página salva:', page.title);

        // Limpar dados relacionados
        await Promise.all([
          supabase.from('service_benefits').delete().eq('service_page_id', validPageId),
          supabase.from('service_process_steps').delete().eq('service_page_id', validPageId),
          supabase.from('service_faq').delete().eq('service_page_id', validPageId),
          supabase.from('service_testimonials').delete().eq('service_page_id', validPageId)
        ]);

        // Inserir dados relacionados
        if (page.benefits?.length > 0) {
          const benefits = page.benefits.map((benefit, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            title: benefit.title,
            description: benefit.description,
            icon: benefit.icon || 'FileText',
            display_order: index
          }));

          await supabase.from('service_benefits').insert(benefits);
        }

        if (page.process?.length > 0) {
          const processSteps = page.process.map((step, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            step_number: step.step,
            title: step.title,
            description: step.description,
            display_order: index
          }));

          await supabase.from('service_process_steps').insert(processSteps);
        }

        if (page.faq?.length > 0) {
          const faqItems = page.faq.map((faq, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));

          await supabase.from('service_faq').insert(faqItems);
        }

        if (page.testimonials?.length > 0) {
          const testimonials = page.testimonials.map((testimonial, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            name: testimonial.name,
            text: testimonial.text,
            image: testimonial.image,
            display_order: index
          }));

          await supabase.from('service_testimonials').insert(testimonials);
        }
      }

      console.log('✅ TODAS AS PÁGINAS SALVAS');
      await loadServicePages();
      return pages;
    } catch (error) {
      console.error('💥 ERRO ao salvar páginas:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadServicePages();
  }, []);

  return {
    servicePages,
    isLoading,
    loadServicePages,
    saveServicePages,
    setServicePages
  };
};
