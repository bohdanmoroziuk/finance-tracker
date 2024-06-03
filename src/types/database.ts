export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          description: string | null
          id: number
          type: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          type: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          type?: string
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

export type Transaction = Database['public']['Tables']['transactions']['Row']

export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
