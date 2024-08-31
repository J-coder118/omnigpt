import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Grid, Spin } from "antd";
import SideNav from "components/layout-components/SideNav";
import TopNav from "components/layout-components/TopNav";
import MobileNav from "components/layout-components/MobileNav";
import HeaderNav from "components/layout-components/HeaderNav";
import PageHeader from "components/layout-components/PageHeader";
import ButtonCollapse from "components/layout-components/ButtonCollapse";
import PaymentNotice from "components/layout-components/PaymentNotice";
import WelcomeDialog from "components/layout-components/Payment/WelcomeDialog";
import FailureNoticeDialog from "components/layout-components/Payment/FailureNotice";
import LockDialog from "components/layout-components/Payment/Lock";
import AppViews from "views/app-views";
import navigationConfig from "configs/NavigationConfig";
import { NAV_TYPE_SIDE, NAV_TYPE_TOP } from "constants/ThemeConstant";
import { SUBCRIBE_STATUS } from "constants/common";
import utils from "utils";
import { addDays, getUnixTime } from "date-fns";
import { LoadingOutlined } from "@ant-design/icons";

const Icon = (
  <LoadingOutlined style={{ fontSize: 35, color: "#1FC77E" }} spin />
);

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AppLayout = ({
  navCollapsed,
  navType,
  location,
  direction,
  userInfo
}) => {
  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname
  );
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("lg");
  const isNavSide = navType === NAV_TYPE_SIDE;
  const isNavTop = navType === NAV_TYPE_TOP;

  const [heightNotice, setHeightNotice] = useState("0px");
  const [open, setOpen] = useState(false);
  const [openPaymentFailure, setOpenPaymentFailure] = useState(false);
  const [openLock, setOpenLock] = useState(false);
  const [hideloader, setHideLoader] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const isHidden = userInfo?.subscription_id;
      setOpen(!isHidden);

      if (userInfo?.subscription_status === SUBCRIBE_STATUS.SUSPENDED) {
        setHeightNotice("62px");
      }

      if (
        userInfo?.subscription_status !== SUBCRIBE_STATUS.ACTIVE &&
        Object.values(SUBCRIBE_STATUS).includes(userInfo?.subscription_status)
      ) {
        const maxDateActive = getUnixTime(
          addDays(userInfo?.period_end * 1000, 3)
        );

        if (Date.now() / 1000 > maxDateActive) {
          setOpenLock(true);
        } else if (
          userInfo?.subscription_status === SUBCRIBE_STATUS.SUSPENDED
        ) {
          setOpenPaymentFailure(true);
        }
      }
    }
  }, [userInfo]);

  useEffect(() => {
    const timer1 = setTimeout(() => setHideLoader(true), 1000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <>
      {!hideloader && (
        <div className="loader-center-static">
          <Spin indicator={Icon} />
        </div>
      )}
      <PaymentNotice />
      <Layout>
        <HeaderNav isMobile={isMobile} />
        {isNavTop && !isMobile ? <TopNav routeInfo={currentRouteInfo} /> : null}
        <Layout className="app-container">
          {isNavSide && !isMobile ? (
            <SideNav routeInfo={currentRouteInfo} heightNotice={heightNotice} />
          ) : null}
          <Layout className="app-layout">
            <div className={`app-content ${isNavTop ? "layout-top-nav" : ""}`}>
              <PageHeader
                display={currentRouteInfo?.breadcrumb}
                title={currentRouteInfo?.title}
              />
              <Content>
                <AppViews />
              </Content>

              <WelcomeDialog open={open} setOpen={setOpen} />
              <FailureNoticeDialog
                open={openPaymentFailure}
                setOpen={setOpenPaymentFailure}
              />
              <LockDialog open={openLock} />
            </div>
          </Layout>
        </Layout>
        <ButtonCollapse isMobile={isMobile} />
        {isMobile && <MobileNav />}
      </Layout>
    </>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { navCollapsed, navType, locale } = theme;
  const { userInfo } = auth;
  return { navCollapsed, navType, locale, userInfo };
};

export default connect(mapStateToProps)(React.memo(AppLayout));
