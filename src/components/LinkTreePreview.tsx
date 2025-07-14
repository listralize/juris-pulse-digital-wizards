import React, { useState } from 'react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, ExternalLink, TrendingUp, Play, Phone, Mail, MapPin, 
  Calendar, Download, Share, Heart, Award, Shield, Zap,
  Briefcase, Scale, FileText, Users, Clock, CheckCircle,
  ArrowRight, Sparkles, Crown, Diamond, Globe, Camera,
  Video, Music, Image, MessageCircle, Instagram, Youtube,
  Linkedin, Twitter, Facebook, ChevronRight
} from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import { FormModal } from '@/components/FormModal';
import { useFormConfig } from '@/hooks/useFormConfig';

interface LinkTreePreviewProps {
  linkTree: LinkTree;
  linkTreeItems?: LinkTreeItem[];
  onItemClick?: (item: LinkTreeItem) => void;
}

const premiumLayouts = {
  grid: 'grid',
  list: 'list', 
  masonry: 'masonry',
  carousel: 'carousel',
  magazine: 'magazine',
  portfolio: 'portfolio',
  bento: 'bento'
};

const legalThemes = {
  corporate: {
    primary: '#1e40af',
    secondary: '#f8fafc',
    accent: '#e11d48',
    gradient: 'from-slate-900 via-blue-900 to-slate-900'
  },
  premium: {
    primary: '#7c3aed',
    secondary: '#f1f5f9',
    accent: '#f59e0b',
    gradient: 'from-purple-900 via-indigo-900 to-purple-900'
  },
  gold: {
    primary: '#b45309',
    secondary: '#fefce8',
    accent: '#059669',
    gradient: 'from-amber-900 via-yellow-800 to-amber-900'
  },
  dark: {
    primary: '#374151',
    secondary: '#f9fafb',
    accent: '#dc2626',
    gradient: 'from-slate-800 via-gray-700 to-slate-800'
  }
};

export function LinkTreePreview({ linkTree, linkTreeItems = [], onItemClick }: LinkTreePreviewProps) {
  const [modalData, setModalData] = useState<{ isOpen: boolean; formConfig: any; title: string }>({
    isOpen: false,
    formConfig: null,
    title: ''
  });
  const { multipleFormsConfig } = useFormConfig();

  const handleItemClick = (item: LinkTreeItem) => {
    if (item.item_type === 'form') {
      const formConfig = multipleFormsConfig.forms.find(f => f.id === item.form_id);
      if (formConfig) {
        setModalData({
          isOpen: true,
          formConfig: formConfig,
          title: item.title
        });
        return;
      }
    }
    
    if (onItemClick) {
      onItemClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  const getThemeColors = () => {
    const theme = linkTree.theme || 'modern';
    return legalThemes[theme as keyof typeof legalThemes] || legalThemes.corporate;
  };

  const getThemeGradient = () => {
    const theme = linkTree.theme || 'modern';
    if (theme === 'corporate') return 'from-blue-900 via-slate-900 to-blue-900';
    if (theme === 'premium') return 'from-purple-900 via-indigo-900 to-purple-900';
    if (theme === 'gold') return 'from-amber-900 via-yellow-800 to-amber-900';
    if (theme === 'platinum') return 'from-gray-400 via-gray-300 to-gray-400';
    if (theme === 'dark') return 'from-gray-900 via-slate-800 to-gray-900';
    if (theme === 'minimal') return 'from-gray-50 via-white to-gray-50';
    return 'from-slate-900 via-blue-900 to-slate-900';
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
      // Aplicar overlay de opacidade se definido
      if (linkTree.background_opacity !== undefined) {
        baseStyles.position = 'relative';
      }
    } else if (linkTree.background_type === 'video' && linkTree.background_video) {
      // Para vídeo de fundo será aplicado separadamente
      baseStyles.backgroundColor = linkTree.background_color || '#000';
    }
    
    // Aplicar cor do texto
    if (linkTree.text_color) {
      baseStyles.color = linkTree.text_color;
    }
    
    return baseStyles;
  };

  const isNeuralTheme = linkTree.background_type === 'neural';
  const isPremiumLayout = linkTree.theme === 'corporate' || linkTree.theme === 'premium' || 
                         linkTree.theme === 'gold' || linkTree.theme === 'platinum' || 
                         linkTree.theme === 'dark' || linkTree.background_type === 'neural';
  const isCorporateTheme = linkTree.theme === 'corporate';
  const isPremiumTheme = linkTree.theme === 'premium';
  const isGoldTheme = linkTree.theme === 'gold';
  const isPlatinumTheme = linkTree.theme === 'platinum';
  const isDarkTheme = linkTree.theme === 'dark';

  const colors = getThemeColors();
  

  const renderItemsByLayout = () => {
    const layout = linkTree.button_style || 'grid';
    const sortedItems = [...(linkTreeItems || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    switch (layout) {
      case 'masonry':
        return (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 p-4">
            {sortedItems.map((item) => renderMasonryItem(item))}
          </div>
        );
        
      case 'carousel':
        return (
          <div className="w-full px-4">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
              {sortedItems.map((item) => renderCarouselItem(item))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {sortedItems.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-white/30 rounded-full"></div>
              ))}
            </div>
          </div>
        );
        
      case 'magazine':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {sortedItems.map((item, index) => renderMagazineItem(item, index))}
          </div>
        );
        
      case 'portfolio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedItems.map((item) => renderPortfolioItem(item))}
          </div>
        );
        
      case 'bento':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-min p-4">
            {sortedItems.map((item, index) => renderBentoItem(item, index))}
          </div>
        );
        
      case 'list':
        return (
          <div className={`space-y-4 max-w-md mx-auto px-4 ${isNeuralTheme ? 'py-6' : ''}`}>
            {sortedItems.map((item) => renderListItem(item))}
          </div>
        );
        
      default: // grid
        return (
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto px-4 ${isNeuralTheme ? 'py-6' : ''}`}>
            {sortedItems.map((item) => renderGridItem(item))}
          </div>
        );
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
      'chevron-right': ChevronRight
    };

    // Mapear tamanhos para classes CSS
    const getSizeClass = (size?: string) => {
      // Se já é uma classe CSS, retorna diretamente
      if (size && (size.includes('w-') || size.includes('h-'))) {
        return size;
      }
      
      // Mapear valores descritivos para classes CSS
      switch (size) {
        case 'small': return 'w-4 h-4';
        case 'medium': return 'w-6 h-6';
        case 'large': return 'w-8 h-8';
        case 'w-4 h-4': return 'w-4 h-4';
        case 'w-5 h-5': return 'w-5 h-5';
        case 'w-6 h-6': return 'w-6 h-6';
        case 'w-8 h-8': return 'w-8 h-8';
        case 'w-10 h-10': return 'w-10 h-10';
        default: return 'w-5 h-5';
      }
    };

    // Se há um ícone personalizado, usar ele
    if (item.icon && iconMap[item.icon]) {
      const IconComponent = iconMap[item.icon];
      const iconSize = getSizeClass(item.icon_size);
      const iconColor = item.icon_color;
      
      return (
        <IconComponent 
          className={iconSize}
          style={{ color: iconColor }}
        />
      );
    }

    // Fallback para ícones automáticos baseados no tipo
    const fallbackSize = getSizeClass(item.icon_size);
    const fallbackColor = item.icon_color;
    
    const renderFallbackIcon = (IconComponent: any) => (
      <IconComponent 
        className={fallbackSize}
        style={{ color: fallbackColor }}
      />
    );

    switch (item.item_type) {
      case 'contact':
        if (item.url?.includes('whatsapp') || item.url?.includes('wa.me')) {
          return renderFallbackIcon(MessageCircle);
        }
        if (item.url?.includes('mailto') || item.url?.includes('@')) {
          return renderFallbackIcon(Mail);
        }
        if (item.url?.includes('tel:')) {
          return renderFallbackIcon(Phone);
        }
        return renderFallbackIcon(Phone);
      case 'social':
        if (item.url?.includes('instagram')) return renderFallbackIcon(Instagram);
        if (item.url?.includes('youtube')) return renderFallbackIcon(Youtube);
        if (item.url?.includes('linkedin')) return renderFallbackIcon(Linkedin);
        if (item.url?.includes('twitter') || item.url?.includes('x.com')) return renderFallbackIcon(Twitter);
        if (item.url?.includes('facebook')) return renderFallbackIcon(Facebook);
        return renderFallbackIcon(Globe);
      case 'video':
        return renderFallbackIcon(Video);
      case 'text':
      case 'info':
        return renderFallbackIcon(FileText);
      case 'form':
        return renderFallbackIcon(Mail);
      case 'product':
        return renderFallbackIcon(Briefcase);
      case 'service':
        return renderFallbackIcon(Scale);
      default:
        return renderFallbackIcon(ExternalLink);
    }
  };

  const getButtonStyle = (item: LinkTreeItem) => {
    const baseClasses = "w-full justify-between p-6 h-auto relative overflow-hidden transition-all duration-300 border-0";
    const hoverClasses = {
      'none': '',
      'scale': 'hover:scale-105',
      'glow': 'hover:shadow-lg hover:shadow-primary/50',
      'lift': 'hover:-translate-y-1 hover:shadow-lg',
      'bounce': 'hover:animate-bounce',
      'rotate': 'hover:rotate-1'
    };
    
    const buttonStyleClasses = {
      'inherit': '',
      'custom': '',
      'gradient': 'bg-gradient-to-r from-primary to-secondary',
      'glassmorphism': 'backdrop-blur-md bg-white/10',
      'neon': 'shadow-lg shadow-primary/50',
      'rounded': 'rounded-lg',
      'square': 'rounded-none',
      'pill': 'rounded-full'
    };
    
    const formatClasses = {
      'rounded': 'rounded-lg',
      'square': 'rounded-none',
      'circle': 'rounded-full',
      'pill': 'rounded-full',
      'standard': 'rounded-lg'
    };
    
    const sizeClasses = {
      'small': 'min-h-[60px] text-sm py-3',
      'medium': 'min-h-[80px] text-base py-4',
      'large': 'min-h-[120px] text-lg py-6',
      'full': 'min-h-[100px] text-base py-4'
    };
    
    const formatClass = formatClasses[item.card_format || 'rounded'] || 'rounded-lg';
    const sizeClass = sizeClasses[item.card_size || 'medium'] || 'min-h-[80px] text-base py-4';
    
    return `${baseClasses} ${formatClass} ${sizeClass} ${hoverClasses[item.hover_effect || 'scale']} ${buttonStyleClasses[item.button_style || 'inherit']}`;
  };

  const renderListItem = (item: LinkTreeItem) => (
    <Button
      key={item.id}
      onClick={() => handleItemClick(item)}
      className={`${getButtonStyle(item)} border-0`}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {item.card_image && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      )}
      <div className="flex items-center gap-3 relative z-10">
        {getItemIcon(item)}
        <div className="text-left">
          <span className="font-medium block">{item.title}</span>
          {item.card_content && (
            <span className="text-sm opacity-80 block">{item.card_content}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 relative z-10">
        {item.card_price && (
          <Badge className="bg-green-500 text-white">{item.card_price}</Badge>
        )}
        {item.is_featured && <Star className="w-5 h-5 fill-current" />}
      </div>
    </Button>
  );

  const getCardStyle = (item: LinkTreeItem) => {
    const baseClasses = "cursor-pointer transition-all duration-300 relative overflow-hidden border-0";
    const hoverClasses = {
      'none': '',
      'scale': 'hover:scale-105 hover:shadow-lg',
      'glow': 'hover:shadow-xl hover:shadow-primary/50',
      'lift': 'hover:-translate-y-2 hover:shadow-lg',
      'bounce': 'hover:animate-bounce',
      'rotate': 'hover:rotate-1'
    };
    
    const buttonStyleClasses = {
      'inherit': '',
      'custom': '',
      'gradient': 'bg-gradient-to-r from-primary to-secondary',
      'glassmorphism': 'backdrop-blur-md bg-white/10',
      'neon': 'shadow-lg shadow-primary/50'
    };
    
    const formatClasses = {
      'rounded': 'rounded-lg',
      'square': 'rounded-none',
      'circle': 'rounded-full',
      'pill': 'rounded-full',
      'standard': 'rounded-lg'
    };
    
    const sizeClasses = {
      'small': 'min-h-[60px] text-sm',
      'medium': 'min-h-[80px] text-base',
      'large': 'min-h-[120px] text-lg',
      'full': 'min-h-[100px] text-base'
    };
    
    const formatClass = formatClasses[item.card_format || 'rounded'] || 'rounded-lg';
    const sizeClass = sizeClasses[item.card_size || 'medium'] || 'min-h-[80px] text-base';
    
    return `${baseClasses} ${formatClass} ${sizeClass} ${hoverClasses[item.hover_effect || 'scale']} ${buttonStyleClasses[item.button_style || 'inherit']}`;
  };

  const renderGridItem = (item: LinkTreeItem) => (
    <Card 
      key={item.id} 
      className={getCardStyle(item)}
      onClick={() => handleItemClick(item)}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {item.card_image && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      <CardContent className="p-6 text-center relative z-10">
        <div className="mb-4 flex justify-center">
          {getItemIcon(item)}
        </div>
        <h3 className="font-semibold mb-2">{item.title}</h3>
        {item.card_content && (
          <p className="text-sm opacity-80 mb-2">{item.card_content}</p>
        )}
        {item.card_price && (
          <Badge className="mb-2 bg-green-500 text-white">{item.card_price}</Badge>
        )}
        {item.is_featured && (
          <Badge className="bg-yellow-500 text-black">⭐ Destaque</Badge>
        )}
      </CardContent>
    </Card>
  );

  const renderBentoItem = (item: LinkTreeItem, index: number) => {
    const sizes = ['col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-2'];
    const sizeClass = sizes[index % sizes.length];

    return (
      <Card 
        key={item.id} 
        className={`${getCardStyle(item)} ${sizeClass}`}
        onClick={() => handleItemClick(item)}
        style={{
          backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
          color: item.text_color,
          borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
          backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {item.card_image && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        )}
        <CardContent className="p-6 text-center relative z-10 h-full flex flex-col justify-center">
          <div className="mb-4 flex justify-center">
            {getItemIcon(item)}
          </div>
          <h3 className="font-semibold mb-2">{item.title}</h3>
          {item.card_content && (
            <p className="text-sm opacity-80 mb-2">{item.card_content}</p>
          )}
          {item.card_price && (
            <Badge className="mb-2 bg-green-500 text-white">{item.card_price}</Badge>
          )}
          {item.is_featured && (
            <Badge className="bg-yellow-500 text-black">⭐ Destaque</Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderTextItem = (item: LinkTreeItem) => (
    <Card 
      key={item.id} 
      className={`${getCardStyle(item)} border-2 border-dashed border-gray-300`}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {item.card_image && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      )}
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-blue-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            {item.card_content && (
              <div className="text-sm opacity-90 whitespace-pre-wrap">
                {item.card_content}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVideoItem = (item: LinkTreeItem) => (
    <Card 
      key={item.id} 
      className={getCardStyle(item)}
      onClick={() => handleItemClick(item)}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {item.card_image && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      <CardContent className="p-6 text-center relative z-10">
        <div className="mb-4 flex justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-500 rounded-full p-3">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
          </div>
          <Video className="w-12 h-12 opacity-50" />
        </div>
        <h3 className="font-semibold mb-2">{item.title}</h3>
        {item.card_content && (
          <p className="text-sm opacity-80">{item.card_content}</p>
        )}
      </CardContent>
    </Card>
  );

  const renderMasonryItem = (item: LinkTreeItem) => (
    <Card 
      key={item.id}
      className={getCardStyle(item)}
      onClick={() => handleItemClick(item)}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {item.card_image && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          {getItemIcon(item)}
          <h3 className="font-semibold">{item.title}</h3>
        </div>
        {item.card_content && (
          <p className="text-sm opacity-80 mb-2">{item.card_content}</p>
        )}
        {item.card_price && (
          <Badge className="mb-2 bg-green-500 text-white">{item.card_price}</Badge>
        )}
        {item.is_featured && (
          <Badge className="bg-yellow-500 text-black">⭐ Destaque</Badge>
        )}
      </CardContent>
    </Card>
  );

  const renderCarouselItem = (item: LinkTreeItem) => (
    <Card 
      key={item.id}
      className={`${getCardStyle(item)} flex-shrink-0 w-72 sm:w-80 snap-center break-inside-avoid mb-6`}
      onClick={() => handleItemClick(item)}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {item.card_image && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      <CardContent className="p-6 text-center relative z-10">
        <div className="mb-4 flex justify-center">
          {getItemIcon(item)}
        </div>
        <h3 className="font-semibold mb-2">{item.title}</h3>
        {item.card_content && (
          <p className="text-sm opacity-80 mb-2">{item.card_content}</p>
        )}
        {item.card_price && (
          <Badge className="mb-2 bg-green-500 text-white">{item.card_price}</Badge>
        )}
        {item.is_featured && (
          <Badge className="bg-yellow-500 text-black">⭐ Destaque</Badge>
        )}
      </CardContent>
    </Card>
  );

  const renderMagazineItem = (item: LinkTreeItem, index: number) => {
    const isLarge = index % 3 === 0;
    
    return (
      <Card 
        key={item.id}
        className={`${getCardStyle(item)} ${isLarge ? 'lg:row-span-2' : ''}`}
        onClick={() => handleItemClick(item)}
        style={{
          backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
          color: item.text_color,
          borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
          backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {item.card_image && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        )}
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            {getItemIcon(item)}
            <h3 className="font-semibold">{item.title}</h3>
          </div>
          {item.card_content && (
            <p className="text-sm opacity-80 mb-2">{item.card_content}</p>
          )}
          {item.card_price && (
            <Badge className="mb-2 bg-green-500 text-white">{item.card_price}</Badge>
          )}
          {item.is_featured && (
            <Badge className="bg-yellow-500 text-black">⭐ Destaque</Badge>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderPortfolioItem = (item: LinkTreeItem) => (
    <Card 
      key={item.id}
      className={`${getCardStyle(item)} group`}
      onClick={() => handleItemClick(item)}
      style={{
        backgroundColor: item.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : item.background_color,
        color: item.text_color,
        borderColor: item.button_style === 'neon' ? 'currentColor' : undefined,
        backgroundImage: item.card_image ? `url(${item.card_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <CardContent className="p-0">
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center text-primary">
              {getItemIcon(item)}
            </div>
            <h3 className="font-semibold px-4">{item.title}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isPremiumLayout) {
    const themeGradient = getThemeGradient();
    const themeClass = isNeuralTheme ? '' : `bg-gradient-to-br ${themeGradient}`;
    
    // Aplicar estilo baseado no tipo de fundo
    const backgroundStyle = linkTree.background_type === 'solid' 
      ? { backgroundColor: linkTree.background_color || '#3b82f6' }
      : isNeuralTheme 
        ? { backgroundColor: linkTree.background_color || '#1a1a2e', opacity: linkTree.background_opacity || 0.8 }
        : {};
    
    return (
      <div className={`relative min-h-screen text-white overflow-hidden ${linkTree.background_type === 'solid' ? '' : themeClass}`} style={{...getCustomStyles(), ...backgroundStyle}}>
        {isNeuralTheme && <NeuralBackground />}
        
        {/* Overlay para aplicar cor de fundo no neural theme */}
        {isNeuralTheme && (
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: linkTree.background_color || '#1a1a2e',
              opacity: linkTree.background_opacity || 0.8,
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* Vídeo de fundo */}
        {linkTree.background_type === 'video' && linkTree.background_video && (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={linkTree.background_video} type="video/mp4" />
          </video>
        )}
        
        {/* Overlay para vídeo ou imagem com opacidade */}
        {(linkTree.background_type === 'video' || linkTree.background_type === 'image') && linkTree.background_opacity !== undefined && (
          <div 
            className="absolute inset-0 bg-black z-5" 
            style={{ opacity: 1 - linkTree.background_opacity }}
          ></div>
        )}
        
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Header Premium */}
            <div className="space-y-6">
              {linkTree.avatar_url && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img src={linkTree.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="space-y-4">
                <h1 
                  className={`${linkTree.title_size || 'text-5xl'} ${linkTree.title_font || 'font-bold'} ${
                    isGoldTheme ? 'bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent' :
                    isPremiumTheme ? 'bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent' :
                    isCorporateTheme ? 'bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent' :
                    isPlatinumTheme ? 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent' :
                    isDarkTheme ? 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent' :
                    'bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent'
                  }`}
                  style={{ color: linkTree.title_color || linkTree.text_color }}
                >
                  {linkTree.title}
                </h1>
                {linkTree.description && (
                  <p 
                    className={`${linkTree.description_size || 'text-xl'} text-gray-300 max-w-2xl mx-auto leading-relaxed`}
                    style={{ color: linkTree.description_color || linkTree.text_color }}
                  >
                    {linkTree.description}
                  </p>
                )}
              </div>

              {/* Badge Premium baseado no tema - NÃO exibir para neural */}
              {isPremiumTheme && !isNeuralTheme && (
                <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold px-6 py-3 text-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  ESCRITÓRIO PREMIUM
                </Badge>
              )}
              {isCorporateTheme && !isNeuralTheme && (
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-6 py-3 text-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  CORPORATIVO
                </Badge>
              )}
              {isGoldTheme && !isNeuralTheme && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-6 py-3 text-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  GOLD PREMIUM
                </Badge>
              )}
              {isPlatinumTheme && !isNeuralTheme && (
                <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold px-6 py-3 text-lg">
                  <Diamond className="w-5 h-5 mr-2" />
                  PLATINUM
                </Badge>
              )}
              {isDarkTheme && !isNeuralTheme && (
                <Badge className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold px-6 py-3 text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  DARK ELITE
                </Badge>
              )}
            </div>

            {/* Items Container */}
            <div className="max-w-4xl mx-auto">
              {renderItemsByLayout()}
            </div>

            {/* Footer Premium */}
            <div className="text-center mt-16 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                ⚖️ Excelência Jurídica • Tradição • Inovação
              </p>
              {linkTree.show_analytics && (
                <div className="mt-4 flex justify-center gap-6 text-xs text-gray-500">
                  <span>{linkTreeItems.reduce((total, item) => total + (item.click_count || 0), 0)} cliques totais</span>
                  <span>{linkTreeItems.length} links ativos</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <FormModal
          isOpen={modalData.isOpen}
          onClose={() => setModalData({ isOpen: false, formConfig: null, title: '' })}
          formConfig={modalData.formConfig}
          title={modalData.title}
        />

        {linkTree.custom_css && (
          <style dangerouslySetInnerHTML={{ __html: linkTree.custom_css }} />
        )}
      </div>
    );
  }

  // Layout padrão para outros temas
  return (
    <div className="relative min-h-screen p-8" style={getCustomStyles()}>
      {/* Vídeo de fundo */}
      {linkTree.background_type === 'video' && linkTree.background_video && (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
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
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20">
            <img src={linkTree.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div>
          <h1 
            className={`${linkTree.title_size || 'text-3xl'} ${linkTree.title_font || 'font-bold'} mb-2`} 
            style={{ color: linkTree.title_color || linkTree.text_color }}
          >
            {linkTree.title}
          </h1>
          {linkTree.description && (
            <p 
              className={`${linkTree.description_size || 'text-lg'} opacity-80`} 
              style={{ color: linkTree.description_color || linkTree.text_color }}
            >
              {linkTree.description}
            </p>
          )}
        </div>

        {/* Items */}
        {renderItemsByLayout()}

        {/* Analytics */}
        {linkTree.show_analytics && (
          <div className="text-center text-sm opacity-60" style={{ color: linkTree.text_color }}>
            <div className="flex justify-center gap-4">
              <span>{linkTreeItems.reduce((total, item) => total + (item.click_count || 0), 0)} cliques totais</span>
              <span>{linkTreeItems.length} links ativo</span>
            </div>
          </div>
        )}
      </div>

      <FormModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ isOpen: false, formConfig: null, title: '' })}
        formConfig={modalData.formConfig}
        title={modalData.title}
      />

      {linkTree.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: linkTree.custom_css }} />
      )}
    </div>
  );
}