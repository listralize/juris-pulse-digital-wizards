import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Webhook, TestTube, Copy, Plus, CheckCircle, XCircle, Save } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface WebhookMapping {
  webhookField: string;
  systemField: string;
  required: boolean;
}

interface LeadWebhookConfig {
  id?: string;
  name: string;
  mappings: WebhookMapping[];
  is_active: boolean;
  test_data?: any;
  last_received_data?: any;
  configured: boolean;
}

export const LeadWebhookManager: React.FC = () => {
  const [webhookConfig, setWebhookConfig] = useState<LeadWebhookConfig>({
    name: 'Sistema de Leads',
    mappings: [
      { webhookField: 'name', systemField: 'name', required: true },
      { webhookField: 'phone', systemField: 'phone', required: true }
    ],
    is_active: true,
    configured: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [testResults, setTestResults] = useState<boolean | null>(null);
  const [receivedData, setReceivedData] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);

  const systemFields = [
    { value: 'name', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefone' },
    { value: 'message', label: 'Mensagem' },
    { value: 'service', label: 'Serviço' },
    { value: 'company', label: 'Empresa' }
  ];

  const loadWebhookConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      const leadWebhookData = (data as any)?.lead_webhook_config ? 
        JSON.parse((data as any).lead_webhook_config) : webhookConfig;
      
      setWebhookConfig(leadWebhookData);
    } catch (error) {
      console.error('Erro ao carregar configuração de webhook de leads:', error);
    }
  };

  const saveWebhookConfig = async () => {
    try {
      const configToSave = { ...webhookConfig, configured: true };
      
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      const leadWebhookConfigJson = JSON.stringify(configToSave);

      if (data) {
        const { error: updateError } = await supabase
          .from('admin_settings')
          .update({ lead_webhook_config: leadWebhookConfigJson } as any)
          .eq('id', data.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('admin_settings')
          .insert({ lead_webhook_config: leadWebhookConfigJson } as any);
        
        if (insertError) throw insertError;
      }

      setWebhookConfig(configToSave);
      toast.success('Configuração de webhook salva!');
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast.error('Erro ao salvar configuração de webhook');
    }
  };

  const generateWebhookUrl = () => {
    const baseUrl = 'https://hmfsvccbyxhdwmrgcyff.supabase.co/functions/v1';
    const generatedUrl = `${baseUrl}/lead-webhook-receiver`;
    navigator.clipboard.writeText(generatedUrl);
    toast.success('URL do webhook copiada!');
    return generatedUrl;
  };

  const startListening = async () => {
    setIsListening(true);
    setReceivedData(null);
    toast.info('Aguardando dados do webhook... Envie dados para configurar automaticamente.');
    
    // Verificar se há dados recebidos recentemente
    const checkForRecentData = async () => {
      try {
        console.log('🔍 Verificando dados recebidos...');
        const { data, error } = await supabase
          .from('conversion_events')
          .select('*')
          .eq('event_type', 'webhook_received')
          .order('timestamp', { ascending: false })
          .limit(1)
          .maybeSingle();

        console.log('📥 Dados encontrados:', data);

        // Verificar se os dados são mais recentes que a última configuração
        const lastConfigTime = localStorage.getItem('webhook_last_config_time');
        const dataTime = new Date(data?.timestamp || data?.created_at || 0).getTime();
        const configTime = lastConfigTime ? parseInt(lastConfigTime) : 0;
        
        if (data && dataTime > configTime) {
          let leadData;
          try {
            leadData = typeof data.lead_data === 'string' ? 
              JSON.parse(data.lead_data) : data.lead_data;
          } catch (e) {
            leadData = data.lead_data;
          }
          
          console.log('🎯 Dados do lead:', leadData);
          
          setReceivedData(leadData);
          setIsListening(false);
          
          // Auto configurar baseado nos dados recebidos
          const newMappings = Object.keys(leadData).map(key => ({
            webhookField: key,
            systemField: systemFields.find(f => f.value === key)?.value || 
              (key.toLowerCase().includes('nome') || key.toLowerCase().includes('name') ? 'name' :
               key.toLowerCase().includes('tel') || key.toLowerCase().includes('phone') ? 'phone' :
               key.toLowerCase().includes('email') ? 'email' :
               key.toLowerCase().includes('msg') || key.toLowerCase().includes('message') ? 'message' : 'name'),
            required: key.toLowerCase().includes('nome') || key.toLowerCase().includes('name') || 
                     key.toLowerCase().includes('tel') || key.toLowerCase().includes('phone')
          }));
          
          setWebhookConfig(prev => ({
            ...prev,
            mappings: newMappings,
            last_received_data: leadData
          }));
          
          // Marcar o tempo desta configuração
          localStorage.setItem('webhook_last_config_time', Date.now().toString());
          
          toast.success('Dados recebidos! Configure os mapeamentos e salve.');
          setIsEditing(true);
          return true;
        }
      } catch (error) {
        console.error('❌ Erro ao verificar dados recebidos:', error);
      }
      return false;
    };

    // Verificar imediatamente
    const foundData = await checkForRecentData();
    
    if (!foundData) {
      // Configurar polling para verificar novos dados
      const interval = setInterval(async () => {
        const found = await checkForRecentData();
        if (found) {
          clearInterval(interval);
        }
      }, 5000); // Verificar a cada 5 segundos

      // Parar após 3 minutos
      setTimeout(() => {
        clearInterval(interval);
        if (isListening) {
          setIsListening(false);
          toast.info('Tempo limite atingido. Tente novamente quando enviar dados.');
        }
      }, 180000);
    }
  };

  const testWebhook = async () => {
    const testData = webhookConfig.mappings.reduce((acc, mapping) => {
      if (mapping.webhookField) {
        acc[mapping.webhookField] = `Teste ${mapping.systemField}`;
      }
      return acc;
    }, {} as any);

    try {
      const response = await supabase.functions.invoke('lead-webhook-receiver', {
        body: testData
      });

      if (response.error) {
        setTestResults(false);
        toast.error('Erro no teste do webhook');
        return;
      }

      setTestResults(true);
      toast.success('Webhook testado com sucesso!');
    } catch (error) {
      setTestResults(false);
      toast.error('Erro ao testar webhook');
    }
  };

  const addMapping = () => {
    setWebhookConfig(prev => ({
      ...prev,
      mappings: [
        ...prev.mappings,
        { webhookField: '', systemField: 'name', required: false }
      ]
    }));
  };

  const updateMapping = (index: number, field: keyof WebhookMapping, value: string | boolean) => {
    const updated = [...webhookConfig.mappings];
    updated[index] = { ...updated[index], [field]: value };
    setWebhookConfig(prev => ({ ...prev, mappings: updated }));
  };

  const removeMapping = (index: number) => {
    setWebhookConfig(prev => ({
      ...prev,
      mappings: prev.mappings.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    loadWebhookConfig();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Webhook para Leads</h2>
          <p className="text-muted-foreground">Configure para receber leads automaticamente via webhook</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Configuração de Webhook de Leads
            {webhookConfig.configured && (
              <Badge variant="default" className="ml-2">Configurado</Badge>
            )}
            {testResults === true && (
              <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
            )}
            {testResults === false && (
              <XCircle className="w-4 h-4 text-red-500 ml-2" />
            )}
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={testWebhook}>
                  <TestTube className="w-4 h-4 mr-1" />
                  Testar
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={saveWebhookConfig}>
                  <Save className="w-4 h-4 mr-1" />
                  Salvar
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URL do Webhook */}
          <div>
            <Label className="text-base font-semibold">URL do Sistema de Webhook</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Use esta URL para enviar dados de leads para o sistema
            </p>
            <div className="flex gap-2">
              <Input
                value="https://hmfsvccbyxhdwmrgcyff.supabase.co/functions/v1/lead-webhook-receiver"
                readOnly
                className="font-mono text-sm"
              />
              <Button onClick={generateWebhookUrl} variant="outline">
                <Copy className="w-4 h-4 mr-1" />
                Copiar
              </Button>
            </div>
          </div>

          {/* Configuração Inicial */}
          {!webhookConfig.configured && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h4 className="font-semibold mb-2">🚀 Primeira Configuração</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Para configurar automaticamente, envie dados para o webhook ou clique em "Aguardar Dados"
              </p>
              <Button 
                onClick={startListening} 
                disabled={isListening}
                className="w-full"
              >
                {isListening ? 'Aguardando dados...' : 'Aguardar Dados do Webhook'}
              </Button>
            </div>
          )}

          {/* Dados Recebidos */}
          {receivedData && (
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <h4 className="font-semibold mb-2">✅ Dados Recebidos</h4>
              <pre className="text-xs bg-white dark:bg-gray-800 p-2 rounded overflow-auto">
                {JSON.stringify(receivedData, null, 2)}
              </pre>
            </div>
          )}

          {/* Mapeamento de Campos */}
          {isEditing && (
            <div>
              <Label className="text-base font-semibold">Mapeamento de Campos</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Configure como os dados recebidos serão mapeados
              </p>
              
              <div className="space-y-3">
                {webhookConfig.mappings.map((mapping, index) => (
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
                      <select 
                        value={mapping.systemField} 
                        onChange={(e) => updateMapping(index, 'systemField', e.target.value)}
                        className="w-full h-8 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        {systemFields.map(field => (
                          <option key={field.value} value={field.value}>
                            {field.label}
                          </option>
                        ))}
                      </select>
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
                        ×
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
          )}

          {/* Resumo da Configuração */}
          {!isEditing && webhookConfig.configured && (
            <div>
              <Label className="text-base font-semibold">Configuração Atual</Label>
              <div className="space-y-2 mt-2">
                {webhookConfig.mappings.map((mapping, index) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm">
                    <strong>{mapping.webhookField}</strong> → {systemFields.find(f => f.value === mapping.systemField)?.label}
                    {mapping.required && <Badge variant="secondary" className="ml-2 text-xs">Obrigatório</Badge>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentação */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <Label className="text-base font-semibold mb-2 block">📚 Como usar:</Label>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Envie dados POST para a URL do webhook</li>
              <li>• Dados com nome e telefone criarão automaticamente novos contatos</li>
              <li>• Leads duplicados (mesmo email) serão identificados</li>
              <li>• Use a função de teste para validar a configuração</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};