import { ReactComponent as GPT4Svg } from "assets/svg/gpt-4.svg";
import { ReactComponent as GPT3Svg } from "assets/svg/gpt3.svg";
export const CHAT_GPT = "CHAT_GPT";

export const messageWrapperStyle = (item, userId) => {
  return {
    background: item.Sender === userId ? "#FFFFFF" : "#F7F7F8",
    display: "flex",
    alignItems: "flex-start"
  };
};

export const messageStyle = (item, userId) => {
  return {
    color: "#000000",
    marginLeft: "15px"
  };
};

export const getFileUrl = (userId, fileName) =>
  `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/documents/${userId}/${fileName}`;

export const getFileName = (url = "") => {
  if (url) {
    const urlData = url.split("/");
    const urlDataLength = urlData.length;
    return urlData[urlDataLength - 1];
  }
};

export const getFolderName = (url = "") => {
  if (url) {
    const urlData = url.split("/");
    const urlDataLength = urlData.length;
    return urlData[urlDataLength - 2];
  }
};

export const CHAT_MODELS = [
  {
    name: "GPT-4",
    organization: "OPENAI",
    logo: <GPT4Svg style={{ margin: "0 12px 0 8px" }} />
  },
  {
    name: "GPT-3.5-Turbo",
    organization: "OPENAI",
    logo: (
      <GPT3Svg width="32px" height="32px" style={{ margin: "0 12px 0 8px" }} />
    )
  },
  {
    name: "GPT-3.5-Turbo-16K",
    organization: "OPENAI",
    logo: (
      <GPT3Svg width="32px" height="32px" style={{ margin: "0 12px 0 8px" }} />
    )
  }

  // {
  //   name: "GPT-4-32K",
  //   organization: "OPENAI",
  //   logo: <GPT4Svg style={{ marginRight: 7 }} />
  // }
];
