export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          categories: Json | null
          created_at: string | null
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
          id?: string
          page_texts?: Json | null
          service_pages?: Json | null
          specialized_services?: Json | null
          team_members?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string
          created_at: string | null
          email: string
          id: string
          phone: string
          updated_at: string | null
          whatsapp: string
        }
        Insert: {
          address?: string
          created_at?: string | null
          email?: string
          id?: string
          phone?: string
          updated_at?: string | null
          whatsapp?: string
        }
        Update: {
          address?: string
          created_at?: string | null
          email?: string
          id?: string
          phone?: string
          updated_at?: string | null
          whatsapp?: string
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
      law_categories: {
        Row: {
          category_key: string
          color: string | null
          created_at: string | null
          description: string | null
          description_override: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          title_override: string | null
          updated_at: string | null
        }
        Insert: {
          category_key: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_override?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          title_override?: string | null
          updated_at?: string | null
        }
        Update: {
          category_key?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_override?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          title_override?: string | null
          updated_at?: string | null
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
        Relationships: [
          {
            foreignKeyName: "service_pages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "law_categories"
            referencedColumns: ["id"]
          },
        ]
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
          about_title: string
          areas_title: string
          client_area_description: string
          client_area_title: string
          client_portal_link: string | null
          contact_subtitle: string
          contact_title: string
          created_at: string | null
          hero_background_image: string | null
          hero_subtitle: string
          hero_title: string
          id: string
          team_title: string
          updated_at: string | null
        }
        Insert: {
          about_description?: string
          about_image?: string | null
          about_title?: string
          areas_title?: string
          client_area_description?: string
          client_area_title?: string
          client_portal_link?: string | null
          contact_subtitle?: string
          contact_title?: string
          created_at?: string | null
          hero_background_image?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          team_title?: string
          updated_at?: string | null
        }
        Update: {
          about_description?: string
          about_image?: string | null
          about_title?: string
          areas_title?: string
          client_area_description?: string
          client_area_title?: string
          client_portal_link?: string | null
          contact_subtitle?: string
          contact_title?: string
          created_at?: string | null
          hero_background_image?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
