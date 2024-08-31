import { useState } from "react";
import { Tooltip, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import micSrc from "../../../assets/svg/microphone.svg";
import SendOutline from "assets/svg/SendOutline.svg";
import { CHAT_MODELS } from "views/app-views/chatgpt/constants";
import ModelDropDown from "./ModelDropDown";
import TextArea from "antd/lib/input/TextArea";

const MockChat = ({ openModal }) => {
  const [message, setMessage] = useState("");
  const [chatModel, setChatModel] = useState(CHAT_MODELS[0].name);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      openModal();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="chat-container"
      style={{
        // width: "100%",
        // overflow: "auto",
        marginBottom: "35px",
        marginTop: 20
        // height: "calc(100vh - 80px)"
      }}
    >
      <div className="messages-container">
        <ModelDropDown
          model={chatModel}
          setModel={setChatModel}
          openModal={openModal}
        />
        <div className="chat-chatgpt" style={{ height: "30%" }}>
          <div className="chat-gpt-form-wrap-landing">
            <form
              className="chat-chatgpt-input"
              action=""
              onSubmit={handleFormSubmit}
            >
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "23px" }}
              >
                <Tooltip placement="topLeft" title={"Upload File"}>
                  <button
                    style={{ margin: "0px" }}
                    className="EmojiPicker"
                    onClick={() => openModal()}
                  >
                    <UploadOutlined />
                  </button>
                </Tooltip>
                <button
                  style={{ margin: "0px" }}
                  className="EmojiPicker"
                  onClick={() => openModal()}
                >
                  <img
                    src={micSrc}
                    alt="record-voice"
                    width="22px"
                    height="22px"
                  />
                </button>

                <input style={{ display: "none" }} type="file" />
              </div>

              <div className="MessageInput">
                <TextArea
                  type="text"
                  placeholder={"Message"}
                  value={message}
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="input_textarea"
                />
                <Button
                  htmlType="submit"
                  onClick={() => openModal()}
                  style={{ margin: "0px 0px 0px 23px" }}
                >
                  <img src={SendOutline} alt="SendOutline" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockChat;
