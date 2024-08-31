const langEn = {
  paymentNotExist:
    "Seems like your Omnigpt subscription has expired or is inactive. To continue using Omnigpt on WhatsApp, please subscribe at https://app.omnigpt.co.",
  phoneNumberNotExist:
    "Your whatsapp doesn't exist in OmniGPT. Visit www.omnigpt.co for more in-depth information about OmniGPT and its features.",
  welcome: {
    header: "Hello there! I'm OmniGPT, your friendly AI assistant.",
    body: `Click the *Main Menu* button to explore your options:
    
    1 Create New Thread
    2 Find a Thread
    3 Learn How to Use Omni

Chat with me just like any other person. Share thoughts, ask questions, or discuss anything on your mind. I'm here to listen and assist you.

📎 You can also *upload a document* for information extraction and summarization. Click the attachment icon 📎 (iOS) or the + icon (Android).`,
    footer: "Visit www.omnigpt.co for more in-depth information.",
    action: {
      button: "Main Menu",
      createNewThread: "Create New Thread",
      findAThread: "Find a thread",
      learnUse: "Learn How to Use Omni"
    }
  },
  error: "Currently, *OmniGPT* is not available. Please try again later",
  remind:
    "To get started, please click the *Main Menu* button. You can access the *Main Menu* by simply typing */menu* in the chat.",
  newThreadCreated:
    "New thread was created. You can use it to discuss a specific topic or issue in the chat.",
  noThread: "Currently, you don't have any thread",
  listThread: `Here’s the latest _TOTAL_THREAD_ threads
Type the number of the thread you want to select:

_LIST_THREAD_`,
  seeMore: "See More",
  previousThread: {
    oldMessage: "*Here are the previous messages in this thread*:",
    canContinue: `You can now continue the conversation with this thread.`,
    error: `Your selection is not correct. Please choose again`
  },
  chatWithGPT: {
    introduceDoc:
      "Tell me what is this document about in one sentence that not more than 12 words and ask me: Do you need help with this document?",
    notice:
      "Your message was received. We will send you a response in few seconds",
    error: `There was an error with your response. Please, try again. 
    
Access the main menu by typing *"/menu"* in the chat.`
  },
  guide: {
    thank: `Thanks for your interest in learning how to use OmniGPT!

To get started, simply type your message and OmniGPT will respond.`,
slackThank : `Thanks for your interest in learning how to use OmniGPT!

To get started, simply create thread by choosing option 1 , type your message and OmniGPT will respond.` ,
  suggest: `Here are some examples of questions you can ask.

- What topic or issue are you interested in discussing ?
- Do you have any specific questions or concerns that you'd like to explore?
- Would you like me to provide some suggestions for conversation starters ?
- Are you looking for tips on how to communicate more effectively with others ?
- Do you need help resolving a conflict or misunderstanding in a conversation ?
- Would you like to practice your communication skills with me ?

If you need further assistance, feel free to ask!`
  }
};

export default langEn;
