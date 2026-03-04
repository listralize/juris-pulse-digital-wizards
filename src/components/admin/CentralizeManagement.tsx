import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import {
  Save, RefreshCw, Info, AlertTriangle, CheckCircle, Zap, MessageSquare,
  Users, Settings, Tag, Send, Globe, Phone, Mail, Hash, ArrowRight,
  Bot, Workflow, Bell, Shield, Database
} from 'lucide-react';
import { logger } from '@/utils/logger';

interface CentralizeConfig {
  // Conexão
  enabled: boolean;
  api_key: string;
  // Smart Flows por urgência
  flow_id_default: string;
  flow_id_urgente: string;
  flow_id_semanas: string;
  flow_id_pesquisando: string;
  // Comportamento
  create_contact_on_lead: boolean;
  trigger_flow_on_lead: boolean;
  apply_tags_on_lead: boolean;
  tag_prefix_service: string;
  tag_prefix_urgency: string;
  tag_prefix_form: string;
  // Campos do contato
  sync_email: boolean;
  sync_phone: boolean;
  sync_name: boolean;
  sync_custom_fields: boolean;
  // Canal padrão
  default_channel: 'whatsapp' | 'sms' | 'email' | '';
  // Webhook de retorno (opcional)
  webhook_callback_url: string;
  // Notificações
  notify_on_reply: boolean;
  notify_email: string;
}

const DEFAULT_CONFIG: CentralizeConfig = {
  enabled: false,
  api_key: '',
  flow_id_default: '',
  flow_id_urgente: '',
  flow_id_semanas: '',
  flow_id_pesquisando: '',
  create_contact_on_lead: true,
  trigger_flow_on_lead: true,
  apply_tags_on_lead: true,
  tag_prefix_service: 'servico',
  tag_prefix_urgency: 'urgencia',
  tag_prefix_form: 'form',
  sync_email: true,
  sync_phone: true,
  sync_name: true,
  sync_custom_fields: true,
  default_channel: 'whatsapp',
  webhook_callback_url: '',
  notify_on_reply: false,
  notify_email: '',
};

export const CentralizeManagement: React.FC = () => {
  const [config, setConfig] = useState<CentralizeConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettingsId(data.id);
        const raw = data as any;
        setConfig({
          enabled: raw.centralize_enabled ?? raw.reply_agent_enabled ?? false,
          api_key: raw.centralize_api_key ?? '',
          flow_id_default: raw.centralize_flow_id_default ?? raw.reply_agent_flow_id ?? '',
          flow_id_urgente: raw.centralize_flow_id_urgente ?? raw.reply_agent_flow_id_urgente ?? '',
          flow_id_semanas: raw.centralize_flow_id_semanas ?? raw.reply_agent_flow_id_semanas ?? '',
          flow_id_pesquisando: raw.centralize_flow_id_pesquisando ?? raw.reply_agent_flow_id_pesquisando ?? '',
          create_contact_on_lead: raw.centralize_create_contact ?? true,
          trigger_flow_on_lead: raw.centralize_trigger_flow ?? true,
          apply_tags_on_lead: raw.centralize_apply_tags ?? true,
          tag_prefix_service: raw.centralize_tag_prefix_service ?? 'servico',
          tag_prefix_urgency: raw.centralize_tag_prefix_urgency ?? 'urgencia',
          tag_prefix_form: raw.centralize_tag_prefix_form ?? 'form',
          sync_email: raw.centralize_sync_email ?? true,
          sync_phone: raw.centralize_sync_phone ?? true,
          sync_name: raw.centralize_sync_name ?? true,
          sync_custom_fields: raw.centralize_sync_custom_fields ?? true,
          default_channel: raw.centralize_default_channel ?? 'whatsapp',
          webhook_callback_url: raw.centralize_webhook_callback_url ?? '',
          notify_on_reply: raw.centralize_notify_on_reply ?? false,
          notify_email: raw.centralize_notify_email ?? '',
        });
      }
    } catch (err) {
      logger.error('Erro ao carregar configuração Centralize:', err);
      toast.error('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async () => {
    setIsSaving(true);
    try {
      const payload = {
        centralize_enabled: config.enabled,
        centralize_api_key: config.api_key || null,
        centralize_flow_id_default: config.flow_id_default || null,
        centralize_flow_id_urgente: config.flow_id_urgente || null,
        centralize_flow_id_semanas: config.flow_id_semanas || null,
        centralize_flow_id_pesquisando: config.flow_id_pesquisando || null,
        centralize_create_contact: config.create_contact_on_lead,
        centralize_trigger_flow: config.trigger_flow_on_lead,
        centralize_apply_tags: config.apply_tags_on_lead,
        centralize_tag_prefix_service: config.tag_prefix_service || 'servico',
        centralize_tag_prefix_urgency: config.tag_prefix_urgency || 'urgencia',
        centralize_tag_prefix_form: config.tag_prefix_form || 'form',
        centralize_sync_email: config.sync_email,
        centralize_sync_phone: config.sync_phone,
        centralize_sync_name: config.sync_name,
        centralize_sync_custom_fields: config.sync_custom_fields,
        centralize_default_channel: config.default_channel || null,
        centralize_webhook_callback_url: config.webhook_callback_url || null,
        centralize_notify_on_reply: config.notify_on_reply,
        centralize_notify_email: config.notify_email || null,
        // Manter compatibilidade retroativa com reply_agent_*
        reply_agent_enabled: config.enabled,
        reply_agent_flow_id: config.flow_id_default || null,
        reply_agent_flow_id_urgente: config.flow_id_urgente || null,
        reply_agent_flow_id_semanas: config.flow_id_semanas || null,
        reply_agent_flow_id_pesquisando: config.flow_id_pesquisando || null,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (settingsId) {
        ({ error } = await supabase
          .from('marketing_settings')
          .update(payload)
          .eq('id', settingsId));
      } else {
        const { data: newRow, error: insertError } = await supabase
          .from('marketing_settings')
          .insert(payload)
          .select('id')
          .single();
        error = insertError;
        if (newRow) setSettingsId(newRow.id);
      }

      if (error) throw error;
      toast.success('Configurações do Centralize salvas com sucesso!');
    } catch (err) {
      logger.error('Erro ao salvar configuração Centralize:', err);
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async () => {
    if (!config.api_key) {
      toast.error('Configure a API Key antes de testar');
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('reply-agent-sync', {
        body: {
          name: 'Teste Centralize',
          email: 'teste@centralize.com',
          phone: '5511999999999',
          service: 'teste',
          urgency: 'default',
          form_slug: 'teste-conexao',
          form_name: 'Teste de Conexão',
          lead_id: 'test-' + Date.now(),
          skip_flow: true, // não dispara flow no teste
          _test_api_key: config.api_key,
        },
      });
      if (error) throw error;
      setTestResult({ success: true, message: `Conexão OK! Contato criado com ID: ${data?.contact_id}` });
      toast.success('Conexão com Centralize funcionando!');
    } catch (err: any) {
      const msg = err?.message || String(err);
      setTestResult({ success: false, message: msg });
      toast.error('Falha na conexão: ' + msg);
    } finally {
      setIsTesting(false);
    }
  };

  const set = (key: keyof CentralizeConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mr-2" />
        <span className="text-gray-500">Carregando configurações...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Centralize — CRM & Chatbot
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sincronize leads com o CRM e dispare automações de WhatsApp automaticamente
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={config.enabled ? 'default' : 'secondary'} className={config.enabled ? 'bg-green-600' : ''}>
            {config.enabled ? 'Ativo' : 'Inativo'}
          </Badge>
          <Button onClick={saveConfig} disabled={isSaving} size="sm">
            {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Salvar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="connection" className="flex items-center gap-1.5 text-xs py-2">
            <Shield className="w-3.5 h-3.5" />
            Conexão
          </TabsTrigger>
          <TabsTrigger value="flows" className="flex items-center gap-1.5 text-xs py-2">
            <Workflow className="w-3.5 h-3.5" />
            Smart Flows
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center gap-1.5 text-xs py-2">
            <Database className="w-3.5 h-3.5" />
            Sincronização
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1.5 text-xs py-2">
            <Bell className="w-3.5 h-3.5" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* ─── ABA: CONEXÃO ─────────────────────────────────────────────── */}
        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-4 h-4 text-blue-500" />
                Configuração da API
              </CardTitle>
              <CardDescription>
                Configure sua conexão com o Centralize (Reply Agent). A API Key é armazenada de forma segura como Secret no Supabase.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                <Switch
                  id="centralize-enabled"
                  checked={config.enabled}
                  onCheckedChange={val => set('enabled', val)}
                />
                <div>
                  <Label htmlFor="centralize-enabled" className="cursor-pointer font-medium">
                    {config.enabled ? 'Integração ativa' : 'Integração desativada'}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {config.enabled
                      ? 'Todos os leads serão sincronizados automaticamente'
                      : 'Ative para sincronizar leads com o Centralize'}
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  A API Key deve ser configurada como Secret no Supabase com o nome <code className="bg-gray-100 px-1 rounded">REPLY_AGENT_API_KEY</code>.
                  O campo abaixo é apenas para referência — o valor real é lido do ambiente seguro.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="api-key">API Key (referência)</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="ra_live_xxxxxxxxxxxxxxxx"
                  value={config.api_key}
                  onChange={e => set('api_key', e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Configure esta mesma chave em: Supabase → Edge Functions → Secrets → REPLY_AGENT_API_KEY
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={testConnection}
                  disabled={isTesting || !config.api_key}
                >
                  {isTesting ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  Testar Conexão
                </Button>
                {testResult && (
                  <div className={`flex items-center gap-2 text-sm ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                    {testResult.success
                      ? <CheckCircle className="w-4 h-4" />
                      : <AlertTriangle className="w-4 h-4" />}
                    {testResult.message}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="default-channel">Canal Padrão de Atendimento</Label>
                <Select
                  value={config.default_channel}
                  onValueChange={val => set('default_channel', val)}
                >
                  <SelectTrigger id="default-channel">
                    <SelectValue placeholder="Selecione o canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        WhatsApp
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        SMS
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-500" />
                        Email
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="webhook-callback">Webhook de Retorno (opcional)</Label>
                <Input
                  id="webhook-callback"
                  type="url"
                  placeholder="https://seu-webhook.com/centralize-callback"
                  value={config.webhook_callback_url}
                  onChange={e => set('webhook_callback_url', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL que receberá notificações quando o Centralize responder a um lead
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── ABA: SMART FLOWS ─────────────────────────────────────────── */}
        <TabsContent value="flows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Workflow className="w-4 h-4 text-purple-500" />
                Smart Flows por Urgência
              </CardTitle>
              <CardDescription>
                Configure automações diferentes para cada perfil de lead. O sistema detecta automaticamente a urgência e dispara o flow correspondente.
                Encontre os IDs em: Centralize → Automações → Smart Flows → ID do Flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                <Switch
                  id="trigger-flow"
                  checked={config.trigger_flow_on_lead}
                  onCheckedChange={val => set('trigger_flow_on_lead', val)}
                />
                <div>
                  <Label htmlFor="trigger-flow" className="cursor-pointer font-medium">
                    Disparar Smart Flow automaticamente
                  </Label>
                  <p className="text-xs text-gray-500">
                    Quando desativado, o contato é criado mas nenhum flow é disparado
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="flow-default" className="flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    Flow Padrão
                    <Badge variant="outline" className="text-xs">Todos os leads sem urgência definida</Badge>
                  </Label>
                  <Input
                    id="flow-default"
                    placeholder="ID do Smart Flow (ex: 123456)"
                    value={config.flow_id_default}
                    onChange={e => set('flow_id_default', e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="flow-urgente" className="flex items-center gap-1.5 text-sm">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" />
                      Flow — Urgente
                    </Label>
                    <Input
                      id="flow-urgente"
                      placeholder="ID do flow"
                      value={config.flow_id_urgente}
                      onChange={e => set('flow_id_urgente', e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-400">Lead precisa resolver agora</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="flow-semanas" className="flex items-center gap-1.5 text-sm">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      Flow — Em semanas
                    </Label>
                    <Input
                      id="flow-semanas"
                      placeholder="ID do flow"
                      value={config.flow_id_semanas}
                      onChange={e => set('flow_id_semanas', e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-400">Lead planeja resolver em breve</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="flow-pesquisando" className="flex items-center gap-1.5 text-sm">
                      <Hash className="w-3.5 h-3.5 text-gray-400" />
                      Flow — Pesquisando
                    </Label>
                    <Input
                      id="flow-pesquisando"
                      placeholder="ID do flow"
                      value={config.flow_id_pesquisando}
                      onChange={e => set('flow_id_pesquisando', e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-400">Lead ainda está pesquisando</p>
                  </div>
                </div>
              </div>

              {config.trigger_flow_on_lead && !config.flow_id_default && !config.flow_id_urgente && (
                <Alert>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-700 text-sm">
                    Nenhum Smart Flow configurado. Os contatos serão criados no CRM mas nenhuma automação será disparada.
                  </AlertDescription>
                </Alert>
              )}

              {config.trigger_flow_on_lead && (config.flow_id_default || config.flow_id_urgente) && (
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700 text-sm">
                    Smart Flows configurados. O sistema selecionará automaticamente o flow correto baseado na urgência do lead.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── ABA: SINCRONIZAÇÃO ───────────────────────────────────────── */}
        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="w-4 h-4 text-blue-500" />
                Dados Sincronizados
              </CardTitle>
              <CardDescription>
                Controle quais dados do lead são enviados para o Centralize ao criar o contato.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                <Switch
                  id="create-contact"
                  checked={config.create_contact_on_lead}
                  onCheckedChange={val => set('create_contact_on_lead', val)}
                />
                <div>
                  <Label htmlFor="create-contact" className="cursor-pointer font-medium">
                    Criar contato no CRM ao receber lead
                  </Label>
                  <p className="text-xs text-gray-500">Desative apenas se quiser usar o Centralize só para flows sem criar contatos</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'sync_name', label: 'Nome completo', icon: <Users className="w-3.5 h-3.5" /> },
                  { key: 'sync_email', label: 'E-mail', icon: <Mail className="w-3.5 h-3.5" /> },
                  { key: 'sync_phone', label: 'Telefone / WhatsApp', icon: <Phone className="w-3.5 h-3.5" /> },
                  { key: 'sync_custom_fields', label: 'Campos personalizados', icon: <Hash className="w-3.5 h-3.5" /> },
                ].map(({ key, label, icon }) => (
                  <div key={key} className="flex items-center gap-3 p-3 rounded-lg border">
                    <Switch
                      id={`sync-${key}`}
                      checked={config[key as keyof CentralizeConfig] as boolean}
                      onCheckedChange={val => set(key as keyof CentralizeConfig, val)}
                    />
                    <Label htmlFor={`sync-${key}`} className="cursor-pointer flex items-center gap-1.5 text-sm">
                      {icon}
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="w-4 h-4 text-orange-500" />
                Tags Automáticas
              </CardTitle>
              <CardDescription>
                Tags aplicadas automaticamente ao criar o contato. Facilitam a segmentação e filtros no Centralize.
                Exemplo: prefixo "servico" + nome do serviço = tag "servico_divorcio".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                <Switch
                  id="apply-tags"
                  checked={config.apply_tags_on_lead}
                  onCheckedChange={val => set('apply_tags_on_lead', val)}
                />
                <div>
                  <Label htmlFor="apply-tags" className="cursor-pointer font-medium">
                    Aplicar tags automaticamente
                  </Label>
                  <p className="text-xs text-gray-500">Tags de serviço, urgência e formulário são aplicadas ao criar o contato</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="tag-service" className="text-sm">Prefixo — Serviço</Label>
                  <Input
                    id="tag-service"
                    placeholder="servico"
                    value={config.tag_prefix_service}
                    onChange={e => set('tag_prefix_service', e.target.value)}
                  />
                  <p className="text-xs text-gray-400">Ex: servico_divorcio</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tag-urgency" className="text-sm">Prefixo — Urgência</Label>
                  <Input
                    id="tag-urgency"
                    placeholder="urgencia"
                    value={config.tag_prefix_urgency}
                    onChange={e => set('tag_prefix_urgency', e.target.value)}
                  />
                  <p className="text-xs text-gray-400">Ex: urgencia_urgente</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tag-form" className="text-sm">Prefixo — Formulário</Label>
                  <Input
                    id="tag-form"
                    placeholder="form"
                    value={config.tag_prefix_form}
                    onChange={e => set('tag_prefix_form', e.target.value)}
                  />
                  <p className="text-xs text-gray-400">Ex: form_divorcio-rapido</p>
                </div>
              </div>

              {config.apply_tags_on_lead && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium mb-2">Exemplo de tags geradas para um lead:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">{config.tag_prefix_service || 'servico'}_divorcio</Badge>
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">{config.tag_prefix_urgency || 'urgencia'}_urgente</Badge>
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">{config.tag_prefix_form || 'form'}_divorcio-rapido</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── ABA: NOTIFICAÇÕES ────────────────────────────────────────── */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="w-4 h-4 text-yellow-500" />
                Notificações de Resposta
              </CardTitle>
              <CardDescription>
                Receba notificações quando um lead responder via Centralize.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50">
                <Switch
                  id="notify-reply"
                  checked={config.notify_on_reply}
                  onCheckedChange={val => set('notify_on_reply', val)}
                />
                <div>
                  <Label htmlFor="notify-reply" className="cursor-pointer font-medium">
                    Notificar quando lead responder
                  </Label>
                  <p className="text-xs text-gray-500">
                    Requer configuração do Webhook de Retorno na aba Conexão
                  </p>
                </div>
              </div>

              {config.notify_on_reply && (
                <div>
                  <Label htmlFor="notify-email">E-mail para notificações</Label>
                  <Input
                    id="notify-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={config.notify_email}
                    onChange={e => set('notify_email', e.target.value)}
                  />
                </div>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Para receber notificações em tempo real, configure também o Webhook de Retorno na aba <strong>Conexão</strong>.
                  O Centralize enviará um POST para essa URL sempre que um lead responder.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="w-4 h-4 text-gray-500" />
                Diagnóstico & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg border space-y-1">
                  <p className="text-gray-500 text-xs">Status da integração</p>
                  <p className="font-semibold flex items-center gap-1.5">
                    {config.enabled
                      ? <><CheckCircle className="w-4 h-4 text-green-500" /> Ativa</>
                      : <><AlertTriangle className="w-4 h-4 text-yellow-500" /> Inativa</>}
                  </p>
                </div>
                <div className="p-3 rounded-lg border space-y-1">
                  <p className="text-gray-500 text-xs">API Key configurada</p>
                  <p className="font-semibold flex items-center gap-1.5">
                    {config.api_key
                      ? <><CheckCircle className="w-4 h-4 text-green-500" /> Sim</>
                      : <><AlertTriangle className="w-4 h-4 text-red-500" /> Não</>}
                  </p>
                </div>
                <div className="p-3 rounded-lg border space-y-1">
                  <p className="text-gray-500 text-xs">Smart Flow padrão</p>
                  <p className="font-semibold flex items-center gap-1.5">
                    {config.flow_id_default
                      ? <><CheckCircle className="w-4 h-4 text-green-500" /> {config.flow_id_default}</>
                      : <><AlertTriangle className="w-4 h-4 text-yellow-500" /> Não configurado</>}
                  </p>
                </div>
                <div className="p-3 rounded-lg border space-y-1">
                  <p className="text-gray-500 text-xs">Canal padrão</p>
                  <p className="font-semibold capitalize">{config.default_channel || '—'}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border">
                <p className="text-xs text-gray-600 font-medium mb-1.5">Fluxo de um lead ao chegar:</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
                  <span className="bg-white border rounded px-2 py-0.5">Lead capturado</span>
                  <ArrowRight className="w-3 h-3" />
                  {config.create_contact_on_lead && (
                    <>
                      <span className="bg-white border rounded px-2 py-0.5">Contato criado no CRM</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                  {config.apply_tags_on_lead && (
                    <>
                      <span className="bg-white border rounded px-2 py-0.5">Tags aplicadas</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                  {config.trigger_flow_on_lead && (
                    <span className="bg-green-50 border border-green-200 text-green-700 rounded px-2 py-0.5">Smart Flow disparado</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão salvar fixo no rodapé */}
      <div className="flex justify-end pt-2 border-t">
        <Button onClick={saveConfig} disabled={isSaving}>
          {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar todas as configurações
        </Button>
      </div>
    </div>
  );
};
