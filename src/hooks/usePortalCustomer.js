import { useQuery } from "@tanstack/react-query";
import { supabase } from "auth/SupabaseClient";

const usePortalCustomer = (userInfo) => {
  return useQuery(["urlBilling", userInfo?.customer_id], async () => {
    if (!userInfo?.customer_id) {
      return "";
    }

    return supabase.functions
      .invoke("stripe-customer-dashboard", {
        body: JSON.stringify({
          customerId: userInfo?.customer_id
        })
      })
      .then(({ data }) => {
        return data?.url || "";
      });
  });
};

export default usePortalCustomer;
