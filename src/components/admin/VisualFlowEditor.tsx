import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  EdgeTypes,
  Position,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  MessageSquare, 
  FormInput, 
  Image as ImageIcon, 
  Gift, 
  Timer, 
  BarChart3,
  Plus,
  Save,
  Eye,
  Play
} from 'lucide-react';

// Tipos de nós customizados
interface QuestionOption {
  text: string;
  value: string;
  nextStep?: string;
}

interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  label?: string;
}

interface OfferConfig {
  originalPrice?: string;
  salePrice?: string;
  discount?: string;
}

interface TimerConfig {
  duration?: number;
}

interface SocialProofConfig {
  testimonials?: any[];
  stats?: any[];
}

interface StepFormNode {
  id: string;
  type: 'question' | 'form' | 'content' | 'offer' | 'timer' | 'socialProof';
  position: { x: number; y: number };
  data: {
    title: string;
    description?: string;
    imageUrl?: string;
    imagePosition?: 'top' | 'left' | 'right' | 'bottom';
    videoUrl?: string;
    mediaType?: 'image' | 'video';
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string;
    options?: QuestionOption[];
    formFields?: FormField[];
    offerConfig?: OfferConfig;
    timerConfig?: TimerConfig;
    socialProofConfig?: SocialProofConfig;
    config?: any;
  };
}

// Componente de nó para perguntas
const QuestionNode = ({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#3b82f6',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px]" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <div className="bg-blue-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        <span className="font-semibold text-sm">Pergunta</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        {data.imageUrl && data.imagePosition === 'top' && (
          <img src={data.imageUrl} alt="Question media" className="w-full h-20 object-cover rounded mb-2" />
        )}
        {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'top' && (
          <div className="w-full h-20 bg-gray-800 rounded mb-2 flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div className="flex gap-2">
          {data.imageUrl && data.imagePosition === 'left' && (
            <img src={data.imageUrl} alt="Question media" className="w-16 h-16 object-cover rounded" />
          )}
          {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'left' && (
            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
              <Play className="w-4 h-4 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Pergunta'}</h4>
            {data.description && (
              <p className="text-xs opacity-75 mb-2">{data.description}</p>
            )}
          </div>
          {data.imageUrl && data.imagePosition === 'right' && (
            <img src={data.imageUrl} alt="Question media" className="w-16 h-16 object-cover rounded" />
          )}
          {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'right' && (
            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
              <Play className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
        {data.options && data.options.length > 0 && (
          <div className="space-y-1 mt-2">
            {data.options.slice(0, 3).map((option, index) => (
              <div key={index} className="text-xs bg-gray-800 p-1 rounded text-gray-300">
                {option.text}
              </div>
            ))}
            {data.options.length > 3 && (
              <div className="text-xs opacity-50">+{data.options.length - 3} mais...</div>
            )}
          </div>
        )}
        {data.imageUrl && data.imagePosition === 'bottom' && (
          <img src={data.imageUrl} alt="Question media" className="w-full h-20 object-cover rounded mt-2" />
        )}
        {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'bottom' && (
          <div className="w-full h-20 bg-gray-800 rounded mt-2 flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para formulários
const FormNode = ({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#22c55e',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px]" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <div className="bg-green-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <FormInput className="w-4 h-4" />
        <span className="font-semibold text-sm">Formulário</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Formulário'}</h4>
        {data.formFields && data.formFields.length > 0 && (
          <div className="space-y-1">
            {data.formFields.slice(0, 3).map((field: any, index: number) => (
              <div key={index} className="text-xs bg-gray-800 p-1 rounded text-gray-300">
                {field.label || field.name} ({field.type})
              </div>
            ))}
            {data.formFields.length > 3 && (
              <div className="text-xs opacity-50">+{data.formFields.length - 3} campos...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para conteúdo
const ContentNode = ({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#8b5cf6',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px]" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <div className="bg-purple-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        <span className="font-semibold text-sm">Conteúdo</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Conteúdo'}</h4>
        {data.description && (
          <p className="text-xs opacity-75 mb-2">{data.description}</p>
        )}
        {data.imageUrl && data.mediaType === 'image' && (
          <div className="mb-2">
            <img src={data.imageUrl} alt="Content" className="w-full h-20 object-cover rounded" />
            <div className="text-xs opacity-50 mt-1 text-gray-400">Imagem</div>
          </div>
        )}
        {data.videoUrl && data.mediaType === 'video' && (
          <div className="mb-2">
            <div className="w-full h-20 bg-gray-800 rounded flex items-center justify-center">
              <Play className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-xs opacity-50 mt-1 text-gray-400">Vídeo</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para ofertas
const OfferNode = ({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#f97316',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px]" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <div className="bg-orange-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <Gift className="w-4 h-4" />
        <span className="font-semibold text-sm">Oferta</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Oferta'}</h4>
        {data.offerConfig && (
          <div className="space-y-1">
            <div className="text-xs bg-gray-800 p-1 rounded text-gray-300">
              {(data.offerConfig as OfferConfig).originalPrice} → {(data.offerConfig as OfferConfig).salePrice}
            </div>
            <div className="text-xs text-orange-400 font-medium">
              {(data.offerConfig as OfferConfig).discount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para timer
const TimerNode = ({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#ef4444',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px]" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <div className="bg-red-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <Timer className="w-4 h-4" />
        <span className="font-semibold text-sm">Timer</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Timer'}</h4>
        {data.timerConfig && (
          <div className="text-xs bg-gray-800 p-1 rounded text-gray-300">
            Duração: {(data.timerConfig as TimerConfig).duration} min
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para prova social
const SocialProofNode = ({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#6366f1',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px]" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <div className="bg-indigo-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        <span className="font-semibold text-sm">Prova Social</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Prova Social'}</h4>
        {data.socialProofConfig && (
          <div className="space-y-1">
            {(data.socialProofConfig as SocialProofConfig).testimonials && (
              <div className="text-xs bg-gray-800 p-1 rounded text-gray-300">
                {(data.socialProofConfig as SocialProofConfig).testimonials?.length} depoimentos
              </div>
            )}
            {(data.socialProofConfig as SocialProofConfig).stats && (
              <div className="text-xs bg-gray-800 p-1 rounded text-gray-300">
                {(data.socialProofConfig as SocialProofConfig).stats?.length} estatísticas
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Tipos de nós personalizados
const nodeTypes: NodeTypes = {
  question: QuestionNode,
  form: FormNode,
  content: ContentNode,
  offer: OfferNode,
  timer: TimerNode,
  socialProof: SocialProofNode,
};

// Configuração inicial de nós
const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'question',
    position: { x: 300, y: 100 },
    data: {
      title: 'Início do Formulário',
      description: 'Bem-vindo ao nosso formulário interativo',
      options: [{ text: 'Começar', value: 'start', nextStep: '2' }]
    },
  },
];

const initialEdges: Edge[] = [];

interface VisualFlowEditorProps {
  onSave: (flow: { nodes: Node[]; edges: Edge[] }) => void;
  initialFlow?: { nodes: Node[]; edges: Edge[] };
}

export const VisualFlowEditor: React.FC<VisualFlowEditorProps> = ({ 
  onSave, 
  initialFlow 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlow?.nodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlow?.edges || initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNewNode = (type: string) => {
    const newId = `${type}_${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type,
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 300 + 200 
      },
      data: {
        title: `Nova ${type}`,
        description: '',
        options: type === 'question' ? [{ text: 'Opção 1', value: 'opt1' }] : undefined,
        formFields: type === 'form' ? [{ name: 'name', type: 'text', placeholder: 'Nome', required: true }] : undefined,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const updateNodeData = (nodeId: string, updates: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
  };

  const handleSave = () => {
    onSave({ nodes, edges });
  };

  return (
    <div className="h-[80vh] w-full flex bg-background">
      {/* Área do Flow */}
      <div className="flex-1 relative bg-gray-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-900"
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>

        {/* Toolbar flutuante */}
        <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg p-2 flex gap-2 z-10 border">
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNewNode('question')}
            className="flex items-center gap-1"
          >
            <MessageSquare className="w-4 h-4" />
            Pergunta
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNewNode('form')}
            className="flex items-center gap-1"
          >
            <FormInput className="w-4 h-4" />
            Formulário
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNewNode('content')}
            className="flex items-center gap-1"
          >
            <ImageIcon className="w-4 h-4" />
            Conteúdo
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNewNode('offer')}
            className="flex items-center gap-1"
          >
            <Gift className="w-4 h-4" />
            Oferta
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNewNode('timer')}
            className="flex items-center gap-1"
          >
            <Timer className="w-4 h-4" />
            Timer
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNewNode('socialProof')}
            className="flex items-center gap-1"
          >
            <BarChart3 className="w-4 h-4" />
            Prova Social
          </Button>
        </div>

        {/* Botões de ação */}
        <div className="absolute top-4 right-4 bg-card rounded-lg shadow-lg p-2 flex gap-2 z-10 border">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Editar' : 'Preview'}
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="flex items-center gap-1"
          >
            <Save className="w-4 h-4" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Painel lateral para edição */}
      <div className="w-80 bg-card border-l border-border p-4 overflow-y-auto">
        {selectedNode ? (
          <NodeEditor
            node={selectedNode}
            onUpdate={(updates) => updateNodeData(selectedNode.id, updates)}
          />
        ) : (
          <div className="text-center text-muted-foreground mt-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Selecione um nó para editar suas propriedades</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para editar propriedades do nó
interface NodeEditorProps {
  node: Node;
  onUpdate: (updates: any) => void;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ node, onUpdate }) => {
  const handleUpdate = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleOptionUpdate = (index: number, field: string, value: string) => {
    const options = [...((node.data.options as QuestionOption[]) || [])];
    options[index] = { ...options[index], [field]: value };
    onUpdate({ options });
  };

  const addOption = () => {
    const options = [...((node.data.options as QuestionOption[]) || [])];
    options.push({ text: 'Nova opção', value: `opt_${Date.now()}` });
    onUpdate({ options });
  };

  const removeOption = (index: number) => {
    const options = [...((node.data.options as QuestionOption[]) || [])];
    options.splice(index, 1);
    onUpdate({ options });
  };

  const handleFormFieldUpdate = (index: number, field: string, value: string) => {
    const formFields = [...((node.data.formFields as FormField[]) || [])];
    formFields[index] = { ...formFields[index], [field]: value };
    onUpdate({ formFields });
  };

  const addFormField = () => {
    const formFields = [...((node.data.formFields as FormField[]) || [])];
    formFields.push({ name: 'campo', type: 'text', placeholder: 'Digite aqui...', required: false, label: '' });
    onUpdate({ formFields });
  };

  const removeFormField = (index: number) => {
    const formFields = [...((node.data.formFields as FormField[]) || [])];
    formFields.splice(index, 1);
    onUpdate({ formFields });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Badge variant="outline">{node.type}</Badge>
          Editar Nó
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={(node.data.title as string) || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={(node.data.description as string) || ''}
            onChange={(e) => handleUpdate('description', e.target.value)}
            rows={3}
          />
        </div>

        {/* Configurações de aparência */}
        <div className="space-y-3">
          <h4 className="font-medium">Aparência</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Cor de Fundo</Label>
              <Input
                type="color"
                value={(node.data.backgroundColor as string) || '#1a1a1a'}
                onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
              />
            </div>
            <div>
              <Label>Cor do Texto</Label>
              <Input
                type="color"
                value={(node.data.textColor as string) || '#ffffff'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
              />
            </div>
            <div>
              <Label>Cor da Borda</Label>
              <Input
                type="color"
                value={(node.data.borderColor as string) || '#3b82f6'}
                onChange={(e) => handleUpdate('borderColor', e.target.value)}
              />
            </div>
            <div>
              <Label>Raio da Borda</Label>
              <Input
                placeholder="8px"
                value={(node.data.borderRadius as string) || '8px'}
                onChange={(e) => handleUpdate('borderRadius', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Mídia para pergunta e conteúdo */}
        {(node.type === 'question' || node.type === 'content') && (
          <div className="space-y-3">
            <h4 className="font-medium">Mídia</h4>
            <div>
              <Label>Tipo de Mídia</Label>
            <Select
              value={(node.data.mediaType as string) || 'image'}
              onValueChange={(value) => handleUpdate('mediaType', value)}
            >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Imagem</SelectItem>
                  <SelectItem value="video">Vídeo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {node.data.mediaType === 'image' && (
              <>
                <div>
                  <Label>URL da Imagem</Label>
                <Input
                  placeholder="https://..."
                  value={(node.data.imageUrl as string) || ''}
                  onChange={(e) => handleUpdate('imageUrl', e.target.value)}
                />
                </div>
                {node.type === 'question' && (
                  <div>
                    <Label>Posição da Imagem</Label>
                  <Select
                    value={(node.data.imagePosition as string) || 'top'}
                    onValueChange={(value) => handleUpdate('imagePosition', value)}
                  >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Acima</SelectItem>
                        <SelectItem value="left">Esquerda</SelectItem>
                        <SelectItem value="right">Direita</SelectItem>
                        <SelectItem value="bottom">Abaixo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}
            {node.data.mediaType === 'video' && (
              <div>
                <Label>URL do Vídeo</Label>
              <Input
                placeholder="https://..."
                value={(node.data.videoUrl as string) || ''}
                onChange={(e) => handleUpdate('videoUrl', e.target.value)}
              />
              </div>
            )}
          </div>
        )}

        {/* Opções para nós de pergunta */}
        {node.type === 'question' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Opções</Label>
              <Button size="sm" variant="outline" onClick={addOption}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-2">
              {((node.data.options as QuestionOption[]) || []).map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Texto da opção"
                    value={option.text || ''}
                    onChange={(e) => handleOptionUpdate(index, 'text', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeOption(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campos para nós de formulário */}
        {node.type === 'form' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Campos do Formulário</Label>
              <Button size="sm" variant="outline" onClick={addFormField}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-2">
              {((node.data.formFields as FormField[]) || []).map((field, index) => (
                <div key={index} className="space-y-2 p-2 border rounded">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nome do campo"
                      value={field.name || ''}
                      onChange={(e) => handleFormFieldUpdate(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFormField(index)}
                    >
                      ×
                    </Button>
                  </div>
                  <Input
                    placeholder="Label (identificador)"
                    value={field.label || ''}
                    onChange={(e) => handleFormFieldUpdate(index, 'label', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={field.type || 'text'}
                      onValueChange={(value) => handleFormFieldUpdate(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Telefone</SelectItem>
                        <SelectItem value="number">Número</SelectItem>
                        <SelectItem value="textarea">Área de Texto</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Placeholder"
                      value={field.placeholder || ''}
                      onChange={(e) => handleFormFieldUpdate(index, 'placeholder', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Configurações específicas por tipo de nó */}
        {node.type === 'offer' && (
          <div className="space-y-3">
            <h4 className="font-medium">Configuração da Oferta</h4>
            <div>
              <Label>Preço Original</Label>
              <Input
                placeholder="R$ 197,00"
                value={(node.data.offerConfig as OfferConfig)?.originalPrice || ''}
                onChange={(e) => handleUpdate('offerConfig', {
                  ...(node.data.offerConfig as OfferConfig || {}),
                  originalPrice: e.target.value
                })}
              />
            </div>
            <div>
              <Label>Preço Promocional</Label>
              <Input
                placeholder="R$ 97,00"
                value={(node.data.offerConfig as OfferConfig)?.salePrice || ''}
                onChange={(e) => handleUpdate('offerConfig', {
                  ...(node.data.offerConfig as OfferConfig || {}),
                  salePrice: e.target.value
                })}
              />
            </div>
            <div>
              <Label>Desconto</Label>
              <Input
                placeholder="50% OFF"
                value={(node.data.offerConfig as OfferConfig)?.discount || ''}
                onChange={(e) => handleUpdate('offerConfig', {
                  ...(node.data.offerConfig as OfferConfig || {}),
                  discount: e.target.value
                })}
              />
            </div>
          </div>
        )}

        {node.type === 'timer' && (
          <div className="space-y-3">
            <h4 className="font-medium">Configuração do Timer</h4>
            <div>
              <Label>Duração (minutos)</Label>
              <Input
                type="number"
                placeholder="30"
                value={(node.data.timerConfig as TimerConfig)?.duration?.toString() || ''}
                onChange={(e) => handleUpdate('timerConfig', {
                  ...(node.data.timerConfig as TimerConfig || {}),
                  duration: parseInt(e.target.value) || 30
                })}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};