import { SupabaseClient } from "@supabase/supabase-js";
import _get from "https://deno.land/x/lodash@4.17.15-es/get.js";
import { getChatCompletion } from "../_common/openai.ts";
import { response } from "../_common/request.ts";
import locales from "../whatsapp-webhook/locales/index.ts";
import { MessagesRecord, ThreadRecord } from "../whatsapp-webhook/type.ts";
import { sendInteractiveMessage, updateOriginalMessage } from "./slackUtils.ts";
import { selectedThreadBlock, SelectOption, newThredBlock, howToUseChat } from "./constant.ts";
export const sendMessageToSlack = async (channelid, message, slackToken, teamId, supabaseAdminClient, threadts, userId, savePreviousMsg = true) => {

  let body = threadts ? JSON.stringify({
    channel: channelid,
    text: message,
    thread_ts: threadts,
    user: userId
  }) : JSON.stringify({
    channel: channelid,
    text: message,
    user: userId
  })
  await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${slackToken}`,
      "x-slack-retry-num": "1"
    },
    body: body
  });

  return new Response("success", { status: 200, statusText: "HTTP 200 OK" });
}

export async function createNewThread(
  supabaseClient,
  slack_user,
  channelid,
  message_ts
) {
  const { data: insertResult, error } = await supabaseClient
    .from("threads")
    .insert([{ user_identifier: slack_user.user_id }])
    .select();
  console.log(insertResult[0].thread_id)
  if (error) {
    console.log("🚀 ~ file: handler.ts:65 ~ createNewThread ~ error:", error);
    await sendMessageToSlack(channelid, "Something went wrong", slack_user.access_token, slack_user.team_id, supabaseClient, slack_user.thread_ts, slack_user.authed_user_id, false)
    return;
  }
  await sendMessageToSlack(channelid, "New Thread Created", slack_user.access_token, slack_user.team_id, supabaseClient, null, slack_user.authed_user_id, false)
  await UpdateSlackUser(slack_user, insertResult[0].thread_id, "1", supabaseClient)
  await updateOriginalMessage(channelid, message_ts, newThredBlock, slack_user.access_token)
}
export async function showThreads(
  supabaseClient: SupabaseClient,
  slack_user,
  channelid,
  page: number = 1,
  limit: number = 10,
) {
  const { data: threadsOfPhone, count } = await supabaseClient
    .from<ThreadRecord>("threads")
    .select("*", { count: "exact" })
    .eq("user_identifier", slack_user.user_id)
    .range((page - 1) * limit, limit * page - 1)
    .order("thread_list_id", { ascending: false });

  if (!threadsOfPhone || !count) {
    await sendMessageToSlack(channelid, "Something went wrong", slack_user.access_token, slack_user.team_id, supabaseClient, slack_user.thread_ts, false)

    return response("OK", 200)
  }
  // const threadString = threadsOfPhone
  //   ?.map(
  //     (threadData: ThreadRecord, index: number) =>
  //       `Type ${index + 1 + (page - 1) * limit}: ${threadData.thread_name}`
  //   )
  //   .join("\n");
  console.log("threadsOfPhone", threadsOfPhone)
  const selectMenu = {
    "type": "static_select",
    "placeholder": {
      "type": "plain_text",
      "text": "📁 Choose Thread"
    },
    "options": threadsOfPhone.map(option => ({
      "text": {
        "type": "plain_text",
        "text": option.thread_name
      },
      "value": option.thread_id
    }))
  };
  SelectOption[1].elements = [];
  SelectOption[1].elements?.push(selectMenu)
  console.log(SelectOption, "SelectOption")
  sendInteractiveMessage(channelid, slack_user.access_token, null, SelectOption, slack_user.authed_user_id)
  // await sendMessageToSlack(channelid, threadString, slack_user.access_token, slack_user.team_id, supabaseClient, slack_user.thread_ts, false)
  // await UpdateSlackUser(slack_user.team_id, slack_user.thread_id, "2", supabaseClient)


}

export async function insertAndgetMsg(
  userId: string,
  messageText: string,
  threadId: string | null,
  supabaseClient: SupabaseClient
) {
  await supabaseClient.from("messages").insert([
    {
      sender: userId,
      receiver: "CHAT_GPT",
      message_text: messageText,
      thread_id: threadId
    }
  ]);

  console.log(threadId)
  const { data: messages } = await supabaseClient
    .from<MessagesRecord>("messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("id", { ascending: true });


  console.log("previous ", messages)
  const messagesNormalize = messages?.map(
    (whatsapp_message: MessagesRecord) => {
      return {
        role: whatsapp_message.sender !== "CHAT_GPT" ? "user" : "system",
        content: whatsapp_message.message_text
      };
    }
  );

  if (!messagesNormalize) {
    return [];
  }

  return messagesNormalize;
}

export async function chatWithGPT(
  messageText: string,
  supabaseClient: SupabaseClient,
  channelId,
  slack_user,
  lang: "en",
) {
  const dataLang = locales[lang];
  const messages = await insertAndgetMsg(
    slack_user.user_id,
    messageText,
    slack_user.thread_id,
    supabaseClient
  );

  const responseAI = await getChatCompletion([...messages], false);
  const dataResponse = await responseAI.json();
  let textResponse = _get(dataResponse, "choices[0].message.content");
  if (textResponse) {
    await supabaseClient.from("messages").insert([
      {
        sender: "CHAT_GPT",
        receiver: slack_user.user_id,
        message_text: textResponse,
        thread_id: slack_user.thread_id
      }
    ]);
  } else {
    textResponse = dataResponse.error.message ?? dataLang.chatWithGPT.error;
  }

  await sendMessageToSlack(channelId, textResponse, slack_user.access_token, slack_user.team_id, supabaseClient, slack_user.thread_ts, false)
  return new Response("success", { status: 200, statusText: "HTTP 200 OK" });

}


export const UpdateSlackUser = async (slackuser, thread, message, supabaseAdminClient) => {
  const { data: updateResult, error: updateError } = await supabaseAdminClient
    .from("slack_app_users")
    .update({
      chatmode: true,
      thread_id: thread
    })
    .eq('team_id', slackuser.team_id)
    .eq('authed_user_id', slackuser.authed_user_id);

  if (!updateError && updateResult) {
    console.log("Update Result:", updateResult);
    // Update successful
  } else {
    console.log(updateError)
  }

  return

}


export async function showDetailThread(
  slack_user: any,
  channelId: string,
  thread_id: string,
  supabaseClient: SupabaseClient,
  selectedText: string,
  message_ts: string,
  lang: "en"
) {
  const dataLang = locales[lang];
  const { data: lastMessage } = await supabaseClient
    .from("messages")
    .select("message_text")
    .eq("thread_id", thread_id)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();
  await sendMessageToSlack(channelId, `${dataLang.previousThread.oldMessage}\n ${lastMessage?.message_text ?? "No message Exist in this thraed"}`, slack_user.access_token, slack_user.team_id, supabaseClient, null, false);
  await UpdateSlackUser(slack_user, slack_user.thread_id, "2", supabaseClient)
  const selectedthread = [...selectedThreadBlock]
  selectedthread[1].text.text = `You chose: ${decodeURIComponent(selectedText).replaceAll('+', ' ')}`
  await updateOriginalMessage(channelId, message_ts, selectedthread, slack_user.access_token)
  return new Response("success", { status: 200, statusText: "HTTP 200 OK" });

}

export async function howToUse(
  channelId,
  slack_user,
  supabaseClient,
  lang: "en"
) {
  const dataLang = locales[lang];
  await sendInteractiveMessage(channelId, slack_user.access_token, null, howToUseChat, slack_user.authed_user_id)
  // await sendMessageToSlack(channelId, dataLang.guide.slackThank, slack_user.access_token, slack_user.team_id, supabaseClient, slack_user.thread_ts, false);
  // await sendMessageToSlack(channelId, dataLang.guide.suggest, slack_user.access_token, slack_user.team_id, supabaseClient, slack_user.thread_ts, false);
  return new Response("success", { status: 200, statusText: "HTTP 200 OK" });

}
