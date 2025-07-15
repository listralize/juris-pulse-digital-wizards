export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          categories: Json | null
          created_at: string | null
          form_config: Json | null
          id: string
          page_texts: Json | null
          service_pages: Json | null
          specialized_services: Json | null
          team_members: Json | null
          updated_at: string | null
        }
        Insert: {
          categories?: Json | null
          created_at?: string | null
          form_config?: Json | null
          id?: string
          page_texts?: Json | null
          service_pages?: Json | null
          specialized_services?: Json | null
          team_members?: Json | null
          updated_at?: string | null
        }
        Update: {
          categories?: Json | null
          created_at?: string | null
          form_config?: Json | null
          id?: string
          page_texts?: Json | null
          service_pages?: Json | null
          specialized_services?: Json | null
          team_members?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics_monthly_summary: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          browser_breakdown: Json | null
          created_at: string
          device_breakdown: Json | null
          id: string
          location_breakdown: Json | null
          month_year: string
          top_pages: Json | null
          top_sources: Json | null
          total_page_views: number | null
          total_visitors: number | null
          unique_visitors: number | null
          updated_at: string
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          browser_breakdown?: Json | null
          created_at?: string
          device_breakdown?: Json | null
          id?: string
          location_breakdown?: Json | null
          month_year: string
          top_pages?: Json | null
          top_sources?: Json | null
          total_page_views?: number | null
          total_visitors?: number | null
          unique_visitors?: number | null
          updated_at?: string
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          browser_breakdown?: Json | null
          created_at?: string
          device_breakdown?: Json | null
          id?: string
          location_breakdown?: Json | null
          month_year?: string
          top_pages?: Json | null
          top_sources?: Json | null
          total_page_views?: number | null
          total_visitors?: number | null
          unique_visitors?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          author_image: string | null
          banner: string | null
          content: string
          created_at: string | null
          display_order: number | null
          excerpt: string | null
          featured: boolean | null
          id: string
          is_active: boolean | null
          published_at: string | null
          slug: string
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string
          author_image?: string | null
          banner?: string | null
          content: string
          created_at?: string | null
          display_order?: number | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          is_active?: boolean | null
          published_at?: string | null
          slug: string
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          author_image?: string | null
          banner?: string | null
          content?: string
          created_at?: string | null
          display_order?: number | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          is_active?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      campaign_reports: {
        Row: {
          ad_spend: number
          campaign_name: string
          contracts: number
          conversion_api_config: Json | null
          conversion_rate: number
          cost_per_acquisition: number
          cost_per_lead: number
          created_at: string
          facebook_pixel_config: Json | null
          form_id: string
          form_name: string
          form_submissions: number
          id: string
          lucro_liquido: number
          period_end: string
          period_start: string
          revenue: number
          roi: number
          ticket_medio: number
          updated_at: string
        }
        Insert: {
          ad_spend?: number
          campaign_name: string
          contracts?: number
          conversion_api_config?: Json | null
          conversion_rate?: number
          cost_per_acquisition?: number
          cost_per_lead?: number
          created_at?: string
          facebook_pixel_config?: Json | null
          form_id: string
          form_name: string
          form_submissions?: number
          id?: string
          lucro_liquido?: number
          period_end: string
          period_start: string
          revenue?: number
          roi?: number
          ticket_medio?: number
          updated_at?: string
        }
        Update: {
          ad_spend?: number
          campaign_name?: string
          contracts?: number
          conversion_api_config?: Json | null
          conversion_rate?: number
          cost_per_acquisition?: number
          cost_per_lead?: number
          created_at?: string
          facebook_pixel_config?: Json | null
          form_id?: string
          form_name?: string
          form_submissions?: number
          id?: string
          lucro_liquido?: number
          period_end?: string
          period_start?: string
          revenue?: number
          roi?: number
          ticket_medio?: number
          updated_at?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string
          created_at: string | null
          email: string
          id: string
          map_embed_url: string | null
          phone: string
          updated_at: string | null
          whatsapp: string
        }
        Insert: {
          address?: string
          created_at?: string | null
          email?: string
          id?: string
          map_embed_url?: string | null
          phone?: string
          updated_at?: string | null
          whatsapp?: string
        }
        Update: {
          address?: string
          created_at?: string | null
          email?: string
          id?: string
          map_embed_url?: string | null
          phone?: string
          updated_at?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          campaign_medium: string | null
          campaign_name: string | null
          campaign_source: string | null
          conversion_value: number | null
          created_at: string
          event_action: string
          event_category: string | null
          event_label: string | null
          event_type: string
          form_id: string | null
          form_name: string | null
          id: string
          lead_data: Json | null
          page_url: string
          referrer: string | null
          session_id: string
          timestamp: string
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          campaign_medium?: string | null
          campaign_name?: string | null
          campaign_source?: string | null
          conversion_value?: number | null
          created_at?: string
          event_action: string
          event_category?: string | null
          event_label?: string | null
          event_type: string
          form_id?: string | null
          form_name?: string | null
          id?: string
          lead_data?: Json | null
          page_url: string
          referrer?: string | null
          session_id: string
          timestamp?: string
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          campaign_medium?: string | null
          campaign_name?: string | null
          campaign_source?: string | null
          conversion_value?: number | null
          created_at?: string
          event_action?: string
          event_category?: string | null
          event_label?: string | null
          event_type?: string
          form_id?: string | null
          form_name?: string | null
          id?: string
          lead_data?: Json | null
          page_url?: string
          referrer?: string | null
          session_id?: string
          timestamp?: string
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      footer_info: {
        Row: {
          company_name: string
          created_at: string | null
          description: string
          id: string
          updated_at: string | null
        }
        Insert: {
          company_name?: string
          created_at?: string | null
          description?: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          description?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      form_leads: {
        Row: {
          browser: string | null
          city: string | null
          conversion_value: number | null
          country: string | null
          created_at: string
          device_type: string | null
          form_id: string | null
          form_name: string | null
          id: string
          ip_address: string | null
          is_whatsapp_conversion: boolean | null
          lead_data: Json
          session_id: string
          source_page: string | null
          status: string | null
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          conversion_value?: number | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          form_id?: string | null
          form_name?: string | null
          id?: string
          ip_address?: string | null
          is_whatsapp_conversion?: boolean | null
          lead_data: Json
          session_id: string
          source_page?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          conversion_value?: number | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          form_id?: string | null
          form_name?: string | null
          id?: string
          ip_address?: string | null
          is_whatsapp_conversion?: boolean | null
          lead_data?: Json
          session_id?: string
          source_page?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      law_categories: {
        Row: {
          banner_subtitle: string | null
          banner_title: string | null
          category_key: string
          color: string | null
          created_at: string | null
          description: string | null
          description_override: string | null
          display_order: number | null
          full_content: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          title_override: string | null
          updated_at: string | null
        }
        Insert: {
          banner_subtitle?: string | null
          banner_title?: string | null
          category_key: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_override?: string | null
          display_order?: number | null
          full_content?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          title_override?: string | null
          updated_at?: string | null
        }
        Update: {
          banner_subtitle?: string | null
          banner_title?: string | null
          category_key?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_override?: string | null
          display_order?: number | null
          full_content?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          title_override?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      link_tree: {
        Row: {
          animation_style: string | null
          avatar_size: string | null
          avatar_url: string | null
          background_color: string | null
          background_gradient: string | null
          background_image: string | null
          background_opacity: number | null
          background_type: string | null
          background_video: string | null
          button_style: string | null
          created_at: string | null
          custom_css: string | null
          description: string | null
          description_color: string | null
          description_size: string | null
          footer_background_color: string | null
          footer_enabled: boolean | null
          footer_social_links: Json | null
          footer_style: string | null
          footer_text: string | null
          footer_text_color: string | null
          id: string
          is_active: boolean | null
          show_analytics: boolean | null
          text_color: string | null
          theme: string | null
          title: string
          title_color: string | null
          title_font: string | null
          title_size: string | null
          updated_at: string | null
        }
        Insert: {
          animation_style?: string | null
          avatar_size?: string | null
          avatar_url?: string | null
          background_color?: string | null
          background_gradient?: string | null
          background_image?: string | null
          background_opacity?: number | null
          background_type?: string | null
          background_video?: string | null
          button_style?: string | null
          created_at?: string | null
          custom_css?: string | null
          description?: string | null
          description_color?: string | null
          description_size?: string | null
          footer_background_color?: string | null
          footer_enabled?: boolean | null
          footer_social_links?: Json | null
          footer_style?: string | null
          footer_text?: string | null
          footer_text_color?: string | null
          id?: string
          is_active?: boolean | null
          show_analytics?: boolean | null
          text_color?: string | null
          theme?: string | null
          title?: string
          title_color?: string | null
          title_font?: string | null
          title_size?: string | null
          updated_at?: string | null
        }
        Update: {
          animation_style?: string | null
          avatar_size?: string | null
          avatar_url?: string | null
          background_color?: string | null
          background_gradient?: string | null
          background_image?: string | null
          background_opacity?: number | null
          background_type?: string | null
          background_video?: string | null
          button_style?: string | null
          created_at?: string | null
          custom_css?: string | null
          description?: string | null
          description_color?: string | null
          description_size?: string | null
          footer_background_color?: string | null
          footer_enabled?: boolean | null
          footer_social_links?: Json | null
          footer_style?: string | null
          footer_text?: string | null
          footer_text_color?: string | null
          id?: string
          is_active?: boolean | null
          show_analytics?: boolean | null
          text_color?: string | null
          theme?: string | null
          title?: string
          title_color?: string | null
          title_font?: string | null
          title_size?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      link_tree_items: {
        Row: {
          background_color: string | null
          button_style: string | null
          card_button_text: string | null
          card_content: string | null
          card_format: string | null
          card_image: string | null
          card_price: string | null
          card_size: string | null
          click_count: number | null
          created_at: string | null
          display_order: number | null
          form_fields: Json | null
          form_id: string | null
          hover_effect: string | null
          icon: string | null
          icon_color: string | null
          icon_size: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          item_type: string | null
          link_tree_id: string | null
          text_color: string | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          background_color?: string | null
          button_style?: string | null
          card_button_text?: string | null
          card_content?: string | null
          card_format?: string | null
          card_image?: string | null
          card_price?: string | null
          card_size?: string | null
          click_count?: number | null
          created_at?: string | null
          display_order?: number | null
          form_fields?: Json | null
          form_id?: string | null
          hover_effect?: string | null
          icon?: string | null
          icon_color?: string | null
          icon_size?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          item_type?: string | null
          link_tree_id?: string | null
          text_color?: string | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          background_color?: string | null
          button_style?: string | null
          card_button_text?: string | null
          card_content?: string | null
          card_format?: string | null
          card_image?: string | null
          card_price?: string | null
          card_size?: string | null
          click_count?: number | null
          created_at?: string | null
          display_order?: number | null
          form_fields?: Json | null
          form_id?: string | null
          hover_effect?: string | null
          icon?: string | null
          icon_color?: string | null
          icon_size?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          item_type?: string | null
          link_tree_id?: string | null
          text_color?: string | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_tree_items_link_tree_id_fkey"
            columns: ["link_tree_id"]
            isOneToOne: false
            referencedRelation: "link_tree"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          budget: number | null
          campaign_medium: string | null
          campaign_name: string
          campaign_source: string | null
          campaign_type: string | null
          clicks: number | null
          conversions: number | null
          cost: number | null
          created_at: string
          end_date: string | null
          goals: string | null
          id: string
          impressions: number | null
          start_date: string | null
          status: string | null
          target_audience: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          budget?: number | null
          campaign_medium?: string | null
          campaign_name: string
          campaign_source?: string | null
          campaign_type?: string | null
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string
          end_date?: string | null
          goals?: string | null
          id?: string
          impressions?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          budget?: number | null
          campaign_medium?: string | null
          campaign_name?: string
          campaign_source?: string | null
          campaign_type?: string | null
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string
          end_date?: string | null
          goals?: string | null
          id?: string
          impressions?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      marketing_settings: {
        Row: {
          created_at: string
          custom_body_scripts: string | null
          custom_head_scripts: string | null
          event_tracking_config: Json | null
          facebook_conversion_api_token: string | null
          facebook_custom_code: string | null
          facebook_pixel_enabled: boolean | null
          facebook_pixel_id: string | null
          form_tracking_config: Json | null
          google_analytics_custom_code: string | null
          google_analytics_enabled: boolean | null
          google_analytics_id: string | null
          google_tag_manager_enabled: boolean | null
          google_tag_manager_id: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_body_scripts?: string | null
          custom_head_scripts?: string | null
          event_tracking_config?: Json | null
          facebook_conversion_api_token?: string | null
          facebook_custom_code?: string | null
          facebook_pixel_enabled?: boolean | null
          facebook_pixel_id?: string | null
          form_tracking_config?: Json | null
          google_analytics_custom_code?: string | null
          google_analytics_enabled?: boolean | null
          google_analytics_id?: string | null
          google_tag_manager_enabled?: boolean | null
          google_tag_manager_id?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_body_scripts?: string | null
          custom_head_scripts?: string | null
          event_tracking_config?: Json | null
          facebook_conversion_api_token?: string | null
          facebook_custom_code?: string | null
          facebook_pixel_enabled?: boolean | null
          facebook_pixel_id?: string | null
          form_tracking_config?: Json | null
          google_analytics_custom_code?: string | null
          google_analytics_enabled?: boolean | null
          google_analytics_id?: string | null
          google_tag_manager_enabled?: boolean | null
          google_tag_manager_id?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_benefits: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          service_page_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          service_page_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          service_page_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_benefits_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      service_faq: {
        Row: {
          answer: string
          created_at: string | null
          display_order: number | null
          id: string
          question: string
          service_page_id: string | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          question: string
          service_page_id?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          question?: string
          service_page_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_faq_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      service_pages: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          href: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          href?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          href?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_process_steps: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          service_page_id: string | null
          step_number: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          service_page_id?: string | null
          step_number: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          service_page_id?: string | null
          step_number?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_process_steps_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      service_testimonials: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          image: string | null
          name: string
          role: string | null
          service_page_id: string | null
          text: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          image?: string | null
          name: string
          role?: string | null
          service_page_id?: string | null
          text: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          image?: string | null
          name?: string
          role?: string | null
          service_page_id?: string | null
          text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_testimonials_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          about_description: string
          about_image: string | null
          about_media_type: string | null
          about_title: string
          areas_title: string
          client_area_description: string
          client_area_title: string
          client_portal_link: string | null
          contact_subtitle: string
          contact_title: string
          created_at: string | null
          hero_background_image: string | null
          hero_primary_button_link: string | null
          hero_primary_button_text: string | null
          hero_secondary_button_link: string | null
          hero_secondary_button_text: string | null
          hero_subtitle: string
          hero_title: string
          id: string
          team_title: string
          updated_at: string | null
        }
        Insert: {
          about_description?: string
          about_image?: string | null
          about_media_type?: string | null
          about_title?: string
          areas_title?: string
          client_area_description?: string
          client_area_title?: string
          client_portal_link?: string | null
          contact_subtitle?: string
          contact_title?: string
          created_at?: string | null
          hero_background_image?: string | null
          hero_primary_button_link?: string | null
          hero_primary_button_text?: string | null
          hero_secondary_button_link?: string | null
          hero_secondary_button_text?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          team_title?: string
          updated_at?: string | null
        }
        Update: {
          about_description?: string
          about_image?: string | null
          about_media_type?: string | null
          about_title?: string
          areas_title?: string
          client_area_description?: string
          client_area_title?: string
          client_portal_link?: string | null
          contact_subtitle?: string
          contact_title?: string
          created_at?: string | null
          hero_background_image?: string | null
          hero_primary_button_link?: string | null
          hero_primary_button_text?: string | null
          hero_secondary_button_link?: string | null
          hero_secondary_button_text?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          team_title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          email: string
          id: string
          image: string | null
          is_active: boolean | null
          name: string
          oab: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          email: string
          id?: string
          image?: string | null
          is_active?: boolean | null
          name: string
          oab: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          email?: string
          id?: string
          image?: string | null
          is_active?: boolean | null
          name?: string
          oab?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          bounce: boolean | null
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          id: string
          ip_address: string | null
          os: string | null
          page_title: string | null
          page_url: string
          referrer: string | null
          screen_resolution: string | null
          scroll_depth: number | null
          session_duration: number | null
          session_id: string
          session_start: string | null
          time_on_page: number | null
          timestamp: string
          updated_at: string
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_title?: string | null
          page_url: string
          referrer?: string | null
          screen_resolution?: string | null
          scroll_depth?: number | null
          session_duration?: number | null
          session_id: string
          session_start?: string | null
          time_on_page?: number | null
          timestamp?: string
          updated_at?: string
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_title?: string | null
          page_url?: string
          referrer?: string | null
          screen_resolution?: string | null
          scroll_depth?: number | null
          session_duration?: number | null
          session_id?: string
          session_start?: string | null
          time_on_page?: number | null
          timestamp?: string
          updated_at?: string
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_analytics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
