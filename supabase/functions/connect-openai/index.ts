import "xhr_polyfill";
import { serve } from "std/server";

import { corsHeaders } from "../_shared/cors.ts";
import { getChatCompletion } from "../_common/openai.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { messages, gptModel } = await req.json();

  return getChatCompletion(messages, true, gptModel);
});
