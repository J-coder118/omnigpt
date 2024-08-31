import { Menu, Typography, Button, Avatar, Spin, Grid } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  SyncOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import utils from "utils";
//user-imports
import CustomMenu from "./CustomMenu";
import Icon from "../util-components/Icon";
import {
  showCustomerModal,
  hideCustomerModal,
  switchToHome
} from "redux/actions/Conversation";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const { useBreakpoint } = Grid;

const CustomNavLink = (props) => {
  const { item } = props;
  return (
    <NavLink
      to={`${APP_PREFIX_PATH}/conversation/${item.thread_id}`}
      activeClassName="conversation-nav-list-active-wrapper"
      className="conversation-nav-list-wrapper"
    >
      {props.children}
    </NavLink>
  );
};

const ConversationNav = (props) => {
  const {
    navCollapsed,
    switchToHome,
    threads,
    threadsLoading,
    threadsErrorMessage
  } = props;
  const history = useHistory();
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("lg");

  const newThreadHandler = () => {
    switchToHome();
    history.push(`${APP_PREFIX_PATH}/home`);
  };

  return (
    <>
      {threads.length > 0 ? (
        <>
          <div className="add-thread-nav-wrapper" onClick={newThreadHandler}>
            <FileAddOutlined />
            <Typography className="add-thread-nav-text">New Thread</Typography>
          </div>
          {threads.map((item) => (
            <div key={`THREADS-${item.thread_id}`}>
              {navCollapsed && !isMobile ? (
                <CustomNavLink item={item}>
                  <div style={{ margin: "0 auto" }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </div>
                </CustomNavLink>
              ) : (
                <CustomNavLink item={item}>
                  <div className="coversation-nav-div1">
                    <Avatar size="large" icon={<UserOutlined />} />
                  </div>
                  <div className="conversation-nav-div2">
                    <Typography className="conversation-heading3">
                      {item.thread_name}
                    </Typography>
                  </div>
                </CustomNavLink>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {threadsLoading ? (
            <div className="converstaion-nav-loadder">
              <Spin indicator={<SyncOutlined spin />} />
            </div>
          ) : (
            <>
              {threadsErrorMessage ? (
                <></>
              ) : (
                <>
                  {navCollapsed && !isMobile ? (
                    <CustomMenu {...props}>
                      <Menu.Item onClick={newThreadHandler}>
                        <Icon type={UserAddOutlined} />
                        <span>Create New</span>
                      </Menu.Item>
                    </CustomMenu>
                  ) : (
                    <div className="conversation-sidebar-div">
                      <Typography className="conversation-heading2">
                        No Thread available
                      </Typography>
                      <Button type="primary" onClick={newThreadHandler}>
                        Create New
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ theme, conversation }) => {
  const {
    customerModal,
    customers,
    allCustomersLoading,
    allCustomersError,
    messages,
    messagesLoading,
    messagesErrorMessage,
    threads,
    threadsLoading,
    threadsErrorMessage
  } = conversation;
  return {
    customerModal,
    customers,
    allCustomersLoading,
    allCustomersError,
    messages,
    messagesLoading,
    messagesErrorMessage,
    threads,
    threadsLoading,
    threadsErrorMessage
  };
};
const mapDispatchToProps = {
  showCustomerModal,
  hideCustomerModal,
  switchToHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationNav);
