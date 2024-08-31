import { corsHeaders } from "../_shared/cors.ts";
import { Imessage } from "../_types/openai.ts";
import { CreateChatCompletionRequest } from "../_types/openai.ts";

export async function getChatCompletion(
  messages: Imessage[],
  stream: boolean = false,
  gptModel: string = 'gpt-4'
) {
  const completionConfig: CreateChatCompletionRequest = {
    model: gptModel,
    max_tokens: 2000,
    messages: messages,
    temperature: 0.7,
    stream
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        ...corsHeaders,
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(completionConfig)
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    // }
    console.log('completionConfig: ', completionConfig)
    console.log(response)
    return response;  
  } catch (error) {
    console.error(error);
    return error
    // throw error;
  }
}
