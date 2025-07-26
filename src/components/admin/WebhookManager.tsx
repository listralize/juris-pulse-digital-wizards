import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Webhook, Save, TestTube, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface WebhookMapping {
  webhookField: string;
  systemField: string;
  required: boolean;
}

export const WebhookManager: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [mappings, setMappings] = useState<WebhookMapping[]>([
    { webhookField: 'name', systemField: 'name', required: true },
    { webhookField: 'email', systemField: 'email', required: true },
    { webhookField: 'phone', systemField: 'phone', required: false },
    { webhookField: 'message', systemField: 'message', required: false }
  ]);

  const systemFields = [
    { value: 'name', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefone' },
    { value: 'message', label: 'Mensagem' },
    { value: 'service', label: 'Serviço' },
    { value: 'urgent', label: 'Urgente' },
    { value: 'custom_field', label: 'Campo Personalizado' }
  ];

  const addMapping = () => {
    setMappings([...mappings, { webhookField: '', systemField: '', required: false }]);
  };

  const updateMapping = (index: number, field: keyof WebhookMapping, value: string | boolean) => {
    const updated = [...mappings];
    updated[index] = { ...updated[index], [field]: value };
    setMappings(updated);
  };

  const removeMapping = (index: number) => {
    setMappings(mappings.filter((_, i) => i !== index));
  };

  const generateWebhookUrl = () => {
    const baseUrl = window.location.origin;
    const generatedUrl = `${baseUrl}/api/webhook/leads`;
    setWebhookUrl(generatedUrl);
    navigator.clipboard.writeText(generatedUrl);
    toast.success('URL do webhook gerada e copiada!');
  };

  const testWebhook = async () => {
    if (!webhookUrl) {
      toast.error('Configure a URL do webhook primeiro');
      return;
    }

    const testData = mappings.reduce((acc, mapping) => {
      if (mapping.webhookField) {
        acc[mapping.webhookField] = `Teste ${mapping.systemField}`;
      }
      return acc;
    }, {} as any);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      if (response.ok) {
        toast.success('Webhook testado com sucesso!');
      } else {
        toast.error('Erro no teste do webhook');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o webhook');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Configuração de Webhook para Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>URL do Webhook</Label>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://seusite.com/api/webhook/leads"
              />
              <Button onClick={generateWebhookUrl} variant="outline">
                <Copy className="w-4 h-4 mr-1" />
                Gerar
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold">Mapeamento de Campos</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Configure como os dados do webhook serão mapeados para os campos do sistema
            </p>
            
            <div className="space-y-3">
              {mappings.map((mapping, index) => (
                <div key={index} className="flex gap-2 items-center p-3 border rounded-lg">
                  <div className="flex-1">
                    <Label className="text-xs">Campo do Webhook</Label>
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
                    {mapping.required && <Badge variant="secondary">Obrigatório</Badge>}
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
              + Adicionar Campo
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={testWebhook} variant="outline">
              <TestTube className="w-4 h-4 mr-1" />
              Testar Webhook
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-1" />
              Salvar Configuração
            </Button>
          </div>
        </CardContent>
      </Card>

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
                  service: "tributario"
                }, null, 2)}
                rows={8}
                className="font-mono text-xs"
              />
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h4 className="font-medium mb-2">💡 Como usar:</h4>
              <ul className="text-sm space-y-1">
                <li>• Configure o webhook em outros sites para enviar leads</li>
                <li>• Os dados serão automaticamente importados para este painel</li>
                <li>• Mapeie os campos corretamente para evitar perda de dados</li>
                <li>• Teste sempre após configurar para verificar o funcionamento</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};