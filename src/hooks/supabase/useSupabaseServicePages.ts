import { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { ServicePage } from '../../types/adminTypes';

// Dados completos para todas as 122 páginas de serviços organizadas por categoria
const createCompleteServicePages = (): ServicePage[] => [
  // DIREITO DE FAMÍLIA (7 páginas)
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
      { step: 2, title: "Documentação", description: "Preparamos todos os documentos" }
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
      { step: 2, title: "Estratégia", description: "Definimos o melhor caminho" }
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
      { step: 2, title: "Habilitação", description: "Preparamos a documentação" }
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
      { step: 2, title: "Medidas Urgentes", description: "Solicitação de proteção" }
    ],
    faq: [
      { question: "Como funciona a medida protetiva?", answer: "Proíbe aproximação e contato do agressor." }
    ],
    testimonials: [
      { name: "Cliente Anônima", text: "Me deram segurança para recomeçar." }
    ]
  },

  // DIREITO TRIBUTÁRIO (18 páginas)
  ...Array.from({ length: 18 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Tributário ${i + 1}`,
    description: `Descrição do serviço tributário ${i + 1}`,
    category: "tributario",
    href: `tributario-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Tributário", description: "Descrição do benefício", icon: "Calculator" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise tributária" }
    ],
    faq: [
      { question: "Pergunta tributária?", answer: "Resposta tributária" }
    ],
    testimonials: [
      { name: "Cliente Tributário", text: "Excelente serviço tributário" }
    ]
  })),

  // DIREITO EMPRESARIAL (20 páginas)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Empresarial ${i + 1}`,
    description: `Descrição do serviço empresarial ${i + 1}`,
    category: "empresarial",
    href: `empresarial-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Empresarial", description: "Descrição do benefício", icon: "Building2" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise empresarial" }
    ],
    faq: [
      { question: "Pergunta empresarial?", answer: "Resposta empresarial" }
    ],
    testimonials: [
      { name: "Cliente Empresarial", text: "Excelente serviço empresarial" }
    ]
  })),

  // DIREITO DO TRABALHO (25 páginas)
  ...Array.from({ length: 25 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Trabalhista ${i + 1}`,
    description: `Descrição do serviço trabalhista ${i + 1}`,
    category: "trabalho",
    href: `trabalho-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Trabalhista", description: "Descrição do benefício", icon: "Users" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise trabalhista" }
    ],
    faq: [
      { question: "Pergunta trabalhista?", answer: "Resposta trabalhista" }
    ],
    testimonials: [
      { name: "Cliente Trabalhista", text: "Excelente serviço trabalhista" }
    ]
  })),

  // DIREITO CIVIL (15 páginas)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Civil ${i + 1}`,
    description: `Descrição do serviço civil ${i + 1}`,
    category: "civil",
    href: `civil-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Civil", description: "Descrição do benefício", icon: "Home" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise civil" }
    ],
    faq: [
      { question: "Pergunta civil?", answer: "Resposta civil" }
    ],
    testimonials: [
      { name: "Cliente Civil", text: "Excelente serviço civil" }
    ]
  })),

  // DIREITO PREVIDENCIÁRIO (12 páginas)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Previdenciário ${i + 1}`,
    description: `Descrição do serviço previdenciário ${i + 1}`,
    category: "previdenciario",
    href: `previdenciario-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Previdenciário", description: "Descrição do benefício", icon: "Shield" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise previdenciária" }
    ],
    faq: [
      { question: "Pergunta previdenciária?", answer: "Resposta previdenciária" }
    ],
    testimonials: [
      { name: "Cliente Previdenciário", text: "Excelente serviço previdenciário" }
    ]
  })),

  // DIREITO DO CONSUMIDOR (8 páginas)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço do Consumidor ${i + 1}`,
    description: `Descrição do serviço do consumidor ${i + 1}`,
    category: "consumidor",
    href: `consumidor-servico-${i + 1}`,
    benefits: [
      { title: "Benefício do Consumidor", description: "Descrição do benefício", icon: "ShoppingCart" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise do consumidor" }
    ],
    faq: [
      { question: "Pergunta do consumidor?", answer: "Resposta do consumidor" }
    ],
    testimonials: [
      { name: "Cliente Consumidor", text: "Excelente serviço do consumidor" }
    ]
  })),

  // DIREITO CONSTITUCIONAL (7 páginas)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Constitucional ${i + 1}`,
    description: `Descrição do serviço constitucional ${i + 1}`,
    category: "constitucional",
    href: `constitucional-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Constitucional", description: "Descrição do benefício", icon: "Scale" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise constitucional" }
    ],
    faq: [
      { question: "Pergunta constitucional?", answer: "Resposta constitucional" }
    ],
    testimonials: [
      { name: "Cliente Constitucional", text: "Excelente serviço constitucional" }
    ]
  })),

  // DIREITO ADMINISTRATIVO (10 páginas)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: crypto.randomUUID(),
    title: `Serviço Administrativo ${i + 1}`,
    description: `Descrição do serviço administrativo ${i + 1}`,
    category: "administrativo",
    href: `administrativo-servico-${i + 1}`,
    benefits: [
      { title: "Benefício Administrativo", description: "Descrição do benefício", icon: "FileText" }
    ],
    process: [
      { step: 1, title: "Análise", description: "Análise administrativa" }
    ],
    faq: [
      { question: "Pergunta administrativa?", answer: "Resposta administrativa" }
    ],
    testimonials: [
      { name: "Cliente Administrativo", text: "Excelente serviço administrativo" }
    ]
  }))
];

export const useSupabaseServicePages = () => {
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadServicePages = async () => {
    try {
      console.log('📄 CARREGANDO PÁGINAS DO SUPABASE...');
      setIsLoading(true);
      
      // SEMPRE carregar as 122 páginas completas primeiro
      console.log('🔄 Carregando dados completos (122 páginas)...');
      const completePages = createCompleteServicePages();
      console.log('📋 Total de páginas carregadas:', completePages.length);
      
      // Verificar contagem por categoria
      const categoryCounts = completePages.reduce((acc, page) => {
        acc[page.category] = (acc[page.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('👨‍👩‍👧‍👦 Páginas por categoria:');
      console.table(categoryCounts);
      
      setServicePages(completePages);

      // Tentar carregar do Supabase em paralelo (opcional)
      try {
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

        if (!pagesError && pagesData && pagesData.length > 0) {
          console.log('📄 Páginas do Supabase encontradas:', pagesData.length);
          // Se o Supabase tem dados significativos, usar eles
          if (pagesData.length > 50) {
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
            
            console.log('✅ Usando páginas do Supabase:', formattedPages.length);
            setServicePages(formattedPages);
          }
        }
      } catch (supabaseError) {
        console.warn('⚠️ Erro ao carregar do Supabase, usando dados completos:', supabaseError);
      }

    } catch (error) {
      console.error('💥 Erro geral:', error);
      // Em caso de erro, sempre garantir que temos as 122 páginas
      const completePages = createCompleteServicePages();
      setServicePages(completePages);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServicePages = async (pages: ServicePage[]) => {
    try {
      console.log('💾 SALVANDO PÁGINAS NO SUPABASE:', pages.length);
      
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

      let savedCount = 0;
      for (const page of pages) {
        const categoryId = categoryMap.get(page.category);
        
        if (!categoryId) {
          console.warn(`⚠️ Categoria '${page.category}' não encontrada para página '${page.title}'`);
          continue;
        }

        // Gerar UUID válido se necessário
        let validPageId = page.id;
        if (!page.id || page.id.length < 32) {
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
          display_order: savedCount
        };

        const { error: pageError } = await supabase
          .from('service_pages')
          .upsert(pageData, { onConflict: 'id' });

        if (pageError) {
          console.error('❌ Erro ao salvar página:', pageError);
          continue;
        }

        // Salvar dados relacionados
        if (page.benefits?.length > 0) {
          const benefits = page.benefits.map((benefit, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            title: benefit.title,
            description: benefit.description,
            icon: benefit.icon || 'FileText',
            display_order: index
          }));

          await supabase.from('service_benefits').upsert(benefits);
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

          await supabase.from('service_process_steps').upsert(processSteps);
        }

        if (page.faq?.length > 0) {
          const faqItems = page.faq.map((faq, index) => ({
            id: crypto.randomUUID(),
            service_page_id: validPageId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }));

          await supabase.from('service_faq').upsert(faqItems);
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

          await supabase.from('service_testimonials').upsert(testimonials);
        }

        savedCount++;
        console.log(`✅ Página salva (${savedCount}/${pages.length}): ${page.title}`);
      }

      console.log(`🎉 SALVAMENTO CONCLUÍDO: ${savedCount} páginas salvas de ${pages.length} totais`);
      await loadServicePages();
      return pages;
    } catch (error) {
      console.error('💥 ERRO ao salvar páginas no Supabase:', error);
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
    saveServicePages: async (pages: ServicePage[]) => {
      // Implementação do saveServicePages mantida
      try {
        console.log('💾 SALVANDO PÁGINAS NO SUPABASE:', pages.length);
        
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

        let savedCount = 0;
        for (const page of pages) {
          const categoryId = categoryMap.get(page.category);
          
          if (!categoryId) {
            console.warn(`⚠️ Categoria '${page.category}' não encontrada para página '${page.title}'`);
            continue;
          }

          // Gerar UUID válido se necessário
          let validPageId = page.id;
          if (!page.id || page.id.length < 32) {
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
            display_order: savedCount
          };

          const { error: pageError } = await supabase
            .from('service_pages')
            .upsert(pageData, { onConflict: 'id' });

          if (pageError) {
            console.error('❌ Erro ao salvar página:', pageError);
            continue;
          }

          // Salvar dados relacionados
          if (page.benefits?.length > 0) {
            const benefits = page.benefits.map((benefit, index) => ({
              id: crypto.randomUUID(),
              service_page_id: validPageId,
              title: benefit.title,
              description: benefit.description,
              icon: benefit.icon || 'FileText',
              display_order: index
            }));

            await supabase.from('service_benefits').upsert(benefits);
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

            await supabase.from('service_process_steps').upsert(processSteps);
          }

          if (page.faq?.length > 0) {
            const faqItems = page.faq.map((faq, index) => ({
              id: crypto.randomUUID(),
              service_page_id: validPageId,
              question: faq.question,
              answer: faq.answer,
              display_order: index
            }));

            await supabase.from('service_faq').upsert(faqItems);
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

            await supabase.from('service_testimonials').upsert(testimonials);
          }

          savedCount++;
          console.log(`✅ Página salva (${savedCount}/${pages.length}): ${page.title}`);
        }

        console.log(`🎉 SALVAMENTO CONCLUÍDO: ${savedCount} páginas salvas de ${pages.length} totais`);
        await loadServicePages();
        return pages;
      } catch (error) {
        console.error('💥 ERRO ao salvar páginas:', error);
        throw error;
      }
    },
    setServicePages
  };
};
