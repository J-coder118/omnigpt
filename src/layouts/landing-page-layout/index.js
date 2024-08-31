import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout, Spin, Grid } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import utils from "utils";
import LandingHeader from "./components/LandingHeader";
import { NAV_TYPE_TOP } from "constants/ThemeConstant";
import SideBar from "./components/SideBar";
import LandingChat from "./components/LandingChat";
import TrialModal from "./components/TrialModal";
import CollapseSider from "./components/CollapseSider";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const Icon = (
  <LoadingOutlined style={{ fontSize: 35, color: "#1FC77E" }} spin />
);

const LandingPageLayout = ({ navType, navCollapsed, userInfo }) => {
  let history = useHistory();

  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("lg");
  const isNavTop = navType === NAV_TYPE_TOP;

  const [hideloader, setHideLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  useEffect(() => {
    if (userInfo) {
      history.push(`${APP_PREFIX_PATH}/home`);
    }
  }, [history, userInfo]);

  useEffect(() => {
    const timer1 = setTimeout(() => setHideLoader(true), 1000);

    return () => clearTimeout(timer1);
  }, []);
  return (
    <>
      {!hideloader ? (
        <div className="loader-center-static">
          <Spin indicator={Icon} />
        </div>
      ) : (
        <>
          <Layout style={{ overflowY: "hidden" }}>
            <LandingHeader isMobile={isMobile} />
            <Layout className="app-container">
              <SideBar isMobile={isMobile} openModal={openModal} />
              <Layout className="app-layout" style={{ height: "111.1vh" }}>
                <div
                  className={`app-content ${isNavTop ? "layout-top-nav" : ""}`}
                  style={{
                    minHeight: "101vh"
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      height: "calc(100% - 100px)",
                      alignContent: "center"
                    }}
                  >
                    <Content
                      style={{
                        overflowY: "auto"
                      }}
                    >
                      <LandingChat openModal={openModal} />
                    </Content>
                  </div>
                </div>
              </Layout>
            </Layout>
            <CollapseSider isMobile={isMobile} navCollapsed={navCollapsed} />
          </Layout>
          <TrialModal isModalOpen={open} setIsModalOpen={setOpen} />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { navCollapsed, navType, locale } = theme;
  const { userInfo } = auth;
  return { navCollapsed, navType, locale, userInfo };
};

export default connect(mapStateToProps)(LandingPageLayout);
