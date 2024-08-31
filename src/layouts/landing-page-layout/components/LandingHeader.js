import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Avatar, Layout, Menu, Grid, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import Logo from "components/layout-components/Logo";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH
} from "constants/ThemeConstant";
import utils from "utils";
import { switchToChat, switchToHome } from "redux/actions/Conversation";
import ChatLogo from "components/layout-components/ChatLogo";
import { useLocation } from "react-router";
import IntlMessage from "components/util-components/IntlMessage";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const { Header } = Layout;
const { useBreakpoint } = Grid;

export const HeaderNav = (props) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    isMobile,
    currentTheme,
    chatPage
  } = props;
  const screens = useBreakpoint();

  const [currentNav, setCurrentNav] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("integration")) {
      setCurrentNav("integration");
    } else if (
      location.pathname.includes("/app/home") ||
      location.pathname.includes("/app/conversation") ||
      location.pathname === "/"
    ) {
      setCurrentNav("workspace");
    } else {
      setCurrentNav("");
    }
  }, [location]);

  const isNavTop = navType === NAV_TYPE_TOP;

  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();

  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };
  const handleClick = (e) => {
    setCurrentNav(e.key);
  };

  return (
    <Header className={`app-header ${navMode}`}>
      <div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
        <div className={navCollapsed ? "nav-logo-collapsed" : "nav-logo"}>
          {!chatPage ? (
            <Logo logoType={navMode} />
          ) : (
            <ChatLogo logoType={navMode} />
          )}
        </div>
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          {screens["md"] && (
            <Menu
              onClick={handleClick}
              mode="horizontal"
              selectedKeys={[currentNav]}
              className="header-nav"
            >
              <Menu.Item key="workspace">
                <Link style={{ fontWeight: "400" }} to={"/"}>
                  <IntlMessage id="nav.workspaces" />
                </Link>
              </Menu.Item>
              <Menu.Item key="integration">
                <Link
                  style={{ fontWeight: "400" }}
                  to={`${APP_PREFIX_PATH}/integration`}
                >
                  <IntlMessage id="nav.integrations" />
                </Link>
              </Menu.Item>
            </Menu>
          )}

          {!screens["md"] && (
            <Dropdown
              placement="bottomRight"
              style={{
                background: "transparent !important",
                border: "none !important"
              }}
              overlay={
                <Menu
                  onClick={handleClick}
                  selectedKeys={[currentNav]}
                  className="header-nav"
                >
                  <Menu.Item key="workspace">
                    <Link to={"/"}>
                      <IntlMessage id="nav.workspaces" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="integration">
                    <Link to={`${APP_PREFIX_PATH}/integration`}>
                      <IntlMessage id="nav.integrations" />
                    </Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <span>
                <EllipsisOutlined style={{ padding: "0 1rem" }} />
              </span>
            </Dropdown>
          )}

          <div className="nav-right">
            <Avatar
              style={{ backgroundColor: "#4343FF", verticalAlign: "middle" }}
              size="large"
            >
              ?
            </Avatar>
          </div>
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = ({ auth, theme, conversation }) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction
  } = theme;
  const { chatPage } = conversation;
  const { userInfo } = auth;

  return {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
    chatPage,
    userInfo
  };
};
const mapDispatchToProps = {
  toggleCollapsedNav,
  onMobileNavToggle,
  switchToHome,
  switchToChat
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
