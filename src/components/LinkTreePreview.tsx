import React, { useState } from 'react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NeuralBackground from '@/components/NeuralBackground';
import { FormModal } from '@/components/FormModal';
import { useFormConfig } from '@/hooks/useFormConfig';

interface LinkTreePreviewProps {
  linkTree: LinkTree;
  linkTreeItems: LinkTreeItem[];
  onItemClick?: (item: LinkTreeItem) => void;
}

export function LinkTreePreview({ linkTree, linkTreeItems, onItemClick }: LinkTreePreviewProps) {
  const [modalData, setModalData] = useState<{ isOpen: boolean; formConfig: any; title: string }>({
    isOpen: false,
    formConfig: null,
    title: ''
  });
  const { multipleFormsConfig } = useFormConfig();
  const handleCardClick = (item: LinkTreeItem) => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
    onItemClick?.(item);
  };

  const handleFormClick = (item: LinkTreeItem) => {
    // Buscar o formulário pelo ID nos formulários existentes
    const formConfig = multipleFormsConfig.forms.find(f => f.id === item.form_id);
    if (formConfig) {
      setModalData({
        isOpen: true,
        formConfig: formConfig,
        title: item.title
      });
    } else {
      console.error('Formulário não encontrado:', item.form_id);
    }
    onItemClick?.(item);
  };

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

    return {
      container: {
        ...backgroundStyle,
        color: linkTree.text_color,
        minHeight: '100vh',
        position: 'relative' as const,
        overflow: 'hidden' as const
      },
      wrapper: 'max-w-sm mx-auto p-6 relative z-10',
      avatar: 'w-24 h-16 rounded-lg object-cover shadow-lg',
      title: 'text-3xl font-bold mb-2',
      description: 'text-opacity-80 mb-6',
      item: `rounded-lg p-4 mb-3 transition-all duration-300 hover:scale-105 shadow-lg`,
      card: 'border shadow-lg rounded-lg',
      cardButton: 'px-4 py-2 rounded font-medium transition-colors',
      formButton: 'px-4 py-2 rounded font-medium transition-colors'
    };
  };

  const customStyles = getCustomStyles();

  return (
    <div style={customStyles.container}>
      {/* Neural Background sempre presente */}
      <NeuralBackground />
      
      {/* Background overlay para gradientes e imagens */}
      {linkTree.background_type !== 'solid' && (
        <div className="absolute inset-0 bg-black/20"></div>
      )}

      <div className={customStyles.wrapper}>
        <div className="text-center space-y-6">
          {/* Avatar */}
          {linkTree.avatar_url && (
            <div className="flex justify-center">
              <img
                src={linkTree.avatar_url}
                alt={linkTree.title}
                className={customStyles.avatar}
                style={{ 
                  borderColor: linkTree.text_color,
                  borderWidth: '2px',
                  borderStyle: 'solid'
                }}
              />
            </div>
          )}

          {/* Title and Description */}
          <div>
            <h1 
              className={customStyles.title}
              style={{ color: linkTree.text_color }}
            >
              {linkTree.title}
            </h1>
            {linkTree.description && (
              <p 
                className={customStyles.description}
                style={{ color: linkTree.text_color, opacity: 0.8 }}
              >
                {linkTree.description}
              </p>
            )}
          </div>

          {/* Items */}
          <div className="space-y-4">
            {linkTreeItems
              .sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
              .map((item, index) => (
              <div
                key={item.id}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.item_type === 'link' && (
                  <div
                    className={customStyles.item}
                    onClick={() => handleCardClick(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleCardClick(item)}
                    style={{
                      backgroundColor: item.background_color,
                      color: item.text_color,
                      borderRadius: linkTree.button_style === 'rounded' ? '8px' : 
                                   linkTree.button_style === 'pill' ? '24px' : '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.is_featured && (
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        )}
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </div>
                  </div>
                )}

                {item.item_type === 'card' && (
                  <Card 
                    className={customStyles.card}
                    style={{
                      backgroundColor: item.background_color,
                      color: item.text_color,
                      borderColor: item.text_color + '30'
                    }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {item.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {item.card_image && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <img 
                            src={item.card_image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-sm opacity-90 mb-3">
                          {item.card_content}
                        </p>
                        {item.card_price && (
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-400">
                              {item.card_price}
                            </span>
                            <Button 
                              onClick={() => handleCardClick(item)}
                              className={customStyles.cardButton}
                              size="sm"
                              style={{
                                backgroundColor: item.text_color,
                                color: item.background_color
                              }}
                            >
                              {item.card_button_text || 'Saiba Mais'}
                            </Button>
                          </div>
                        )}
                        {!item.card_price && (
                          <Button 
                            onClick={() => handleCardClick(item)}
                            className={`w-full ${customStyles.cardButton}`}
                            style={{
                              backgroundColor: item.text_color,
                              color: item.background_color
                            }}
                          >
                            {item.card_button_text || 'Saiba Mais'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {item.item_type === 'form' && (
                  <Card 
                    className={customStyles.card}
                    style={{
                      backgroundColor: item.background_color,
                      color: item.text_color,
                      borderColor: item.text_color + '30'
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {item.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm opacity-75 mb-3">
                        Formulário personalizado disponível
                      </p>
                      <Button 
                        onClick={() => handleFormClick(item)}
                        className={`w-full ${customStyles.formButton}`}
                        style={{
                          backgroundColor: item.background_color,
                          color: item.text_color,
                          borderRadius: linkTree.button_style === 'rounded' ? '8px' : 
                                       linkTree.button_style === 'pill' ? '24px' : '4px'
                        }}
                      >
                        Preencher Formulário
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {linkTreeItems.length === 0 && (
              <div className="py-12 text-center opacity-60">
                <p>Nenhum item adicionado ainda</p>
              </div>
            )}
          </div>
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