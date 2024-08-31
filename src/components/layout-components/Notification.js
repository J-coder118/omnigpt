import { notification } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { CheckCircleOutlined } from "@ant-design/icons";

const Notification = ({ notiType, notiMsg }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    api.info({
      message: notiMsg,
      description:
        notiType === "success"
          ? "You can now use your new number to connect with OmniGPT on WhatsApp."
          : "",
      placement: "bottomLeft",
      icon: <CheckCircleOutlined />
    });
  }, [api, notiType, notiMsg]);

  return contextHolder;
};

const mapStateToProps = ({ theme }) => {
  const { notiType, notiMsg } = theme;
  return { notiType, notiMsg };
};

export default connect(mapStateToProps)(Notification);
