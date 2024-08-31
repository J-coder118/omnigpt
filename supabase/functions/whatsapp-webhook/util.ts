import { SupabaseClient } from "@supabase/supabase-js";
import mammoth from "mammoth";

import { MessagesRecord, WhatsappSessionRecord } from "./type.ts";
import locales, { ISupportedLang } from "./locales/index.ts";

export async function insertAndgetMsg(
  userId: string,
  messageText: string,
  threadId: string | null,
  supabaseClient: SupabaseClient,
  messageType: string,
  lang: ISupportedLang,
  fileNameMedia: string
) {
  const dataLang = locales[lang];
  if (messageType === "document") {
    const { text, fileUrl } = await getMediaWhatsapp(
      messageText,
      fileNameMedia,
      userId,
      supabaseClient
    );

    await supabaseClient.from("messages").insert([
      {
        sender: userId,
        receiver: "CHAT_GPT",
        message_text: `${dataLang.chatWithGPT.introduceDoc} "${text}"`,
        thread_id: threadId,
        doc_url: fileUrl,
        doc_text: text
      }
    ]);
  } else {
    await supabaseClient.from("messages").insert([
      {
        sender: userId,
        receiver: "CHAT_GPT",
        message_text: messageText,
        thread_id: threadId
      }
    ]);
  }

  const { data: messages } = await supabaseClient
    .from<MessagesRecord>("messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("id", { ascending: true });

  const messagesNormalize = messages?.map(
    (whatsapp_message: MessagesRecord) => {
      return {
        role: whatsapp_message.sender !== "CHAT_GPT" ? "user" : "system",
        content: whatsapp_message.message_text || ""
      };
    }
  );

  if (!messagesNormalize) {
    return [];
  }

  return messagesNormalize;
}

export async function savePreviouMsg(
  userId: string,
  messageText: string,
  threadId: string | null,
  supabaseClient: SupabaseClient
) {
  await supabaseClient.from<WhatsappSessionRecord>("whatsapp_session").upsert({
    sender: userId,
    previous_message: messageText,
    thread_id: threadId
  });
}

export async function getPreviouMsg(
  userId: string,
  supabaseClient: SupabaseClient
): Promise<WhatsappSessionRecord | null> {
  const { data } = await supabaseClient
    .from<WhatsappSessionRecord>("whatsapp_session")
    .select("*")
    .eq("sender", userId)
    .limit(1)
    .maybeSingle();

  return data;
}

export async function getMediaWhatsapp(
  mediaId: string,
  fileNameMedia: string,
  userId: string,
  supabaseClient: SupabaseClient
) {
  const response = await fetch(
    `https://graph.facebook.com/${Deno.env.get(
      "WHATSAPP_API_VERSION"
    )}/${mediaId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("WHATSAPP_TOKEN")}`,
        "Content-Type": "application/json"
      }
    }
  );
  const { url, mime_type } = await response.json();

  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Deno.env.get("WHATSAPP_TOKEN")}`
    }
  });
  const fileData = await data.arrayBuffer();
  const fileUrl = `${userId}/${mediaId}.${getFileExtension(fileNameMedia)}`;
  await supabaseClient.storage.from("documents").upload(fileUrl, fileData, {
    contentType: mime_type,
    cacheControl: "3600",
    upsert: false
  });

  const fileUrlWithBase = getFileUrlWithBase(fileUrl);
  if (fileNameMedia.toLocaleLowerCase().includes(".pdf")) {
    const textData = await fetch(
      "https://pdf-to-texxt.netlify.app/.netlify/functions/api/extract-pdf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: fileUrlWithBase
        })
      }
    ).then((response) => response.text());

    return {
      text: textData,
      fileUrl: fileUrlWithBase
    };
  }
  return mammoth.extractRawText({ arrayBuffer: fileData }).then((res: any) => {
    return {
      text: res.value,
      fileUrl: fileUrlWithBase
    };
  });
}

export const getFileUrlWithBase = (fileName: string) =>
  `${Deno.env.get(
    "SUPABASE_URL"
  )}/storage/v1/object/public/documents/${fileName}`;

export const getFileExtension = (fileName: string) => {
  if (fileName.split(".").length > 1) {
    return fileName.split(".").slice(-1)[0];
  }

  return "";
};
