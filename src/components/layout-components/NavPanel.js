import React, { Component } from "react";
import { Drawer, Avatar, Menu, Dropdown } from "antd";
import ThemeConfigurator from "./ThemeConfigurator";
import { connect } from "react-redux";
import { DIR_RTL } from "constants/ThemeConstant";
import { signOut } from "redux/actions/Auth";
import { setOpenPopUp } from "redux/actions/Conversation";
import utils from "utils";
import IntlMessage from "components/util-components/IntlMessage";
import {
  SettingOutlined,
  ShopOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { Link } from "react-router-dom";

export class NavPanel extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { session, direction, signOut } = this.props;
    const initials = session
      ? utils.getEmailInitials(session.user.email)
      : utils.getEmailInitials("user");

    return (
      <>
        <div
          className="nav-pannel-menu-item"
          onClick={() => setOpenPopUp(true)}
          style={{ cursor: "pointer" }}
        >
          <Dropdown
            placement="bottomRight"
            style={{
              background: "transparent !important",
              border: "none !important"
            }}
            overlay={
              <Menu>
                <Menu.Item key="0" icon={<SettingOutlined />}>
                  <Link to={`/account`}>
                    <IntlMessage id="header.menu.accountSetting" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<ShopOutlined />}>
                  <Link to={`${APP_PREFIX_PATH}/integration`}>
                    <IntlMessage id="nav.integrations" />
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => signOut()}
                  icon={<LogoutOutlined />}
                >
                  <IntlMessage id="header.menu.signOut" />
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar
              size={40}
              style={{
                color: "#FFFFFF",
                backgroundColor: session
                  ? utils.generateAvatarColor(session.user.email)
                  : utils.generateAvatarColor("user")
              }}
            >
              {initials}
            </Avatar>
          </Dropdown>
        </div>
        <Drawer
          title="Theme Config"
          placement={direction === DIR_RTL ? "left" : "right"}
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ThemeConfigurator />
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = ({ auth, theme, conversation }) => {
  const { locale } = theme;
  const { session } = auth;
  const { openPopUp } = conversation;
  return { session, locale, openPopUp };
};
const mapDispatchToProps = {
  signOut,
  setOpenPopUp
};

export default connect(mapStateToProps, mapDispatchToProps)(NavPanel);
