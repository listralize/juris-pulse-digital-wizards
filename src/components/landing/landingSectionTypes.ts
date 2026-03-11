import type { LandingSection } from '@/types/stepFormTypes';

export const getDefaultSectionConfig = (type: LandingSection['type']): Record<string, any> => {
  switch (type) {
    case 'hero': return { headline: 'Precisa de Ajuda?', subheadline: 'Conte com especialistas', cta_text: 'Fale Conosco', cta_url: '#formulario', layout: 'split' };
    case 'trust_badges': return { items: [{ icon: 'shield', text: 'Sigilo Total' }, { icon: 'clock', text: 'Resposta Rápida' }, { icon: 'award', text: 'Experiência' }], style: 'pill' };
    case 'problems_grid': return { title: 'Situações que Resolvemos', items: [{ title: 'Problema 1', description: 'Descrição', icon: 'alert' }], columns: 3 };
    case 'cta_banner': return { title: 'Não espere mais', button_text: 'Falar Agora', button_url: '#formulario', style: 'solid' };
    case 'embedded_form': return { title: 'Fale Conosco', form_fields: [{ name: 'nome', type: 'text', placeholder: 'Seu nome', required: true, label: 'Nome' }, { name: 'telefone', type: 'tel', placeholder: '(00) 00000-0000', required: true, label: 'Telefone' }], cta_text: 'Enviar', layout: 'card' };
    case 'benefits': return { title: 'Por que nos escolher?', items: [{ title: 'Experiência', description: 'Anos de atuação', icon: 'check' }], layout: 'grid', columns: 3 };
    case 'team': return { title: 'Nossa Equipe', members: [{ name: 'Dr. Exemplo', role: 'Advogado', credentials: 'OAB/XX 00000' }], layout: 'grid' };
    case 'faq': return { title: 'Perguntas Frequentes', items: [{ question: 'Como funciona?', answer: 'Explicação aqui.' }], style: 'accordion' };
    case 'testimonials': return { title: 'Depoimentos', items: [{ name: 'Cliente', text: 'Excelente!', rating: 5 }], layout: 'grid', show_stars: true };
    case 'text_image': return { title: 'Sobre Nós', text: 'Texto descritivo aqui.', image_position: 'right' };
    case 'custom_html': return { html_content: '<div style="padding:2rem;text-align:center;">Conteúdo personalizado</div>' };
    case 'countdown': return { title: 'Oferta por Tempo Limitado', target_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], show_labels: true };
    case 'video': return { title: 'Assista', video_url: '', video_type: 'youtube' };
    case 'numbers': return { title: 'Nossos Números', items: [{ number: '500', suffix: '+', label: 'Clientes' }, { number: '10', label: 'Anos' }], style: 'cards' };
    case 'whatsapp_cta': return { title: 'Fale Conosco', phone_number: '', button_text: 'Falar no WhatsApp', style: 'banner' };
    case 'logo_carousel': return { title: 'Parceiros', logos: [], grayscale: true };
    case 'price_table': return {
      title: 'Nossos Planos',
      plans: [
        { name: 'Básico', price: 'R$ 997', period: 'único', features: ['Consulta inicial', 'Análise do caso'], cta_text: 'Começar', highlighted: false },
        { name: 'Completo', price: 'R$ 1.997', period: 'único', features: ['Tudo do Básico', 'Acompanhamento completo', 'Suporte prioritário'], cta_text: 'Escolher', highlighted: true },
      ],
    };
    case 'process_steps': return {
      title: 'Como Funciona',
      layout: 'vertical',
      steps: [
        { number: '01', title: 'Contato Inicial', description: 'Entre em contato conosco' },
        { number: '02', title: 'Análise do Caso', description: 'Avaliamos sua situação' },
        { number: '03', title: 'Resolução', description: 'Resolvemos seu problema' },
      ],
    };
    case 'guarantee': return {
      title: 'Garantia Total',
      subtitle: 'Trabalhamos com total comprometimento',
      days: 30,
      description: 'Se não ficar satisfeito, trabalhamos até resolver',
    };
    case 'divider': return {
      style: 'line',
      height: '40px',
      line_width: '60%',
      use_gradient: true,
    };
    case 'comparison': return {
      title: 'Por que nos escolher?',
      left_title: 'Sem Advogado',
      right_title: 'Com Advogado',
      layout: 'cards',
      items: [
        { feature: 'Orientação', left_text: 'Sem suporte jurídico', right_text: 'Orientação especializada' },
        { feature: 'Prazos', left_text: 'Risco de perder prazos', right_text: 'Controle total de prazos' },
        { feature: 'Resultado', left_text: 'Resultado incerto', right_text: 'Maiores chances de sucesso' },
      ],
    };
    case 'banner_marquee': return {
      texts: ['Consulta Gratuita', 'Atendimento 24h', 'Especialistas Certificados'],
      speed: 30,
      separator: '★',
      font_size: '1rem',
    };
    case 'embedded_stepform': return {
      title: 'Responda e receba orientação',
      subtitle: 'Leva menos de 1 minuto.',
      anchor_id: 'formulario',
    };
    default: return {};
  }
};
