import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import {
  Save, RefreshCw, Info, AlertTriangle, CheckCircle, Zap, MessageSquare,
  Phone, Mail, Bot, X, Plus, Tag
} from 'lucide-react';
import { logger } from '@/utils/logger';

interface GlobalConfig {
  enabled: boolean;
  api_key: string;
  flow_id_default: string;
  default_channel: 'whatsapp' | 'sms' | 'email' | '';
  webhook_callback_url: string;
  notify_on_reply: boolean;
  notify_email: string;
}

interface FormCentralizeConfig {
  flow_id_default: string;
  flow_id_urgente: string;
  flow_id_semanas: string;
  flow_id_pesquisando: string;
  tags: string[];
  enabled: boolean;
}

interface StepFormItem {
  id: string;
  name: string;
  slug: string;
  centralize_config: FormCentralizeConfig;
}

const DEFAULT_GLOBAL: GlobalConfig = {
  enabled: false,
  api_key: '',
  flow_id_default: '',
  default_channel: 'whatsapp',
  webhook_callback_url: '',
  notify_on_reply: false,
  notify_email: '',
};

const DEFAULT_FORM_CONFIG: FormCentralizeConfig = {
  flow_id_default: '',
  flow_id_urgente: '',
  flow_id_semanas: '',
  flow_id_pesquisando: '',
  tags: [],
  enabled: true,
};

export const CentralizeManagement: React.FC = () => {
  const [global, setGlobal] = useState<GlobalConfig>(DEFAULT_GLOBAL);
  const [forms, setForms] = useState<StepFormItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [newTagInputs, setNewTagInputs] = useState<Record<string, string>>({});

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      // Load global settings
      const { data: settings } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (settings) {
        setSettingsId(settings.id);
        const raw = settings as any;
        setGlobal({
          enabled: raw.centralize_enabled ?? raw.reply_agent_enabled ?? false,
          api_key: raw.centralize_api_key ?? '',
          flow_id_default: raw.centralize_flow_id_default ?? raw.reply_agent_flow_id ?? '',
          default_channel: raw.centralize_default_channel ?? 'whatsapp',
          webhook_callback_url: raw.centralize_webhook_callback_url ?? '',
          notify_on_reply: raw.centralize_notify_on_reply ?? false,
          notify_email: raw.centralize_notify_email ?? '',
        });
      }

      // Load step forms
      const { data: stepForms } = await supabase
        .from('step_forms')
        .select('id, name, slug, centralize_config')
        .eq('is_active', true)
        .order('name');

      if (stepForms) {
        setForms(stepForms.map((f: any) => ({
          id: f.id,
          name: f.name,
          slug: f.slug,
          centralize_config: {
            ...DEFAULT_FORM_CONFIG,
            ...(f.centralize_config || {}),
          },
        })));
      }
    } catch (err) {
      logger.error('Erro ao carregar configuração Centralize:', err);
      toast.error('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const saveAll = async () => {
    setIsSaving(true);
    try {
      // Save global settings
      const globalPayload = {
        centralize_enabled: global.enabled,
        centralize_api_key: global.api_key || null,
        centralize_flow_id_default: global.flow_id_default || null,
        centralize_default_channel: global.default_channel || null,
        centralize_webhook_callback_url: global.webhook_callback_url || null,
        centralize_notify_on_reply: global.notify_on_reply,
        centralize_notify_email: global.notify_email || null,
        // Backward compat
        reply_agent_enabled: global.enabled,
        reply_agent_flow_id: global.flow_id_default || null,
        updated_at: new Date().toISOString(),
      };

      if (settingsId) {
        const { error } = await supabase
          .from('marketing_settings')
          .update(globalPayload)
          .eq('id', settingsId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('marketing_settings')
          .insert(globalPayload)
          .select('id')
          .single();
        if (error) throw error;
        if (data) setSettingsId(data.id);
      }

      // Save per-form configs
      for (const form of forms) {
        const { error } = await supabase
          .from('step_forms')
          .update({ centralize_config: form.centralize_config as any })
          .eq('id', form.id);
        if (error) logger.warn(`Erro ao salvar config do form ${form.slug}:`, error);
      }

      toast.success('Configurações salvas com sucesso!');
    } catch (err) {
      logger.error('Erro ao salvar configuração Centralize:', err);
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async () => {
    if (!global.api_key) {
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
          skip_flow: true,
          _test_api_key: global.api_key,
        },
      });
      if (error) throw error;
      setTestResult({ success: true, message: `Conexão OK! Contato ID: ${data?.contact_id}` });
      toast.success('Conexão funcionando!');
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || String(err) });
      toast.error('Falha na conexão');
    } finally {
      setIsTesting(false);
    }
  };

  const updateFormConfig = (formId: string, key: keyof FormCentralizeConfig, value: any) => {
    setForms(prev => prev.map(f =>
      f.id === formId
        ? { ...f, centralize_config: { ...f.centralize_config, [key]: value } }
        : f
    ));
  };

  const addTag = (formId: string) => {
    const tag = (newTagInputs[formId] || '').trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    if (!tag) return;
    const form = forms.find(f => f.id === formId);
    if (form && !form.centralize_config.tags.includes(tag)) {
      updateFormConfig(formId, 'tags', [...form.centralize_config.tags, tag]);
    }
    setNewTagInputs(prev => ({ ...prev, [formId]: '' }));
  };

  const removeTag = (formId: string, tag: string) => {
    const form = forms.find(f => f.id === formId);
    if (form) {
      updateFormConfig(formId, 'tags', form.centralize_config.tags.filter(t => t !== tag));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground mr-2" />
        <span className="text-muted-foreground">Carregando configurações...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Centralize — CRM & Chatbot
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sincronize leads e dispare automações de WhatsApp
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={global.enabled ? 'default' : 'secondary'}>
            {global.enabled ? 'Ativo' : 'Inativo'}
          </Badge>
          <Button onClick={saveAll} disabled={isSaving} size="sm">
            {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Salvar
          </Button>
        </div>
      </div>

      {/* ── CONEXÃO ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Conexão</CardTitle>
          <CardDescription>API Key e configurações globais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
            <Switch
              id="centralize-enabled"
              checked={global.enabled}
              onCheckedChange={val => setGlobal(prev => ({ ...prev, enabled: val }))}
            />
            <Label htmlFor="centralize-enabled" className="cursor-pointer font-medium">
              {global.enabled ? 'Integração ativa' : 'Integração desativada'}
            </Label>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              A API Key real deve estar no Secret <code className="bg-muted px-1 rounded">REPLYAGENT_API_KEY</code>. O campo abaixo é referência.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>API Key (referência)</Label>
              <Input
                type="password"
                placeholder="ra_live_xxxxxxxxxxxxxxxx"
                value={global.api_key}
                onChange={e => setGlobal(prev => ({ ...prev, api_key: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label>Smart Flow Padrão</Label>
              <Input
                placeholder="ID do Smart Flow"
                value={global.flow_id_default}
                onChange={e => setGlobal(prev => ({ ...prev, flow_id_default: e.target.value }))}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Canal Padrão</Label>
              <Select
                value={global.default_channel}
                onValueChange={val => setGlobal(prev => ({ ...prev, default_channel: val as any }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">
                    <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> WhatsApp</span>
                  </SelectItem>
                  <SelectItem value="sms">
                    <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> SMS</span>
                  </SelectItem>
                  <SelectItem value="email">
                    <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Webhook callback (opcional)</Label>
              <Input
                type="url"
                placeholder="https://..."
                value={global.webhook_callback_url}
                onChange={e => setGlobal(prev => ({ ...prev, webhook_callback_url: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
            <Switch
              id="notify-reply"
              checked={global.notify_on_reply}
              onCheckedChange={val => setGlobal(prev => ({ ...prev, notify_on_reply: val }))}
            />
            <Label htmlFor="notify-reply" className="cursor-pointer">Notificar por email</Label>
            {global.notify_on_reply && (
              <Input
                type="email"
                placeholder="seu@email.com"
                value={global.notify_email}
                onChange={e => setGlobal(prev => ({ ...prev, notify_email: e.target.value }))}
                className="max-w-xs"
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={testConnection} disabled={isTesting || !global.api_key}>
              {isTesting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              Testar Conexão
            </Button>
            {testResult && (
              <span className={`flex items-center gap-1.5 text-sm ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                {testResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {testResult.message}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── CONFIGURAÇÃO POR FORMULÁRIO ──────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Configuração por Formulário
          </CardTitle>
          <CardDescription>
            Defina Smart Flows e tags manuais para cada formulário.
            Tags de serviço/urgência automáticas foram removidas — use tags manuais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {forms.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">
              Nenhum formulário ativo encontrado. Crie um Step Form primeiro.
            </p>
          ) : (
            forms.map(form => (
              <div key={form.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{form.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">/{form.slug}</p>
                  </div>
                  <Switch
                    checked={form.centralize_config.enabled}
                    onCheckedChange={val => updateFormConfig(form.id, 'enabled', val)}
                  />
                </div>

                {form.centralize_config.enabled && (
                  <>
                    {/* Flows */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs">Flow Padrão</Label>
                        <Input
                          placeholder="ID"
                          value={form.centralize_config.flow_id_default}
                          onChange={e => updateFormConfig(form.id, 'flow_id_default', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> Urgente</Label>
                        <Input
                          placeholder="ID"
                          value={form.centralize_config.flow_id_urgente}
                          onChange={e => updateFormConfig(form.id, 'flow_id_urgente', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Semanas</Label>
                        <Input
                          placeholder="ID"
                          value={form.centralize_config.flow_id_semanas}
                          onChange={e => updateFormConfig(form.id, 'flow_id_semanas', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Pesquisando</Label>
                        <Input
                          placeholder="ID"
                          value={form.centralize_config.flow_id_pesquisando}
                          onChange={e => updateFormConfig(form.id, 'flow_id_pesquisando', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <Label className="text-xs">Tags manuais</Label>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {form.centralize_config.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs gap-1">
                            {tag}
                            <button onClick={() => removeTag(form.id, tag)} className="hover:text-destructive">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                        <div className="flex items-center gap-1">
                          <Input
                            placeholder="nova tag"
                            value={newTagInputs[form.id] || ''}
                            onChange={e => setNewTagInputs(prev => ({ ...prev, [form.id]: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(form.id))}
                            className="h-7 w-28 text-xs"
                          />
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => addTag(form.id)}>
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Save footer */}
      <div className="flex justify-end pt-2 border-t">
        <Button onClick={saveAll} disabled={isSaving}>
          {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar todas as configurações
        </Button>
      </div>
    </div>
  );
};
