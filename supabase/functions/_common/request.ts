import { corsHeaders } from "../_shared/cors.ts";

export function response(data: any, status: number = 200) {
  const dataString = typeof data == "string" ? data : JSON.stringify(data);
  return new Response(dataString, {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status
  });
}
