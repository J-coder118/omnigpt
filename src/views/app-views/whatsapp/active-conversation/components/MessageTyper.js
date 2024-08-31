import { Input, Spin, Upload } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  UploadOutlined,
  SmileOutlined,
  AudioOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { SendMessageButtonSvg, StrokeSvg } from "assets/svg/icon";
import { sendMessageApiContent } from "configs/ApiConfig";
import Picker from "emoji-picker-react";

import { icon2Style, inputStyle, LoadingIcon } from "../constants";
import { imageValidator, uploadImageToSupabase } from "./MessageTyperConfig";
import { supabase } from "auth/SupabaseClient";
import { version, phoneNumberId } from "../constants";

const MessageTyper = (props) => {
  const { activeCustomer, messages, contactDetailsIsVaild } = props;
  const [messageText, setMessageText] = useState("");
  const [emojiPickerIsValid, setEmojiPickerIsValid] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [sendMessageButtonLoading, setSendMessageButtonLoading] =
    useState(false);

  const sendMessage = async (messageText) => {
    if (messageText.trim().length === 0) return;
    setSendMessageButtonLoading(true);
    const { body, content } = await sendMessageApiContent(
      messageText,
      messages,
      activeCustomer
    );

    try {
      const res = await axios.post(
        `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
        body,
        content
      );
      console.log(res.status);
      if (res.status === 200) {
        const { data, error } = await supabase
          .from("whatsapp_messages")
          .insert([
            {
              sender: phoneNumberId,
              receiver: activeCustomer.phone,
              message_text: messageText
            }
          ]);
        if (error) throw error;
        else {
          console.log(data);
          setSendMessageButtonLoading(false);
          setMessageText("");
        }
      }
    } catch (error) {
      setSendMessageButtonLoading(false);
      console.log(error);
    }
  };

  const uploadPicProps = {
    name: "file",
    beforeUpload: (file) => imageValidator(file),
    action: (file) => uploadImageToSupabase(activeCustomer, file),
    showUploadList: false
  };
  const emojiSelectHandler = (event, emojiObject) => {
    setSelectedEmoji(emojiObject);
    // setEmojiPickerIsValid(false);
  };
  useEffect(() => {
    if (selectedEmoji !== null) {
      let newMessage = messageText + selectedEmoji.emoji;
      setMessageText(newMessage);
    }
    //eslint-disable-next-line
  }, [selectedEmoji]);

  return (
    <>
      {emojiPickerIsValid && (
        <div style={{ position: "absolute", left: "20px", bottom: "45px" }}>
          <Picker
            onEmojiClick={emojiSelectHandler}
            disableAutoFocus={true}
            disableSearchBar={true}
            disableSkinTonePicker={true}
            native
          />
        </div>
      )}
      <div
        className="converstion-typing-wrapper"
        style={{ width: contactDetailsIsVaild ? "72%" : "100%" }}
      >
        <Upload {...uploadPicProps}>
          <UploadOutlined
            className="converstaion-icon-for-chat"
            style={icon2Style}
          />
        </Upload>
        {emojiPickerIsValid ? (
          <CloseOutlined
            className="converstaion-icon-for-chat "
            style={icon2Style}
            onClick={() => setEmojiPickerIsValid(false)}
          />
        ) : (
          <SmileOutlined
            className="converstaion-icon-for-chat"
            style={icon2Style}
            onClick={() => setEmojiPickerIsValid(true)}
          />
        )}

        <AudioOutlined
          className="converstaion-icon-for-chat "
          style={icon2Style}
        />
        <Input.Group compact style={{ display: "flex", marginLeft: "16px" }}>
          <Input
            placeholder="Type something, your customer is missing you..."
            prefix={
              <div
                style={{
                  height: "22px"
                }}
              >
                <StrokeSvg />
              </div>
            }
            suffix={
              sendMessageButtonLoading ? (
                <Spin indicator={LoadingIcon} />
              ) : (
                <div
                  onClick={() => sendMessage(messageText)}
                  className="input-send-button"
                >
                  <SendMessageButtonSvg />
                </div>
              )
            }
            className="converstaion-input-for-chat"
            style={inputStyle}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </Input.Group>
      </div>
    </>
  );
};

export default MessageTyper;
