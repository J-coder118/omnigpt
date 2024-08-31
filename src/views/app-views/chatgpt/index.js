import { Button, message as AndtMessage, Spin, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { supabase } from "auth/SupabaseClient";
import _debounce from "lodash/debounce";
import mammoth from "mammoth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SSE } from "sse";
import { amplitude } from "App";
import { useIntl } from "react-intl";
import { UploadOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getAllNewThreads,
  getAllThreads,
  getMessagesForCustomer,
  setNewThreadIsInValid,
  setResponseStatus,
  setSelectedThread
} from "redux/actions/Conversation";

import Message from "./components/Message";
import VoiceRecorder from "./components/VoiceRecorder.js";
import ModelSelector from "./components/ModelSelector";
import { CHAT_GPT, getFileUrl, CHAT_MODELS } from "./constants";

import { ReactComponent as ArrowDownIcon } from "assets/svg/arrowDown.svg";
import { ReactComponent as ThreadModelSVG } from "assets/svg/openai-models.svg";
import { ReactComponent as RegenerateIcon } from "assets/svg/Regenerate.svg";
import { ReactComponent as SendOutline } from "assets/svg/SendOutline.svg";
import { ReactComponent as StopChatIcon } from "assets/svg/StopChat.svg";
import IntlMessage from "components/util-components/IntlMessage";

import Swal from "sweetalert2";

import useHeightContent from "hooks/useHeightContent";

const Icon = (
  <LoadingOutlined style={{ fontSize: 35, color: "#1FC77E" }} spin />
);

const initSelectedFile = {
  isSelected: false,
  content: "",
  sender: "",
  receiver: "",
  fileUrl: "",
  fileName: "",
  fileText: ""
};

const Chatgpt = (props) => {
  const {
    session,
    userInfo,
    redirect,
    getAllNewThreads,
    setNewThreadIsInValid,
    setSelectedThread,
    getMessagesForCustomer,
    messages: oldMessages,
    selectedThreadData,
    setResponseStatus
  } = props;
  const intl = useIntl();

  const initMessage = useMemo(() => [], []);
  const sourceStream = useRef(null);

  const [chatModel, setChatModel] = useState(CHAT_MODELS[0].name);
  const btnSubmitRef = useRef(null);
  const history = useHistory();
  const [userId, setUser] = useState("");
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [stopEnable, setStopEnable] = useState(false);
  const [regenerateEnable, setRegenerateEnable] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [messages, setMessages] = useState(initMessage);
  const [isChatGptDisabled, setIsChatGptDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [getNewThreadIsValid, setGetNewThreadIsValid] = useState(false);
  const [initialErrorMessage] = useState(null);
  const [streamedMessage, setStreamedMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(initSelectedFile);
  const [showToBottom, setShowToBottom] = useState(false);
  const [addThread, setAddThread] = useState(false);
  const [transcriptionLoader, setTranscriptionLoader] = useState(false);
  const handleAddMessage = (e) => {
    setMessages((prevMessages) => [...prevMessages, ...e]);
  };
  const supportedExtension = ["docx", "pdf"];
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileInfo = file?.name.split(".");
      const fileExtension = fileInfo[fileInfo.length - 1];
      amplitude.track("Upload", { DocType: `${fileExtension}` });
      if (
        !supportedExtension.find(
          (v) => fileExtension.toLowerCase() === v.toLowerCase()
        )
      ) {
        AndtMessage.error(
          intl.formatMessage(
            {
              id: "message.uploadDoc.error.fileNotSupport"
            },
            { fileExtension }
          )
        );
      } else if (
        file &&
        supportedExtension.find(
          (v) => fileExtension.toLowerCase() === v.toLowerCase()
        )
      ) {
        AndtMessage.loading(intl.formatMessage({ id: "message.processing" }));
        const { data, error } = await supabase.storage
          .from("documents")
          .upload(`${session.user.id}/${file?.name}`, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (error && error?.statusCode !== "409") {
          console.log(error);
          AndtMessage.error(
            intl.formatMessage({ id: "message.uploadDoc.error.uploadError" })
          );
        }
        if (data || error?.statusCode === "409") {
          const fileUrl = getFileUrl(session.user.id, file?.name);
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
          console.log("result", fileReader.result);
          fileReader.onload = async () => {
            if (file.type === "application/pdf") {
              try {
                fetch(
                  "https://pdf-to-texxt.netlify.app/.netlify/functions/api/extract-pdf",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      url: fileUrl
                    })
                  }
                )
                  .then((response) => response.text())
                  .then((data) =>
                    handleFileReadSuccess(
                      data,
                      error,
                      selectedThreadData,
                      setSelectedFile,
                      addNewThread,
                      sendMessage,
                      handleAddMessage,
                      getAnswer,
                      fileUrl,
                      file?.name,
                      userId,
                      CHAT_GPT,
                      intl
                    )
                  );
              } catch (error) {
                console.error(error);
              }
            } else if (
              file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
              // Reading docx files using Mammoth
              mammoth
                .extractRawText({
                  arrayBuffer: fileReader.result
                })
                .then((res) => {
                  const text = res.value;
                  handleFileReadSuccess(
                    text,
                    error,
                    selectedThreadData,
                    setSelectedFile,
                    addNewThread,
                    sendMessage,
                    handleAddMessage,
                    getAnswer,
                    fileUrl,
                    file?.name,
                    userId,
                    CHAT_GPT,
                    intl
                  );
                })
                .catch((e) => {
                  console.log(e);
                  AndtMessage.error(
                    intl.formatMessage({
                      id: "message.uploadDoc.error.readFile"
                    })
                  );
                });
            } else {
              AndtMessage.error(
                intl.formatMessage({
                  id: "message.uploadDoc.error.invalidFileFormat"
                })
              );
            }
          };
        }
      }
    }
  };

  function handleFileReadSuccess(
    text,
    error,
    selectedThreadData,
    setSelectedFile,
    addNewThread,
    sendMessage,
    handleAddMessage,
    getAnswer,
    fileUrl,
    fileName,
    userId,
    CHAT_GPT,
    intl
  ) {
    if (error?.statusCode === "409") {
      AndtMessage.info(
        intl.formatMessage({
          id: "message.uploadDoc.error.fileExists"
        })
      );
    } else {
      AndtMessage.success(
        intl.formatMessage({
          id: "message.uploadDoc.success"
        })
      );
    }
    if (!selectedThreadData) {
      setSelectedFile({
        isSelected: true,
        sender: userId,
        receiver: CHAT_GPT,
        fileUrl,
        fileText: text,
        fileName
      });
      addNewThread();
    } else {
      sendMessage("", userId, CHAT_GPT, fileUrl, text);
      handleAddMessage([
        {
          Content: `${intl.formatMessage({
            id: "chatgpt.introducenDoc"
          })} "${text}"`,
          Sender: userId,
          docUrl: fileUrl,
          docName: fileName
        }
      ]);
      getAnswer(
        `${intl.formatMessage({
          id: "chatgpt.introducenDoc"
        })} ${text}`,
        true
      );
    }
  }
  const addNewThread = useCallback(async () => {
    amplitude.track("New Thread");
    setResponseStatus(true);
    const { data: threadData, error: threadError } = await supabase
      .from("threads")
      .insert([
        {
          user_identifier: session.user.id,
          thread_model: chatModel.toLowerCase()
        }
      ]);
    if (threadError) {
      AndtMessage.error(intl.formatMessage({ id: "message.thread.add.error" }));
      setIsChatGptDisabled(true);
    } else {
      setAddThread(true);
      setSelectedThread(threadData[0].thread_id);
      setNewThreadIsInValid(true);
      setGetNewThreadIsValid(true);
    }
  }, [
    session.user.id,
    setNewThreadIsInValid,
    setSelectedThread,
    intl,
    setResponseStatus,
    chatModel
  ]);

  const sendMessage = useCallback(
    async (msg, Sender, Receiver, file = undefined, fileText = "") => {
      const { error: messError } = await supabase.from("messages").insert([
        {
          sender: String(Sender),
          receiver: String(Receiver),
          message_text: msg,
          type_id: 2,
          thread_id: selectedThreadData.thread_id,
          doc_url: file,
          doc_text: fileText
        }
      ]);

      if (messError) {
        AndtMessage.error(
          intl.formatMessage({ id: "message.thread.insertMessage.error" })
        );
        return;
      }
    },
    [intl, selectedThreadData]
  );

  // Define a function that takes in prompt and isCreate as parameters
  const getAnswer = useCallback(
    (prompt, isCreate) => {
      // Create an array of messages with prompt and userId as the content and sender respectively
      const newMessages = [
        {
          Content: prompt,
          Sender: userId
        }
      ];
      // Reset the message state
      setMessage("");
      setResponseStatus(true);

      // If not creating a new message, send the prompt using sendMessage() and add newMessages to messages
      if (!isCreate) {
        handleAddMessage(newMessages);
        sendMessage(prompt, userId, CHAT_GPT);
      }

      // Prepare data to be sent via server-side events including existing messages and newMessages
      const data = {
        messages: [
          {
            role: "system",
            content:
              "Write respone on readable format (prefer markdown) for this converstation"
          },
          ...[...messages.slice(-2), ...newMessages].map((message) => ({
            role: message.Sender === CHAT_GPT ? "system" : "user",
            content:
              message.docUrl && message.docText
                ? message.docText
                : message.Content ?? ""
          }))
        ],
        gptModel: chatModel.toLowerCase()
      };

      amplitude.track("Message Sent");
      // Instantiate a new server-side event source with appropriate URL, headers, and payload
      sourceStream.current = new SSE(
        `${process.env.REACT_APP_SUPABASE_EDGE_FUNCTION_URL}/connect-openai`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`
          },
          method: "POST",
          payload: JSON.stringify(data)
        }
      );

      // Enable the stop button
      setStopEnable(true);
      setRegenerateEnable(false);
      let i = 0;
      // Define a function to handle incoming messages
      function handleMessageEvent(e) {
        try {
          e.preventDefault();
          // If the incoming data is not "[DONE]", parse the payload and display the streamed message
          if (e.data !== "[DONE]") {
            const payload = JSON.parse(e.data);
            const streamedMessageContent = payload.choices[0]?.delta.content;
            if (streamedMessageContent) {
              setStreamedMessage(
                (oldText) => (oldText ? oldText : "") + streamedMessageContent
              );
            }
          }
          // Otherwise, close the server-side event source and update button states
          else {
            amplitude.track("Response Recieved");

            setResponseStatus(false);
            sourceStream.current.close();
            setButtonLoading(false);
            setRegenerateEnable(true);
            setStopEnable(false);
            setAddThread(false);
          }

          const positionScroll =
            messagesEndRef.current.scrollHeight -
            messagesEndRef.current.scrollTop -
            messagesEndRef.current.clientHeight;
          if (positionScroll < 51 || i < 3) {
            goToBottom();
          }
          i += 1;
          // Scroll to the bottom of the chat window
        } catch (error) {
          console.error(error);
        }
      }

      const errorHandler = (e) => {
        if (!e.data) return;
        const err = JSON.parse(e.data);
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        setStreamedMessage(err.error.message);
        setResponseStatus(false);
        sourceStream.current.close();
        setButtonLoading(false);
        setRegenerateEnable(true);
        setStopEnable(false);
        setAddThread(false);
      };
      goToBottom();
      // Attach `handleMessageEvent` as an event listener to the server-side event source object
      sourceStream.current.addEventListener("message", handleMessageEvent);
      sourceStream.current.addEventListener("error", errorHandler);
      // Start listening for incoming events through the server-side event source object
      sourceStream.current.stream();
    },
    // Re-run the function if messages, sendMessage or userId change
    [messages, sendMessage, userId, setResponseStatus, chatModel]
  );

  const handleStop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (buttonLoading || stopEnable) {
      if (sourceStream.current !== null) {
        handleEndStream();
        sourceStream.current.close();
        setButtonLoading(false);
        setStopEnable(false);
        setRegenerateEnable(true);
        setResponseStatus(false);
      }
    }
  };

  const handleRegenerate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (regenerateEnable) {
      setButtonLoading(true);
      setRegenerateEnable(false);
      getAnswer(currentMessage, true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChatGptDisabled || message === "") {
      return;
    }
    setResponseStatus(true);
    goToBottom();
    setCurrentMessage(message);
    setRegenerateEnable(false);
    setButtonLoading(true);
    if (!selectedThreadData) {
      addNewThread();
    } else {
      getAnswer(message);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const goToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(() => {
    setUser(session.user.id);
  }, [session]);

  useEffect(() => {
    if (getNewThreadIsValid) {
      getAllNewThreads(session.user.id);
      setGetNewThreadIsValid(false);
    }
    //eslint-disable-next-line
  }, [getNewThreadIsValid]);

  useEffect(() => {
    if (session === null) {
      history.push(redirect);
    }
    //eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    if (initialLoading === false) {
      goToBottom();
    }
  }, [initialLoading]);

  const handleScroll = _debounce(() => {
    if (messagesEndRef.current) {
      const positionScroll =
        messagesEndRef.current.scrollHeight -
        messagesEndRef.current.scrollTop -
        messagesEndRef.current.clientHeight;
      if (positionScroll > 50) {
        setShowToBottom(true);
      } else {
        setShowToBottom(false);
      }
    }
  }, 100);

  useEffect(() => {
    // Get answer when new thread registed
    if (selectedThreadData && message && buttonLoading) {
      getAnswer(message);
    }

    if (selectedFile.isSelected && selectedThreadData) {
      const { fileText, fileUrl, sender, receiver, fileName } = selectedFile;
      sendMessage(
        "",
        sender,
        receiver,
        fileUrl,
        `${intl.formatMessage({ id: "chatgpt.introducenDoc" })} "${fileText}"`
      );

      handleAddMessage([
        {
          Content: `${intl.formatMessage({
            id: "chatgpt.introducenDoc"
          })} "${fileText}"`,
          Sender: sender,
          docUrl: fileUrl,
          docName: fileName
        }
      ]);
      getAnswer(
        `${intl.formatMessage({
          id: "chatgpt.introducenDoc"
        })} ${fileText}`,
        true
      );
      setSelectedFile(initSelectedFile);
    }
  }, [
    selectedThreadData,
    message,
    getAnswer,
    buttonLoading,
    selectedFile,
    sendMessage,
    intl
  ]);

  const handleInputChange = (e) => {
    if (buttonLoading) {
      return;
    }
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      btnSubmitRef.current.click();
    }
  };

  useEffect(() => {
    const messages = oldMessages.map((message) => ({
      Sender: message.sender,
      Content: message.message_text,
      docUrl: message.doc_url,
      docText: message.doc_text
    }));
    setMessages([...initMessage, ...messages]);
    setInitialLoading(false);
  }, [oldMessages, initMessage]);

  useEffect(() => {
    if (addThread) return;
    !addThread && setInitialLoading(true);
    if (selectedThreadData) {
      getMessagesForCustomer(selectedThreadData.thread_id);
    } else {
      setMessages([...initMessage]);
      setInitialLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThreadData?.thread_id, getMessagesForCustomer, initMessage]);

  const handleEndStream = useCallback(() => {
    handleAddMessage([
      {
        Content: streamedMessage,
        Sender: CHAT_GPT
      }
    ]);
    sendMessage(streamedMessage, CHAT_GPT, userId);
    setStreamedMessage(null);
  }, [sendMessage, streamedMessage, userId]);

  useEffect(() => {
    if (!stopEnable && streamedMessage) {
      handleEndStream();
    }
  }, [stopEnable, streamedMessage, handleEndStream]);

  const height = useHeightContent(userInfo);

  if (initialLoading || initialErrorMessage) {
    return (
      <div className="loader-center">
        {initialLoading ? (
          <Spin indicator={Icon} />
        ) : (
          <p>{initialErrorMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className="chat-container" style={{ height }}>
      <div className="messages-container">
        {!messages.length && (
          <ModelSelector model={chatModel} setModel={setChatModel} />
        )}
        <div className="chat-chatgpt">
          <div
            className="messages-gpt"
            onScroll={handleScroll}
            ref={messagesEndRef}
          >
            <div style={{ position: "relative" }}>
              {messages.length > 0 && (
                <>
                  {messages.map((item, index) => (
                    <div key={`Messages-${index}`}>
                      <Message
                        message={item}
                        key={item.Content}
                        userId={session.user.id}
                        session={session}
                      ></Message>
                    </div>
                  ))}
                </>
              )}
              {stopEnable && (
                <Message
                  message={{
                    Sender: CHAT_GPT,
                    Content: streamedMessage
                  }}
                  userId={session.user.id}
                  isStreamming={true}
                  session={session}
                />
              )}
            </div>
          </div>
          {showToBottom && (
            <button className="chat-gpt-btn-bottom" onClick={goToBottom}>
              <ArrowDownIcon />
            </button>
          )}
          <div className="chat-gpt-form-wrap">
            <div className="chat-gpt-buttons">
              {stopEnable && (
                <button onClick={(e) => handleStop(e)}>
                  <StopChatIcon style={{ marginRight: 5 }} />
                  <IntlMessage id="chatgpt.stopGenerating" />
                </button>
              )}
              {regenerateEnable && (
                <button onClick={(e) => handleRegenerate(e)}>
                  <RegenerateIcon style={{ marginRight: 5 }} />
                  <IntlMessage id="chatgpt.regenerating" />
                </button>
              )}
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="chat-chatgpt-input"
            >
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "23px" }}
              >
                <Tooltip
                  placement="topLeft"
                  title={<IntlMessage id="upload.file" />}
                >
                  <button
                    className="EmojiPicker"
                    onClick={handleFileUpload}
                    style={{ margin: "0px" }}
                  >
                    <UploadOutlined />
                  </button>
                </Tooltip>

                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
                <VoiceRecorder
                  setMessage={setMessage}
                  setLoading={setTranscriptionLoader}
                />
              </div>

              <div className="MessageInput">
                <TextArea
                  type="text"
                  placeholder={intl.formatMessage({
                    id: "chatgpt.placehoderInput"
                  })}
                  value={message}
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="input_textarea"
                />
                <Button
                  htmlType="submit"
                  disabled={isChatGptDisabled}
                  style={{ margin: "0px 0px 0px 23px" }}
                >
                  <SendOutline />
                </Button>
                {transcriptionLoader && (
                  <div className="audio-loader">
                    <div className="loader"></div>
                  </div>
                )}
              </div>

              <button
                style={{ display: "none" }}
                ref={btnSubmitRef}
                type="onSubmit"
              ></button>
            </form>
            <div className="thread-chat-model">
              <ThreadModelSVG style={{ marginRight: 5 }} />{" "}
              <div>
                Model:{" "}
                {selectedThreadData?.thread_model
                  ? selectedThreadData?.thread_model
                  : chatModel.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

const mapStateToProps = ({ auth, conversation }) => {
  const { redirect, session, userInfo } = auth;
  const {
    newThreadIsValid,
    messages,
    selectedThread,
    threads,
    responseInProgress
  } = conversation;
  const selectedThreadData = threads.find(
    (thread) => thread.thread_id === selectedThread
  );
  return {
    redirect,
    session,
    userInfo,
    newThreadIsValid,
    messages,
    selectedThread,
    selectedThreadData,
    responseInProgress
  };
};

const mapDispatchToProps = {
  getAllThreads,
  getAllNewThreads,
  setNewThreadIsInValid,
  setSelectedThread,
  getMessagesForCustomer,
  setResponseStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatgpt);
