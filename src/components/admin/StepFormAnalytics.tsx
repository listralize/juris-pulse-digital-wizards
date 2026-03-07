import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { supabase } from '../../integrations/supabase/client';
import { BarChart3, Users, MousePointerClick, UserX, RefreshCw } from 'lucide-react';

interface StepFormAnalyticsProps {
  formSlug: string;
  formSteps: Array<{ id: string; title: string; type: string; options?: Array<{ text: string; value: string }> }>;
}

interface FunnelStep {
  stepId: string;
  title: string;
  views: number;
  dropoff: number;
  dropoffRate: number;
}

interface OptionStat {
  stepId: string;
  stepTitle: string;
  optionValue: string;
  clicks: number;
  percentage: number;
}

interface AbandonedLead {
  sessionId: string;
  visitorId: string;
  lastStep: string;
  lastStepTitle: string;
  partialData: Record<string, any>;
  deviceType: string;
  createdAt: string;
}

export const StepFormAnalytics: React.FC<StepFormAnalyticsProps> = ({ formSlug, formSteps }) => {
  const [funnel, setFunnel] = useState<FunnelStep[]>([]);
  const [optionStats, setOptionStats] = useState<OptionStat[]>([]);
  const [abandonedLeads, setAbandonedLeads] = useState<AbandonedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const daysAgo = period === '24h' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const since = new Date(Date.now() - daysAgo * 86400000).toISOString();

      const { data: events, error } = await supabase
        .from('step_form_events')
        .select('*')
        .eq('form_slug', formSlug)
        .gte('created_at', since)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (!events?.length) {
        setFunnel([]);
        setOptionStats([]);
        setAbandonedLeads([]);
        setLoading(false);
        return;
      }

      // Build funnel
      const stepViews: Record<string, number> = {};
      const optClicks: Record<string, Record<string, number>> = {};
      const sessionLastStep: Record<string, { stepId: string; data: Record<string, any>; device: string; created: string; visitor: string }> = {};
      const completedSessions = new Set<string>();

      for (const ev of events) {
        if (ev.event_type === 'step_view') {
          stepViews[ev.step_id] = (stepViews[ev.step_id] || 0) + 1;
          sessionLastStep[ev.session_id] = {
            stepId: ev.step_id,
            data: (ev.partial_data as Record<string, any>) || {},
            device: ev.device_type || 'unknown',
            created: ev.created_at,
            visitor: ev.visitor_id || '',
          };
        }
        if (ev.event_type === 'option_click' && ev.option_value) {
          if (!optClicks[ev.step_id]) optClicks[ev.step_id] = {};
          optClicks[ev.step_id][ev.option_value] = (optClicks[ev.step_id][ev.option_value] || 0) + 1;
        }
        if (ev.event_type === 'form_submit') {
          completedSessions.add(ev.session_id);
        }
        if (ev.event_type === 'form_abandon') {
          sessionLastStep[ev.session_id] = {
            stepId: ev.step_id,
            data: (ev.partial_data as Record<string, any>) || {},
            device: ev.device_type || 'unknown',
            created: ev.created_at,
            visitor: ev.visitor_id || '',
          };
        }
      }

      // Funnel
      const funnelData: FunnelStep[] = formSteps.map((step, i) => {
        const views = stepViews[step.id] || 0;
        const nextViews = i < formSteps.length - 1 ? (stepViews[formSteps[i + 1].id] || 0) : views;
        const dropoff = Math.max(0, views - nextViews);
        return {
          stepId: step.id,
          title: step.title,
          views,
          dropoff,
          dropoffRate: views > 0 ? (dropoff / views) * 100 : 0,
        };
      });
      setFunnel(funnelData);

      // Option stats
      const stats: OptionStat[] = [];
      for (const step of formSteps) {
        if (step.options && optClicks[step.id]) {
          const totalClicks = Object.values(optClicks[step.id]).reduce((a, b) => a + b, 0);
          for (const [optVal, clicks] of Object.entries(optClicks[step.id])) {
            stats.push({
              stepId: step.id,
              stepTitle: step.title,
              optionValue: optVal,
              clicks,
              percentage: totalClicks > 0 ? (clicks / totalClicks) * 100 : 0,
            });
          }
        }
      }
      setOptionStats(stats);

      // Abandoned leads
      const abandoned: AbandonedLead[] = [];
      for (const [sessionId, info] of Object.entries(sessionLastStep)) {
        if (!completedSessions.has(sessionId)) {
          const stepInfo = formSteps.find(s => s.id === info.stepId);
          abandoned.push({
            sessionId,
            visitorId: info.visitor,
            lastStep: info.stepId,
            lastStepTitle: stepInfo?.title || info.stepId,
            partialData: info.data,
            deviceType: info.device,
            createdAt: info.created,
          });
        }
      }
      abandoned.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setAbandonedLeads(abandoned.slice(0, 50));
    } catch (err) {
      console.error('Erro ao carregar analytics:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formSlug) loadAnalytics();
  }, [formSlug, period]);

  const maxViews = Math.max(...funnel.map(f => f.views), 1);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground mt-2">Carregando analytics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Analytics do Formulário
        </h3>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 horas</SelectItem>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={loadAnalytics}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Users className="w-4 h-4" /> Sessões
            </div>
            <p className="text-2xl font-bold">{funnel[0]?.views || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <MousePointerClick className="w-4 h-4" /> Completaram
            </div>
            <p className="text-2xl font-bold">
              {funnel.length > 0 ? funnel[funnel.length - 1].views : 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <UserX className="w-4 h-4" /> Abandonos
            </div>
            <p className="text-2xl font-bold">{abandonedLeads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-muted-foreground text-sm mb-1">Taxa de Conversão</div>
            <p className="text-2xl font-bold">
              {funnel[0]?.views > 0
                ? `${((funnel[funnel.length - 1]?.views || 0) / funnel[0].views * 100).toFixed(1)}%`
                : '0%'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Funnel visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          {funnel.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Nenhum dado ainda. Os eventos serão registrados quando visitantes usarem o formulário.</p>
          ) : (
            <div className="space-y-3">
              {funnel.map((step, i) => (
                <div key={step.stepId} className="flex items-center gap-3">
                  <div className="w-8 text-center text-sm font-medium text-muted-foreground">{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate max-w-[200px]">{step.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{step.views}</span>
                        {step.dropoffRate > 0 && i < funnel.length - 1 && (
                          <Badge variant="destructive" className="text-xs">
                            -{step.dropoffRate.toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${(step.views / maxViews) * 100}%`,
                          backgroundColor: `hsl(${120 * (step.views / maxViews)}, 70%, 45%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Option click stats */}
      {optionStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cliques por Opção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Group by step */}
              {Array.from(new Set(optionStats.map(s => s.stepId))).map(stepId => {
                const stepStats = optionStats.filter(s => s.stepId === stepId);
                const stepTitle = stepStats[0]?.stepTitle || stepId;
                return (
                  <div key={stepId} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2">{stepTitle}</h4>
                    <div className="space-y-2">
                      {stepStats.sort((a, b) => b.clicks - a.clicks).map(stat => (
                        <div key={stat.optionValue} className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{stat.optionValue}</span>
                              <span className="font-medium">{stat.clicks} ({stat.percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-primary transition-all"
                                style={{ width: `${stat.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Abandoned leads */}
      {abandonedLeads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UserX className="w-4 h-4" />
              Leads que Abandonaram ({abandonedLeads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Data</th>
                    <th className="text-left py-2 px-2">Última Etapa</th>
                    <th className="text-left py-2 px-2">Dispositivo</th>
                    <th className="text-left py-2 px-2">Dados Parciais</th>
                  </tr>
                </thead>
                <tbody>
                  {abandonedLeads.slice(0, 20).map(lead => (
                    <tr key={lead.sessionId} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2 px-2">
                        <Badge variant="outline" className="text-xs">{lead.lastStepTitle}</Badge>
                      </td>
                      <td className="py-2 px-2">{lead.deviceType}</td>
                      <td className="py-2 px-2">
                        {Object.keys(lead.partialData).length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(lead.partialData).slice(0, 3).map(([k, v]) => (
                              <Badge key={k} variant="secondary" className="text-xs">
                                {k}: {String(v).substring(0, 20)}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {funnel.length === 0 && optionStats.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum dado de analytics disponível para este período.</p>
            <p className="text-sm text-muted-foreground mt-1">Os dados serão coletados automaticamente quando visitantes usarem o formulário.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
