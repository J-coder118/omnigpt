import { useState } from "react";
import { Typography } from "antd";
import { connect } from "react-redux";
//user-imports
import ChannelCard from "components/layout-components/ChannelCard";
import { switchToChat } from "redux/actions/Conversation";
import IntegrationWhatsApp from "../integration-whatsapp";
let whatsappLogo = "/img/whatsapp-logo.png";

const ChatChannels = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <IntegrationWhatsApp isVisible={isVisible} setIsVisible={setIsVisible} />
      <div>
        <Typography className="home-heading1">Integrations</Typography>

        <div className="channel-title channel-align-row-center">
          <Typography className="home-heading2">
            Start using WhatsApp
          </Typography>
        </div>

        <div
          style={{ cursor: "pointer", maxWidth: "200px", margin: "0px auto" }}
          onClick={() => {
            setIsVisible(true);
            // switchToChat();
            // history.push(`${APP_PREFIX_PATH}/whats-app`);
          }}
        >
          <ChannelCard title="Add Whatsapp" image={whatsappLogo} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, conversation }) => {
  return {};
};

const mapDispatchToProps = {
  switchToChat
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatChannels);
