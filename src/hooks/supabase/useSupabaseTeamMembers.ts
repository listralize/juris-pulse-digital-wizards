
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { TeamMember } from '../../types/adminTypes';

export const useSupabaseTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const generateValidUUID = () => {
    return crypto.randomUUID();
  };

  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const ensureValidUUID = (id: string) => {
    if (!id || !isValidUUID(id)) {
      return generateValidUUID();
    }
    return id;
  };

  const loadTeamMembers = async () => {
    try {
      const { data: teamData, error: teamError } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (teamError) {
        console.error('❌ Erro ao carregar team members:', teamError);
      } else {
        console.log('👥 Team members carregados:', teamData?.length || 0);
      }

      if (teamData && teamData.length > 0) {
        const formattedTeamMembers: TeamMember[] = teamData.map(member => ({
          id: member.id,
          name: member.name,
          title: member.title,
          oab: member.oab,
          email: member.email,
          image: member.image || '',
          description: member.description || ''
        }));
        setTeamMembers(formattedTeamMembers);
        console.log('👥 Team members processados e setados:', formattedTeamMembers.length);
      } else {
        setTeamMembers([]);
        console.log('👥 Nenhum team member encontrado');
      }
    } catch (error) {
      console.error('💥 ERRO AO CARREGAR TEAM MEMBERS:', error);
      setTeamMembers([]);
    }
  };

  const saveTeamMembers = async (members: TeamMember[]) => {
    try {
      console.log('💾 Salvando equipe no Supabase...');
      
      await supabase
        .from('team_members')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      const memberData = members.map((member, index) => ({
        id: ensureValidUUID(member.id),
        name: member.name,
        title: member.title,
        oab: member.oab,
        email: member.email,
        image: member.image,
        description: member.description,
        display_order: index,
        is_active: true,
        updated_at: new Date().toISOString()
      }));

      await supabase
        .from('team_members')
        .upsert(memberData);

      setTeamMembers(members);
      console.log('✅ Equipe salva no Supabase');
    } catch (error) {
      console.error('❌ Erro ao salvar equipe:', error);
      throw error;
    }
  };

  return {
    teamMembers,
    loadTeamMembers,
    saveTeamMembers,
    setTeamMembers
  };
};
