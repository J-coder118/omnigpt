import utils from "utils";
import { Grid, Typography } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LeftOutlined, UserAddOutlined } from "@ant-design/icons";
//user-imports
import { switchToHome, showCustomerModal } from "redux/actions/Conversation";
import { getLogoWidthGutter, getLogoDisplay } from "configs/HeaderConfig";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const { useBreakpoint } = Grid;
const iconStyle = { color: "#000000" };

const GetChatLogo = (props) => {
  const { navCollapsed, switchToHome, showCustomerModal } = props;
  if (navCollapsed) {
    return (
      <Link onClick={() => switchToHome()} to={`${APP_PREFIX_PATH}/home`}>
        <LeftOutlined style={iconStyle} />
      </Link>
    );
  }
  return (
    <div className="converstion-header">
      <Link onClick={() => switchToHome()} to={`${APP_PREFIX_PATH}/home`}>
        <LeftOutlined style={iconStyle} />
      </Link>
      <Typography className="conversation-heading1">Chats</Typography>
      <div onClick={() => showCustomerModal()} className="add-customer-icon">
        <UserAddOutlined style={iconStyle} />
      </div>
    </div>
  );
};

const ChatLogo = (props) => {
  const { mobileLogo } = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, mobileLogo)}
      style={{ width: `${getLogoWidthGutter(props, isMobile)}` }}
    >
      <GetChatLogo {...props} />
    </div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } = theme;
  return { navCollapsed, navType };
};
const mapDispatchToProps = {
  switchToHome,
  showCustomerModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatLogo);
