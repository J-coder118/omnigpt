async function sendInteractiveMessage(channelID: string, botToken: string, threadts: string | null, blocks: any , userId : string) {

    const body = threadts ? JSON.stringify({
        channel: channelID,
        user : userId,
        attachments: [{
            color: "#209DD4",
            blocks: blocks,
        }],
        thread_ts: threadts,
    }) : JSON.stringify({
        channel: channelID,
        user : userId,  
        attachments: [{
            color: "#209DD4",
            blocks: blocks,
        }],
    })
    const response = await fetch("https://slack.com/api/chat.postEphemeral", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${botToken}`,
            "Content-Type": "application/json"
        },
        body: body
    })

    const result = await response.json();
    console.log(result, "intractiviv  result")
    return result;
}

async function updateOriginalMessage(channelId, messageTs, blocks, token) {
    const response = await fetch("https://slack.com/api/chat.update", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            channel: channelId,
            ts: messageTs,
            attachments: [{
                "color": "#209DD4",
                blocks: blocks,
            }]
        })
    });

    return response.json();
}
export { sendInteractiveMessage , updateOriginalMessage }