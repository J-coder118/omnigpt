import "xhr_polyfill";
import { serve } from "std/server";
import _get from "https://deno.land/x/lodash@4.17.15-es/get.js";
import { createClient } from "@supabase/supabase-js";
import { getUnixTime, addDays } from "date_fns";

import { response } from "../_common/request.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { sendMessageToWhatsapp } from "../_common/whatsapp.ts";

import locales, { ISupportedLang, isSupportedLang } from "./locales/index.ts";
import { WhatsappSessionRecord } from "./type.ts";
import { getFileExtension, getPreviouMsg } from "./util.ts";
import {
  MENU_ID,
  PREFIX_CURRENT_THREAD,
  SHOW_MENU_MESSAGE,
  SHOW_MORE_THREAD,
  SHOW_THREADS,
  SUPPORT_EXTENSION_FILE,
  SUPPORT_MESSAGE_TYPE
} from "./const.ts";
import {
  chatWithGPT,
  createNewThread,
  howToUse,
  showDetailThread,
  showMenu,
  showThreads
} from "./handler.ts";
import { SUBCRIBE_STATUS } from "../_common/const.ts";

export const supabaseAdminClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

/**
 * Handle verify webhook of whatsapp
 * @param fullUrl
 * @returns
 */
function getWebhook(fullUrl: string) {
  const url = new URL(fullUrl);
  const verify_token = Deno.env.get("WHATSAPP_VERIFY_TOKEN");

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  //   Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      return response(challenge);
    }
  }

  return response("Forbidden", 403);
}

/**
 * Handle webhook for whatsapp
 * @param req
 * @returns
 */
async function postWebhook(req: Request) {
  const { object, entry } = await req.json();

  if (!object) {
    return response("Don't handle this message");
  }

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const messageType: string = _get(
    entry,
    "[0].changes[0].value.messages[0].type"
  );

  if (!SUPPORT_MESSAGE_TYPE.includes(messageType)) {
    return response("Don't handle this message");
  }
  const messageObject = _get(
    entry,
    `[0].changes[0].value.messages[0].${messageType}`
  );
  let message = "";
  let fileNameMedia = "";
  switch (messageType) {
    case "text": {
      message = _get(messageObject, "body");
      break;
    }
    case "interactive": {
      const typeInteractive = _get(messageObject, "type");
      message = _get(messageObject, `[${typeInteractive}].id`);
      break;
    }
    case "document": {
      const fileName = _get(messageObject, "filename");
      const extensionFile: string = getFileExtension(fileName);
      if (
        !SUPPORT_EXTENSION_FILE.find(
          (item) => item.toLowerCase() === extensionFile.toLowerCase()
        )
      ) {
        return response("Don't handle this message");
      }
      message = _get(messageObject, "id");
      fileNameMedia = fileName;
      break;
    }
  }

  if (!message) {
    return response("Don't handle this message");
  }

  message = message.trim();

  const phoneNumberId = _get(
    entry,
    "[0].changes[0].value.metadata.phone_number_id"
  );
  const customerNumber = _get(entry, "[0].changes[0].value.messages[0].from");
  let lang: ISupportedLang = "en";
  let dataLang = locales[lang];
  try {
    // Check exist phone number in our system
    const { data: userInfo } = await supabaseAdminClient
      .from("users_full_info")
      .select("*")
      .eq("whatsapp_number", customerNumber)
      .limit(1)
      .single();

    if (!userInfo) {
      return await sendMessageToWhatsapp(phoneNumberId, customerNumber, {
        recipient_type: "individual",
        type: "text",
        text: {
          body: dataLang.phoneNumberNotExist
        }
      });
    }

    if (userInfo.subscription_status !== SUBCRIBE_STATUS.ACTIVE) {
      const maxDateActive = getUnixTime(
        addDays(userInfo?.period_end * 1000, 3)
      );

      if (!userInfo.subscription_status || Date.now() / 1000 > maxDateActive) {
        return await sendMessageToWhatsapp(phoneNumberId, customerNumber, {
          recipient_type: "individual",
          type: "text",
          text: {
            body: dataLang.paymentNotExist
          }
        });
      }
    }

    if (isSupportedLang(userInfo.language)) {
      lang = userInfo.language;
      dataLang = locales[lang];
    }

    if (message === SHOW_MENU_MESSAGE) {
      await showMenu(phoneNumberId, userInfo, supabaseAdminClient, lang);
      return response("Success", 200);
    }

    const whatsappSession: WhatsappSessionRecord | null = await getPreviouMsg(
      userInfo.id,
      supabaseAdminClient
    );

    if (!whatsappSession || !whatsappSession.previous_message) {
      // can't handle. Exeption case
      return response("Webhook error");
    }
    const previousMessage: string = whatsappSession.previous_message;

    if (previousMessage === SHOW_MENU_MESSAGE) {
      switch (message) {
        case MENU_ID.NEW_THREAD: {
          await createNewThread(
            phoneNumberId,
            userInfo,
            supabaseAdminClient,
            lang
          );
          return response("Success", 200);
        }
        case MENU_ID.FIND_THREAD: {
          await showThreads(phoneNumberId, userInfo, supabaseAdminClient, lang);
          return response("Success", 200);
        }
        case MENU_ID.HOW_TO_USE: {
          await howToUse(phoneNumberId, userInfo.whatsapp_number, lang);
          return response("Success", 200);
        }
        default: {
          await sendMessageToWhatsapp(phoneNumberId, userInfo.whatsapp_number, {
            recipient_type: "individual",
            type: "text",
            text: {
              body: dataLang.remind
            }
          });
          return response("Success", 200);
        }
      }
    }

    if (
      message &&
      previousMessage === PREFIX_CURRENT_THREAD &&
      whatsappSession.thread_id
    ) {
      chatWithGPT(
        phoneNumberId,
        userInfo,
        message,
        whatsappSession.thread_id,
        supabaseAdminClient,
        lang,
        messageType,
        fileNameMedia
      );
      return response("Success", 200);
    }

    if (previousMessage === SHOW_THREADS) {
      if (message === SHOW_MORE_THREAD) {
        if (whatsappSession.thread_id) {
          const pageCurrent = parseInt(whatsappSession.thread_id, 10);
          await showThreads(
            phoneNumberId,
            userInfo,
            supabaseAdminClient,
            lang,
            pageCurrent + 1
          );
        }
      } else {
        await showDetailThread(
          phoneNumberId,
          userInfo,
          message,
          supabaseAdminClient,
          lang
        );
      }
    }

    return response("Success", 200);
  } catch (error) {
    console.log("🚀 ~ file: index.ts:130 ~ postWebhook ~ error:", error);
    await sendMessageToWhatsapp(phoneNumberId, customerNumber, {
      recipient_type: "individual",
      type: "text",
      text: {
        body: dataLang.error
      }
    });
    return response(error);
  }
}

serve((req: Request) => {
  const { url, method } = req;

  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  switch (true) {
    case method === "GET":
      return getWebhook(url);
    case method === "POST":
      return postWebhook(req);
    default:
      return;
  }
});
