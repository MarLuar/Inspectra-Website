import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration - same as mobile app
const supabaseUrl = "https://npnkrjhtmnzdlkfwumxv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmtyamh0bW56ZGxrZnd1bXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjYwNTEsImV4cCI6MjA4NTM0MjA1MX0.aGoixuFAgROpvaWhnqfkNAag7SrYtiP4efWFa8Hqw6U";

// Create Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name
export const STORAGE_BUCKET = 'documents';

export default supabase;
