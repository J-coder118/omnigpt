
import { SupabaseClient } from "@supabase/supabase-js";

async function openDirectMessageChannel(userId, accessToken) {
    const response = await fetch('https://slack.com/api/conversations.open', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            users: userId
        }),
    });

    const result = await response.json();

    if (!result.ok) {
        console.error('Failed to open DM channel:', result.error);
        return null;
    }

    return result.channel.id;
}
// With this approach, once a user connects their Slack account, your bot will send them a direct welcome message.

// Make sure your Slack app has the appropriate permissions (im:write or conversations:write, and im:read or conversations:read, etc.) to open and send messages to direct message channels.



async function sendMessageToSlack(channelId, message, accessToken) {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            channel: channelId,
            text: message,
        }),
    });
}


function connectToSlack(code, supabaseAdminClient: SupabaseClient, userId, response) {

    const formData = new FormData();
    formData.append('client_id', '2547342841008.5586154337218');
    formData.append('client_secret', '0b7bc8de37120ddf5f0b9c11aa969c7c');
    formData.append('code', code);
    fetch('https://slack.com/api/oauth.v2.access', {
        method: 'POST',
        body: formData,
    })
        .then(async (res) => {
            const result = await res.json()
            console.log("result", result)
            const { data: insertResult, error } = await supabaseAdminClient.from("slack_app_users").insert({
                app_id: result.app_id,
                authed_user_id: result.authed_user.id,
                scope: result.scope,
                token_type: result.token_type,
                access_token: result.access_token,
                bot_user_id: result.bot_user_id,
                team_id: result.team.id,
                team_name: result.team.name,
                enterprise: result.enterprise,
                is_enterprise_install: result.is_enterprise_install,
                user_id: userId,
            })
            console.log("error", error)
            console.log("insertResult", insertResult)

            if (error) {
                return new Response(JSON.stringify({ error }), { status: 500 });
            }
            if (!error) {
                const suserId = result.authed_user.id; // User ID from Slack OAuth response
                const dmChannelId = await openDirectMessageChannel(suserId, result.access_token);
                console.log("channel id", dmChannelId)
                if (dmChannelId) {
                    await sendMessageToSlack(dmChannelId, 'Welcome to OmniGPT!', result.access_token);
                }
                await supabaseAdminClient
                    .from("users")
                    .update({ slack_authed_id: suserId })
                    .eq("id", userId);
                return new Response(JSON.stringify({ insertResult }), { status: 200 });
            }
        })
        .catch((err) => console.log(err));



}



export default connectToSlack;