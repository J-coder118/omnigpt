import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_DARK,
  NAV_TYPE_SIDE
} from "constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "./MenuContent";

const { Sider } = Layout;

export const SideNav = ({
  navCollapsed,
  sideNavTheme,
  routeInfo,
  hideGroupTitle,
  localization = true,
  heightNotice
}) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };
  const style = {
    height: `calc(100vh/0.9 - 70px - ${heightNotice})`
  };

  return (
    <>
      <Sider
        className={`side-nav ${
          sideNavTheme === SIDE_NAV_DARK ? "side-nav-dark" : ""
        }`}
        width={SIDE_NAV_WIDTH}
        collapsed={navCollapsed}
        style={style}
      >
        <Scrollbars autoHide>
          <MenuContent type={NAV_TYPE_SIDE} {...props} />
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
