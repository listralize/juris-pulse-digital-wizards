import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface CityData {
  city: string;
  state: string;
  count: number;
  ddd: number;
}

export const CitiesChart: React.FC = () => {
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCitiesData();
  }, []);

  const loadCitiesData = async () => {
    try {
      setIsLoading(true);
      
      // Buscar leads dos últimos 7 dias
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data: leads } = await supabase
        .from('conversion_events')
        .select('ddd, state, capital')
        .gte('timestamp', oneWeekAgo.toISOString())
        .not('ddd', 'is', null)
        .not('state', 'is', null);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Carregando dados das cidades...</div>
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
            <YAxis />
            <Tooltip 
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