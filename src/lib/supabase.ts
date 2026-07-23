import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://urkpymmdcfnxpqsadtim.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_yYndzGIGoXSL_CL5zyDUkA_rRhIHpe6'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
