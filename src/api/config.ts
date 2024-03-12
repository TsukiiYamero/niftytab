import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const supabase = createClient(supabaseUrl, supabaseKey);
