import { supabase } from "auth/SupabaseClient";

// get all CRMs integrated with my account
export const getCRMs = async () => {
  const user_id = supabase.auth.user().id;

  let { data: integration_auth, error } = await supabase
    .from("integration_auth")
    .select("*")
    .eq("user_id", user_id);
  if (error) return { data: integration_auth, error };
  if (integration_auth.length === 0)
    return { data: integration_auth, error: true };
  return { data: integration_auth, error };
};
