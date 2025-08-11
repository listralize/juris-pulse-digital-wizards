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
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
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
  Play,
  Trash2
} from 'lucide-react';
import { ImageGallery } from './ImageGallery';
import { toast } from 'sonner';

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
    imageHeight?: string;
    videoUrl?: string;
    videoHeight?: string;
    mediaType?: 'image' | 'video';
    width?: string;
    height?: string;
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
const QuestionNode = React.memo(({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#3b82f6',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px] relative" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <div className="bg-blue-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        <span className="font-semibold text-sm">Pergunta</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        {data.imageUrl && data.mediaType === 'image' && data.imagePosition === 'top' && (
          <img src={data.imageUrl} alt="Question media" className="w-full h-20 object-cover rounded mb-2" />
        )}
        {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'top' && (
          <div className="w-full h-20 bg-gray-800 rounded mb-2 flex items-center justify-center relative">
            <Play className="w-6 h-6 text-gray-400" />
            <video 
              src={data.videoUrl} 
              className="absolute inset-0 w-full h-full object-cover rounded opacity-50"
              muted
            />
          </div>
        )}
        <div className="flex gap-2">
          {data.imageUrl && data.mediaType === 'image' && data.imagePosition === 'left' && (
            <img src={data.imageUrl} alt="Question media" className="w-16 h-16 object-cover rounded" />
          )}
          {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'left' && (
            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center relative">
              <Play className="w-4 h-4 text-gray-400" />
              <video 
                src={data.videoUrl} 
                className="absolute inset-0 w-full h-full object-cover rounded opacity-50"
                muted
              />
            </div>
          )}
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Pergunta'}</h4>
            {data.description && (
              <p className="text-xs opacity-75 mb-2">{data.description}</p>
            )}
          </div>
          {data.imageUrl && data.mediaType === 'image' && data.imagePosition === 'right' && (
            <img src={data.imageUrl} alt="Question media" className="w-16 h-16 object-cover rounded" />
          )}
          {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'right' && (
            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center relative">
              <Play className="w-4 h-4 text-gray-400" />
              <video 
                src={data.videoUrl} 
                className="absolute inset-0 w-full h-full object-cover rounded opacity-50"
                muted
              />
            </div>
          )}
        </div>
        {data.options && data.options.length > 0 && (
          <div className="space-y-1 mt-2">
            {data.options.slice(0, 3).map((option, index) => (
              <div 
                key={`${option.text}-${index}`}
                className="text-xs bg-gray-800 p-2 rounded text-gray-300 border border-gray-600 hover:bg-gray-700 cursor-pointer relative"
              >
                {option.text}
                <Handle 
                  type="source" 
                  position={Position.Right} 
                  id={`option-${index}`}
                  style={{ right: '-8px', top: '50%', transform: 'translateY(-50%)' }}
                  className="w-3 h-3 bg-green-500"
                />
              </div>
            ))}
            {data.options.length > 3 && (
              <div className="text-xs opacity-50">+{data.options.length - 3} mais...</div>
            )}
          </div>
        )}
        {data.imageUrl && data.mediaType === 'image' && data.imagePosition === 'bottom' && (
          <img src={data.imageUrl} alt="Question media" className="w-full h-20 object-cover rounded mt-2" />
        )}
        {data.videoUrl && data.mediaType === 'video' && data.imagePosition === 'bottom' && (
          <div className="w-full h-20 bg-gray-800 rounded mt-2 flex items-center justify-center relative">
            <Play className="w-6 h-6 text-gray-400" />
            <video 
              src={data.videoUrl} 
              className="absolute inset-0 w-full h-full object-cover rounded opacity-50"
              muted
            />
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </div>
  );
});

// Componente de nó para formulários
const FormNode = React.memo(({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#22c55e',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px] relative" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500" />
      <div className="bg-green-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <FormInput className="w-4 h-4" />
        <span className="font-semibold text-sm">Formulário</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Formulário'}</h4>
        {data.description && (
          <p className="text-xs opacity-75 mb-2">{data.description}</p>
        )}
        {data.formFields && data.formFields.length > 0 && (
          <div className="space-y-1">
            {data.formFields.slice(0, 3).map((field: any, index: number) => (
              <div key={`${field.name}-${index}`} className="text-xs bg-gray-800 p-1 rounded text-gray-300">
                {field.label || field.placeholder || field.name} ({field.type})
              </div>
            ))}
            {data.formFields.length > 3 && (
              <div className="text-xs opacity-50">+{data.formFields.length - 3} campos...</div>
            )}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />
    </div>
  );
});

// Componente de nó para conteúdo
const ContentNode = React.memo(({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#8b5cf6',
    borderRadius: data.borderRadius || '8px',
  };

  const nodeWidth = data.width || '300px';
  const nodeHeight = data.height || 'auto';

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] resize overflow-hidden relative" 
      style={{ 
        backgroundColor: nodeStyle.backgroundColor, 
        borderColor: nodeStyle.borderColor, 
        borderRadius: nodeStyle.borderRadius,
        width: nodeWidth,
        height: nodeHeight,
        maxWidth: '500px',
        maxHeight: '400px'
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-500" />
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
            <img 
              src={data.imageUrl} 
              alt="Content" 
              className="w-full object-cover rounded"
              style={{ height: data.imageHeight || '80px' }}
            />
            <div className="text-xs opacity-50 mt-1 text-gray-400">Imagem</div>
          </div>
        )}
        {data.videoUrl && data.mediaType === 'video' && (
          <div className="mb-2">
            <div 
              className="w-full bg-gray-800 rounded flex items-center justify-center relative overflow-hidden"
              style={{ height: data.videoHeight || '80px' }}
            >
              <Play className="w-6 h-6 text-gray-400 z-10" />
              <video 
                src={data.videoUrl} 
                className="absolute inset-0 w-full h-full object-cover rounded opacity-50"
                muted
              />
            </div>
            <div className="text-xs opacity-50 mt-1 text-gray-400">Vídeo</div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-purple-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  );
});

// Componente de nó para ofertas
const OfferNode = React.memo(({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#f97316',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px] relative" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-orange-500" />
      <div className="bg-orange-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <Gift className="w-4 h-4" />
        <span className="font-semibold text-sm">Oferta</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Oferta'}</h4>
        {data.description && (
          <p className="text-xs opacity-75 mb-2">{data.description}</p>
        )}
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
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-orange-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-orange-500" />
    </div>
  );
});

// Componente de nó para timer
const TimerNode = React.memo(({ data, id }: { data: StepFormNode['data']; id: string }) => {
  const nodeStyle = {
    backgroundColor: data.backgroundColor || '#1a1a1a',
    color: data.textColor || '#ffffff',
    borderColor: data.borderColor || '#ef4444',
    borderRadius: data.borderRadius || '8px',
  };

  return (
    <div 
      className="rounded-lg shadow-lg border-2 min-w-[200px] max-w-[300px] relative" 
      style={{ backgroundColor: nodeStyle.backgroundColor, borderColor: nodeStyle.borderColor, borderRadius: nodeStyle.borderRadius }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-red-500" />
      <div className="bg-red-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <Timer className="w-4 h-4" />
        <span className="font-semibold text-sm">Timer</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Timer'}</h4>
        {data.description && (
          <p className="text-xs opacity-75 mb-2">{data.description}</p>
        )}
        {data.timerConfig && (
          <div className="text-xs bg-gray-800 p-1 rounded text-gray-300">
            Duração: {(data.timerConfig as TimerConfig).duration} min
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-red-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-red-500" />
    </div>
  );
});

// Tipos de nós personalizados
const nodeTypes: NodeTypes = {
  question: QuestionNode,
  form: FormNode,
  content: ContentNode,
  offer: OfferNode,
  timer: TimerNode,
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
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export const VisualFlowEditor: React.FC<VisualFlowEditorProps> = ({ 
  formData,
  onUpdate
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    formData?.flowConfig?.edges || initialEdges
  );
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [imageGalleryField, setImageGalleryField] = useState<'imageUrl' | 'videoUrl'>('imageUrl');
  const initialDataRef = useRef(false);

  // Sync nodes with formData changes and load edges
  useEffect(() => {
    if (formData?.steps && formData.steps.length > 0 && !initialDataRef.current) {
      const updatedNodes = formData.steps.map((step: any, index: number) => ({
        id: step.id || `step_${index}`,
        type: step.type || 'question',
        position: step.position || { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
        data: {
          title: step.title,
          description: step.description,
          options: step.options,
          formFields: step.formFields,
          offerConfig: step.offerConfig,
          timerConfig: step.timerConfig,
          socialProofConfig: step.socialProofConfig,
          imageUrl: step.imageUrl,
          videoUrl: step.videoUrl,
          mediaType: step.mediaType,
          imagePosition: step.imagePosition,
          imageHeight: step.imageHeight,
          videoHeight: step.videoHeight,
          backgroundColor: step.backgroundColor,
          textColor: step.textColor,
          borderColor: step.borderColor,
          width: step.width,
          height: step.height,
        }
      }));
      setNodes(updatedNodes);
      
      // Carregar conexões salvas
      if (formData.flowConfig?.edges && Array.isArray(formData.flowConfig.edges)) {
        setEdges(formData.flowConfig.edges);
      }
      
      initialDataRef.current = true;
    }
  }, [formData?.steps, formData?.flowConfig, setNodes, setEdges]);

  // Update selectedNode when nodes change
  useEffect(() => {
    if (selectedNode) {
      const updatedSelectedNode = nodes.find(node => node.id === selectedNode.id);
      if (updatedSelectedNode) {
        setSelectedNode(updatedSelectedNode);
      }
    }
  }, [nodes, selectedNode]);

  // Save flow callback
  const saveFlow = useCallback(async () => {
    if (!onUpdate) return;
    
    try {
      const flowData = nodes.map(node => ({
        id: node.id,
        type: node.data.type || node.type,
        title: node.data.title,
        description: node.data.description,
        options: node.data.options,
        formFields: node.data.formFields,
        offerConfig: node.data.offerConfig,
        timerConfig: node.data.timerConfig,
        socialProofConfig: node.data.socialProofConfig,
        mediaType: node.data.mediaType,
        imageUrl: node.data.imageUrl,
        videoUrl: node.data.videoUrl,
        imagePosition: node.data.imagePosition,
        imageHeight: node.data.imageHeight,
        videoHeight: node.data.videoHeight,
        backgroundColor: node.data.backgroundColor,
        textColor: node.data.textColor,
        borderColor: node.data.borderColor,
        width: node.data.width,
        height: node.data.height,
        config: node.data.config,
        position: node.position // Salvar posição do nó
      }));
      
      // Incluir as conexões no salvamento
      const flowConfig = {
        steps: flowData,
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };
      
      onUpdate('steps', flowData);
      onUpdate('flowConfig', flowConfig);
      toast.success('Fluxo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar fluxo:', error);
      toast.error('Erro ao salvar o fluxo');
    }
  }, [nodes, edges, onUpdate]);

  // Removed auto-save to prevent loops

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNode = (type: string) => {
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
        formFields: type === 'form' ? [{ name: 'nome', type: 'text', placeholder: 'Digite seu nome', label: 'Digite seu nome', required: true }] : undefined,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const updateNode = (nodeId: string, updates: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  };

  const openImageGallery = (field: 'imageUrl' | 'videoUrl') => {
    setImageGalleryField(field);
    setShowImageGallery(true);
  };

  const handleImageSelect = (url: string) => {
    if (selectedNode) {
      if (imageGalleryField === 'imageUrl') {
        updateNode(selectedNode.id, { 
          imageUrl: url, 
          mediaType: 'image',
          videoUrl: undefined
        });
      } else {
        updateNode(selectedNode.id, { 
          videoUrl: url, 
          mediaType: 'video',
          imageUrl: undefined
        });
      }
    }
    setShowImageGallery(false);
  };

  return (
    <div className="h-[80vh] w-full flex bg-gray-900">
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
          className="w-full h-full"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <Controls />
          <MiniMap className="bg-gray-800" />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#333" />
        </ReactFlow>

        {/* Botões flutuantes para adicionar nós */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-xs">
          <Button
            size="sm"
            onClick={() => addNode('question')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Pergunta
          </Button>
          <Button
            size="sm"
            onClick={() => addNode('form')}
            className="bg-green-500 hover:bg-green-600"
          >
            <FormInput className="w-4 h-4 mr-1" />
            Formulário
          </Button>
          <Button
            size="sm"
            onClick={() => addNode('content')}
            className="bg-purple-500 hover:bg-purple-600"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Conteúdo
          </Button>
          <Button
            size="sm"
            onClick={() => addNode('offer')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Gift className="w-4 h-4 mr-1" />
            Oferta
          </Button>
          <Button
            size="sm"
            onClick={() => addNode('timer')}
            className="bg-red-500 hover:bg-red-600"
          >
            <Timer className="w-4 h-4 mr-1" />
            Timer
          </Button>
        </div>

        {/* Botão de salvar */}
        <div className="absolute top-4 right-4">
          <Button onClick={saveFlow} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Salvar Fluxo
          </Button>
        </div>
      </div>

      {/* Painel lateral de edição */}
      {selectedNode && (
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  Editar {selectedNode.type?.charAt(0).toUpperCase() + selectedNode.type?.slice(1)}
                </CardTitle>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteNode(selectedNode.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Título</Label>
                <Input
                  value={String(selectedNode.data.title || '')}
                  onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">Descrição</Label>
                <Textarea
                  value={String(selectedNode.data.description || '')}
                  onChange={(e) => updateNode(selectedNode.id, { description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {selectedNode.type === 'question' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Imagem/Vídeo</Label>
                    <Select 
                      value={String(selectedNode.data.mediaType || 'none')}
                      onValueChange={(value) => {
                        const mediaType = value === 'none' ? undefined : value;
                        updateNode(selectedNode.id, { 
                          mediaType,
                          imageUrl: mediaType === 'image' ? selectedNode.data.imageUrl : undefined,
                          videoUrl: mediaType === 'video' ? selectedNode.data.videoUrl : undefined
                        });
                      }}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Selecione o tipo de mídia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedNode.data.mediaType === 'image' && (
                    <>
                      <div>
                        <Label className="text-gray-300">URL da Imagem</Label>
                        <div className="flex gap-2">
                          <Input
                            value={String(selectedNode.data.imageUrl || '')}
                            onChange={(e) => updateNode(selectedNode.id, { imageUrl: e.target.value })}
                            placeholder="URL da imagem"
                            className="bg-gray-700 border-gray-600 text-white flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openImageGallery('imageUrl')}
                            className="whitespace-nowrap"
                          >
                            <ImageIcon className="w-4 h-4 mr-1" />
                            Galeria
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Posição da Imagem</Label>
                        <Select 
                          value={String(selectedNode.data.imagePosition || 'top')}
                          onValueChange={(value) => updateNode(selectedNode.id, { imagePosition: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">Acima do texto</SelectItem>
                            <SelectItem value="left">À esquerda</SelectItem>
                            <SelectItem value="right">À direita</SelectItem>
                            <SelectItem value="bottom">Abaixo do texto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-300">Altura da Imagem</Label>
                        <Input
                          value={String(selectedNode.data.imageHeight || '80px')}
                          onChange={(e) => updateNode(selectedNode.id, { imageHeight: e.target.value })}
                          placeholder="ex: 120px"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </>
                  )}

                  {selectedNode.data.mediaType === 'video' && (
                    <>
                      <div>
                        <Label className="text-gray-300">URL do Vídeo</Label>
                        <div className="flex gap-2">
                          <Input
                            value={String(selectedNode.data.videoUrl || '')}
                            onChange={(e) => updateNode(selectedNode.id, { videoUrl: e.target.value })}
                            placeholder="URL do vídeo"
                            className="bg-gray-700 border-gray-600 text-white flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openImageGallery('videoUrl')}
                            className="whitespace-nowrap"
                          >
                            <ImageIcon className="w-4 h-4 mr-1" />
                            Galeria
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Posição do Vídeo</Label>
                        <Select 
                          value={String(selectedNode.data.imagePosition || 'top')} 
                          onValueChange={(value) => updateNode(selectedNode.id, { imagePosition: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">Acima do texto</SelectItem>
                            <SelectItem value="left">À esquerda</SelectItem>
                            <SelectItem value="right">À direita</SelectItem>
                            <SelectItem value="bottom">Abaixo do texto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-300">Altura do Vídeo</Label>
                        <Input
                          value={String(selectedNode.data.videoHeight || '80px')}
                          onChange={(e) => updateNode(selectedNode.id, { videoHeight: e.target.value })}
                          placeholder="ex: 120px"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label className="text-gray-300">Opções</Label>
                    {Array.isArray(selectedNode.data.options) && selectedNode.data.options.map((option: QuestionOption, index: number) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={option.text}
                          onChange={(e) => {
                            const newOptions = [...(Array.isArray(selectedNode.data.options) ? selectedNode.data.options : [])];
                            newOptions[index] = { ...option, text: e.target.value };
                            updateNode(selectedNode.id, { options: newOptions });
                          }}
                          placeholder="Texto da opção"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newOptions = Array.isArray(selectedNode.data.options) ? selectedNode.data.options.filter((_: any, i: number) => i !== index) : [];
                            updateNode(selectedNode.id, { options: newOptions });
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      onClick={() => {
                        const newOptions = [...(Array.isArray(selectedNode.data.options) ? selectedNode.data.options : []), { text: 'Nova opção', value: `opt${Date.now()}` }];
                        updateNode(selectedNode.id, { options: newOptions });
                      }}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar Opção
                    </Button>
                  </div>
                </div>
              )}

              {selectedNode.type === 'content' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Largura do Nó</Label>
                    <Input
                      value={String(selectedNode.data.width || '300px')}
                      onChange={(e) => updateNode(selectedNode.id, { width: e.target.value })}
                      placeholder="ex: 400px"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Altura do Nó</Label>
                    <Input
                      value={String(selectedNode.data.height || 'auto')}
                      onChange={(e) => updateNode(selectedNode.id, { height: e.target.value })}
                      placeholder="ex: 300px ou auto"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Imagem/Vídeo</Label>
                    <Select 
                      value={String(selectedNode.data.mediaType || 'none')} 
                      onValueChange={(value) => {
                        const mediaType = value === 'none' ? undefined : value;
                        updateNode(selectedNode.id, { 
                          mediaType,
                          imageUrl: mediaType === 'image' ? selectedNode.data.imageUrl : undefined,
                          videoUrl: mediaType === 'video' ? selectedNode.data.videoUrl : undefined
                        });
                      }}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Selecione o tipo de mídia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedNode.data.mediaType === 'image' && (
                    <>
                      <div>
                        <Label className="text-gray-300">URL da Imagem</Label>
                        <div className="flex gap-2">
                          <Input
                            value={String(selectedNode.data.imageUrl || '')}
                            onChange={(e) => updateNode(selectedNode.id, { imageUrl: e.target.value })}
                            placeholder="URL da imagem"
                            className="bg-gray-700 border-gray-600 text-white flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openImageGallery('imageUrl')}
                            className="whitespace-nowrap"
                          >
                            <ImageIcon className="w-4 h-4 mr-1" />
                            Galeria
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Altura da Imagem</Label>
                        <Input
                          value={String(selectedNode.data.imageHeight || '120px')}
                          onChange={(e) => updateNode(selectedNode.id, { imageHeight: e.target.value })}
                          placeholder="ex: 150px"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </>
                  )}

                  {selectedNode.data.mediaType === 'video' && (
                    <>
                      <div>
                        <Label className="text-gray-300">URL do Vídeo</Label>
                        <div className="flex gap-2">
                          <Input
                            value={String(selectedNode.data.videoUrl || '')}
                            onChange={(e) => updateNode(selectedNode.id, { videoUrl: e.target.value })}
                            placeholder="URL do vídeo"
                            className="bg-gray-700 border-gray-600 text-white flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openImageGallery('videoUrl')}
                            className="whitespace-nowrap"
                          >
                            <ImageIcon className="w-4 h-4 mr-1" />
                            Galeria
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-300">Altura do Vídeo</Label>
                        <Input
                          value={String(selectedNode.data.videoHeight || '120px')}
                          onChange={(e) => updateNode(selectedNode.id, { videoHeight: e.target.value })}
                          placeholder="ex: 150px"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label className="text-gray-300">Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={String(selectedNode.data.backgroundColor || '#1a1a1a')}
                      onChange={(e) => updateNode(selectedNode.id, { backgroundColor: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-300">Cor do Texto</Label>
                    <Input
                      type="color"
                      value={String(selectedNode.data.textColor || '#ffffff')}
                      onChange={(e) => updateNode(selectedNode.id, { textColor: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-300">Cor da Borda</Label>
                    <Input
                      type="color"
                      value={String(selectedNode.data.borderColor || '#8b5cf6')}
                      onChange={(e) => updateNode(selectedNode.id, { borderColor: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
              )}

              {selectedNode.type === 'form' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Campos do Formulário</Label>
                    {Array.isArray(selectedNode.data.formFields) && selectedNode.data.formFields.map((field: FormField, index: number) => (
                      <div key={index} className="space-y-2 p-3 bg-gray-800 rounded-lg mt-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{field.name || `campo_${index + 1}`}</Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const newFields = (Array.isArray(selectedNode.data.formFields) ? selectedNode.data.formFields : []).filter((_, i) => i !== index);
                              updateNode(selectedNode.id, { formFields: newFields });
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs text-gray-400">ID do Campo</Label>
                            <Input
                              value={field.name}
                              onChange={(e) => {
                                const newFields = [...(Array.isArray(selectedNode.data.formFields) ? selectedNode.data.formFields : [])];
                                newFields[index] = { ...field, name: e.target.value };
                                updateNode(selectedNode.id, { formFields: newFields });
                              }}
                              placeholder="nome_campo"
                              className="bg-gray-700 border-gray-600 text-white text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-400">Tipo</Label>
                            <Select
                              value={field.type}
                              onValueChange={(value) => {
                                const newFields = [...(Array.isArray(selectedNode.data.formFields) ? selectedNode.data.formFields : [])];
                                newFields[index] = { ...field, type: value };
                                updateNode(selectedNode.id, { formFields: newFields });
                              }}
                            >
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Texto</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="tel">Telefone</SelectItem>
                                <SelectItem value="number">Número</SelectItem>
                                <SelectItem value="textarea">Área de texto</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-400">Label/Placeholder</Label>
                          <Input
                            value={field.label || field.placeholder || ''}
                            onChange={(e) => {
                              const newFields = [...(Array.isArray(selectedNode.data.formFields) ? selectedNode.data.formFields : [])];
                              newFields[index] = { 
                                ...field, 
                                label: e.target.value,
                                placeholder: e.target.value 
                              };
                              updateNode(selectedNode.id, { formFields: newFields });
                            }}
                            placeholder="Ex: Escreva seu nome aqui"
                            className="bg-gray-700 border-gray-600 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      onClick={() => {
                        const fieldCount = (Array.isArray(selectedNode.data.formFields) ? selectedNode.data.formFields.length : 0) + 1;
                        const newFields = [...(Array.isArray(selectedNode.data.formFields) ? selectedNode.data.formFields : []), 
                          { 
                            name: `campo_${fieldCount}`, 
                            type: 'text', 
                            placeholder: 'Digite aqui...', 
                            label: 'Digite aqui...',
                            required: false 
                          }
                        ];
                        updateNode(selectedNode.id, { formFields: newFields });
                      }}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar Campo
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Galeria de Imagens */}
      <ImageGallery
        isOpen={showImageGallery}
        onClose={() => setShowImageGallery(false)}
        onSelectImage={handleImageSelect}
        selectedImage={
          imageGalleryField === 'imageUrl' 
            ? String(selectedNode?.data.imageUrl || '') 
            : String(selectedNode?.data.videoUrl || '')
        }
      />
    </div>
  );
};