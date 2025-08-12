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
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './VisualFlowEditor.css';
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
    mediaType?: 'none' | 'image' | 'video' | 'carousel';
    // Carousel configuration
    carouselImages?: string[];
    carouselAutoplay?: boolean;
    carouselShowDots?: boolean;
    carouselInterval?: number;

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
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-accent" />
      <div className="bg-secondary text-secondary-foreground p-2 rounded-t-lg flex items-center gap-2">
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
            {data.options.map((option, index) => (
              <div 
                key={`${option.text}-${index}`}
                className="text-xs bg-muted p-2 rounded text-muted-foreground border border-border hover:bg-accent cursor-pointer relative"
              >
                {option.text}
                <Handle 
                  type="source" 
                  position={Position.Right} 
                  id={`option-${index}`}
                  style={{ right: '-8px', top: '50%', transform: 'translateY(-50%)' }}
                  className="w-3 h-3 bg-accent"
                />
              </div>
            ))}
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
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-accent" />
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
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-accent" />
      <div className="bg-secondary text-secondary-foreground p-2 rounded-t-lg flex items-center gap-2">
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
            {data.formFields.map((field: any, index: number) => (
              <div key={`${field.name}-${index}`} className="text-xs bg-muted p-1 rounded text-muted-foreground">
                {field.label || field.placeholder || field.name} ({field.type})
              </div>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-accent" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-accent" />
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
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-accent" />
      <div className="bg-secondary text-secondary-foreground p-2 rounded-t-lg flex items-center gap-2">
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
            <div className="text-xs opacity-50 mt-1 text-muted-foreground">Imagem</div>
          </div>
        )}
        {data.videoUrl && data.mediaType === 'video' && (
          <div className="mb-2">
            <div 
              className="w-full bg-gray-800 rounded flex items-center justify-center relative overflow-hidden"
              style={{ height: data.videoHeight || '80px' }}
            >
              <Play className="w-6 h-6 text-muted-foreground z-10" />
              <video 
                src={data.videoUrl} 
                className="absolute inset-0 w-full h-full object-cover rounded opacity-50"
                muted
              />
            </div>
            <div className="text-xs opacity-50 mt-1 text-muted-foreground">Vídeo</div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-accent" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-accent" />
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

// Componente de nó para timer (mantido apenas para compatibilidade visual de formulários antigos)
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
        <span className="font-semibold text-sm">Timer (descontinuado)</span>
      </div>
      <div className="p-3" style={{ color: nodeStyle.color }}>
        <p className="text-xs opacity-75 mb-2">Elemento legado. Não adicione novos timers.</p>
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

// Borda com botão para deletar a ligação
const ButtonEdge: React.FC<any> = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: any) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
  });
  const onEdgeClick = () => {
    setEdges((eds: Edge[]) => eds.filter((e) => e.id !== id));
  };
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }} className="nodrag nopan">
          <button onClick={onEdgeClick} className="w-6 h-6 rounded-full bg-gray-700 text-white text-xs">×</button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const edgeTypes: EdgeTypes = {
  button: ButtonEdge,
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
    formData?.flowConfig?.edges || formData?.flow_config?.edges || initialEdges
  );
  const [selectedNode, setSelectedNode] = useState<Node<StepFormNode['data']> | null>(null);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [imageGalleryField, setImageGalleryField] = useState<'imageUrl' | 'videoUrl'>('imageUrl');
  const initialDataRef = useRef(false);
  const rfInstance = useRef<any>(null);

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
          carouselImages: step.carouselImages,
          carouselAutoplay: step.carouselAutoplay,
          carouselShowDots: step.carouselShowDots,
          carouselInterval: step.carouselInterval,
        }
      }));
      setNodes(updatedNodes);
      
      // Carregar conexões salvas
      if ((formData.flowConfig?.edges || formData.flow_config?.edges) && 
          Array.isArray(formData.flowConfig?.edges || formData.flow_config?.edges)) {
        const loaded = (formData.flowConfig?.edges || formData.flow_config?.edges).map((e: any) => ({ ...e, type: 'smoothstep' }));
        setEdges(loaded);
      }
      
      initialDataRef.current = true;
    }
  }, [formData?.steps, formData?.flowConfig, formData?.flow_config, setNodes, setEdges]);

  // Update selectedNode when nodes change
  useEffect(() => {
    if (selectedNode) {
      const updatedSelectedNode = nodes.find(node => node.id === selectedNode.id);
      if (updatedSelectedNode) {
        setSelectedNode(updatedSelectedNode as Node<StepFormNode['data']>);
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
        carouselImages: node.data.carouselImages,
        carouselAutoplay: node.data.carouselAutoplay,
        carouselShowDots: node.data.carouselShowDots,
        carouselInterval: node.data.carouselInterval,
        config: node.data.config,
        position: node.position // Salvar posição do nó
      }));
      
      // Incluir as conexões no salvamento
      const flowConfig = {
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };
      
      console.log('Salvando flowConfig:', flowConfig);
      
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
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      toast.success('Ligação removida');
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<StepFormNode['data']>);
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

  const duplicateNode = (nodeId: string) => {
    const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
    if (!nodeToDuplicate) return;

    const newId = `${nodeId}_copy_${Date.now()}`;
    
    // Serialize and deserialize to create a complete deep copy
    const duplicatedData = JSON.parse(JSON.stringify(nodeToDuplicate.data));
    
    const newNode = {
      id: newId,
      type: nodeToDuplicate.type,
      position: {
        x: nodeToDuplicate.position.x + 250,
        y: nodeToDuplicate.position.y + 150,
      },
      data: {
        ...duplicatedData,
        title: `${duplicatedData.title} (Cópia)`,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(newNode);
    toast.success('Nó duplicado com sucesso!');
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
    <div className="h-[80vh] w-full flex bg-background">
      {/* Área do Flow */}
      <div className="flex-1 relative bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          connectOnClick
          onInit={(instance) => {
            rfInstance.current = instance;
            try { instance.fitView({ padding: 0.2 }); } catch {}
          }}
          className="w-full h-full"
          style={{}}
        >
          <Controls />
          <MiniMap className="bg-card" />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1.5}
            color="rgba(156, 163, 175, 0.3)"
          />
          
          {/* SVG para gradiente futurista cinza */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <radialGradient id="futuristicGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="50%" stopColor="rgba(156, 163, 175, 0.3)" />
                <stop offset="100%" stopColor="rgba(229, 231, 235, 0.2)" />
              </radialGradient>
            </defs>
          </svg>
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
          {/* Timer removido conforme solicitação - não é mais possível adicionar */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => rfInstance.current?.fitView({ padding: 0.2 })}
          >
            Ajustar visão
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
        <div className="w-full sm:w-96 bg-background border-l border-border p-4 overflow-y-auto">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-card-foreground">
                  Editar {selectedNode.type?.charAt(0).toUpperCase() + selectedNode.type?.slice(1)}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => duplicateNode(selectedNode.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteNode(selectedNode.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Título</Label>
                <Input
                  value={String(selectedNode.data.title || '')}
                  onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div>
                <Label className="text-muted-foreground">Descrição</Label>
                <Textarea
                  value={String(selectedNode.data.description || '')}
                  onChange={(e) => updateNode(selectedNode.id, { description: e.target.value })}
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              {selectedNode.type === 'question' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Imagem/Vídeo</Label>
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
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Selecione o tipo de mídia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(selectedNode.data.mediaType === 'image' || selectedNode.data.mediaType === 'video') && (
                    <div className="space-y-3">
                      {selectedNode.data.mediaType === 'image' && (
                        <div>
                          <Label className="text-muted-foreground">URL da Imagem</Label>
                          <div className="flex gap-2">
                            <Input
                              value={String(selectedNode.data.imageUrl || '')}
                              onChange={(e) => updateNode(selectedNode.id, { imageUrl: e.target.value })}
                              placeholder="URL da imagem"
                              className="flex-1 bg-secondary border-border text-foreground"
                            />
                            <Button size="sm" variant="outline" onClick={() => openImageGallery('imageUrl')} className="whitespace-nowrap">
                              <ImageIcon className="w-4 h-4 mr-1" />
                              Galeria
                            </Button>
                          </div>
                          <div className="mt-2">
                            <Label className="text-muted-foreground">Altura da Imagem</Label>
                            <Input
                              value={String(selectedNode.data.imageHeight || '120px')}
                              onChange={(e) => updateNode(selectedNode.id, { imageHeight: e.target.value })}
                              placeholder="ex: 150px"
                              className="bg-secondary border-border text-foreground"
                            />
                          </div>
                        </div>
                      )}
                      {selectedNode.data.mediaType === 'video' && (
                        <div>
                          <Label className="text-muted-foreground">URL do Vídeo</Label>
                          <div className="flex gap-2">
                            <Input
                              value={String(selectedNode.data.videoUrl || '')}
                              onChange={(e) => updateNode(selectedNode.id, { videoUrl: e.target.value })}
                              placeholder="URL do vídeo"
                              className="flex-1 bg-secondary border-border text-foreground"
                            />
                            <Button size="sm" variant="outline" onClick={() => openImageGallery('videoUrl')} className="whitespace-nowrap">
                              <ImageIcon className="w-4 h-4 mr-1" />
                              Galeria
                            </Button>
                          </div>
                          <div className="mt-2">
                            <Label className="text-muted-foreground">Altura do Vídeo</Label>
                            <Input
                              value={String(selectedNode.data.videoHeight || '120px')}
                              onChange={(e) => updateNode(selectedNode.id, { videoHeight: e.target.value })}
                              placeholder="ex: 150px"
                              className="bg-secondary border-border text-foreground"
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <Label className="text-muted-foreground">Posição da mídia</Label>
                        <Select
                          value={String(selectedNode.data.imagePosition || 'top')}
                          onValueChange={(value) => updateNode(selectedNode.id, { imagePosition: value as 'top' | 'left' | 'right' | 'bottom' })}
                        >
                          <SelectTrigger className="bg-secondary border-border">
                            <SelectValue placeholder="Posição" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">Topo</SelectItem>
                            <SelectItem value="left">Esquerda</SelectItem>
                            <SelectItem value="right">Direita</SelectItem>
                            <SelectItem value="bottom">Base</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Cor global dos botões do formulário */}
                  <div>
                    <Label className="text-gray-300">Cor dos botões (global)</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        value={String(formData?.styles?.primary_color || '#4CAF50')}
                        onChange={(e) => onUpdate && onUpdate('styles', { ...(formData.styles || {}), primary_color: e.target.value })}
                        className="w-16 bg-gray-700 border-gray-600"
                      />
                      <Input
                        value={String(formData?.styles?.primary_color || '#4CAF50')}
                        onChange={(e) => onUpdate && onUpdate('styles', { ...(formData.styles || {}), primary_color: e.target.value })}
                        placeholder="#4CAF50"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Essa cor será aplicada a todos os botões no formulário.</p>
                  </div>

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
                    <Label className="text-muted-foreground">Largura do Nó</Label>
                    <Input
                      value={String(selectedNode.data.width || '300px')}
                      onChange={(e) => updateNode(selectedNode.id, { width: e.target.value })}
                      placeholder="ex: 400px"
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Altura do Nó</Label>
                    <Input
                      value={String(selectedNode.data.height || 'auto')}
                      onChange={(e) => updateNode(selectedNode.id, { height: e.target.value })}
                      placeholder="ex: 300px ou auto"
                      className="bg-secondary border-border text-foreground"
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
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Selecione o tipo de mídia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                        <SelectItem value="carousel">Carrossel</SelectItem>
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

                  {selectedNode.data.mediaType === 'carousel' && (
                    <>
                      <div>
                        <Label className="text-muted-foreground">Imagens do Carrossel</Label>
                        <div className="space-y-2">
                          {(selectedNode.data.carouselImages || []).map((url: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                value={url}
                                onChange={(e) => {
                                  const imgs = [...(selectedNode.data.carouselImages || [])];
                                  imgs[index] = e.target.value;
                                  updateNode(selectedNode.id, { carouselImages: imgs });
                                }}
                                placeholder="URL da imagem"
                                className="bg-secondary border-border text-foreground flex-1"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  const imgs = (selectedNode.data.carouselImages || []).filter((_: any, i: number) => i !== index);
                                  updateNode(selectedNode.id, { carouselImages: imgs });
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateNode(selectedNode.id, { carouselImages: [...(selectedNode.data.carouselImages || []), ''] })}
                            >
                              <Plus className="w-4 h-4 mr-1" /> Adicionar URL
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openImageGallery('imageUrl')}
                            >
                              <ImageIcon className="w-4 h-4 mr-1" /> Galeria
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-muted-foreground">Autoplay</Label>
                          <Select
                            value={String(selectedNode.data.carouselAutoplay ? 'true' : 'false')}
                            onValueChange={(val) => updateNode(selectedNode.id, { carouselAutoplay: val === 'true' })}
                          >
                            <SelectTrigger className="bg-secondary border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Ativado</SelectItem>
                              <SelectItem value="false">Desativado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Mostrar Dots</Label>
                          <Select
                            value={String(selectedNode.data.carouselShowDots !== false)}
                            onValueChange={(val) => updateNode(selectedNode.id, { carouselShowDots: val === 'true' })}
                          >
                            <SelectTrigger className="bg-secondary border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Sim</SelectItem>
                              <SelectItem value="false">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Intervalo (ms)</Label>
                          <Input
                            type="number"
                            value={Number(selectedNode.data.carouselInterval || 5000)}
                            onChange={(e) => updateNode(selectedNode.id, { carouselInterval: parseInt(e.target.value) || 5000 })}
                            className="bg-secondary border-border text-foreground"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Cor de Fundo</Label>
                    <Input
                      type="color"
                      value={String(selectedNode.data.backgroundColor || '#1a1a1a')}
                      onChange={(e) => updateNode(selectedNode.id, { backgroundColor: e.target.value })}
                      className="bg-secondary border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Cor do Texto</Label>
                    <Input
                      type="color"
                      value={String(selectedNode.data.textColor || '#ffffff')}
                      onChange={(e) => updateNode(selectedNode.id, { textColor: e.target.value })}
                      className="bg-secondary border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Cor da Borda</Label>
                    <Input
                      type="color"
                      value={String(selectedNode.data.borderColor || '#8b5cf6')}
                      onChange={(e) => updateNode(selectedNode.id, { borderColor: e.target.value })}
                      className="bg-secondary border-border"
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