import { serve } from "std/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import _get from "https://deno.land/x/lodash@4.17.15-es/get.js";
import { endOfDay, getUnixTime, addMonths, addDays } from "date_fns";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY") as string, {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  apiVersion: "2022-11-15",
  httpClient: Stripe.createFetchHttpClient()
});
// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider();

const getExpireDate = () => {
  const endOfToday = endOfDay(new Date());
  const endOfNextDay = addDays(endOfToday, 1);
  return getUnixTime(addMonths(endOfNextDay, 1));
};

serve(async (request: Request) => {
  const signature = request.headers.get("Stripe-Signature");

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text();
  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET")!,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.log("🚀 ~ file: index.ts:30 ~ serve ~ err:", err);
    return new Response(err.message, { status: 400 });
  }

  const supabaseAdminClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  switch (receivedEvent.type) {
    case "checkout.session.completed": {
      const { customer, id, subscription, metadata } = _get(
        receivedEvent,
        "data.object"
      );
      await supabaseAdminClient
        .from("users_subscription")
        .update({
          subscription_id: subscription,
          customer_id: customer,
          plan_id: metadata.price,
          subscription_status: "active",
          period_end: getExpireDate()
        })
        .eq("session_checkout", id);
      break;
    }
    case "invoice.payment_failed": {
      const { subscription } = _get(receivedEvent, "data.object");

      await supabaseAdminClient
        .from("users_subscription")
        .update({ subscription_status: "suspended" })
        .eq("subscription_id", subscription);
      // TODO: Update payment failed
      break;
    }
    case "invoice.paid": {
      const { subscription } = _get(receivedEvent, "data.object");

      await supabaseAdminClient
        .from("users_subscription")
        .update({
          subscription_status: "active",
          period_end: getExpireDate()
        })
        .eq("subscription_id", subscription);
      break;
    }
    case "customer.subscription.updated": {
      const { cancel_at_period_end, id, status } = _get(
        receivedEvent,
        "data.object"
      );

      let newSubscriptionStatus = "active";
      if (status === "past_due") {
        newSubscriptionStatus = "suspended";
      } else {
        newSubscriptionStatus =
          cancel_at_period_end === true ? "canceled" : "active";
      }
      await supabaseAdminClient
        .from("users_subscription")
        .update({
          subscription_status: newSubscriptionStatus
        })
        .eq("subscription_id", id);
      break;
    }
    case "customer.subscription.trial_will_end":
      // TODO: Don't support now
      break;
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
});
