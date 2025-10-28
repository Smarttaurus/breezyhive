// Database types will be added here
// TODO: Add table types, function types, and enum types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Tables will be defined here
    }
    Views: {
      // Views will be defined here
    }
    Functions: {
      // Functions will be defined here
    }
    Enums: {
      // Enums will be defined here
    }
  }
}
