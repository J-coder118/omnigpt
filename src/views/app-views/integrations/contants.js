import {
  // WhatsAppColorSvg,
  ChromeSvg,
  SlackSvg,
  LineSvg,
  TrelloSvg,
  JiraSvg,
  NotionSvg,
  GithubSvg,
  WhatsappSvg,
  GoogleIconSvg,
} from "assets/svg/icon";

const whatsAppDescription =
  "Connect your WhatsApp account to easily send and receive messages directly with OmniGPT.";

const slackDescription =
  "Connect your OmniGPT accout to Slack and start collaborating with your team right away.";

const chromeDescription =
  "Install the OmniGPT extension on your Chrome browser to access our AI chatbot right from your browser window.";
const googleDescription =
  "Integrate OmniGPT with your Google Workspace account to streamline your workflow and enhance team collaboration.";

const lineDesscription =
  "Connect OmniGPT with LINE to start collaborating with your team and automate your workflow.";
const trelloDescription =
  "Automate your Trello boards with OmniGPT and manage your team's tasks more efficiently.";
const jiraDescription =
  "Connect OmniGPT with Jira and automate your team's workflow to improve efficiency and productivity.";
const notionDescription =
  "Integrate OmniGPT with Notion to automate your workflow and collaborate with your team more effectively.";
const githubDescription =
  "Use OmniGPT to automate your GitHub workflow and streamline your team's development process.";

export const AvailableIntegrations = [
  {
    title: "WhatsApp",
    description: whatsAppDescription,
    LogoSrc: WhatsappSvg,
    availability: true,
    connected: true
  },

  {
    title: "Slack",
    description: slackDescription,
    LogoSrc: SlackSvg,
    availability: false,
    connected: false
  },

  {
    title: "Chrome",
    description: chromeDescription,
    LogoSrc: ChromeSvg,
    availability: false,
    connected: false
  },

  {
    title: "Google",
    description: googleDescription,
    LogoSrc: GoogleIconSvg,
    availability: false,
    connected: false
  },
  {
    title: "Line",
    description: lineDesscription,
    LogoSrc: LineSvg,
    availability: false,
    connected: false
  },
  {
    title: "Trello",
    description: trelloDescription,
    LogoSrc: TrelloSvg,
    availability: false,
    connected: false
  },
  {
    title: "Jira",
    description: jiraDescription,
    LogoSrc: JiraSvg,
    availability: false,
    connected: false
  },
  {
    title: "Notion",
    description: notionDescription,
    LogoSrc: NotionSvg,
    availability: false,
    connected: false
  },
  {
    title: "GitHub",
    description: githubDescription,
    LogoSrc: GithubSvg,
    availability: false,
    connected: false
  }
];
