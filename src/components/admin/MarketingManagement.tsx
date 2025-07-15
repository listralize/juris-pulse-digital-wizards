
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Settings, 
  BarChart3, 
  TrendingUp, 
  MessageSquare,
  Target,
  Globe
} from 'lucide-react';
import { ConversionsTab } from './ConversionsTab';

export const MarketingManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Marketing & Analytics</h2>
          <p className="text-muted-foreground">
            Gerencie campanhas, conversões e analise o desempenho do site
          </p>
        </div>
      </div>

      <Tabs defaultValue="conversions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 backdrop-blur-md bg-white/10 border border-white/20">
          <TabsTrigger 
            value="conversions" 
            className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <MessageSquare className="w-4 h-4" />
            Conversões
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="campaigns" 
            className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <TrendingUp className="w-4 h-4" />
            Campanhas
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center gap-2 text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversions" className="mt-6">
          <ConversionsTab />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics do Site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Analytics em desenvolvimento</p>
                <p className="text-sm text-gray-400 mt-2">
                  Visualizações de página, sessões e métricas de engajamento
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Gestão de Campanhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Campanhas em desenvolvimento</p>
                <p className="text-sm text-gray-400 mt-2">
                  Criação e gerenciamento de campanhas de marketing
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações de Marketing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Configurações em desenvolvimento</p>
                <p className="text-sm text-gray-400 mt-2">
                  Pixels, códigos de rastreamento e integrações
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
