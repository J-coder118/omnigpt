// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from "std/server";
import { corsHeaders } from "../_shared/cors.ts";
import { response } from "../_common/request.ts";
import connectToSlack from "./slackConnection.ts";
import { createClient } from "@supabase/supabase-js";
import locales from "../whatsapp-webhook/locales/index.ts"
import { sendInteractiveMessage } from "./slackUtils.ts";
import { blocks, chosseModalOpenAi , AiModelsArray } from "./constant.ts";
import { UpdateSlackUser } from "./utils.ts";
import { sendMessageToSlack, howToUse, createNewThread, showThreads, chatWithGPT, showDetailThread, exitFromGpt } from './utils.ts'
const supabaseAdminClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  const { url, method } = req;
  const headers = req.headers;
  if (method === "OPTIONS") {
    return response("success", 200)
  }
  if (Object.fromEntries(headers)['x-slack-retry-num']) {
    return response("success", 200)
  }
  if (method === 'POST') {

    let body = await req.text()

    console.log("body ", body)
    // Convert URL-encoded string to JSON
    if (!body) {
      return
    }
    try {
      const decodedBody: any = decodeURIComponent(body)

      let jsonText = decodedBody.slice(0, 4) === "payl" ? decodedBody.replace('payload=', '') : decodedBody;
      let obj = JSON.parse(jsonText);
      body = obj;
    } catch (err) {
      console.log("body is in json ", err)
    }
    if (body?.type === "url_verification") {
      const { challenge } = body;
      return response({ challenge });
    } else if (body.type === "connection") {
      connectToSlack(body.code, supabaseAdminClient, body.userId, response)
      return response("success", 200)
    }


    if (body.type == "block_actions" || body.event.type == "message") {
      console.log("enter")
      const threadts = (body.event && body.event.type == "message") ? body.event.thread_ts ?? body.event.ts : body.container.thread_ts ?? body.container.message_ts;
      const team_id = (body.event && body.event.type == "message") ? body.team_id : body.user.team_id;
      const authed_user_id = (body.event && body.event.subtype == "message_changed") ? body.event.message.user : (body.event && body.event.type == "message") ? body.event.user : body.user.id;
      const channelID = body.type == "block_actions" ? body.container.channel_id : body.event.channel;
      const { data: existUser, eror } = await supabaseAdminClient
        .from("slack_app_users")
        .select("*")
        .eq('team_id', team_id)
        .or(`authed_user_id.eq.${authed_user_id},bot_user_id.eq.${authed_user_id}`);
      console.log("existUser", existUser)
   
      if(eror) {
       return console.log(eror)
      }
      // if(existUser.length === 0 && body.event.text.includes("<@")) {
        
      // }

      // if (body.event && (body.event.type == "message") && body.event.text.includes(existUser[0].bot_user_id) && (threadts !== existUser[0].thread_ts)) {
      //   try {
      //     await supabaseAdminClient
      //       .from("slack_app_users")
      //       .update({
      //         chatMode: false,
      //       })
      //       .eq('team_id', team_id);
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }

      if  ((body.event && (body.event.text.includes("New Thread Created") || body.event.text.includes("Here are the previous messages in this thread"))) ) {
        console.log(body)
        try {
          await supabaseAdminClient
            .from("slack_app_users")
            .update({
              thread_ts: threadts
            })
            .eq('team_id', team_id)
            .or(`authed_user_id.eq.${authed_user_id},bot_user_id.eq.${authed_user_id}`);
            body.event.text.includes("New Thread Created") &&  await sendMessageToSlack(body.event.channel, "How Can I assest you", existUser[0].access_token, existUser[0].team_id, supabaseAdminClient, threadts,existUser[0].authed_user_id , false)
            body.event.text.includes("Here are the previous messages in this thread")&& await sendMessageToSlack(body.event.channel, "You can now continue the conversation with this thread.", existUser[0].access_token, existUser[0].team_id, supabaseAdminClient, threadts ,existUser[0].authed_user_id , false);
            await sendInteractiveMessage(body.event.channel, existUser[0].access_token, threadts, chosseModalOpenAi, existUser[0].authed_user_id)
          } catch (error) {
          console.log(error)
        }
      }
      const { data: retrieveResult, error } = await supabaseAdminClient
        .from("slack_app_users")
        .select("*")
        .eq('team_id', team_id)
        .or(`authed_user_id.eq.${authed_user_id},bot_user_id.eq.${authed_user_id}`);

      if (!error) {
        console.log(retrieveResult)

        const slackToken = retrieveResult[0].access_token;
       
        // Do something with the retrieved data
        body.event && console.log((body.event.user != retrieveResult[0].bot_user_id), (threadts === retrieveResult[0].thread_ts), (retrieveResult[0].chatMode == true), body.event.text.includes(retrieveResult[0].bot_user_id))
        if (body.event && (threadts !== retrieveResult[0].thread_ts) && body.event.text.includes(retrieveResult[0].bot_user_id)) {
          console.log("intrectivity")
          await sendInteractiveMessage(channelID, slackToken, null, blocks ,retrieveResult[0].authed_user_id)
        }

        else if (body.actions && body.actions[0].value === "create_thread") {
          console.log("create action")
          await createNewThread(supabaseAdminClient, retrieveResult[0], channelID, body.container.message_ts)
          return response("success", 200)

        }
        else if (body.actions && body.actions[0].value === "find_thread") {
          console.log("runn")
          await showThreads(supabaseAdminClient, retrieveResult[0], channelID)

          return response("success", 200)
        }
        else if (body.actions && (body.actions[0].type == "static_select" && !body.actions[0].value?.includes('GPT'))) {
          showDetailThread(retrieveResult[0], channelID, body.actions[0].selected_option.value, supabaseAdminClient, body.actions[0].selected_option.text.text, body.container.message_ts, "en")
          return response("success", 200)
        }
        else if (body.actions && body.actions[0].value === "how_to_use") {
          await howToUse(channelID, retrieveResult[0], supabaseAdminClient, "en")
          return response("success", 200)
        }
        else if (body.event && (body.event.user != retrieveResult[0].bot_user_id) && (threadts === retrieveResult[0].thread_ts) && (retrieveResult[0].chatmode == true) && body.event.text.includes(retrieveResult[0].bot_user_id)) {
          await chatWithGPT(body?.event.text, supabaseAdminClient, channelID, retrieveResult[0], "en")
          return response("success", 200)
        }

        // else if (body.event.text === "4" && retrieveResult[0].previous_message == "1") {s
        //   await exitFromGpt(channelID, retrieveResult[0], supabaseAdminClient, "en")
        //   return response("success", 200)
        // }
        // else if (retrieveResult[0].previous_message == "1" && retrieveResult[0].thread_id && body.event.text !== "1") {
        //   await chatWithGPT(body?.event.text, supabaseAdminClient, channelID, retrieveResult[0], "en")

        //   return response("success", 200)

        // }

        else {
          return response("success", 200)
        }
      }

    } else {
      return response("success", 200)
    }
  } else {
    return response("success", 200)
  }


})


// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'