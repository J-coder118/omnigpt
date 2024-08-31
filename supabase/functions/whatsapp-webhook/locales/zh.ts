const Zh = {
  paymentNotExist:
    "您的 Omnigpt 订阅似乎已过期或处于非活动状态。 要继续在 WhatsApp 上使用 Omnigpt，请通过 https://app.omnigpt.co 订阅。",
  phoneNumberNotExist:
    "OmniGPT 中不存在您的 whatsapp。 访问 www.omnigpt.com 了解更多信息",
  welcome: {
    header: "欢迎来到 OmniGPT。",
    body: `单击“主菜单”按钮以探索您可以在此对话中执行的操作:

    1. 创建一个新线程
    2. 查找主题
    3. 了解如何使用

如果您愿意，可以像和其他人一样开始和我聊天。 我在这里倾听并尽我所能提供帮助。
要再次访问主菜单，只需在聊天中输入 */menu*`,
    footer: "访问 www.omnigpt.com 了解更多信息",
    action: {
      button: "主菜单",
      createNewThread: "创建一个新线程",
      findAThread: "查找主题",
      learnUse: "了解如何使用"
    }
  },
  error: "当前，*OmniGPT* 不可用。 请稍后再试",
  remind:
    "要开始，请单击*主菜单*按钮。 您只需在聊天中输入 */menu* 即可访问*主菜单*。",
  newThreadCreated: "新线程已创建。 您可以使用它来讨论聊天中的特定主题或问题。",
  noThread: "目前，您没有任何话题",
  listThread: `这是最新的 _TOTAL_THREAD_ 个话题
输入您要选择的线程数:

_LIST_THREAD_`,
  seeMore: "查看更多",
  previousThread: {
    oldMessage: "*这是该线程中的先前消息*:",
    canContinue: `您现在可以继续与此线程的对话.`,
    error: `您的选择不正确。 请重新选择`
  },
  chatWithGPT: {
    introduceDoc:
      "用不超过 12 个单词的一句话告诉我这份文件是关于什么的，并问我：你需要这份文件的帮助吗",
    notice: "您的留言已收到。 我们会在几秒钟内给您回复",
    error: "您的回复有误。 请再试一次"
  },
  guide: {
    thank: `感谢您有兴趣学习如何使用 OmniGPT！

要开始使用，只需键入您的消息，OmniGPT 就会做出回应。`,
    suggest: `以下是您可以提出的一些问题示例。

- 您有兴趣讨论什么话题或问题？
- 您有任何具体问题或疑虑想要探讨吗？
- 你希望我为谈话开始者提供一些建议吗？
- 您是否正在寻找有关如何更有效地与他人沟通的技巧？
- 您需要帮助解决对话中的冲突或误解吗？
- 你愿意和我一起练习你的沟通技巧吗？

如果您需要进一步的帮助，请随时提出！`
  }
};

export default Zh;
