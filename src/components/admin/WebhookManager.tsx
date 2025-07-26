import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Webhook, Save, TestTube, Copy, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface WebhookMapping {
  webhookField: string;
  systemField: string;
  required: boolean;
}

interface WebhookConfig {
  id?: string;
  name: string;
  endpoint_url: string;
  mappings: WebhookMapping[];
  is_active: boolean;
  test_data?: any;
}

export const WebhookManager: React.FC = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});

  const systemFields = [
    { value: 'name', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefone' },
    { value: 'message', label: 'Mensagem' },
    { value: 'service', label: 'Serviço' },
    { value: 'urgent', label: 'Urgente' },
    { value: 'company', label: 'Empresa' },
    { value: 'custom_field_1', label: 'Campo Personalizado 1' },
    { value: 'custom_field_2', label: 'Campo Personalizado 2' },
    { value: 'custom_field_3', label: 'Campo Personalizado 3' }
  ];

  const loadWebhooks = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      const webhookData = data?.webhook_configs ? JSON.parse(data.webhook_configs) : [];
      setWebhooks(Array.isArray(webhookData) ? webhookData : []);
    } catch (error) {
      console.error('Erro ao carregar webhooks:', error);
      toast.error('Erro ao carregar configurações de webhook');
    }
  };

  useEffect(() => {
    loadWebhooks();
  }, []);

  const createNewWebhook = () => {
    const newWebhook: WebhookConfig = {
      name: 'Novo Webhook',
      endpoint_url: '',
      mappings: [
        { webhookField: 'name', systemField: 'name', required: true },
        { webhookField: 'email', systemField: 'email', required: true },
        { webhookField: 'phone', systemField: 'phone', required: false },
        { webhookField: 'message', systemField: 'message', required: false }
      ],
      is_active: true
    };
    setSelectedWebhook(newWebhook);
    setIsEditing(true);
  };

  const saveWebhook = async () => {
    if (!selectedWebhook) return;

    try {
      // Atualizar array de webhooks
      let updatedWebhooks = [...webhooks];
      
      if (selectedWebhook.id) {
        // Atualizar webhook existente
        const index = updatedWebhooks.findIndex(w => w.id === selectedWebhook.id);
        if (index !== -1) {
          updatedWebhooks[index] = selectedWebhook;
        }
      } else {
        // Novo webhook
        const newWebhook = { ...selectedWebhook, id: crypto.randomUUID() };
        updatedWebhooks.push(newWebhook);
        setSelectedWebhook(newWebhook);
      }

      // Salvar no admin_settings
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      const webhookConfigsJson = JSON.stringify(updatedWebhooks);

      if (data) {
        const { error: updateError } = await supabase
          .from('admin_settings')
          .update({ webhook_configs: webhookConfigsJson })
          .eq('id', data.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('admin_settings')
          .insert({ webhook_configs: webhookConfigsJson });
        
        if (insertError) throw insertError;
      }

      toast.success('Webhook salvo com sucesso!');
      setIsEditing(false);
      loadWebhooks();
    } catch (error) {
      console.error('Erro ao salvar webhook:', error);
      toast.error('Erro ao salvar configuração de webhook');
    }
  };

  const deleteWebhook = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este webhook?')) return;

    try {
      const updatedWebhooks = webhooks.filter(w => w.id !== id);
      
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const { error: updateError } = await supabase
          .from('admin_settings')
          .update({ webhook_configs: JSON.stringify(updatedWebhooks) })
          .eq('id', data.id);
        
        if (updateError) throw updateError;
      }

      toast.success('Webhook deletado com sucesso!');
      loadWebhooks();
      if (selectedWebhook?.id === id) {
        setSelectedWebhook(null);
      }
    } catch (error) {
      console.error('Erro ao deletar webhook:', error);
      toast.error('Erro ao deletar webhook');
    }
  };

  const generateWebhookUrl = () => {
    const baseUrl = 'https://hmfsvccbyxhdwmrgcyff.supabase.co/functions/v1';
    const generatedUrl = `${baseUrl}/webhook-leads`;
    navigator.clipboard.writeText(generatedUrl);
    toast.success('URL do webhook copiada!');
    return generatedUrl;
  };

  const testWebhook = async (webhook: WebhookConfig) => {
    if (!webhook.endpoint_url) {
      toast.error('Configure a URL do webhook primeiro');
      return;
    }

    const testData = webhook.mappings.reduce((acc, mapping) => {
      if (mapping.webhookField) {
        acc[mapping.webhookField] = `Teste ${mapping.systemField}`;
      }
      return acc;
    }, {} as any);

    try {
      const response = await supabase.functions.invoke('webhook-leads', {
        body: testData
      });

      if (response.error) {
        setTestResults(prev => ({ ...prev, [webhook.id || '']: false }));
        toast.error('Erro no teste do webhook');
        return;
      }

      setTestResults(prev => ({ ...prev, [webhook.id || '']: true }));
      toast.success('Webhook testado com sucesso!');
    } catch (error) {
      setTestResults(prev => ({ ...prev, [webhook.id || '']: false }));
      toast.error('Erro ao conectar com o webhook');
    }
  };

  const addMapping = () => {
    if (!selectedWebhook) return;
    setSelectedWebhook({
      ...selectedWebhook,
      mappings: [
        ...selectedWebhook.mappings,
        { webhookField: '', systemField: '', required: false }
      ]
    });
  };

  const updateMapping = (index: number, field: keyof WebhookMapping, value: string | boolean) => {
    if (!selectedWebhook) return;
    const updated = [...selectedWebhook.mappings];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedWebhook({ ...selectedWebhook, mappings: updated });
  };

  const removeMapping = (index: number) => {
    if (!selectedWebhook) return;
    setSelectedWebhook({
      ...selectedWebhook,
      mappings: selectedWebhook.mappings.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Webhooks</h2>
          <p className="text-muted-foreground">Configure até 10 webhooks para receber leads automaticamente</p>
        </div>
        <Button onClick={createNewWebhook}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Webhook
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Webhooks */}
        <div className="space-y-3">
          <h3 className="font-semibold">Webhooks ({webhooks.length}/10)</h3>
          <div className="space-y-2">
            {webhooks.map((webhook) => (
              <Card 
                key={webhook.id} 
                className={`cursor-pointer transition-all ${selectedWebhook?.id === webhook.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => setSelectedWebhook(webhook)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{webhook.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{webhook.endpoint_url}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {webhook.is_active ? (
                        <Badge variant="default" className="text-xs">Ativo</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Inativo</Badge>
                      )}
                      {testResults[webhook.id || ''] === true && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {testResults[webhook.id || ''] === false && (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Editor de Webhook */}
        <div className="lg:col-span-2">
          {selectedWebhook ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {isEditing ? 'Editando Webhook' : selectedWebhook.name}
                </CardTitle>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => testWebhook(selectedWebhook)}
                      >
                        <TestTube className="w-4 h-4 mr-1" />
                        Testar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => selectedWebhook.id && deleteWebhook(selectedWebhook.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={saveWebhook}>
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome do Webhook</Label>
                        <Input
                          id="name"
                          value={selectedWebhook.name}
                          onChange={(e) => setSelectedWebhook({
                            ...selectedWebhook,
                            name: e.target.value
                          })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedWebhook.is_active}
                          onChange={(e) => setSelectedWebhook({
                            ...selectedWebhook,
                            is_active: e.target.checked
                          })}
                        />
                        <Label>Webhook Ativo</Label>
                      </div>
                    </div>

                    <div>
                      <Label>URL de Destino</Label>
                      <div className="flex gap-2">
                        <Input
                          value={selectedWebhook.endpoint_url}
                          onChange={(e) => setSelectedWebhook({
                            ...selectedWebhook,
                            endpoint_url: e.target.value
                          })}
                          placeholder="https://seusite.com/webhook"
                        />
                        <Button onClick={generateWebhookUrl} variant="outline">
                          <Copy className="w-4 h-4 mr-1" />
                          URL Sistema
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Mapeamento de Campos</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Configure como os dados recebidos serão mapeados
                      </p>
                      
                      <div className="space-y-3">
                        {selectedWebhook.mappings.map((mapping, index) => (
                          <div key={index} className="flex gap-2 items-center p-3 border rounded-lg">
                            <div className="flex-1">
                              <Label className="text-xs">Campo Recebido</Label>
                              <Input
                                value={mapping.webhookField}
                                onChange={(e) => updateMapping(index, 'webhookField', e.target.value)}
                                placeholder="nome_campo"
                                className="h-8"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <Label className="text-xs">Campo do Sistema</Label>
                              <Select 
                                value={mapping.systemField} 
                                onValueChange={(value) => updateMapping(index, 'systemField', value)}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Selecionar" />
                                </SelectTrigger>
                                <SelectContent>
                                  {systemFields.map(field => (
                                    <SelectItem key={field.value} value={field.value}>
                                      {field.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={mapping.required}
                                onChange={(e) => updateMapping(index, 'required', e.target.checked)}
                              />
                              <Label className="text-xs">Obrigatório</Label>
                              <Button 
                                onClick={() => removeMapping(index)} 
                                variant="destructive" 
                                size="sm"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button onClick={addMapping} variant="outline" className="mt-3">
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar Campo
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>URL de Destino</Label>
                      <div className="p-2 bg-muted rounded">{selectedWebhook.endpoint_url}</div>
                    </div>
                    <div>
                      <Label>Mapeamentos ({selectedWebhook.mappings.length})</Label>
                      <div className="space-y-2">
                        {selectedWebhook.mappings.map((mapping, index) => (
                          <div key={index} className="p-2 bg-muted rounded text-sm">
                            <strong>{mapping.webhookField}</strong> → {systemFields.find(f => f.value === mapping.systemField)?.label}
                            {mapping.required && <Badge variant="secondary" className="ml-2 text-xs">Obrigatório</Badge>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Webhook className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Selecione um webhook para visualizar ou criar um novo</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Documentação */}
      <Card>
        <CardHeader>
          <CardTitle>Documentação do Webhook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Exemplo de Payload JSON:</h4>
              <Textarea
                readOnly
                value={JSON.stringify({
                  name: "João Silva",
                  email: "joao@email.com",
                  phone: "(11) 99999-9999", 
                  message: "Preciso de ajuda com questões tributárias",
                  service: "tributario",
                  company: "Empresa XYZ",
                  utm_source: "google",
                  utm_campaign: "campanha-tributario"
                }, null, 2)}
                rows={10}
                className="font-mono text-xs"
              />
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h4 className="font-medium mb-2">💡 Como usar:</h4>
              <ul className="text-sm space-y-1">
                <li>• Cada webhook pode ter até 10 mapeamentos de campos</li>
                <li>• Webhooks são processados automaticamente quando recebidos</li>
                <li>• Leads duplicados são identificados por email</li>
                <li>• Use a função de teste para validar a configuração</li>
                <li>• Webhooks inativos não processam dados recebidos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};