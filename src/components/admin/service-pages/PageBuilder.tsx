import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { 
  Plus, 
  Move3D, 
  Type, 
  Image as ImageIcon, 
  Layout, 
  Palette, 
  Settings,
  Eye,
  Save,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { ServicePage } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface PageBuilderProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

interface PageElement {
  id: string;
  type: 'hero' | 'text' | 'image' | 'button' | 'benefits' | 'testimonials' | 'faq' | 'cta';
  content: any;
  styling: {
    backgroundColor: string;
    textColor: string;
    padding: string;
    margin: string;
    borderRadius: string;
    fontSize: string;
    fontWeight: string;
    textAlign: 'left' | 'center' | 'right';
    backgroundImage?: string;
    backgroundGradient?: string;
  };
  order: number;
  isVisible: boolean;
}

const defaultStyling = {
  backgroundColor: 'transparent',
  textColor: '#000000',
  padding: '20px',
  margin: '10px 0',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'normal',
  textAlign: 'left' as const,
};

export const PageBuilder: React.FC<PageBuilderProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [elements, setElements] = useState<PageElement[]>([
    {
      id: 'hero-1',
      type: 'hero',
      content: {
        title: page.title || 'Título Principal',
        subtitle: page.description || 'Descrição do serviço',
        buttonText: 'Fale Conosco',
        buttonLink: '#contact'
      },
      styling: { ...defaultStyling, fontSize: '36px', fontWeight: 'bold', textAlign: 'center' },
      order: 1,
      isVisible: true
    },
    {
      id: 'benefits-1',
      type: 'benefits',
      content: page.benefits || [],
      styling: { ...defaultStyling, backgroundColor: '#f8f9fa' },
      order: 2,
      isVisible: true
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      content: page.testimonials || [],
      styling: { ...defaultStyling },
      order: 3,
      isVisible: true
    },
    {
      id: 'faq-1',
      type: 'faq',
      content: page.faq || [],
      styling: { ...defaultStyling },
      order: 4,
      isVisible: true
    },
    {
      id: 'cta-1',
      type: 'cta',
      content: {
        title: 'Precisa de Ajuda?',
        subtitle: 'Entre em contato conosco agora mesmo',
        buttonText: 'Solicitar Consultoria',
        buttonLink: '#contact'
      },
      styling: { 
        ...defaultStyling, 
        backgroundColor: '#007bff', 
        textColor: '#ffffff',
        textAlign: 'center'
      },
      order: 5,
      isVisible: true
    }
  ]);

  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);
  const [currentTab, setCurrentTab] = useState('content');

  // Adicionar novo elemento
  const addElement = (type: PageElement['type']) => {
    const newElement: PageElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styling: { ...defaultStyling },
      order: elements.length + 1,
      isVisible: true
    };
    setElements([...elements, newElement]);
  };

  // Obter conteúdo padrão por tipo
  const getDefaultContent = (type: PageElement['type']) => {
    switch (type) {
      case 'hero':
        return { title: 'Novo Título', subtitle: 'Nova descrição', buttonText: 'Ação', buttonLink: '#' };
      case 'text':
        return { content: 'Novo texto aqui...' };
      case 'image':
        return { src: '/placeholder.jpg', alt: 'Imagem', caption: '' };
      case 'button':
        return { text: 'Clique Aqui', link: '#', style: 'primary' };
      case 'benefits':
        return [{ title: 'Benefício', description: 'Descrição do benefício', icon: 'check' }];
      case 'testimonials':
        return [{ name: 'Cliente', text: 'Excelente serviço!', role: 'Cliente' }];
      case 'faq':
        return [{ question: 'Pergunta?', answer: 'Resposta aqui.' }];
      case 'cta':
        return { title: 'Call to Action', subtitle: 'Descrição', buttonText: 'Ação', buttonLink: '#' };
      default:
        return {};
    }
  };

  // Mover elemento
  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const sortedElements = [...elements].sort((a, b) => a.order - b.order);
    const currentIndex = sortedElements.findIndex(el => el.id === elementId);
    
    if ((direction === 'up' && currentIndex > 0) || 
        (direction === 'down' && currentIndex < sortedElements.length - 1)) {
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const newElements = [...sortedElements];
      [newElements[currentIndex], newElements[newIndex]] = [newElements[newIndex], newElements[currentIndex]];
      
      // Reordenar
      newElements.forEach((el, index) => {
        el.order = index + 1;
      });
      
      setElements(newElements);
    }
  };

  // Remover elemento
  const removeElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    setSelectedElement(null);
  };

  // Atualizar elemento
  const updateElement = (elementId: string, field: 'content' | 'styling', value: any) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, [field]: value } : el
    ));
  };

  // Renderizar preview do elemento
  const renderElementPreview = (element: PageElement) => {
    const style = {
      backgroundColor: element.styling.backgroundColor,
      color: element.styling.textColor,
      padding: element.styling.padding,
      margin: element.styling.margin,
      borderRadius: element.styling.borderRadius,
      fontSize: element.styling.fontSize,
      fontWeight: element.styling.fontWeight,
      textAlign: element.styling.textAlign,
      backgroundImage: element.styling.backgroundImage ? `url(${element.styling.backgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: element.type === 'hero' ? '200px' : 'auto'
    };

    switch (element.type) {
      case 'hero':
        return (
          <div style={style}>
            <h1 className="text-4xl font-bold mb-4">{element.content.title}</h1>
            <p className="text-xl mb-6">{element.content.subtitle}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              {element.content.buttonText}
            </button>
          </div>
        );
      case 'text':
        return <div style={style} dangerouslySetInnerHTML={{ __html: element.content.content }} />;
      case 'image':
        return (
          <div style={style}>
            <img src={element.content.src} alt={element.content.alt} className="w-full h-auto rounded" />
            {element.content.caption && <p className="text-sm mt-2">{element.content.caption}</p>}
          </div>
        );
      case 'button':
        return (
          <div style={style}>
            <button className={`px-6 py-3 rounded-lg ${
              element.content.style === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
              {element.content.text}
            </button>
          </div>
        );
      case 'benefits':
        return (
          <div style={style}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {element.content.map((benefit: any, index: number) => (
                <div key={index} className="text-center p-4">
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div style={style}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {element.content.map((testimonial: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <p className="mb-2">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  {testimonial.role && <p className="text-sm text-gray-600">{testimonial.role}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'faq':
        return (
          <div style={style}>
            {element.content.map((faq: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        );
      case 'cta':
        return (
          <div style={style}>
            <h2 className="text-3xl font-bold mb-2">{element.content.title}</h2>
            <p className="text-lg mb-4">{element.content.subtitle}</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
              {element.content.buttonText}
            </button>
          </div>
        );
      default:
        return <div style={style}>Elemento não reconhecido</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen overflow-hidden">
      {/* Barra de Ferramentas */}
      <div className="space-y-4 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar Elementos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={() => addElement('hero')}>
                <Layout className="w-4 h-4 mr-1" />
                Hero
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('text')}>
                <Type className="w-4 h-4 mr-1" />
                Texto
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('image')}>
                <ImageIcon className="w-4 h-4 mr-1" />
                Imagem
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('button')}>
                Button
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('benefits')}>
                Benefícios
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('testimonials')}>
                Depoimentos
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('faq')}>
                FAQ
              </Button>
              <Button size="sm" variant="outline" onClick={() => addElement('cta')}>
                CTA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Elementos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Move3D className="w-5 h-5" />
              Estrutura da Página
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {elements.sort((a, b) => a.order - b.order).map((element) => (
                <div 
                  key={element.id}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedElement?.id === element.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedElement(element)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {element.type.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">
                        {element.type === 'hero' ? element.content.title : `${element.type} ${element.order}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Switch 
                        checked={element.isVisible}
                        onCheckedChange={(checked) => updateElement(element.id, 'content', { ...element.content, isVisible: checked })}
                      />
                      <Button size="sm" variant="ghost" onClick={() => moveElement(element.id, 'up')}>
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => moveElement(element.id, 'down')}>
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeElement(element.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editor de Propriedades */}
        {selectedElement && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Editar: {selectedElement.type.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="styling">
                    <Palette className="w-4 h-4 mr-1" />
                    Estilo
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-3">
                  {/* Conteúdo específico por tipo */}
                  {selectedElement.type === 'hero' && (
                    <>
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={selectedElement.content.title}
                          onChange={(e) => updateElement(selectedElement.id, 'content', {
                            ...selectedElement.content,
                            title: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label>Subtítulo</Label>
                        <Textarea
                          value={selectedElement.content.subtitle}
                          onChange={(e) => updateElement(selectedElement.id, 'content', {
                            ...selectedElement.content,
                            subtitle: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label>Texto do Botão</Label>
                        <Input
                          value={selectedElement.content.buttonText}
                          onChange={(e) => updateElement(selectedElement.id, 'content', {
                            ...selectedElement.content,
                            buttonText: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label>Link do Botão</Label>
                        <Input
                          value={selectedElement.content.buttonLink}
                          onChange={(e) => updateElement(selectedElement.id, 'content', {
                            ...selectedElement.content,
                            buttonLink: e.target.value
                          })}
                        />
                      </div>
                    </>
                  )}
                  
                  {selectedElement.type === 'text' && (
                    <div>
                      <Label>Conteúdo</Label>
                      <Textarea
                        rows={6}
                        value={selectedElement.content.content}
                        onChange={(e) => updateElement(selectedElement.id, 'content', {
                          ...selectedElement.content,
                          content: e.target.value
                        })}
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="styling" className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Cor de Fundo</Label>
                      <Input
                        type="color"
                        value={selectedElement.styling.backgroundColor}
                        onChange={(e) => updateElement(selectedElement.id, 'styling', {
                          ...selectedElement.styling,
                          backgroundColor: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Cor do Texto</Label>
                      <Input
                        type="color"
                        value={selectedElement.styling.textColor}
                        onChange={(e) => updateElement(selectedElement.id, 'styling', {
                          ...selectedElement.styling,
                          textColor: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Alinhamento do Texto</Label>
                    <Select
                      value={selectedElement.styling.textAlign}
                      onValueChange={(value: 'left' | 'center' | 'right') => updateElement(selectedElement.id, 'styling', {
                        ...selectedElement.styling,
                        textAlign: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Esquerda</SelectItem>
                        <SelectItem value="center">Centro</SelectItem>
                        <SelectItem value="right">Direita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Tamanho da Fonte</Label>
                    <Select
                      value={selectedElement.styling.fontSize}
                      onValueChange={(value) => updateElement(selectedElement.id, 'styling', {
                        ...selectedElement.styling,
                        fontSize: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">Pequeno (12px)</SelectItem>
                        <SelectItem value="14px">Normal (14px)</SelectItem>
                        <SelectItem value="16px">Médio (16px)</SelectItem>
                        <SelectItem value="20px">Grande (20px)</SelectItem>
                        <SelectItem value="24px">Muito Grande (24px)</SelectItem>
                        <SelectItem value="36px">Título (36px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Imagem de Fundo (URL)</Label>
                    <Input
                      value={selectedElement.styling.backgroundImage || ''}
                      onChange={(e) => updateElement(selectedElement.id, 'styling', {
                        ...selectedElement.styling,
                        backgroundImage: e.target.value
                      })}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview da Página */}
      <div className="lg:col-span-2 border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span className="font-medium">Preview da Página</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-1" />
              Visualizar
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-1" />
              Salvar
            </Button>
          </div>
        </div>
        
        <div className="h-full overflow-y-auto bg-white">
          {elements.sort((a, b) => a.order - b.order).map((element) => (
            element.isVisible && (
              <div
                key={element.id}
                className={`relative ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedElement(element)}
              >
                {renderElementPreview(element)}
                {selectedElement?.id === element.id && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-500 text-white">
                      {element.type.toUpperCase()}
                    </Badge>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;