import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseProjURL: string = import.meta.env.VITE_SUPABSE_PROJ_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient: SupabaseClient = createClient(
  supabaseProjURL,
  supabaseAnonKey
);

export default supabaseClient;
