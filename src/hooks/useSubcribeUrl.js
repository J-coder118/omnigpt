import { useQuery } from "@tanstack/react-query";
import { supabase } from "auth/SupabaseClient";

const useSubcribeUrl = (session) => {
  return useQuery(["urlSubcribe", session?.user?.id], async () => {
    if (!session?.user) {
      return "";
    }

    return supabase.functions
      .invoke("stripe-checkout-session", {
        body: JSON.stringify({
          email: session?.user?.email,
          userId: session?.user?.id
        })
      })
      .then(({ data }) => {
        return data?.url || "";
      }).catch((err) => console.log(err))
  });
};

export default useSubcribeUrl;
