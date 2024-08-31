import { corsHeaders } from "../_shared/cors.ts";

export function sendMessageToWhatsapp(
  phoneNumberId: string,
  customerNumber: string,
  body: any
) {
  return fetch(
    `https://graph.facebook.com/${Deno.env.get("WHATSAPP_API_VERSION")}/${
      phoneNumberId || Deno.env.get("WHATSAPP_PHONE_NUMBER")
    }/messages`,
    {
      method: "POST",
      headers: {
        ...corsHeaders,
        Authorization: `Bearer ${Deno.env.get("WHATSAPP_TOKEN")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: customerNumber,
        ...body
      })
    }
  );
}
