import { Menu, Typography, Button, Avatar, Input, Spin, Grid } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  SearchOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import utils from "utils";
//user-imports
import CustomMenu from "./CustomMenu";
import Icon from "../util-components/Icon";
import { showCustomerModal, hideCustomerModal } from "redux/actions/WhatsApp";
import AddCustomerModal from "./AddCustomerModal";
import { TuneSvg } from "assets/svg/icon";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const inputStyles = { marginLeft: "12px", height: "36px", width: "287px" };
const addIconStyles = { color: "#8F9FB3", fontSize: "20px", marginLeft: "5px" };
const { useBreakpoint } = Grid;

const CustomNavLink = (props) => {
  const { item } = props;
  return (
    <NavLink
      to={`${APP_PREFIX_PATH}/whats-app/${item.customer_id}`}
      activeClassName="conversation-nav-list-active-wrapper"
      className="conversation-nav-list-wrapper"
    >
      {props.children}
    </NavLink>
  );
};

const ConversationNav = (props) => {
  const {
    customerModal,
    showCustomerModal,
    hideCustomerModal,
    customers,
    navCollapsed,
    allCustomersLoading,
    allCustomersError
  } = props;

  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("lg");

  return (
    <>
      <AddCustomerModal
        isModalVisible={customerModal}
        handleCancel={() => hideCustomerModal()}
      />
      {customers.length ? (
        <>
          <div className="converstaion-nav-input-wrapper">
            {(!navCollapsed || isMobile) && (
              <>
                <Input
                  placeholder="Search name, message..."
                  prefix={<SearchOutlined />}
                  style={inputStyles}
                />
                <div className="conversation-nav-icon-div">
                  <TuneSvg />
                </div>
              </>
            )}
            {isMobile && (
              <div
                onClick={() => showCustomerModal()}
                className="add-customer-icon"
              >
                <UserAddOutlined style={addIconStyles} />
              </div>
            )}
          </div>
          {customers.map((item) => (
            <div key={item.customer_id}>
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
                      {item.name}
                    </Typography>
                    <Typography className="conversation-heading4">
                      Await your message
                    </Typography>
                  </div>
                  <div className="conversation-nav-div3">
                    <Typography className="conversation-heading4">
                      10m
                    </Typography>
                  </div>
                </CustomNavLink>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {allCustomersLoading ? (
            <div className="converstaion-nav-loadder">
              <Spin indicator={<SyncOutlined spin />} />
            </div>
          ) : (
            <>
              {allCustomersError ? (
                <></>
              ) : (
                <>
                  {navCollapsed && !isMobile ? (
                    <CustomMenu {...props}>
                      <Menu.Item onClick={() => showCustomerModal()}>
                        <Icon type={UserAddOutlined} />
                        <span>Add Contacts</span>
                      </Menu.Item>
                    </CustomMenu>
                  ) : (
                    <div className="conversation-sidebar-div">
                      <img
                        src="/img/add-contact-logo.png"
                        alt="add-contact-logo"
                      />
                      <Typography className="conversation-heading2">
                        Feel empty and so lonely Customer will be by your side
                      </Typography>
                      <Button
                        type="primary"
                        onClick={() => showCustomerModal()}
                      >
                        Add contact
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

const mapStateToProps = ({ theme, whatsApp }) => {
  const { customerModal, customers, allCustomersLoading, allCustomersError } =
    whatsApp;
  return {
    customerModal,
    customers,
    allCustomersLoading,
    allCustomersError
  };
};
const mapDispatchToProps = {
  showCustomerModal,
  hideCustomerModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationNav);
