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
interface StepFormNode {
  id: string;
  type: 'question' | 'form' | 'content' | 'offer' | 'timer' | 'socialProof';
  position: { x: number; y: number };
  data: {
    title: string;
    description?: string;
    options?: Array<{
      text: string;
      value: string;
      nextStep?: string;
    }>;
    formFields?: Array<{
      name: string;
      type: string;
      placeholder: string;
      required: boolean;
    }>;
    config?: any;
  };
}

// Componente de nó para perguntas
const QuestionNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 min-w-[200px] max-w-[300px]">
      <div className="bg-blue-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        <span className="font-semibold text-sm">Pergunta</span>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Pergunta'}</h4>
        {data.description && (
          <p className="text-xs text-gray-600 mb-2">{data.description}</p>
        )}
        {data.options && data.options.length > 0 && (
          <div className="space-y-1">
            {data.options.slice(0, 3).map((option: any, index: number) => (
              <div key={index} className="text-xs bg-gray-100 p-1 rounded">
                {option.text}
              </div>
            ))}
            {data.options.length > 3 && (
              <div className="text-xs text-gray-500">+{data.options.length - 3} mais...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para formulários
const FormNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-green-500 min-w-[200px] max-w-[300px]">
      <div className="bg-green-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <FormInput className="w-4 h-4" />
        <span className="font-semibold text-sm">Formulário</span>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Formulário'}</h4>
        {data.formFields && data.formFields.length > 0 && (
          <div className="space-y-1">
            {data.formFields.slice(0, 3).map((field: any, index: number) => (
              <div key={index} className="text-xs bg-gray-100 p-1 rounded">
                {field.name} ({field.type})
              </div>
            ))}
            {data.formFields.length > 3 && (
              <div className="text-xs text-gray-500">+{data.formFields.length - 3} campos...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para conteúdo
const ContentNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-purple-500 min-w-[200px] max-w-[300px]">
      <div className="bg-purple-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        <span className="font-semibold text-sm">Conteúdo</span>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Conteúdo'}</h4>
        {data.description && (
          <p className="text-xs text-gray-600 mb-2">{data.description}</p>
        )}
        {data.mediaUrl && (
          <div className="text-xs bg-gray-100 p-1 rounded">
            Mídia: {data.mediaType || 'image'}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para ofertas
const OfferNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-orange-500 min-w-[200px] max-w-[300px]">
      <div className="bg-orange-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <Gift className="w-4 h-4" />
        <span className="font-semibold text-sm">Oferta</span>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Oferta'}</h4>
        {data.offerConfig && (
          <div className="space-y-1">
            <div className="text-xs bg-gray-100 p-1 rounded">
              {data.offerConfig.originalPrice} → {data.offerConfig.salePrice}
            </div>
            <div className="text-xs text-orange-600 font-medium">
              {data.offerConfig.discount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para timer
const TimerNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-red-500 min-w-[200px] max-w-[300px]">
      <div className="bg-red-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <Timer className="w-4 h-4" />
        <span className="font-semibold text-sm">Timer</span>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-2">{data.title || 'Novo Timer'}</h4>
        {data.timerConfig && (
          <div className="text-xs bg-gray-100 p-1 rounded">
            Duração: {data.timerConfig.duration} min
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nó para prova social
const SocialProofNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-500 min-w-[200px] max-w-[300px]">
      <div className="bg-indigo-500 text-white p-2 rounded-t-lg flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        <span className="font-semibold text-sm">Prova Social</span>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-2">{data.title || 'Nova Prova Social'}</h4>
        {data.socialProofConfig && (
          <div className="space-y-1">
            {data.socialProofConfig.testimonials && (
              <div className="text-xs bg-gray-100 p-1 rounded">
                {data.socialProofConfig.testimonials.length} depoimentos
              </div>
            )}
            {data.socialProofConfig.stats && (
              <div className="text-xs bg-gray-100 p-1 rounded">
                {data.socialProofConfig.stats.length} estatísticas
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
    <div className="h-[80vh] w-full flex">
      {/* Área do Flow */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>

        {/* Toolbar flutuante */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 flex gap-2 z-10">
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
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 flex gap-2 z-10">
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
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        {selectedNode ? (
          <NodeEditor
            node={selectedNode}
            onUpdate={(updates) => updateNodeData(selectedNode.id, updates)}
          />
        ) : (
          <div className="text-center text-gray-500 mt-8">
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
    const options = [...(node.data.options || [])];
    options[index] = { ...options[index], [field]: value };
    onUpdate({ options });
  };

  const addOption = () => {
    const options = [...(node.data.options || [])];
    options.push({ text: 'Nova opção', value: `opt_${Date.now()}` });
    onUpdate({ options });
  };

  const removeOption = (index: number) => {
    const options = [...(node.data.options || [])];
    options.splice(index, 1);
    onUpdate({ options });
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
            value={node.data.title || ''}
            onChange={(e) => handleUpdate('title', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={node.data.description || ''}
            onChange={(e) => handleUpdate('description', e.target.value)}
            rows={3}
          />
        </div>

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
              {(node.data.options || []).map((option: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Texto da opção"
                    value={option.text}
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

        {/* Configurações específicas por tipo de nó */}
        {node.type === 'offer' && (
          <div className="space-y-3">
            <h4 className="font-medium">Configuração da Oferta</h4>
            <div>
              <Label>Preço Original</Label>
              <Input
                placeholder="R$ 197,00"
                value={node.data.offerConfig?.originalPrice || ''}
                onChange={(e) => handleUpdate('offerConfig', {
                  ...node.data.offerConfig,
                  originalPrice: e.target.value
                })}
              />
            </div>
            <div>
              <Label>Preço Promocional</Label>
              <Input
                placeholder="R$ 97,00"
                value={node.data.offerConfig?.salePrice || ''}
                onChange={(e) => handleUpdate('offerConfig', {
                  ...node.data.offerConfig,
                  salePrice: e.target.value
                })}
              />
            </div>
            <div>
              <Label>Desconto</Label>
              <Input
                placeholder="50% OFF"
                value={node.data.offerConfig?.discount || ''}
                onChange={(e) => handleUpdate('offerConfig', {
                  ...node.data.offerConfig,
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
                value={node.data.timerConfig?.duration || ''}
                onChange={(e) => handleUpdate('timerConfig', {
                  ...node.data.timerConfig,
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