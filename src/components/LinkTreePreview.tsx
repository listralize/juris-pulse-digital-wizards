import React, { useState } from 'react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, TrendingUp, Play, Phone, Mail, MapPin, Calendar, Download, Share, Heart, Award, Shield, Zap, Briefcase, Scale, FileText, Users, Clock, CheckCircle, ArrowRight, Sparkles, Crown, Diamond, Globe, Camera, Video, Music, Image, MessageCircle, Instagram, Youtube, Linkedin, Twitter, Facebook, ChevronRight } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import { FormModal } from '@/components/FormModal';
import { useFormConfig } from '@/hooks/useFormConfig';

interface LinkTreePreviewProps {
  linkTree: LinkTree;
  linkTreeItems?: LinkTreeItem[];
  onItemClick?: (item: LinkTreeItem) => void;
}

export function LinkTreePreview({
  linkTree,
  linkTreeItems = [],
  onItemClick
}: LinkTreePreviewProps) {
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    formConfig: any;
    title: string;
  }>({
    isOpen: false,
    formConfig: null,
    title: ''
  });

  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoId: string;
    title: string;
  }>({
    isOpen: false,
    videoId: '',
    title: ''
  });

  const { multipleFormsConfig } = useFormConfig();

  // Função para extrair ID do YouTube
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Função para obter thumbnail do YouTube
  const getYouTubeThumbnail = (url: string): string | null => {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const handleFormOpen = () => {
    const formConfig = multipleFormsConfig.forms[0]; // Usar primeiro form disponível
    setModalData({
      isOpen: true,
      formConfig: formConfig,
      title: 'Contato'
    });
  };

  const handleVideoOpen = (url: string, title: string) => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      setVideoModal({
        isOpen: true,
        videoId: videoId,
        title: title
      });
    }
  };

  const getItemIcon = (item: LinkTreeItem) => {
    // Lista de ícones disponíveis
    const iconMap: { [key: string]: any } = {
      'star': Star,
      'external-link': ExternalLink,
      'trending-up': TrendingUp,
      'play': Play,
      'phone': Phone,
      'mail': Mail,
      'map-pin': MapPin,
      'calendar': Calendar,
      'download': Download,
      'share': Share,
      'heart': Heart,
      'award': Award,
      'shield': Shield,
      'zap': Zap,
      'briefcase': Briefcase,
      'scale': Scale,
      'file-text': FileText,
      'users': Users,
      'clock': Clock,
      'check-circle': CheckCircle,
      'arrow-right': ArrowRight,
      'sparkles': Sparkles,
      'crown': Crown,
      'diamond': Diamond,
      'globe': Globe,
      'camera': Camera,
      'video': Video,
      'music': Music,
      'image': Image,
      'message-circle': MessageCircle,
      'instagram': Instagram,
      'youtube': Youtube,
      'linkedin': Linkedin,
      'twitter': Twitter,
      'facebook': Facebook,
      'chevron-right': ChevronRight,
      'link': ExternalLink
    };

    // Se há um ícone personalizado, usar ele
    if (item.icon && iconMap[item.icon]) {
      const IconComponent = iconMap[item.icon];
      return <IconComponent className="w-5 h-5" style={{ color: item.icon_color }} />;
    }

    // Fallback para ícones automáticos baseados no tipo
    switch (item.item_type) {
      case 'contact':
        if (item.url?.includes('whatsapp') || item.url?.includes('wa.me')) {
          return <MessageCircle className="w-5 h-5" />;
        }
        if (item.url?.includes('mailto') || item.url?.includes('@')) {
          return <Mail className="w-5 h-5" />;
        }
        if (item.url?.includes('tel:')) {
          return <Phone className="w-5 h-5" />;
        }
        return <Phone className="w-5 h-5" />;
      case 'social':
        if (item.url?.includes('instagram')) return <Instagram className="w-5 h-5" />;
        if (item.url?.includes('youtube')) return <Youtube className="w-5 h-5" />;
        if (item.url?.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
        if (item.url?.includes('twitter') || item.url?.includes('x.com')) return <Twitter className="w-5 h-5" />;
        if (item.url?.includes('facebook')) return <Facebook className="w-5 h-5" />;
        return <Globe className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'text':
      case 'info':
        return <FileText className="w-5 h-5" />;
      case 'form':
        return <Mail className="w-5 h-5" />;
      case 'product':
        return <Briefcase className="w-5 h-5" />;
      case 'service':
        return <Scale className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const renderItemContent = (item: LinkTreeItem) => (
    <CardContent className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white flex-shrink-0">
          {getItemIcon(item)}
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
          {item.card_content && (
            <p className="text-sm text-muted-foreground">{item.card_content}</p>
          )}
        </div>
      </div>
    </CardContent>
  );

  const renderItem = (item: LinkTreeItem) => {
    const cardClass = "overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
    const mobileStyle = {
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      touchAction: 'manipulation' as const
    };

    // Para formulários
    if (item.item_type === 'form') {
      return (
        <Card key={item.id} className={cardClass}>
          <div
            onClick={handleFormOpen}
            style={{
              cursor: 'pointer',
              ...mobileStyle
            }}
          >
            {renderItemContent(item)}
          </div>
        </Card>
      );
    }

    // Para vídeos
    if (item.item_type === 'video') {
      return (
        <Card key={item.id} className={cardClass}>
          <div
            onClick={() => handleVideoOpen(item.url || '', item.title)}
            style={{
              cursor: 'pointer',
              ...mobileStyle
            }}
          >
            {renderItemContent(item)}
          </div>
        </Card>
      );
    }

    // Para links externos - usar elemento <a> nativo
    return (
      <Card key={item.id} className={cardClass}>
        <a
          href={item.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            ...mobileStyle
          }}
        >
          {renderItemContent(item)}
        </a>
      </Card>
    );
  };

  const renderItemsByLayout = () => {
    const sortedItems = [...(linkTreeItems || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    
    return (
      <div className="space-y-4 max-w-md mx-auto px-4">
        {sortedItems.map(item => renderItem(item))}
      </div>
    );
  };

  const getCustomStyles = () => {
    const baseStyles: React.CSSProperties = {};

    // Aplicar cor de fundo ou gradiente
    if (linkTree.background_type === 'solid') {
      baseStyles.backgroundColor = linkTree.background_color;
    } else if (linkTree.background_type === 'gradient' && linkTree.background_gradient) {
      baseStyles.background = linkTree.background_gradient;
    } else if (linkTree.background_type === 'image' && linkTree.background_image) {
      baseStyles.backgroundImage = `url(${linkTree.background_image})`;
      baseStyles.backgroundSize = 'cover';
      baseStyles.backgroundPosition = 'center';
      baseStyles.backgroundRepeat = 'no-repeat';
      baseStyles.backgroundColor = linkTree.background_color || '#000';
    } else if (linkTree.background_type === 'video' && linkTree.background_video) {
      baseStyles.backgroundColor = linkTree.background_color || '#000';
    }

    // Aplicar cor do texto
    if (linkTree.text_color) {
      baseStyles.color = linkTree.text_color;
    }
    return baseStyles;
  };

  const isNeuralTheme = linkTree.background_type === 'neural';

  // Render neural theme layout
  if (isNeuralTheme) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <NeuralBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
              {/* Header */}
              {linkTree.avatar_url && (
                <div className="text-center">
                  <div 
                    className="mx-auto overflow-hidden"
                    style={{
                      width: `${linkTree.avatar_size ? Number(linkTree.avatar_size) * 0.8 : 96}px`,
                      height: `${linkTree.avatar_size ? Number(linkTree.avatar_size) * 0.8 : 96}px`
                    }}
                  >
                    <img 
                      src={linkTree.avatar_url} 
                      alt={linkTree.title || 'Avatar'} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              )}
              
              <div className="text-center text-white">
                <h1 className={`${linkTree.title_size || 'text-3xl'} ${linkTree.title_font || 'font-bold'} mb-2`}>
                  {linkTree.title}
                </h1>
                {linkTree.description && (
                  <p className={`${linkTree.description_size || 'text-lg'} opacity-80`}>
                    {linkTree.description}
                  </p>
                )}
              </div>

              {/* Items */}
              {renderItemsByLayout()}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a 
              href="https://listralize.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-white/80 transition-colors"
            >
              Desenvolvido por Grupo Listralize
            </a>
          </div>
        </div>

        <FormModal 
          isOpen={modalData.isOpen} 
          onClose={() => setModalData({
            isOpen: false,
            formConfig: null,
            title: ''
          })} 
          formConfig={modalData.formConfig} 
          title={modalData.title} 
        />

        {/* Modal de Vídeo YouTube */}
        {videoModal.isOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" 
            onClick={() => setVideoModal({ isOpen: false, videoId: '', title: '' })}
          >
            <div 
              className="bg-white rounded-lg max-w-4xl w-full aspect-video max-h-[80vh] relative" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-black">{videoModal.title}</h3>
                <button 
                  onClick={() => setVideoModal({ isOpen: false, videoId: '', title: '' })}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&modestbranding=1&rel=0`}
                  className="w-full h-full rounded-b-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={videoModal.title}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Layout padrão para outros temas
  return (
    <div className="relative min-h-screen p-8" style={getCustomStyles()}>
      {/* Vídeo de fundo */}
      {linkTree.background_type === 'video' && linkTree.background_video && (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={linkTree.background_video} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay para vídeo */}
      {linkTree.background_type === 'video' && (
        <div className="absolute inset-0 bg-black/50 z-5"></div>
      )}
      
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Header */}
        {linkTree.avatar_url && (
          <div 
            className="mx-auto overflow-hidden" 
            style={{
              width: `${linkTree.avatar_size ? Number(linkTree.avatar_size) * 0.8 : 96}px`,
              height: `${linkTree.avatar_size ? Number(linkTree.avatar_size) * 0.8 : 96}px`
            }}
          >
            <img 
              src={linkTree.avatar_url} 
              alt={linkTree.title || 'Avatar'} 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              crossOrigin="anonymous"
            />
          </div>
        )}
        
        <div>
          <h1 
            className={`${linkTree.title_size || 'text-3xl'} ${linkTree.title_font || 'font-bold'} mb-2`} 
            style={{
              color: linkTree.title_color || linkTree.text_color
            }}
          >
            {linkTree.title}
          </h1>
          {linkTree.description && (
            <p 
              className={`${linkTree.description_size || 'text-lg'} opacity-80`} 
              style={{
                color: linkTree.description_color || linkTree.text_color
              }}
            >
              {linkTree.description}
            </p>
          )}
        </div>

        {/* Items */}
        {renderItemsByLayout()}

        {/* Fixed Developer Credit */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <a 
            href="https://listralize.com.br/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-white/60 hover:text-white/80 transition-colors"
          >
            Desenvolvido por Grupo Listralize
          </a>
        </div>
      </div>

      <FormModal 
        isOpen={modalData.isOpen} 
        onClose={() => setModalData({
          isOpen: false,
          formConfig: null,
          title: ''
        })} 
        formConfig={modalData.formConfig} 
        title={modalData.title} 
      />

      {/* Modal de Vídeo YouTube */}
      {videoModal.isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" 
          onClick={() => setVideoModal({ isOpen: false, videoId: '', title: '' })}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full aspect-video max-h-[80vh] relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-black">{videoModal.title}</h3>
              <button 
                onClick={() => setVideoModal({ isOpen: false, videoId: '', title: '' })}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&modestbranding=1&rel=0`}
                className="w-full h-full rounded-b-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videoModal.title}
              />
            </div>
          </div>
        </div>
      )}

      {linkTree.custom_css && (
        <style dangerouslySetInnerHTML={{
          __html: linkTree.custom_css
        }} />
      )}
    </div>
  );
}