import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Layout, Menu, Grid, Dropdown } from "antd";
import { WhatsAppOutlined, EllipsisOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import NavPanel from "./NavPanel";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH
} from "constants/ThemeConstant";
import utils from "utils";
import { switchToChat, switchToHome } from "redux/actions/Conversation";
import ChatLogo from "./ChatLogo";
import { useHistory, useLocation } from "react-router";
import IntlMessage from "components/util-components/IntlMessage";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import CollaborationModal from "./CollaborationModal";
import { supabase } from "auth/SupabaseClient";
import { WAITLIST_TYPES } from "constants/common";

const { Header } = Layout;
const { useBreakpoint } = Grid;

export const HeaderNav = (props) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    isMobile,
    currentTheme,
    direction,
    chatPage,
    userInfo
  } = props;
  const history = useHistory();
  const screens = useBreakpoint();

  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [currentNav, setCurrentNav] = useState("");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [waitListJoined, setWaitListJoined] = useState({
    joined: false,
    country: "",
    reason: ""
  });

  useEffect(() => {
    async function fetchWaitlist() {
      const { data } = await supabase
        .from("feature_waitlist")
        .select()
        .eq("user_id", userInfo?.id)
        .eq("feature_type", WAITLIST_TYPES.COLLABORATION);

      if (data.length > 0) {
        const rec = data[0];
        setWaitListJoined({
          joined: true,
          country: rec.country,
          reason: rec.reason
        });
      }
    }
    if (userInfo?.id) {
      fetchWaitlist();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      const isHidden = userInfo.whatsapp_number;
      setShowWhatsapp(!isHidden);
    } else {
      setShowWhatsapp(true);
    }
  }, [userInfo]);

  useEffect(() => {
    if (location.pathname.includes("integration")) {
      setCurrentNav("integration");
    } else if (location.pathname.includes("/app/home")) {
      setCurrentNav("workspace");
    } else if (location.pathname.includes("/app/conversation")) {
      setCurrentNav("workspace");
    } else {
      setCurrentNav("");
    }
  }, [location]);

  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
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

  const handleSettingWhatsapp = () => {
    history.push("/whatsapp");
  };
  const handleClick = (e) => {
    if (e.key === "collaboration") {
      setOpen(true);
    } else {
      setCurrentNav(e.key);
    }
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
                <Link to={`${APP_PREFIX_PATH}/app/home`}>
                  <IntlMessage id="nav.workspaces" />
                </Link>
              </Menu.Item>
              <Menu.Item key="integration">
                <Link to={`${APP_PREFIX_PATH}/integration`}>
                  <IntlMessage id="nav.integrations" />
                </Link>
              </Menu.Item>
              <Menu.Item key="collaboration">
                <IntlMessage id="nav.collaboration" />
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
                    <Link to={`${APP_PREFIX_PATH}/app/home`}>
                      <IntlMessage id="nav.workspaces" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="integration">
                    <Link to={`${APP_PREFIX_PATH}/integration`}>
                      <IntlMessage id="nav.integrations" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="collaboration">
                    <IntlMessage id="nav.collaboration" />
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
            {showWhatsapp && (
              <Button
                type="primary btn-connect-whatsapp"
                block
                className="btn-connect-whatsapp"
                icon={<WhatsAppOutlined />}
                onClick={handleSettingWhatsapp}
              >
                <IntlMessage id="notice.whatsapp.button.connect" />
              </Button>
            )}
            <NavPanel direction={direction} />
          </div>
        </div>
      </div>
      <CollaborationModal
        open={open}
        setOpen={setOpen}
        userInfo={userInfo}
        setWaitListJoined={setWaitListJoined}
        waitListJoined={waitListJoined}
        setCurrentNav={setCurrentNav}
      />
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
