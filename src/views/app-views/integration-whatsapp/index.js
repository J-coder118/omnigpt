import { useState, useEffect } from "react";
import { Typography, Button, Modal, message } from "antd";
import axios from "axios";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import { sendTemplateApiContent } from "./configs/ApiConfigs";

import {
  version,
  phoneNumberId
} from "../whatsapp/active-conversation/constants";

const IntegrationWhatsApp = ({ isVisible, setIsVisible }) => {
  const [phone, setPhone] = useState({ short: "US", phone: "" });
  const [loading, setLoading] = useState(false);

  const [phoneError, setPhoneError] = useState(null);
  const inputPhoneStyle = {
    height: "48px",
    border: phoneError ? "1px solid #F24962" : "1px solid #e6ebf1"
  };

  useEffect(() => {
    if (phone.phone.trim().length > 0) setPhoneError(null);
  }, [phone]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (phone.phone.trim().length === 0) {
      setPhoneError("Required field");
      return;
    }
    // const id = Math.floor(Math.random() * 1000);
    const contactNo = phone.code + phone.phone;
    console.log(contactNo);
    const { body, content } = sendTemplateApiContent(contactNo);
    try {
      const res = await axios.post(
        `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
        body,
        content
      );
      console.log(res.status);

      if (res.status === 200) {
        message.success("Pleease check your WhatsApp");
      }
      setLoading(false);
      setIsVisible(false);
      setPhone({ short: "US", phone: "" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Failed, Please try Again.");
    }
  };

  return (
    <Modal
      title="Add ChatGPT to WhatsApp"
      width={350}
      footer={null}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
    >
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "20px" }}>
          <Typography className="conversation-modal-heading">
            Phone number
          </Typography>
          <ConfigProvider locale={en}>
            <CountryPhoneInput
              value={phone}
              onChange={(v) => {
                setPhone(v);
              }}
              style={inputPhoneStyle}
            />
          </ConfigProvider>
          {phoneError && (
            <Typography className="conversation-modal-error-heading">
              {phoneError}
            </Typography>
          )}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          style={{ width: "100%" }}
        >
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default IntegrationWhatsApp;
