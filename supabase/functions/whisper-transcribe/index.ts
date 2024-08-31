// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from "std/server";
import { corsHeaders } from "../_shared/cors.ts";


serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const formData = await req.formData();

  try {
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        ...corsHeaders,
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
      },  
      body: formData
    });

    console.log(response);
    const transcription = await response.json()
    return new Response(JSON.stringify({ text: transcription.text }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return error
    // throw error;
  }

})

