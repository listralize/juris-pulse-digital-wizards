
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import HomePageEditor from './HomePageEditor';
import { ServicesManagement } from './ServicesManagement';
import { TeamManagement } from './TeamManagement';
import { BlogManagement } from './BlogManagement';
import { TeamMember, PageTexts, SpecializedService } from '../../types/adminTypes';
import { BlogPost } from '../../types/blogTypes';

interface ContentManagementProps {
  teamMembers: TeamMember[];
  pageTexts: PageTexts;
  onAddTeamMember: () => void;
  onRemoveTeamMember: (id: string) => void;
  onUpdateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  onSaveTeamMembers: () => void;
  onUpdatePageTexts: (texts: PageTexts) => void;
  onSavePageTexts: () => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({
  teamMembers,
  pageTexts,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onSaveTeamMembers,
  onUpdatePageTexts,
  onSavePageTexts
}) => {
  // Mock data for components that need it
  const mockSpecializedServices: SpecializedService[] = [];
  const mockBlogPosts: BlogPost[] = [];

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
          <HomePageEditor 
            pageTexts={pageTexts}
            onUpdatePageTexts={onUpdatePageTexts}
            onSavePageTexts={onSavePageTexts}
          />
        </TabsContent>

        <TabsContent value="services">
          <ServicesManagement 
            specializedServices={mockSpecializedServices}
            onAddSpecializedService={() => {}}
            onRemoveSpecializedService={() => {}}
            onUpdateSpecializedService={() => {}}
            onSave={() => {}}
          />
        </TabsContent>

        <TabsContent value="team">
          <TeamManagement 
            teamMembers={teamMembers}
            onAddTeamMember={onAddTeamMember}
            onRemoveTeamMember={onRemoveTeamMember}
            onUpdateTeamMember={onUpdateTeamMember}
            onSave={onSaveTeamMembers}
          />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManagement 
            blogPosts={mockBlogPosts}
            onSave={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
