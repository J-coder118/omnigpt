import { Typography, Row, Col, Grid } from "antd";
import { connect } from "react-redux";
import { Suspense, lazy, useEffect, useState } from "react";
import { amplitude } from "App";
import { supabase } from "auth/SupabaseClient";
import IntlMessage from "components/util-components/IntlMessage";
import TrialModal from "layouts/landing-page-layout/components/TrialModal";
// import useHeightContent from "hooks/useHeightContent";

import IntegrationCardLoading from "./IntegrationCardLoading";
import LandingHeader from "layouts/landing-page-layout/components/LandingHeader";

import utils from "utils";

const IntegrationCard = lazy(() => import("./IntegrationCard")),
  AvailableIntegrations = import("./contants.js").then(
    ({ AvailableIntegrations }) => {
      return { AvailableIntegrations };
    }
  );

const Integration = ({ userInfo, session }) => {
  const [slackConnection, setSlackConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [IntegrationData, setIntegrationData] = useState([]);

  const { useBreakpoint } = Grid,
    screens = utils.getBreakPoint(useBreakpoint()),
    isMobile = !screens.includes("lg");
  // const height = useHeightContent(userInfo);
  // console.log("userInfo" , userInfo , session)
  useEffect(() => {
    amplitude.track("View Integration event");
    const url = new URL(window.location.href);
    // Get the value of the "code" parameter
    const codeValue = url.searchParams.get("code");

    // Do something with the codeValue, e.g., update state or make an API call
    console.log("Code value:", codeValue);
    async function fetchSlackUser() {
      const { data } = await supabase
        .from("slack_app_users")
        .select()
        .eq("user_id", session.user.id);

      if (data.length > 0) {
        setSlackConnection(true);
      }
    }
    session?.user.id && fetchSlackUser();
    const fetchStatus = async () => {
      if (codeValue) {
        const transcript = await fetch(
          `${process.env.REACT_APP_SUPABASE_EDGE_FUNCTION_URL}/slack-webhook`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`
            },
            method: "POST",
            body: JSON.stringify({
              type: "connection",
              code: codeValue,
              userId: session.user.id
            })
          }
        );
        await transcript.json();
        setSlackConnection(true);
      }
    };
    codeValue && fetchStatus();
  }, [session?.user?.id, userInfo?.id]);

  useEffect(() => {
    amplitude.track("View Integration");
    AvailableIntegrations.then(({ AvailableIntegrations }) =>
      setIntegrationData(AvailableIntegrations)
    );
  }, []);

  return (
    <section
      style={{
        height: "111vh",
        overflowX: "auto"
      }}
    >
      <span>
        <LandingHeader isMobile={isMobile} />
      </span>
      <div>
        <Row style={{ paddingTop: "8%" }}>
          <Col span={20} offset={2}>
            <Typography.Title level={1}>
              <IntlMessage id="nav.integrations" />
            </Typography.Title>
            <p>
              Easily integrate OmniGPT with your favorite tools and apps for
              seamless collaboration.
            </p>
          </Col>
        </Row>
        <Row
          justify="space-around"
          style={{ marginTop: "1.8em", padding: "0 5%" }}
          className="integration-content"
        >
          {IntegrationData?.map((item) => (
            <Suspense key={item.title} fallback={<IntegrationCardLoading />}>
              <IntegrationCard
                {...item}
                phone={userInfo?.whatsapp_number}
                slackConnection={slackConnection}
                session={session}
                setOpen={(v) => setOpen(v)}
                open={open}
              />
            </Suspense>
          ))}
        </Row>
        <TrialModal isModalOpen={open} setIsModalOpen={setOpen} />
      </div>
    </section>
  );
};

const mapStateToProps = ({ auth }) => {
  const { userInfo, session } = auth;
  return {
    userInfo,
    session
  };
};

export default connect(mapStateToProps)(Integration);
