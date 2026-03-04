import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import {
  Save, CheckCircle, AlertTriangle, Zap, X, Plus, Tag,
  ChevronDown, Search, Loader2, Info, RotateCcw, ExternalLink, Bot,
  RefreshCw, ArrowRight, Trash2
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

interface FlowMapping {
  id: string;
  answer_contains: string;
  flow_id: string;
  label?: string;
}
interface FormCentralizeConfig {
  flow_id_default: string;
  flow_id_urgente: string;
  flow_id_semanas: string;
  flow_id_pesquisando: string;
  tags: string[];
  tags_to_remove: string[];
  enabled: boolean;
  flow_mappings: FlowMapping[];
}

interface StepFormItem {
  id: string;
  name: string;
  slug: string;
  centralize_config: FormCentralizeConfig;
}

interface ReplyTag {
  id: number;
  name: string;
  contacts_count?: number;
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
  tags_to_remove: [],
  enabled: true,
  flow_mappings: [],
};

interface TagSelectorProps {
  selectedTags: string[];
  availableTags: ReplyTag[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  isLoadingTags: boolean;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags, availableTags, onAdd, onRemove, isLoadingTags
}) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = availableTags.filter(t =>
    t.name.toLowerCase().includes(input.toLowerCase()) &&
    !selectedTags.includes(t.name)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAdd = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onAdd(trimmed);
      setInput('');
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[28px]">
        {selectedTags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs gap-1 pr-1">
            <Tag className="w-2.5 h-2.5 opacity-60" />
            {tag}
            <button onClick={() => onRemove(tag)} className="ml-0.5 hover:text-destructive transition-colors">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {selectedTags.length === 0 && (
          <span className="text-xs text-muted-foreground italic">Nenhuma tag configurada</span>
        )}
      </div>
      <div ref={ref} className="relative">
        <div className="flex gap-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              value={input}
              onChange={e => { setInput(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              onKeyDown={e => {
                if (e.key === 'Enter') { e.preventDefault(); handleAdd(input); }
                if (e.key === 'Escape') setOpen(false);
              }}
              placeholder={isLoadingTags ? 'Carregando tags...' : 'Buscar ou criar tag...'}
              className="h-7 text-xs pl-7"
              disabled={isLoadingTags}
            />
          </div>
          <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => handleAdd(input)} disabled={!input.trim()}>
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
        {open && (filtered.length > 0 || input.trim()) && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filtered.slice(0, 20).map(tag => (
              <button
                key={tag.id}
                className="w-full text-left px-3 py-1.5 text-xs hover:bg-accent flex items-center justify-between gap-2"
                onMouseDown={e => { e.preventDefault(); handleAdd(tag.name); }}
              >
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3 opacity-50" />
                  {tag.name}
                </span>
                {tag.contacts_count !== undefined && (
                  <span className="text-muted-foreground text-[10px]">{tag.contacts_count}</span>
                )}
              </button>
            ))}
            {input.trim() && !filtered.find(t => t.name.toLowerCase() === input.toLowerCase()) && (
              <button
                className="w-full text-left px-3 py-1.5 text-xs hover:bg-accent flex items-center gap-1.5 text-primary border-t"
                onMouseDown={e => { e.preventDefault(); handleAdd(input); }}
              >
                <Plus className="w-3 h-3" />
                Criar tag "{input.trim()}"
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CentralizeManagement: React.FC = () => {
  const [global, setGlobal] = useState<GlobalConfig>(DEFAULT_GLOBAL);
  const [forms, setForms] = useState<StepFormItem[]>([]);
  const [availableTags, setAvailableTags] = useState<ReplyTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [expandedForms, setExpandedForms] = useState<Set<string>>(new Set());
  const [isBulkSyncing, setIsBulkSyncing] = useState(false);
  const [bulkSyncResult, setBulkSyncResult] = useState<{ synced: number; skipped: number; errors: number; total: number } | null>(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const { data: settings } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (settings) {
        setSettingsId(settings.id);
        const raw = settings as any;
        const apiKey = raw.centralize_api_key ?? '';
        setGlobal({
          enabled: raw.centralize_enabled ?? raw.reply_agent_enabled ?? false,
          api_key: apiKey,
          flow_id_default: raw.centralize_flow_id_default ?? raw.reply_agent_flow_id ?? '',
          default_channel: raw.centralize_default_channel ?? 'whatsapp',
          webhook_callback_url: raw.centralize_webhook_callback_url ?? '',
          notify_on_reply: raw.centralize_notify_on_reply ?? false,
          notify_email: raw.centralize_notify_email ?? '',
        });
        if (apiKey) loadReplyTags(apiKey);
      }

      const { data: stepForms } = await supabase
        .from('step_forms')
        .select('id, name, slug, centralize_config')
        .eq('is_active', true)
        .order('name');

      if (stepForms) {
        const mapped = stepForms.map((f: any) => ({
          id: f.id,
          name: f.name,
          slug: f.slug,
          centralize_config: { ...DEFAULT_FORM_CONFIG, ...(f.centralize_config || {}) },
        }));
        setForms(mapped);
        if (mapped.length <= 3) setExpandedForms(new Set(mapped.map((f: StepFormItem) => f.id)));
      }
    } catch (err) {
      logger.error('Erro ao carregar configuração Centralize:', err);
      toast.error('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const loadReplyTags = async (apiKey: string) => {
    if (!apiKey) return;
    setIsLoadingTags(true);
    try {
      const res = await fetch('https://ra-bcknd.com/v1/tags', {
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Accept': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const tags = data?.data || (Array.isArray(data) ? data : []);
        setAvailableTags(tags);
      }
    } catch {
      // silencioso
    } finally {
      setIsLoadingTags(false);
    }
  };

  const saveAll = async () => {
    setIsSaving(true);
    try {
      const globalPayload = {
        centralize_enabled: global.enabled,
        centralize_api_key: global.api_key || null,
        centralize_flow_id_default: global.flow_id_default || null,
        centralize_default_channel: global.default_channel || null,
        centralize_webhook_callback_url: global.webhook_callback_url || null,
        centralize_notify_on_reply: global.notify_on_reply,
        centralize_notify_email: global.notify_email || null,
        reply_agent_enabled: global.enabled,
        reply_agent_flow_id: global.flow_id_default || null,
        updated_at: new Date().toISOString(),
      };

      if (settingsId) {
        const { error } = await supabase.from('marketing_settings').update(globalPayload).eq('id', settingsId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('marketing_settings').insert(globalPayload).select('id').single();
        if (error) throw error;
        if (data) setSettingsId(data.id);
      }

      for (const form of forms) {
        const { error } = await supabase
          .from('step_forms')
          .update({ centralize_config: form.centralize_config as any })
          .eq('id', form.id);
        if (error) logger.warn(`Erro ao salvar form ${form.slug}:`, error);
      }

      toast.success('Configurações salvas!');
    } catch (err) {
      logger.error('Erro ao salvar:', err);
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async () => {
    if (!global.api_key) { toast.error('Configure a API Key antes de testar'); return; }
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
        },
      });
      if (error) throw error;
      setTestResult({ success: true, message: `Conexão OK! Contato ID: ${data?.contact_id || '?'}` });
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
      f.id === formId ? { ...f, centralize_config: { ...f.centralize_config, [key]: value } } : f
    ));
  };

  const addTag = (formId: string, tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    setForms(prev => prev.map(f => f.id === formId
      ? { ...f, centralize_config: { ...f.centralize_config, tags: [...f.centralize_config.tags, trimmed] } }
      : f
    ));
  };

  const removeTag = (formId: string, tag: string) => {
    setForms(prev => prev.map(f => f.id === formId
      ? { ...f, centralize_config: { ...f.centralize_config, tags: f.centralize_config.tags.filter(t => t !== tag) } }
      : f
    ));
  };

  const addFlowMapping = (formId: string) => {
    const newMapping: FlowMapping = { id: Date.now().toString(), answer_contains: '', flow_id: '', label: '' };
    setForms(prev => prev.map(f => f.id === formId
      ? { ...f, centralize_config: { ...f.centralize_config, flow_mappings: [...(f.centralize_config.flow_mappings || []), newMapping] } }
      : f
    ));
  };

  const updateFlowMapping = (formId: string, mappingId: string, field: keyof FlowMapping, value: string) => {
    setForms(prev => prev.map(f => f.id === formId
      ? { ...f, centralize_config: { ...f.centralize_config, flow_mappings: (f.centralize_config.flow_mappings || []).map(m => m.id === mappingId ? { ...m, [field]: value } : m) } }
      : f
    ));
  };

  const removeFlowMapping = (formId: string, mappingId: string) => {
    setForms(prev => prev.map(f => f.id === formId
      ? { ...f, centralize_config: { ...f.centralize_config, flow_mappings: (f.centralize_config.flow_mappings || []).filter(m => m.id !== mappingId) } }
      : f
    ));
  };

  const runBulkSync = async (dryRun = false) => {
    setIsBulkSyncing(true);
    setBulkSyncResult(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/centralize-bulk-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ limit: 100, dry_run: dryRun }),
      });
      const data = await res.json();
      if (data.success) {
        setBulkSyncResult({ synced: data.synced, skipped: data.skipped, errors: data.errors, total: data.total_processed });
        toast.success(dryRun ? `Simulação: ${data.synced} leads seriam sincronizados` : `${data.synced} leads sincronizados com sucesso`);
      } else {
        toast.error(data.error || 'Erro na sincronização');
      }
    } catch (err) {
      toast.error('Erro ao executar sincronização');
    } finally {
      setIsBulkSyncing(false);
    }
  };

  const toggleForm = (formId: string) => {
    setExpandedForms(prev => {
      const next = new Set(prev);
      if (next.has(formId)) next.delete(formId); else next.add(formId);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <div>
                <CardTitle className="text-base">Conexão com a Reply Agent</CardTitle>
                <CardDescription className="text-xs mt-0.5">API Key e configurações globais</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{global.enabled ? 'Ativo' : 'Inativo'}</span>
              <Switch checked={global.enabled} onCheckedChange={val => setGlobal(prev => ({ ...prev, enabled: val }))} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs font-medium">API Key</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="password"
                placeholder="151334|xxxxxxxxxxxxxxxxxxxxxxxx"
                value={global.api_key}
                onChange={e => setGlobal(prev => ({ ...prev, api_key: e.target.value }))}
                className="font-mono text-sm"
              />
              <Button variant="outline" size="sm" onClick={testConnection} disabled={isTesting || !global.api_key} className="shrink-0">
                {isTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Testar'}
              </Button>
              {global.api_key && (
                <Button
                  variant="ghost" size="sm"
                  onClick={() => loadReplyTags(global.api_key)}
                  disabled={isLoadingTags}
                  title="Recarregar tags da Reply Agent"
                  className="shrink-0"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isLoadingTags ? 'animate-spin' : ''}`} />
                </Button>
              )}
            </div>
            {testResult && (
              <Alert className={`mt-2 py-2 ${testResult.success ? 'border-green-500/30 bg-green-500/5' : 'border-destructive/30 bg-destructive/5'}`}>
                <AlertDescription className="text-xs flex items-center gap-1.5">
                  {testResult.success
                    ? <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    : <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />}
                  {testResult.message}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium">Flow Padrão Global</Label>
              <Input
                placeholder="ID do flow (fallback)"
                value={global.flow_id_default}
                onChange={e => setGlobal(prev => ({ ...prev, flow_id_default: e.target.value }))}
                className="font-mono text-sm mt-1"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Usado quando o formulário não tem flow configurado</p>
            </div>
            <div>
              <Label className="text-xs font-medium">Canal Padrão</Label>
              <select
                value={global.default_channel}
                onChange={e => setGlobal(prev => ({ ...prev, default_channel: e.target.value as any }))}
                className="w-full mt-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="sms">SMS</option>
                <option value="email">E-mail</option>
              </select>
            </div>
          </div>

          {availableTags.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
                <Tag className="w-3 h-3" />
                {availableTags.length} tags disponíveis na Reply Agent
                <a
                  href="https://app.replyagent.com/contacts/tags"
                  target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-primary hover:underline flex items-center gap-0.5 text-xs"
                >
                  Gerenciar <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </p>
              <div className="flex flex-wrap gap-1">
                {availableTags.slice(0, 30).map(tag => (
                  <span key={tag.id} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                    {tag.name}
                  </span>
                ))}
                {availableTags.length > 30 && (
                  <span className="text-[10px] text-muted-foreground">+{availableTags.length - 30} mais</span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Configuração por Formulário
          </CardTitle>
          <CardDescription className="text-xs mt-0.5">
            Smart Flows por urgência e tags específicas para cada Step Form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {forms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Nenhum formulário ativo encontrado.</p>
              <p className="text-xs mt-1">Crie um Step Form primeiro para configurar a integração.</p>
            </div>
          ) : (
            forms.map(form => {
              const isExpanded = expandedForms.has(form.id);
              const hasConfig = !!(form.centralize_config.flow_id_default ||
                form.centralize_config.flow_id_urgente ||
                form.centralize_config.tags.length > 0);

              return (
                <div
                  key={form.id}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    form.centralize_config.enabled ? 'border-border' : 'border-border/40 opacity-60'
                  }`}
                >
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggleForm(form.id)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      <div className="min-w-0">
                        <p className="font-medium text-sm leading-tight">{form.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">/{form.slug}</p>
                      </div>
                      {hasConfig && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 text-green-600 border-green-500/30 bg-green-500/5">
                          Configurado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-2" onClick={e => e.stopPropagation()}>
                      <Switch
                        checked={form.centralize_config.enabled}
                        onCheckedChange={val => updateFormConfig(form.id, 'enabled', val)}
                      />
                    </div>
                  </div>

                  {isExpanded && form.centralize_config.enabled && (
                    <div className="px-4 pb-4 pt-2 space-y-4 border-t bg-muted/10">
                      {/* Flow Padrão */}
                      <div>
                        <Label className="text-xs font-medium flex items-center gap-1.5 mb-2">
                          <Zap className="w-3.5 h-3.5 text-yellow-500" />
                          Smart Flow Padrão
                        </Label>
                        <Input
                          placeholder="ID do flow padrão (fallback)"
                          value={form.centralize_config.flow_id_default}
                          onChange={e => updateFormConfig(form.id, 'flow_id_default', e.target.value)}
                          className="font-mono text-xs h-8"
                        />
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Disparado quando nenhum mapeamento abaixo for correspondido.
                        </p>
                      </div>

                      {/* Flow Mappings por Resposta */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-xs font-medium flex items-center gap-1.5">
                            <ArrowRight className="w-3.5 h-3.5 text-primary" />
                            Mapeamento de Respostas → Flow
                          </Label>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-[10px]"
                            onClick={() => addFlowMapping(form.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" /> Adicionar
                          </Button>
                        </div>
                        {(form.centralize_config.flow_mappings || []).length === 0 ? (
                          <div className="text-center py-3 border border-dashed rounded-md">
                            <p className="text-[10px] text-muted-foreground">Nenhum mapeamento. Clique em Adicionar para criar.</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">Ex: se resposta contém "Divórcio" → dispara Flow X</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {(form.centralize_config.flow_mappings || []).map(mapping => (
                              <div key={mapping.id} className="flex items-center gap-2 p-2 bg-muted/20 rounded-md border">
                                <div className="flex-1 min-w-0">
                                  <Input
                                    placeholder="Se resposta contém... (ex: Divórcio)"
                                    value={mapping.answer_contains}
                                    onChange={e => updateFlowMapping(form.id, mapping.id, 'answer_contains', e.target.value)}
                                    className="text-xs h-7 mb-1"
                                  />
                                  <Input
                                    placeholder="ID do SmartFlow"
                                    value={mapping.flow_id}
                                    onChange={e => updateFlowMapping(form.id, mapping.id, 'flow_id', e.target.value)}
                                    className="font-mono text-xs h-7"
                                  />
                                </div>
                                <button
                                  onClick={() => removeFlowMapping(form.id, mapping.id)}
                                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                          A verificação é case-insensitive. Prioridade: mapeamentos → flow padrão do formulário → flow global.
                        </p>
                      </div>

                      <div>
                        <Label className="text-xs font-medium flex items-center gap-1.5 mb-2">
                          <Tag className="w-3.5 h-3.5 text-blue-500" />
                          Tags deste formulário
                        </Label>
                        <TagSelector
                          selectedTags={form.centralize_config.tags}
                          availableTags={availableTags}
                          onAdd={tag => addTag(form.id, tag)}
                          onRemove={tag => removeTag(form.id, tag)}
                          isLoadingTags={isLoadingTags}
                        />
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                          O sistema também aplica <code className="bg-muted px-0.5 rounded">TRAFEGO_PAGO</code> ou <code className="bg-muted px-0.5 rounded">organico</code> automaticamente. Tags duplicadas são ignoradas.
                        </p>
                      </div>
                    </div>
                  )}

                  {isExpanded && !form.centralize_config.enabled && (
                    <div className="px-4 py-3 border-t bg-muted/10 text-center">
                      <p className="text-xs text-muted-foreground">Ative a integração para configurar flows e tags.</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Sincronização em Lote */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            <div>
              <CardTitle className="text-base">Sincronização de Leads Existentes</CardTitle>
              <CardDescription className="text-xs mt-0.5">Sincronize leads que ainda não foram enviados para a Reply Agent</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {bulkSyncResult && (
            <div className="grid grid-cols-4 gap-2 p-3 bg-muted/30 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{bulkSyncResult.total}</p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{bulkSyncResult.synced}</p>
                <p className="text-[10px] text-muted-foreground">Sincronizados</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{bulkSyncResult.skipped}</p>
                <p className="text-[10px] text-muted-foreground">Ignorados</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-destructive">{bulkSyncResult.errors}</p>
                <p className="text-[10px] text-muted-foreground">Erros</p>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => runBulkSync(true)}
              disabled={isBulkSyncing}
              className="text-xs"
            >
              {isBulkSyncing ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Info className="w-3.5 h-3.5 mr-2" />}
              Simular (dry run)
            </Button>
            <Button
              size="sm"
              onClick={() => runBulkSync(false)}
              disabled={isBulkSyncing}
              className="text-xs"
            >
              {isBulkSyncing ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-2" />}
              Sincronizar agora
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Busca por WhatsApp para evitar duplicatas. Leads já sincronizados são ignorados. Rate limit: 300ms entre requests.
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-2 border-t">
        <p className="text-xs text-muted-foreground">
          Configurações aplicadas nos próximos leads recebidos.
        </p>
        <Button onClick={saveAll} disabled={isSaving} size="sm">
          {isSaving
            ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Salvando...</>
            : <><Save className="w-3.5 h-3.5 mr-2" /> Salvar configurações</>}
        </Button>
      </div>
    </div>
  );
};
