import { SupabaseClient } from "@supabase/supabase-js";
import _get from "https://deno.land/x/lodash@4.17.15-es/get.js";

import {
  MENU_ID,
  PREFIX_CURRENT_THREAD,
  SHOW_MENU_MESSAGE,
  SHOW_MORE_THREAD,
  SHOW_THREADS
} from "./const.ts";
import { insertAndgetMsg, savePreviouMsg } from "./util.ts";
import locales, { ISupportedLang } from "./locales/index.ts";

import { getChatCompletion } from "../_common/openai.ts";
import { sendMessageToWhatsapp } from "../_common/whatsapp.ts";
import { ThreadRecord, UserRecordWithNumber } from "./type.ts";

export async function showMenu(
  phoneNumberId: string,
  userInfo: UserRecordWithNumber,
  supabaseClient: SupabaseClient,
  lang: ISupportedLang
) {
  const dataLang = locales[lang];
  await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: dataLang.welcome.header
      },
      body: {
        text: dataLang.welcome.body
      },
      footer: {
        text: dataLang.welcome.footer
      },
      action: {
        button: dataLang.welcome.action.button,
        sections: [
          {
            title: dataLang.welcome.action.button,
            rows: [
              {
                id: MENU_ID.NEW_THREAD,
                title: dataLang.welcome.action.createNewThread
              },
              {
                id: MENU_ID.FIND_THREAD,
                title: dataLang.welcome.action.findAThread
              },
              {
                id: MENU_ID.HOW_TO_USE,
                title: dataLang.welcome.action.learnUse
              }
            ]
          }
        ]
      }
    }
  });
  await savePreviouMsg(userInfo.id, SHOW_MENU_MESSAGE, null, supabaseClient);
}

export async function createNewThread(
  phoneNumberId: string,
  userInfo: UserRecordWithNumber,
  supabaseClient: SupabaseClient,
  lang: ISupportedLang
) {
  const dataLang = locales[lang];
  const { data: insertResult, error } = await supabaseClient
    .from("threads")
    .insert([{ user_identifier: userInfo.id }])
    .select();

  if (error) {
    console.log("🚀 ~ file: handler.ts:65 ~ createNewThread ~ error:", error);
    await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
      recipient_type: "individual",
      type: "text",
      text: {
        body: dataLang.error
      }
    });
    return;
  }

  await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
    recipient_type: "individual",
    type: "text",
    text: {
      body: dataLang.newThreadCreated
    }
  });

  await savePreviouMsg(
    userInfo.id,
    PREFIX_CURRENT_THREAD,
    insertResult[0].thread_id,
    supabaseClient
  );
}

export async function showThreads(
  phoneNumberId: string,
  userInfo: UserRecordWithNumber,
  supabaseClient: SupabaseClient,
  lang: ISupportedLang,
  page = 1,
  limit = 10
) {
  const dataLang = locales[lang];
  const { data: threadsOfPhone, count } = await supabaseClient
    .from("threads")
    .select("*", { count: "exact" })
    .eq("user_identifier", userInfo.id)
    .range((page - 1) * limit, limit * page - 1)
    .order("thread_list_id", { ascending: false });

  if (!threadsOfPhone || !count) {
    await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
      preview_url: false,
      recipient_type: "individual",
      type: "text",
      text: {
        body: dataLang.noThread
      }
    });

    return;
  }

  await savePreviouMsg(userInfo.id, SHOW_THREADS, `${page}`, supabaseClient);
  const threadString = threadsOfPhone
    ?.map(
      (threadData: ThreadRecord, index: number) =>
        `Type ${index + 1 + (page - 1) * limit}: ${threadData.thread_name}`
    )
    .join("\n");
  const bodyText = dataLang.listThread
    .replace("_TOTAL_THREAD_", `${threadsOfPhone?.length}`)
    .replace("_LIST_THREAD_", threadString);

  if (page * limit > count) {
    await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
      preview_url: false,
      recipient_type: "individual",
      type: "text",
      text: {
        body: bodyText
      }
    });
    return;
  }

  await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
    preview_url: false,
    recipient_type: "individual",
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: bodyText
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: SHOW_MORE_THREAD,
              title: dataLang.seeMore
            }
          }
        ]
      }
    }
  });
}

export async function showDetailThread(
  phoneNumberId: string,
  userInfo: UserRecordWithNumber,
  messageText: string,
  supabaseClient: SupabaseClient,
  lang: ISupportedLang
) {
  const dataLang = locales[lang];
  const threadPosition = parseInt(messageText, 10) - 1;
  const { data: threadData } = await supabaseClient
    .from("threads")
    .select("thread_id")
    .eq("user_identifier", userInfo.id)
    .range(threadPosition, threadPosition)
    .order("thread_list_id", { ascending: false })
    .maybeSingle();

  if (threadData) {
    await savePreviouMsg(
      userInfo.id,
      PREFIX_CURRENT_THREAD,
      threadData.thread_id,
      supabaseClient
    );
    const { data: lastMessage } = await supabaseClient
      .from("messages")
      .select("message_text")
      .eq("thread_id", threadData.thread_id)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
      preview_url: false,
      recipient_type: "individual",
      type: "text",
      text: {
        body: `${dataLang.previousThread.oldMessage}

${lastMessage?.message_text}`
      }
    });

    await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
      recipient_type: "individual",
      type: "text",
      text: {
        body: dataLang.previousThread.canContinue
      }
    });
  } else {
    await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
      recipient_type: "individual",
      type: "text",
      text: {
        body: dataLang.previousThread.error
      }
    });
  }
}

export async function chatWithGPT(
  phoneNumberId: string,
  userInfo: UserRecordWithNumber,
  messageText: string,
  threadId: string,
  supabaseClient: SupabaseClient,
  lang: ISupportedLang,
  messageType: string,
  fileNameMedia: string
) {
  const dataLang = locales[lang];
  const messages = await insertAndgetMsg(
    userInfo.id,
    messageText,
    threadId,
    supabaseClient,
    messageType,
    lang,
    fileNameMedia
  );
  await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
    preview_url: false,
    recipient_type: "individual",
    type: "text",
    text: {
      body: dataLang.chatWithGPT.notice
    }
  });

  const responseAI = await getChatCompletion(messages, false);
  const dataResponse = await responseAI.json();
  let textResponse = _get(dataResponse, "choices[0].message.content");
  if (textResponse) {
    await supabaseClient.from("messages").insert([
      {
        sender: "CHAT_GPT",
        receiver: userInfo.id,
        message_text: textResponse,
        thread_id: threadId
      }
    ]);
  } else {
    const code = _get(dataResponse, "error.code");
    textResponse = dataLang.chatWithGPT.error;
  }

  await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
    preview_url: false,
    recipient_type: "individual",
    type: "text",
    text: {
      body: textResponse
    }
  });
}

export async function howToUse(
  phoneNumberId: string,
  customerNumber: string,
  lang: ISupportedLang
) {
  const dataLang = locales[lang];
  await sendMessageToWhatsapp(phoneNumberId, customerNumber, {
    preview_url: false,
    recipient_type: "individual",
    type: "text",
    text: {
      body: dataLang.guide.thank
    }
  });

  await sendMessageToWhatsapp(phoneNumberId, customerNumber, {
    preview_url: false,
    recipient_type: "individual",
    type: "text",
    text: {
      body: dataLang.guide.suggest
    }
  });
}
