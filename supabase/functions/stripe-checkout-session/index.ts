import "xhr_polyfill";
import { serve } from "std/server";
// import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { corsHeaders } from "../_shared/cors.ts";
import { response } from "../_common/request.ts";
import { JSON_to_URLEncoded } from "../_common/util.ts";

// const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY") as string, {
//   // This is needed to use the Fetch API rather than relying on the Node http
//   // package.
//   apiVersion: "2022-11-15",
//   httpClient: Stripe.createFetchHttpClient()
// });

const supabaseAdminClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req: Request) => {
  const { method } = req;

  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const { userId, email, customerId } = await req.json();

  const { data } = await supabaseAdminClient
    .from("users_subscription")
    .select("*")
    .eq("id", userId);

  if (data && data[0]?.session_checkout) {
    // const session = await stripe.checkout.sessions.retrieve(
    //   data[0].session_checkout
    // );
    let session = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${data[0].session_checkout}`,
      {
        method: "GET",
        headers: {
          ...corsHeaders,
          Authorization: `Bearer ${Deno.env.get("STRIPE_API_KEY")}`,
          "Content-Type": "application/json"
        }
      }
    );
    session = await session.json();

    if (session.url) return response({ url: session.url }, 200);
  }

  const priceId = Deno.env.get("STRIPE_PRODUCT_ID");
  const customerData = customerId
    ? { customer: customerId }
    : { customer_email: email };

  try {
    const body = {
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "pause"
          }
        },
        trial_period_days: 30
      },
      client_reference_id: email,
      allow_promotion_codes: true,
      ...customerData,
      metadata: {
        price: priceId
      },
      success_url: `${Deno.env.get(
        "DOMAIN_URL"
      )}/app/home?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get("DOMAIN_URL")}/app/home`
    };
    // const session = await stripe.checkout.sessions.create(body);

    const session = await fetch(`https://api.stripe.com/v1/checkout/sessions`, {
      method: "POST",
      headers: {
        ...corsHeaders,
        Authorization: `Bearer ${Deno.env.get("STRIPE_API_KEY")}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: JSON_to_URLEncoded(body)
    });

    const result = await session.json();
    const { id, url } = result;

    await supabaseAdminClient
      .from("users_subscription")
      .upsert({ id: userId, session_checkout: id });

    return response({ url }, 200);
  } catch (e) {
    console.log(e);
    return response(null, 500);
  }
});
