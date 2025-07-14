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
  portfolio: 'portfolio'
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
  platinum: {
    primary: '#475569',
    secondary: '#f8fafc',
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
      }
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
    onItemClick?.(item);
  };

  const getItemIcon = (item: LinkTreeItem) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      // Serviços Jurídicos Premium
      'legal-consultation': Scale,
      'contract-review': FileText,
      'litigation': Shield,
      'compliance': CheckCircle,
      'business-law': Briefcase,
      'family-law': Heart,
      'criminal-defense': Award,
      'real-estate': MapPin,
      
      // Contato Premium
      'whatsapp-vip': Phone,
      'email-premium': Mail,
      'video-call': Video,
      'appointment': Calendar,
      
      // Mídia & Social
      'instagram': Instagram,
      'youtube': Youtube,
      'linkedin': Linkedin,
      'twitter': Twitter,
      'facebook': Facebook,
      
      // Recursos
      'download': Download,
      'portfolio': Crown,
      'testimonials': Star,
      'awards': Diamond,
      'blog': Globe,
      'gallery': Camera,
      'music': Music,
      'image': Image,
      'message': MessageCircle,
      
      // Padrões
      'link': ExternalLink,
      'card': Sparkles,
      'form': FileText,
      'social': Users,
      'product': Zap,
      'service': Award,
      'contact': Phone,
      'video': Play,
      'text': FileText
    };

    const IconComponent = iconMap[item.icon || item.item_type || 'link'];
    return IconComponent || ExternalLink;
  };

  const getThemeColors = () => {
    const theme = linkTree.theme || 'corporate';
    return legalThemes[theme as keyof typeof legalThemes] || legalThemes.corporate;
  };

  const colors = getThemeColors();
  
  const getCustomStyles = () => {
    const isGradient = linkTree.background_type === 'gradient' && linkTree.background_gradient;
    const isImage = linkTree.background_type === 'image' && linkTree.background_image;
    
    let backgroundStyle: React.CSSProperties = {};
    
    if (isGradient) {
      backgroundStyle.background = linkTree.background_gradient;
    } else if (isImage) {
      backgroundStyle.backgroundImage = `url(${linkTree.background_image})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
      backgroundStyle.backgroundRepeat = 'no-repeat';
    } else {
      backgroundStyle.backgroundColor = linkTree.background_color;
    }
    
    return backgroundStyle;
  };

  const renderItemsByLayout = () => {
    const layout = linkTree.button_style || 'grid';
    const sortedItems = [...linkTreeItems].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    switch (layout) {
      case 'masonry':
        return (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {sortedItems.map((item) => renderMasonryItem(item))}
          </div>
        );
        
      case 'carousel':
        return (
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
            {sortedItems.map((item) => renderCarouselItem(item))}
          </div>
        );
        
      case 'magazine':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sortedItems.map((item, index) => renderMagazineItem(item, index))}
          </div>
        );
        
      case 'portfolio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedItems.map((item) => renderPortfolioItem(item))}
          </div>
        );
        
      case 'list':
        return (
          <div className="space-y-4">
            {sortedItems.map((item) => renderListItem(item))}
          </div>
        );
        
      default: // grid
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => renderGridItem(item))}
          </div>
        );
    }
  };

  const renderGridItem = (item: LinkTreeItem) => {
    const IconComponent = getItemIcon(item);
    
    if (item.item_type === 'card') {
      return (
        <Card 
          key={item.id} 
          className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          onClick={() => handleItemClick(item)}
        >
          {item.card_image && (
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.card_image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {item.is_featured && (
                <Badge className="absolute top-3 right-3 bg-yellow-500 text-black font-bold">
                  <Crown className="w-3 h-3 mr-1" />
                  PREMIUM
                </Badge>
              )}
            </div>
          )}
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                {item.card_content && (
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.card_content}</p>
                )}
                {item.card_price && (
                  <div className="text-2xl font-bold text-yellow-400 mb-4">{item.card_price}</div>
                )}
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                  {item.card_button_text || 'Saiba Mais'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Item padrão melhorado
    return (
      <Card 
        key={item.id}
        className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105"
        onClick={() => handleItemClick(item)}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform">
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
              {item.is_featured && (
                <Badge className="mt-2 bg-yellow-500 text-black">
                  <Star className="w-3 h-3 mr-1" />
                  Destaque
                </Badge>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderListItem = (item: LinkTreeItem) => {
    const IconComponent = getItemIcon(item);
    
    return (
      <Card 
        key={item.id}
        className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300"
        onClick={() => handleItemClick(item)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{item.title}</h3>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderMasonryItem = (item: LinkTreeItem) => {
    const IconComponent = getItemIcon(item);
    const height = item.card_image ? 'h-64' : item.card_content ? 'h-48' : 'h-32';
    
    return (
      <Card 
        key={item.id}
        className={`group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 ${height} break-inside-avoid mb-6`}
        onClick={() => handleItemClick(item)}
      >
        {item.card_image && (
          <div className="h-32 overflow-hidden">
            <img 
              src={item.card_image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">{item.title}</h3>
              {item.card_content && (
                <p className="text-gray-300 text-xs mt-2">{item.card_content}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCarouselItem = (item: LinkTreeItem) => {
    const IconComponent = getItemIcon(item);
    
    return (
      <Card 
        key={item.id}
        className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 min-w-80 snap-center"
        onClick={() => handleItemClick(item)}
      >
        {item.card_image && (
          <div className="h-40 overflow-hidden">
            <img 
              src={item.card_image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{item.title}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderMagazineItem = (item: LinkTreeItem, index: number) => {
    const IconComponent = getItemIcon(item);
    const isLarge = index === 0;
    
    return (
      <Card 
        key={item.id}
        className={`group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 ${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}`}
        onClick={() => handleItemClick(item)}
      >
        {item.card_image && (
          <div className={`overflow-hidden ${isLarge ? 'h-64' : 'h-32'}`}>
            <img 
              src={item.card_image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}
        <CardContent className={`${isLarge ? 'p-6' : 'p-4'}`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <IconComponent className={`${isLarge ? 'w-6 h-6' : 'w-4 h-4'}`} />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-white ${isLarge ? 'text-lg' : 'text-sm'}`}>{item.title}</h3>
              {item.card_content && isLarge && (
                <p className="text-gray-300 text-sm mt-2">{item.card_content}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPortfolioItem = (item: LinkTreeItem) => {
    const IconComponent = getItemIcon(item);
    
    return (
      <Card 
        key={item.id}
        className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105"
        onClick={() => handleItemClick(item)}
      >
        {item.card_image && (
          <div className="h-48 overflow-hidden relative">
            <img 
              src={item.card_image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-bold text-white text-lg">{item.title}</h3>
            </div>
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <IconComponent className="w-4 h-4" />
              </div>
              {!item.card_image && (
                <h3 className="font-semibold text-white">{item.title}</h3>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={getCustomStyles()}>
      {/* Neural Background - Sempre visível */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground />
      </div>
      
      {/* Overlay para melhor contraste */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Conteúdo Principal */}
      <div className="relative z-20 container mx-auto px-6 py-12">
        {/* Header Premium */}
        <div className="text-center mb-12">
          {linkTree.avatar_url && (
            <div className="mb-6">
              <img 
                src={linkTree.avatar_url} 
                alt="Avatar"
                className="w-24 h-24 mx-auto rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {linkTree.title}
          </h1>
          
          {linkTree.description && (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {linkTree.description}
            </p>
          )}
          
          {/* Badge Premium */}
          <div className="mt-6">
            <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-4 py-2 text-sm">
              <Crown className="w-4 h-4 mr-2" />
              ESCRITÓRIO PREMIUM
            </Badge>
          </div>
        </div>

        {/* Items Container */}
        <div className="max-w-6xl mx-auto">
          {renderItemsByLayout()}
        </div>

        {/* Footer Premium */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            ⚖️ Excelência Jurídica • Tradição • Inovação
          </p>
        </div>
      </div>

      {/* Modal do Formulário */}
      {modalData.formConfig && (
        <FormModal
          isOpen={modalData.isOpen}
          onClose={() => setModalData({ isOpen: false, formConfig: null, title: '' })}
          formConfig={modalData.formConfig}
          title={modalData.title}
        />
      )}
    </div>
  );
}