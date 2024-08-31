import { Typography, Spin } from "antd";
import { useEffect, useState, useRef } from "react";
// import { InfoCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Scroll from "react-scroll";
//user-imports
import {
  getMessagesForCustomer,
  getSubscribedToMessages,
  setActiveCustomer
} from "redux/actions/WhatsApp";
import { ChatArrowSvg } from "assets/svg/icon";
import { supabase } from "auth/SupabaseClient";
// import ContactForm from "./contact-form/ContactForm";
import {
  // icon1Style,
  elementStyle,
  messageWrapperStyle,
  messageStyle,
  phoneNumberId
} from "./constants";
import MessageTyper from "./components/MessageTyper";

let Element = Scroll.Element;
// let scroll = Scroll.animateScroll;

const ActiveConversation = (props) => {
  const {
    customers,
    messages,
    messagesLoading,
    getMessagesForCustomer,
    getSubscribedToMessages,
    setActiveCustomer
  } = props;
  const reversedMessages = [...messages].reverse();
  const { id } = useParams();
  let activeCustomer = customers.filter((item) => item.customer_id === id);
  activeCustomer = activeCustomer[0];

  const [contactDetailsIsVaild, setContactDetailsIsValid] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const showContactDetails = () => setContactDetailsIsValid(true);
  const hideContactDetails = () => setContactDetailsIsValid(false);
  let mySubscription = null;

  useEffect(() => {
    activeCustomer.phone &&
      getMessagesForCustomer({
        user: phoneNumberId,
        customer: activeCustomer.phone
      });
    setActiveCustomer(activeCustomer);
    hideContactDetails();
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!mySubscription) {
      //eslint-disable-next-line
      mySubscription = supabase
        .from("whatsapp_messages")
        .on("*", (payload) => {
          console.log(payload.new);
          getSubscribedToMessages(payload.new);
        })
        .subscribe();
    }
    return () => {
      supabase.removeSubscription(mySubscription);
      mySubscription = null;
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {/* {!contactDetailsIsVaild && (
        <div
          className="contact-details-open-icon"
          onClick={() => showContactDetails()}
        >
          <InfoCircleOutlined style={icon1Style} />
        </div>
      )} */}
      <div className="conversation-wrapper">
        <div
          style={{
            width: contactDetailsIsVaild ? "72%" : "100%"
          }}
        >
          {messagesLoading ? (
            <div className="spin-style">
              <Spin />
            </div>
          ) : (
            <>
              {activeCustomer.phone && messages.length > 0 ? (
                <Element
                  name="test7"
                  className="element"
                  id="containerElement"
                  style={elementStyle}
                >
                  {reversedMessages.map((item) => {
                    const imageFinder =
                      item.message_text.match(/\.(jpeg|jpg|png|gif)/g) != null;
                    return (
                      <div key={item.message_id}>
                        <div style={messageWrapperStyle(item, phoneNumberId)}>
                          {imageFinder ? (
                            <img
                              src={item.message_text}
                              alt="chat-img"
                              className="chat-image"
                            />
                          ) : (
                            <p style={messageStyle(item, phoneNumberId)}>
                              {item.message_text}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </Element>
              ) : (
                <div className="converstion-empty-text">
                  <Typography>
                    Hey, customer is looking foward for your initiative
                  </Typography>
                  <div className="chat-arrow-margin">
                    <ChatArrowSvg />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <MessageTyper
          activeCustomer={activeCustomer}
          messages={messages}
          contactDetailsIsVaild={contactDetailsIsVaild}
        />

        {/* <ContactForm
          contactDetailsIsVaild={contactDetailsIsVaild}
          hideContactDetails={hideContactDetails}
          activeCustomer={activeCustomer}
        /> */}
      </div>
    </>
  );
};

const mapStateToProps = ({ whatsApp }) => {
  const { customers, messages, messagesLoading } = whatsApp;
  return { customers, messages, messagesLoading };
};

const mapDispatchToProps = {
  getMessagesForCustomer,
  getSubscribedToMessages,
  setActiveCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveConversation);
