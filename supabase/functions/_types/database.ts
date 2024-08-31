export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      feature_waitlist: {
        Row: {
          country: string | null;
          created_at: string | null;
          feature_type: string | null;
          id: number;
          reason: string | null;
          user_id: string | null;
        };
        Insert: {
          country?: string | null;
          created_at?: string | null;
          feature_type?: string | null;
          id?: number;
          reason?: string | null;
          user_id?: string | null;
        };
        Update: {
          country?: string | null;
          created_at?: string | null;
          feature_type?: string | null;
          id?: number;
          reason?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feature_waitlist_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          doc_text: string | null;
          doc_url: string | null;
          id: number;
          message_id: string;
          message_text: string | null;
          receiver: string | null;
          sender: string | null;
          sent_date: string | null;
          thread_id: string | null;
          type_id: number | null;
        };
        Insert: {
          doc_text?: string | null;
          doc_url?: string | null;
          id?: number;
          message_id?: string;
          message_text?: string | null;
          receiver?: string | null;
          sender?: string | null;
          sent_date?: string | null;
          thread_id?: string | null;
          type_id?: number | null;
        };
        Update: {
          doc_text?: string | null;
          doc_url?: string | null;
          id?: number;
          message_id?: string;
          message_text?: string | null;
          receiver?: string | null;
          sender?: string | null;
          sent_date?: string | null;
          thread_id?: string | null;
          type_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey";
            columns: ["thread_id"];
            referencedRelation: "threads";
            referencedColumns: ["thread_id"];
          }
        ];
      };
      payment_failure: {
        Row: {
          created_at: string | null;
          id: string;
          reason: string | null;
          status: string | null;
          userId: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          reason?: string | null;
          status?: string | null;
          userId?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          reason?: string | null;
          status?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payment_failure_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payment_failure_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users_full_info";
            referencedColumns: ["id"];
          }
        ];
      };
      plans: {
        Row: {
          created_at: string | null;
          id: string;
          name: string | null;
          price: number | null;
          status: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name?: string | null;
          price?: number | null;
          status?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string | null;
          price?: number | null;
          status?: string | null;
        };
        Relationships: [];
      };
      slack_app_users: {
        Row: {
          access_token: string | null;
          app_id: string;
          authed_user_id: string | null;
          bot_user_id: string | null;
          enterprise: string | null;
          is_enterprise_install: boolean | null;
          previous_message: string | null;
          scope: string | null;
          team_id: string;
          team_name: string | null;
          thread_id: string | null;
          thread_ts: string | null;
          token_type: string | null;
          user_id: string | null;
          userid: string | null;
        };
        Insert: {
          access_token?: string | null;
          app_id: string;
          authed_user_id?: string | null;
          bot_user_id?: string | null;
          enterprise?: string | null;
          is_enterprise_install?: boolean | null;
          previous_message?: string | null;
          scope?: string | null;
          team_id: string;
          team_name?: string | null;
          thread_id?: string | null;
          thread_ts?: string | null;
          token_type?: string | null;
          user_id?: string | null;
          userid?: string | null;
        };
        Update: {
          access_token?: string | null;
          app_id?: string;
          authed_user_id?: string | null;
          bot_user_id?: string | null;
          enterprise?: string | null;
          is_enterprise_install?: boolean | null;
          previous_message?: string | null;
          scope?: string | null;
          team_id?: string;
          team_name?: string | null;
          thread_id?: string | null;
          thread_ts?: string | null;
          token_type?: string | null;
          user_id?: string | null;
          userid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "slack_app_users_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      slack_session: {
        Row: {
          created_at: string | null;
          previous_message: string | null;
          sender: string;
          thread_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          previous_message?: string | null;
          sender: string;
          thread_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          previous_message?: string | null;
          sender?: string;
          thread_id?: string | null;
        };
        Relationships: [];
      };
      thread_shared: {
        Row: {
          role: number | null;
          thread_id: string;
          user_id: string;
        };
        Insert: {
          role?: number | null;
          thread_id: string;
          user_id: string;
        };
        Update: {
          role?: number | null;
          thread_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "thread_shared_thread_id_fkey";
            columns: ["thread_id"];
            referencedRelation: "threads";
            referencedColumns: ["thread_id"];
          },
          {
            foreignKeyName: "thread_shared_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "thread_shared_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users_full_info";
            referencedColumns: ["id"];
          }
        ];
      };
      threads: {
        Row: {
          created_at: string | null;
          shareable: boolean | null;
          thread_id: string;
          thread_list_id: number;
          thread_name: string;
          user_identifier: string;
        };
        Insert: {
          created_at?: string | null;
          shareable?: boolean | null;
          thread_id?: string;
          thread_list_id?: number;
          thread_name?: string;
          user_identifier: string;
        };
        Update: {
          created_at?: string | null;
          shareable?: boolean | null;
          thread_id?: string;
          thread_list_id?: number;
          thread_name?: string;
          user_identifier?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          country_code: string | null;
          created_at: string | null;
          id: string;
          language: string | null;
          name: string | null;
          whatsapp_number: string | null;
        };
        Insert: {
          country_code?: string | null;
          created_at?: string | null;
          id: string;
          language?: string | null;
          name?: string | null;
          whatsapp_number?: string | null;
        };
        Update: {
          country_code?: string | null;
          created_at?: string | null;
          id?: string;
          language?: string | null;
          name?: string | null;
          whatsapp_number?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users_full_info";
            referencedColumns: ["id"];
          }
        ];
      };
      users_subscription: {
        Row: {
          created_at: string | null;
          customer_id: string | null;
          id: string;
          period_end: number | null;
          plan_id: string | null;
          session_checkout: string | null;
          subscription_id: string | null;
          subscription_status: string | null;
        };
        Insert: {
          created_at?: string | null;
          customer_id?: string | null;
          id: string;
          period_end?: number | null;
          plan_id?: string | null;
          session_checkout?: string | null;
          subscription_id?: string | null;
          subscription_status?: string | null;
        };
        Update: {
          created_at?: string | null;
          customer_id?: string | null;
          id?: string;
          period_end?: number | null;
          plan_id?: string | null;
          session_checkout?: string | null;
          subscription_id?: string | null;
          subscription_status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_subscription_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_subscription_id_fkey";
            columns: ["id"];
            referencedRelation: "users_full_info";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_subscription_plan_id_fkey";
            columns: ["plan_id"];
            referencedRelation: "plans";
            referencedColumns: ["id"];
          }
        ];
      };
      whatsapp_session: {
        Row: {
          created_at: string | null;
          previous_message: string | null;
          sender: string;
          thread_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          previous_message?: string | null;
          sender: string;
          thread_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          previous_message?: string | null;
          sender?: string;
          thread_id?: string | null;
        };
        Relationships: [];
      };
      slack_app_users: { // New table definition for slack_app_users
        Row: {
          app_id: string;
          authed_user_id: string;
          scope: string;
          token_type: string;
          access_token: string;
          bot_user_id: string;
          team_id: string;
          team_name: string;
          enterprise: string | null;
          is_enterprise_install: boolean;
          userId: string; // Assuming userId is of type string in the new table
        };
        Insert: {
          app_id: string;
          authed_user_id: string;
          scope: string;
          token_type: string;
          access_token: string;
          bot_user_id: string;
          team_id: string;
          team_name: string;
          enterprise: string | null;
          is_enterprise_install: boolean;
          userId: string;
        };
        Update: {
          app_id?: string;
          authed_user_id?: string;
          scope?: string;
          token_type?: string;
          access_token?: string;
          bot_user_id?: string;
          team_id?: string;
          team_name?: string;
          enterprise?: string | null;
          is_enterprise_install?: boolean;
          userId?: string;
        };
      
    };
    };
    Views: {
      users_full_info: {
        Row: {
          email: string | null;
          id: string;
          language: string | null;
          name: string | null;
          period_end: number | null;
          plan_id: string | null;
          subscription_status: string | null;
          whatsapp_number: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_subscription_plan_id_fkey";
            columns: ["plan_id"];
            referencedRelation: "plans";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}