import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LinkTree, LinkTreeItem, FormField } from '@/types/linkTreeTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Send, Star, TrendingUp } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

export default function LinkTreePage() {
  const [linkTree, setLinkTree] = useState<LinkTree | null>(null);
  const [linkTreeItems, setLinkTreeItems] = useState<LinkTreeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadLinkTree();
  }, []);

  const loadLinkTree = async () => {
    try {
      setIsLoading(true);
      
      // Carregar link tree principal
      const { data: linkTreeData, error: linkTreeError } = await supabase
        .from('link_tree')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (linkTreeError && linkTreeError.code !== 'PGRST116') {
        console.error('Erro ao carregar link tree:', linkTreeError);
        return;
      }

      if (linkTreeData) {
        setLinkTree(linkTreeData as LinkTree);

        // Carregar itens do link tree
        const { data: itemsData, error: itemsError } = await supabase
          .from('link_tree_items')
          .select('*')
          .eq('link_tree_id', linkTreeData.id)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (itemsError) {
          console.error('Erro ao carregar itens do link tree:', itemsError);
          return;
        }

        const processedItems = (itemsData || []).map(item => ({
          ...item,
          form_fields: item.form_fields ? (typeof item.form_fields === 'string' ? JSON.parse(item.form_fields) : item.form_fields) : []
        })) as LinkTreeItem[];

        setLinkTreeItems(processedItems);
      }
    } catch (error) {
      console.error('Erro ao carregar link tree:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = async (item: LinkTreeItem) => {
    if (item.item_type === 'link' && item.url) {
      // Incrementar contador de cliques
      await supabase
        .from('link_tree_items')
        .update({ click_count: item.click_count + 1 })
        .eq('id', item.id);

      const fullUrl = item.url.startsWith('http') ? item.url : `https://${item.url}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleFormSubmit = async (item: LinkTreeItem, e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você pode implementar o envio do formulário
    console.log('Formulário enviado:', formData[item.id]);
    
    // Incrementar contador
    await supabase
      .from('link_tree_items')
      .update({ click_count: item.click_count + 1 })
      .eq('id', item.id);
  };

  const updateFormData = (itemId: string, fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [fieldId]: value
      }
    }));
  };

  const renderFormField = (item: LinkTreeItem, field: FormField) => {
    const value = formData[item.id]?.[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Input
            key={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormData(item.id, field.id, e.target.value)}
            required={field.required}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            key={field.id}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormData(item.id, field.id, e.target.value)}
            required={field.required}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
            rows={3}
          />
        );
      
      case 'select':
        return (
          <Select
            key={field.id}
            value={value}
            onValueChange={(val) => updateFormData(item.id, field.id, val)}
          >
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={field.placeholder || 'Selecione uma opção'} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option} className="text-white hover:bg-gray-700">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value}
              onCheckedChange={(checked) => updateFormData(item.id, field.id, checked)}
              className="border-white/40"
            />
            <label htmlFor={field.id} className="text-sm font-medium text-white">
              {field.label}
            </label>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getButtonClasses = (style: string, hoverEffect: string) => {
    let baseClasses = 'w-full p-4 font-medium transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer select-none ';
    
    // Estilo do botão
    switch (style) {
      case 'pill':
        baseClasses += 'rounded-full ';
        break;
      case 'square':
        baseClasses += 'rounded-none ';
        break;
      case 'glassmorphism':
        baseClasses += 'rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl ';
        break;
      case 'neon':
        baseClasses += 'rounded-xl border-2 shadow-2xl ';
        break;
      case 'gradient':
        baseClasses += 'rounded-xl bg-gradient-to-r shadow-xl ';
        break;
      default:
        baseClasses += 'rounded-xl ';
    }

    // Efeito de hover
    switch (hoverEffect) {
      case 'glow':
        baseClasses += 'hover:shadow-2xl hover:shadow-current/50 ';
        break;
      case 'lift':
        baseClasses += 'hover:-translate-y-2 hover:shadow-xl ';
        break;
      case 'bounce':
        baseClasses += 'hover:animate-bounce ';
        break;
      case 'rotate':
        baseClasses += 'hover:rotate-1 ';
        break;
      default:
        baseClasses += 'hover:scale-105 ';
    }

    return baseClasses;
  };

  const getAnimationClass = (animationStyle: string, index: number) => {
    const delay = `delay-${index * 100}`;
    
    switch (animationStyle) {
      case 'fade':
        return `animate-fade-in ${delay}`;
      case 'slide':
        return `animate-slide-in-right ${delay}`;
      case 'bounce':
        return `animate-bounce ${delay}`;
      case 'pulse':
        return `animate-pulse ${delay}`;
      case 'glow':
        return `animate-pulse ${delay}`;
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-black">
        <NeuralBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          <p className="text-white/70 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!linkTree) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-black">
        <NeuralBackground />
        <div className="relative z-10 text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Link Tree não configurado</h1>
            <p className="text-white/70 max-w-md mx-auto">
              Esta página ainda não foi configurada. Entre em contato com o administrador para mais informações.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const backgroundStyle = linkTree.background_type === 'gradient' && linkTree.background_gradient
    ? { background: linkTree.background_gradient }
    : linkTree.background_type === 'image' && linkTree.background_image
    ? { backgroundImage: `url(${linkTree.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: linkTree.background_color };

  return (
    <div 
      className="min-h-screen relative"
      style={backgroundStyle}
    >
      {/* Background Effects */}
      {linkTree.background_type === 'solid' && <NeuralBackground />}
      
      {/* Custom CSS */}
      {linkTree.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: linkTree.custom_css }} />
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center space-y-8">
            {/* Avatar */}
            {linkTree.avatar_url && (
              <div className="flex justify-center animate-fade-in">
                <div className="relative">
                  <img
                    src={linkTree.avatar_url}
                    alt={linkTree.title}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Título e Descrição */}
            <div className="space-y-4 animate-fade-in delay-200">
              <h1
                className="text-4xl font-bold leading-tight"
                style={{ color: linkTree.text_color }}
              >
                {linkTree.title}
              </h1>
              {linkTree.description && (
                <p
                  className="text-lg opacity-90 leading-relaxed max-w-xs mx-auto"
                  style={{ color: linkTree.text_color }}
                >
                  {linkTree.description}
                </p>
              )}
            </div>

            {/* Items */}
            <div className="space-y-4 pt-4">
              {linkTreeItems
                .sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
                .map((item, index) => (
                <div
                  key={item.id}
                  className={getAnimationClass(linkTree.animation_style || 'fade', index)}
                >
                  {item.item_type === 'link' && (
                    <div
                      className={getButtonClasses(
                        item.button_style === 'inherit' ? linkTree.button_style : item.button_style || linkTree.button_style,
                        item.hover_effect
                      )}
                      style={{
                        backgroundColor: linkTree.button_style === 'glassmorphism' ? 'rgba(255,255,255,0.1)' :
                                       linkTree.button_style === 'gradient' ? '' : item.background_color,
                        color: item.text_color,
                        borderColor: linkTree.button_style === 'neon' ? item.background_color : 'transparent',
                        boxShadow: linkTree.button_style === 'neon' ? `0 0 20px ${item.background_color}40` : undefined,
                        backgroundImage: linkTree.button_style === 'gradient' ? 
                          `linear-gradient(135deg, ${item.background_color}, ${item.text_color})` : undefined
                      }}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.is_featured && (
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      )}
                      
                      <span className="flex-1 text-center font-semibold">
                        {item.title}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {linkTree.show_analytics && item.click_count > 0 && (
                          <div className="flex items-center gap-1 text-xs opacity-70">
                            <TrendingUp className="w-3 h-3" />
                            {item.click_count}
                          </div>
                        )}
                        <ExternalLink className="w-4 h-4 opacity-70" />
                      </div>
                    </div>
                  )}

                  {item.item_type === 'card' && (
                    <Card
                      className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <CardHeader>
                        <CardTitle style={{ color: linkTree.text_color }} className="flex items-center gap-2">
                          {item.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p style={{ color: linkTree.text_color + 'CC' }} className="whitespace-pre-wrap">
                          {item.card_content}
                        </p>
                        {linkTree.show_analytics && item.click_count > 0 && (
                          <p className="text-xs mt-3 opacity-60 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {item.click_count} visualizações
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {item.item_type === 'form' && (
                    <Card
                      className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <CardHeader>
                        <CardTitle style={{ color: linkTree.text_color }} className="flex items-center gap-2">
                          {item.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={(e) => handleFormSubmit(item, e)} className="space-y-4">
                          {item.form_fields?.map((field) => (
                            <div key={field.id}>
                              {field.type !== 'checkbox' && (
                                <label className="block text-sm font-medium mb-1" style={{ color: linkTree.text_color }}>
                                  {field.label}
                                  {field.required && <span className="text-red-400 ml-1">*</span>}
                                </label>
                              )}
                              {renderFormField(item, field)}
                            </div>
                          ))}
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Enviar
                          </Button>
                        </form>
                        {linkTree.show_analytics && item.click_count > 0 && (
                          <p className="text-xs mt-3 opacity-60 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {item.click_count} envios
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}

              {linkTreeItems.length === 0 && (
                <div className="py-12 animate-fade-in">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="w-8 h-8" style={{ color: linkTree.text_color }} />
                  </div>
                  <p
                    className="text-center opacity-60"
                    style={{ color: linkTree.text_color }}
                  >
                    Nenhum item disponível no momento.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-8 animate-fade-in delay-500">
              <div className="flex items-center justify-center gap-2 text-xs opacity-50" style={{ color: linkTree.text_color }}>
                <span>Powered by</span>
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Link Tree Pro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}