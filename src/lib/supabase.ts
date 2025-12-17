import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Application {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  experience_level: string;
  current_occupation: string;
  why_join: string;
  payment_plan: string;
  payment_status?: string;
  created_at?: string;
}
