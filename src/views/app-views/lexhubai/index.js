import { Typography, Spin, message, Button } from "antd";
import { useState, useRef, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import EmojiPicker from "emoji-picker-react";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import { supabase } from "auth/SupabaseClient";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY
});
const openai = new OpenAIApi(configuration);

const Lexhubai = () => {
  const [UserId, SetUser] = useState("");
  const messagesEndRef = useRef(null);
  const [Message, SetMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Messages, SetMessages] = useState([
    {
      Sender: "Bot",
      Message: "Hello, How Can i help you?"
    }
  ]);
  const SendMessage = async (msg, Sender, Receiver) => {
    //eslint-disable-next-line
    const { data, error } = await supabase.from("messages").insert([
      {
        sender: String(Sender),
        receiver: String(Receiver),
        message_text: msg
      }
    ]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    SetMessage("");
    GetAnswer();
  };
  const [EmojiActive, ActiveEmoji] = useState(false);
  const GetAnswer = async (data) => {
    SendMessage(Message, UserId, "Bot");
    SetMessages([
      ...Messages,
      {
        Sender: "Me",
        Message: Message
      }
    ]);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${Message}`,
        temperature: 0.6, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });
      console.log(response);
      if (response.status === 200) {
        setIsLoading(false);
        SetMessages([
          ...Messages,
          {
            Sender: "Me",
            Message: Message
          },
          {
            Sender: "Bot",
            Message: response.data.choices[0].text
          }
        ]);
        //Save The Bot Response to the database
        SendMessage(response.data.choices[0].text, "Bot", UserId);
      } else {
        setIsLoading(false);
        message.error("Request Faild, Please try again");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      message.error("Request Faild, Please try again");
    }
  };
  //eslint-disable-next-line
  useEffect(() => {
    let sessionString = localStorage.getItem("supabase.auth.token");
    let sessionObject = JSON.parse(sessionString);
    SetUser(sessionObject.currentSession.user.id);
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [Messages]);
  return (
    <div>
      {isLoading && (
        <div className="loader-center">
          <Spin />
        </div>
      )}
      <Typography className="home-heading1">Lexhubai Demo</Typography>
      <div className="chat">
        <div className={"Messages"} ref={messagesEndRef}>
          {Messages.map((e, index) => (
            <div
              className={` ${e.Sender === "Bot" && "BotMessage"} ${
                e.Sender === "Me" && "MyMessage"
              }`}
              key={`Messages-${index}`}
            >
              <p>{e.Message}</p>
            </div>
          ))}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <div className="EmojiPicker">
              <SmileOutlined
                onClick={() => ActiveEmoji(!EmojiActive)}
              ></SmileOutlined>
            </div>
          </div>
          <div className="MessageInput">
            <input
              type="text"
              placeholder="Write Any"
              value={Message}
              onChange={(e) => SetMessage(e.target.value)}
            />
            <Button htmlType="submit">
              <SendOutlined></SendOutlined>
            </Button>
          </div>
          <div className={`emoji ${EmojiActive && "EmojiActive"}`}>
            <EmojiPicker
              onEmojiClick={(Emoji) => SetMessage(Message + Emoji.emoji)}
            ></EmojiPicker>
          </div>
          <button style={{ display: "none" }} type="onSubmit"></button>
        </form>
      </div>
    </div>
  );
};

export default Lexhubai;
