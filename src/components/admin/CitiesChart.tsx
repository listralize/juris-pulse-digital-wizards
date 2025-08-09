import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CityData {
  city: string;
  state: string;
  count: number;
  ddd: number;
}

type DateFilter = '7d' | '30d' | '3m' | '6m' | 'total' | 'custom';

export const CitiesChart: React.FC = () => {
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<DateFilter>('total');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  useEffect(() => {
    loadCitiesData();
  }, [dateFilter, customStartDate, customEndDate]);

  const getDateRange = () => {
    const now = new Date();
    let startDate: Date | null = null;
    
    switch (dateFilter) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '3m':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '6m':
        startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
        }
        break;
      case 'total':
      default:
        startDate = null; // No filter for total
        break;
    }
    
    return startDate;
  };

  const loadCitiesData = async () => {
    try {
      setIsLoading(true);
      
      const startDate = getDateRange();
      
      let query = supabase
        .from('conversion_events')
        .select('ddd, state, capital')
        .not('ddd', 'is', null)
        .not('state', 'is', null);
      
      if (startDate) {
        query = query.gte('timestamp', startDate.toISOString());
      }
      
      if (dateFilter === 'custom' && customEndDate) {
        const endDate = new Date(customEndDate);
        endDate.setHours(23, 59, 59, 999); // End of day
        query = query.lte('timestamp', endDate.toISOString());
      }

      const { data: leads } = await query;

      if (leads) {
        // Contar por capital/estado
        const cityCount = leads.reduce((acc, lead) => {
          const key = `${lead.capital || 'Cidade não identificada'} - ${lead.state}`;
          acc[key] = {
            city: lead.capital || 'Cidade não identificada',
            state: lead.state,
            count: (acc[key]?.count || 0) + 1,
            ddd: lead.ddd
          };
          return acc;
        }, {} as Record<string, CityData>);

        // Converter para array e ordenar
        const sortedCities = Object.values(cityCount)
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Top 10 cidades

        setCitiesData(sortedCities);
      }
    } catch (error) {
      console.error('Erro ao carregar dados das cidades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilterLabel = () => {
    switch (dateFilter) {
      case '7d': return 'Últimos 7 dias';
      case '30d': return 'Últimos 30 dias';
      case '3m': return 'Últimos 3 meses';
      case '6m': return 'Últimos 6 meses';
      case 'custom': return 'Período personalizado';
      case 'total': 
      default: return 'Todo o período';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground">Carregando dados das cidades...</div>
      </div>
    );
  }

  if (!citiesData || citiesData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <MapPin className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">Nenhum dado de cidade disponível</p>
        <p className="text-sm">Aguarde novos leads para visualizar dados por localização</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros de período */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <Label className="text-sm font-medium">Período:</Label>
        </div>
        
        <Select value={dateFilter} onValueChange={(value: DateFilter) => setDateFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="total">Todo o período</SelectItem>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="3m">Últimos 3 meses</SelectItem>
            <SelectItem value="6m">Últimos 6 meses</SelectItem>
            <SelectItem value="custom">Personalizado</SelectItem>
          </SelectContent>
        </Select>

        {dateFilter === 'custom' && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Selecionar datas
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Data inicial</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Data final</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
        
        <Badge variant="secondary" className="text-xs">
          {getFilterLabel()}
        </Badge>
      </div>

      {/* Gráfico de barras */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={citiesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="city" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value} leads`,
                `${props.payload.city} - ${props.payload.state}`
              ]}
              labelFormatter={(label) => `DDD: ${citiesData.find(c => c.city === label)?.ddd || 'N/A'}`}
            />
            <Bar 
              dataKey="count" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Lista das cidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {citiesData.map((city, index) => (
          <div 
            key={`${city.city}-${city.state}`}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold text-primary">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{city.city}</p>
                <p className="text-sm text-muted-foreground">{city.state} • DDD {city.ddd}</p>
              </div>
            </div>
            <Badge variant="outline">
              {city.count} lead{city.count !== 1 ? 's' : ''}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};