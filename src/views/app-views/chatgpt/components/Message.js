import React, { useState } from "react";
import { Avatar, Tooltip, message as AntdMessage } from "antd";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import "github-markdown-css";

import omni from "assets/omniAva.png";

import { CHAT_GPT, getFileName, getFolderName } from "../constants";
import DocViewer from "./DocViewer";
import utils from "utils";

import "./markdown.css";

import { downloadAsPdf, downloadWordDoc } from "../utils";
import DownloadModal from "components/layout-components/DownloadModal";
import IntlMessage from "components/util-components/IntlMessage";
import CodeBlock from "./CodeBlock.js";
import { useIntl } from "react-intl";

const styleIcon = { color: "#8F9FB2", fontSize: "16px" };

function Message({ message, session, isStreamming }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const intl = useIntl();
  const initials = session
    ? utils.getEmailInitials(session.user.email)
    : utils.getEmailInitials("user");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      AntdMessage.success(intl.formatMessage({ id: "text.copied" }));
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const submitForm = (value) => {
    if (value.option === "PDF") {
      downloadAsPdf(content, value.name);
    } else {
      downloadWordDoc(content, value.name + "." + value.option.toLowerCase());
    }
  };

  return (
    <div
      className={`message_layout ${
        message.Sender !== CHAT_GPT ? "UserRequest" : "BotResponse"
      }`}
      // style={{ backgroundColor }}
    >
      <div>
        {message.Sender === CHAT_GPT ? (
          <img srcSet={`${omni} 2x`} alt="" />
        ) : (
          <Avatar
            shape="square"
            size={30}
            style={{
              color: "#FFFFFF",
              borderRadius: 3,
              backgroundColor: session
                ? utils.generateAvatarColor(session.user.email)
                : utils.generateAvatarColor("user")
            }}
          >
            {initials}
          </Avatar>
        )}
      </div>
      <div className="message_content message-content">
        {!message.docUrl && (
          <div>
            <div
              style={{
                wordBreak: "break-word",
                backgroundColor: "transparent"
              }}
              className={`markdown markdown-body ${
                isStreamming && "result-streaming"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{ code: CodeBlock }}
              >
                {message.Content || " "}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {message.Sender !== CHAT_GPT && message.docUrl?.length && (
          <DocViewer
            source={message.docUrl}
            name={getFileName(message.docUrl)}
            folder={getFolderName(message.docUrl)}
          />
        )}
        <div className="message_options">
          {message.Sender === CHAT_GPT &&
            message.Options?.map((e) => (
              <button onClick={e.func}>{e.Name}</button>
            ))}
        </div>
        {!isStreamming && message.Sender === CHAT_GPT && (
          <div className="message_tools flex">
            <Tooltip placement="topLeft" title={<IntlMessage id="copy.text" />}>
              <button onClick={() => copyToClipboard(message.Content)}>
                <CopyOutlined style={styleIcon} />
              </button>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title={<IntlMessage id="download.text" />}
            >
              <button
                onClick={() => {
                  setModalOpen(!modalOpen);
                  setContent(message.Content);
                }}
              >
                <DownloadOutlined style={styleIcon} />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
      {!!modalOpen && (
        <DownloadModal
          modalOpen={modalOpen}
          setModalOpen={(e) => setModalOpen(e)}
          submitForm={(value) => submitForm(value)}
        />
      )}
    </div>
  );
}

export default Message;
