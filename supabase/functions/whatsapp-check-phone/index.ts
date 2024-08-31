import "xhr_polyfill";
import { serve } from "std/server";

import { response } from "../_common/request.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { sendMessageToWhatsapp } from "../_common/whatsapp.ts";

serve(async (req) => {
  const { method } = req;

  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { phoneNumber } = await req.json();

  const resultResponse = await sendMessageToWhatsapp("", phoneNumber, {
    type: "template",
    template: {
      name: "welcomeomnigpt",
      language: {
        code: "en_US"
      }
    }
  });

  return response(await resultResponse.text());
});
