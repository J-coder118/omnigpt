const blocks = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Hello there! I'm OmniGPT, your friendly AI assistant.\n What would you like to do?"
        }
    },
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "📝 Create New Thread"
                },
                "style": "primary",
                "value": "create_thread"

            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "📁 Find a Thread"
                },
                "value": "find_thread"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "💡 Learn How to Use Omni"
                },
                "value": "how_to_use"
            }
        ]
    }
];


const SelectOption = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Here’s the latest threads. Choose one you want to select"
        }
    },
    {
        "type": "actions",
        "elements": [


        ]
    }
];


const newThredBlock = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Hello there! I'm OmniGPT, your friendly AI assistant.\n What would you like to do?"
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "You choose: \n 📝 Create New Thread"
        }

    },

]
const selectedThreadBlock = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Here’s the latest threads. Choose one you want to select"
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "You choose: \n 📝 Create New Thread"
        }

    },

]

const howToUseChat = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Thanks for your interest in learning how to use OmniGPT! To get started, simply create thread by choosing option 1 , type your message and OmniGPT will respond."
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `Here are some examples of questions you can ask.

            - What topic or issue are you interested in discussing ?
            - Do you have any specific questions or concerns that you'd like to explore?
            - Would you like me to provide some suggestions for conversation starters ?
            - Are you looking for tips on how to communicate more effectively with others ?
            - Do you need help resolving a conflict or misunderstanding in a conversation ?
            - Would you like to practice your communication skills with me ?
            
            If you need further assistance, feel free to ask!`
        }
    },
]

const chosseModalOpenAi = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Please choose your preferred language model. Once selected, cannot be changed during the conversation."
        }
    },
    {
        "type": "actions",
        "elements": [
            {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "GPT-3.5-Turbo"
                },
                "options": [{
                    "text": {
                        "type": "plain_text",
                        "text": "GPT-3.5-Turbo"
                    },
                    "value": "GPT-3.5-Turbo"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "GPT-3.5-Turbo-16k"
                    },
                    "value": "GPT-3.5-Turbo-16k"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "GPT-4"
                    },
                    "value": "GPT-4"
                }]
            }

        ]
    }

]

const AiModelsArray = ["GPT-3.5-Turbo", "GPT-3.5-Turbo-16k", "GPT-4"]

export { blocks, SelectOption, newThredBlock, selectedThreadBlock, howToUseChat, chosseModalOpenAi , AiModelsArray }