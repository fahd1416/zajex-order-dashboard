import { createClient } from '@supabase/supabase-js'

// Using environment variables or fallback to empty strings for now.
// The user will need to provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
