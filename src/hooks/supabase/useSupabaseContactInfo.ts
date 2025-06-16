
import { useState, useEffect } from 'react';
import { ContactTexts } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';

export const useSupabaseContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactTexts>({
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040',
    whatsapp: '5562994594496',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8377!2d-49.2647!3d-16.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b5d8b00001%3A0x1234567890abcdef!2sWorld%20Trade%20Center%20Goi%C3%A2nia!5e0!3m2!1spt!2sbr!4v1234567890123'
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadContactInfo = async () => {
    console.log('🔄 [useSupabaseContactInfo] Carregando informações de contato...');
    setIsLoading(true);
    
    try {
      const { data: contact, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao carregar informações de contato:', error);
        setIsLoading(false);
        return;
      }

      if (contact) {
        const loadedContactInfo: ContactTexts = {
          phone: contact.phone || '(62) 99459-4496',
          email: contact.email || 'contato@stadv.com',
          address: contact.address || 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040',
          whatsapp: contact.whatsapp || '5562994594496',
          mapEmbedUrl: contact.map_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8377!2d-49.2647!3d-16.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b5d8b00001%3A0x1234567890abcdef!2sWorld%20Trade%20Center%20Goi%C3%A2nia!5e0!3m2!1spt!2sbr!4v1234567890123'
        };
        
        setContactInfo(loadedContactInfo);
        console.log('✅ [useSupabaseContactInfo] Informações carregadas:', loadedContactInfo);
      } else {
        console.log('ℹ️ [useSupabaseContactInfo] Nenhuma informação encontrada, usando defaults');
      }
    } catch (error) {
      console.error('❌ Erro crítico ao carregar informações de contato:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContactInfo = async (info: ContactTexts) => {
    console.log('💾 [useSupabaseContactInfo] Salvando informações de contato...', info);
    
    try {
      const { data: existing } = await supabase
        .from('contact_info')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const dataToSave = {
        phone: info.phone,
        email: info.email,
        address: info.address,
        whatsapp: info.whatsapp,
        map_embed_url: info.mapEmbedUrl,
        updated_at: new Date().toISOString()
      };

      let result;
      if (existing) {
        console.log('📝 Atualizando registro existente:', existing.id);
        result = await supabase
          .from('contact_info')
          .update(dataToSave)
          .eq('id', existing.id);
      } else {
        console.log('➕ Inserindo primeiro registro');
        result = await supabase
          .from('contact_info')
          .insert(dataToSave);
      }

      if (result.error) {
        console.error('❌ Erro ao salvar informações de contato:', result.error);
        throw result.error;
      }

      setContactInfo(info);
      console.log('✅ [useSupabaseContactInfo] Informações salvas com sucesso!');
      
      // Disparar evento customizado
      console.log('📡 Disparando evento contactInfoUpdated');
      window.dispatchEvent(new CustomEvent('contactInfoUpdated', { 
        detail: info 
      }));
      
    } catch (error) {
      console.error('❌ Erro crítico ao salvar informações de contato:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadContactInfo();
  }, []);

  return {
    contactInfo,
    isLoading,
    loadContactInfo,
    saveContactInfo,
    setContactInfo,
    refetch: loadContactInfo
  };
};
