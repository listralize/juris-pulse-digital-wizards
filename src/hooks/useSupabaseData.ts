
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { TeamMember, PageTexts, ServicePage, CategoryInfo, SpecializedService } from '../types/adminTypes';
import { defaultTeamMembers } from '../data/defaultTeamMembers';
import { defaultPageTexts } from '../data/defaultPageTexts';
import { defaultServicePages } from '../data/defaultServicePages';
import { defaultSpecializedServices } from '../data/defaultSpecializedServices';
import { categories as defaultCategories } from '../types/adminTypes';

export const useSupabaseData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>(defaultPageTexts);
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>(defaultCategories);
  const [specializedServices, setSpecializedServices] = useState<SpecializedService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Supabase or fallback to localStorage/defaults
  const loadData = async () => {
    try {
      console.log('Loading data from Supabase...');
      
      // Try to load from Supabase first
      const { data: supabaseData, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading from Supabase:', error);
        throw error;
      }

      if (supabaseData) {
        console.log('Data loaded from Supabase');
        setTeamMembers(supabaseData.team_members || defaultTeamMembers);
        setPageTexts(supabaseData.page_texts || defaultPageTexts);
        setServicePages(supabaseData.service_pages || defaultServicePages);
        setCategories(supabaseData.categories || defaultCategories);
        setSpecializedServices(supabaseData.specialized_services || defaultSpecializedServices);
      } else {
        console.log('No data in Supabase, loading from localStorage or defaults');
        // Fallback to localStorage
        const savedTeam = localStorage.getItem('adminTeamMembers');
        const savedTexts = localStorage.getItem('adminPageTexts');
        const savedPages = localStorage.getItem('adminServicePages');
        const savedCategories = localStorage.getItem('adminCategories');
        const savedServices = localStorage.getItem('adminSpecializedServices');

        setTeamMembers(savedTeam ? JSON.parse(savedTeam) : defaultTeamMembers);
        setPageTexts(savedTexts ? JSON.parse(savedTexts) : defaultPageTexts);
        setServicePages(savedPages ? JSON.parse(savedPages) : defaultServicePages);
        setCategories(savedCategories ? JSON.parse(savedCategories) : defaultCategories);
        setSpecializedServices(savedServices ? JSON.parse(savedServices) : defaultSpecializedServices);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Use defaults if everything fails
      setTeamMembers(defaultTeamMembers);
      setPageTexts(defaultPageTexts);
      setServicePages(defaultServicePages);
      setCategories(defaultCategories);
      setSpecializedServices(defaultSpecializedServices);
    }
    
    setIsLoading(false);
  };

  // Save data to Supabase
  const saveData = async () => {
    try {
      console.log('Saving data to Supabase...');
      
      const dataToSave = {
        team_members: teamMembers,
        page_texts: pageTexts,
        service_pages: servicePages,
        categories: categories,
        specialized_services: specializedServices,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('admin_settings')
        .upsert(dataToSave, { onConflict: 'id' });

      if (error) {
        console.error('Error saving to Supabase:', error);
        throw error;
      }

      console.log('Data saved to Supabase successfully');
      
      // Also save to localStorage as backup
      localStorage.setItem('adminTeamMembers', JSON.stringify(teamMembers));
      localStorage.setItem('adminPageTexts', JSON.stringify(pageTexts));
      localStorage.setItem('adminServicePages', JSON.stringify(servicePages));
      localStorage.setItem('adminCategories', JSON.stringify(categories));
      localStorage.setItem('adminSpecializedServices', JSON.stringify(specializedServices));

    } catch (error) {
      console.error('Error saving data:', error);
      // Fallback to localStorage if Supabase fails
      localStorage.setItem('adminTeamMembers', JSON.stringify(teamMembers));
      localStorage.setItem('adminPageTexts', JSON.stringify(pageTexts));
      localStorage.setItem('adminServicePages', JSON.stringify(servicePages));
      localStorage.setItem('adminCategories', JSON.stringify(categories));
      localStorage.setItem('adminSpecializedServices', JSON.stringify(specializedServices));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
  };

  const savePageTexts = (texts: PageTexts) => {
    setPageTexts(texts);
  };

  const saveServicePages = (pages: ServicePage[]) => {
    setServicePages(pages);
    window.dispatchEvent(new CustomEvent('servicePagesUpdated', { detail: pages }));
  };

  const saveCategories = (cats: CategoryInfo[]) => {
    setCategories(cats);
    window.dispatchEvent(new CustomEvent('categoriesUpdated', { detail: cats }));
  };

  const saveSpecializedServices = (services: SpecializedService[]) => {
    setSpecializedServices(services);
  };

  // Auto-save when data changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [teamMembers, pageTexts, servicePages, categories, specializedServices, isLoading]);

  return {
    teamMembers,
    pageTexts,
    servicePages,
    categories,
    specializedServices,
    isLoading,
    saveTeamMembers,
    savePageTexts,
    saveServicePages,
    saveCategories,
    saveSpecializedServices,
    refreshData: loadData
  };
};
