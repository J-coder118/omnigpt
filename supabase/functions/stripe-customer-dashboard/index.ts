import "xhr_polyfill";
import { serve } from "std/server";
// import Stripe from "stripe";
// import { createClient } from "@supabase/supabase-js";

import { corsHeaders } from "../_shared/cors.ts";
import { response } from "../_common/request.ts";
import { JSON_to_URLEncoded } from "../_common/util.ts";

// const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY") as string, {
//   // This is needed to use the Fetch API rather than relying on the Node http
//   // package.
//   apiVersion: "2022-11-15",
//   httpClient: Stripe.createFetchHttpClient()
// });

serve(async (req: Request) => {
  const { method } = req;

  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { customerId } = await req.json();

  try {
    const body = {
      customer: customerId,
      return_url: `${Deno.env.get("DOMAIN_URL")}/account`
    };
    // const portalSession = await stripe.billingPortal.sessions.create(body);

    const portalSession = await fetch(
      `https://api.stripe.com/v1/billing_portal/sessions`,
      {
        method: "POST",
        headers: {
          ...corsHeaders,
          Authorization: `Bearer ${Deno.env.get("STRIPE_API_KEY")}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: JSON_to_URLEncoded(body)
      }
    );

    const result = await portalSession.json();

    const { url } = result;

    // const supabaseAdminClient = createClient(
    //   Deno.env.get("SUPABASE_URL") ?? "",
    //   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    // );
    //
    // await supabaseAdminClient
    //   .from("users")
    //   .update({ session_checkout: id })
    //   .eq("id", userId);

    return response({ url }, 200);
  } catch (e) {
    console.log(e);
    return response(null, 500);
  }
});
