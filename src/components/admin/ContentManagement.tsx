
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import HomePageEditor from './HomePageEditor';
import ServicesManagement from './ServicesManagement';
import TeamManagement from './TeamManagement';
import BlogManagement from './BlogManagement';

const ContentManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciamento de Conteúdo</h2>
      
      <Tabs defaultValue="homepage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">Página Inicial</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <HomePageEditor />
        </TabsContent>

        <TabsContent value="services">
          <ServicesManagement />
        </TabsContent>

        <TabsContent value="team">
          <TeamManagement />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
