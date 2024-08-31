import { serve } from "std/server";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import _get from "https://deno.land/x/lodash@4.17.15-es/get.js";

import { Database } from "../_types/database.ts";
import { response } from "../_common/request.ts";
import { getChatCompletion } from "../_common/openai.ts";

type ThreadRecord = Database["public"]["Tables"]["threads"]["Row"];

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: ThreadRecord;
  shema: "public";
  old_record: null | ThreadRecord;
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const getFirstMessageOfThreads = async (
  supabaseClient: SupabaseClient,
  threadId: string,
  time: number
): Promise<string | null> => {
  const { data, error } = await supabaseClient
    .from("messages")
    .select("message_text")
    .eq("thread_id", threadId)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    if (time > 5) {
      return null;
    }

    await delay(3000 * (time + 1));
    return getFirstMessageOfThreads(supabaseClient, threadId, time + 1);
  }

  return data.message_text;
};

const getTextFromOpenAI = async (
  messageText: string | null,
  time: number
): Promise<string | null> => {
  if (!messageText) {
    return null;
  }

  const responseAI = await getChatCompletion(
    [
      {
        role: "user",
        content: `Make a short title with max 3 words for a chat that is related to this: ${messageText}`
      }
    ],
    false
  );

  if (responseAI.ok) {
    const dataResponse = await responseAI.json();

    const title = _get(dataResponse, "choices[0].message.content");
    if (title.split(" ").length <= 5) {
      return title;
    }

    await delay(2000 * (time + 1));
    return getTextFromOpenAI(messageText, time + 1);
  }

  if (time > 5) {
    return null;
  }

  await delay(2000 * (time + 1));
  return getTextFromOpenAI(messageText, time + 1);
};

serve(async (req: Request) => {
  const payload: WebhookPayload = await req.json();

  await delay(3000);

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const messageText = await getFirstMessageOfThreads(
    supabaseClient,
    payload.record.thread_id,
    0
  );

  let textResponse = await getTextFromOpenAI(messageText, 0);
  if (textResponse) {
    textResponse = textResponse.replace(/(^"+|"+$)/gm, "");
    // Update thread name into database
    await supabaseClient
      .from("threads")
      .update({ thread_name: textResponse })
      .eq("thread_id", payload.record.thread_id);

    return response({});
  }

  return response({}, 500);
});
