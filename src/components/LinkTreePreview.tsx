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

  const renderItemContent = (item: LinkTreeItem) => (
    <CardContent className="p-4">
      <div className="flex items-center gap-4">
        {item.icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
            {item.icon}
          </div>
        )}
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
                    className="mx-auto overflow-hidden rounded-full border-4 border-white/20 backdrop-blur-sm"
                    style={{
                      width: `${linkTree.avatar_size || '128'}px`,
                      height: `${linkTree.avatar_size || '128'}px`
                    }}
                  >
                    <img 
                      src={linkTree.avatar_url} 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
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
              width: `${linkTree.avatar_size || '128'}px`,
              height: `${linkTree.avatar_size || '128'}px`,
              borderRadius: 0
            }}
          >
            <img src={linkTree.avatar_url} alt="Avatar" className="w-full h-full object-contain" />
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