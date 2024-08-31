import React from "react";
import { connect } from "react-redux";

import Loading from "components/shared-components/Loading";
import HeaderNav from "components/layout-components/HeaderNav";
import { Layout, Grid } from "antd";
import utils from "utils";
import { useThemeSwitcher } from "react-css-theme-switcher";
import AccountSettings from "../../views/auth-views/account-settings";

const { useBreakpoint } = Grid;

export const SettingLayout = () => {
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("lg");

  const { status } = useThemeSwitcher();

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  return (
    <Layout>
      <HeaderNav isMobile={isMobile} />
      <AccountSettings />
    </Layout>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { navCollapsed, navType, locale } = theme;
  const { userInfo } = auth;
  return { navCollapsed, navType, locale, userInfo };
};

export default connect(mapStateToProps)(React.memo(SettingLayout));
