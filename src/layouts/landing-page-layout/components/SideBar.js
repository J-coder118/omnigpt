import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK } from "constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars";
import SideContent from "./SideContent";

const { Sider } = Layout;

export const SideNav = ({
  navCollapsed,
  sideNavTheme,
  hideGroupTitle,
  localization = true,
  isMobile,
  openModal
}) => {
  const style = {
    // height: `calc(105vh)`
    height: "auto",
    top: 0
  };

  return (
    <>
      <Sider
        className={`side-nav ${
          sideNavTheme === SIDE_NAV_DARK ? "side-nav-dark" : ""
        }`}
        width={SIDE_NAV_WIDTH}
        collapsed={navCollapsed}
        style={{ ...style }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Scrollbars autoHide>
          <SideContent
            isMobile={isMobile}
            navCollapsed={navCollapsed}
            openModal={openModal}
          />
        </Scrollbars>
      </Sider>
    </>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme, currentTheme } = theme;
  return { navCollapsed, sideNavTheme, currentTheme };
};

export default connect(mapStateToProps)(SideNav);
