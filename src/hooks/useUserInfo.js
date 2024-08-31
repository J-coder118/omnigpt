import { useQuery } from "@tanstack/react-query";
import { supabase } from "auth/SupabaseClient";

const useUserInfo = (session) => {
  return useQuery(["userInfo", session?.user?.id], async () => {
    if (!session?.user?.id) {
      return {};
    }
    return Promise.all([
      supabase.from("users").select("*").eq("id", session?.user?.id),
      supabase
        .from("users_subscription")
        .select("*")
        .eq("id", session?.user?.id)
    ]).then(([{ data: userInfoRes }, { data: subInfoRes }]) => {
      return {
        ...(userInfoRes?.length > 0 ? userInfoRes[0] : {}),
        ...(subInfoRes?.length > 0 ? subInfoRes[0] : {})
      };
    });
  });
};

export default useUserInfo;
