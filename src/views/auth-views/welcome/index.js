import React, { useEffect } from "react";
import { Card, Col, Button } from "antd";

import {
  EMAIL_SIGN_IN,
  SHOULD_SHOW_POPUP_WHATSAPP
} from "redux/constants/Auth";
import { getItemLocal, setItemLocal } from "utils/localStorage";
import PopupLayout from "layouts/popup-layout";

import "./welcome.css";
import IntlMessage from "components/util-components/IntlMessage";

const WelcomePage = () => {
  const dataFromLocal = getItemLocal(EMAIL_SIGN_IN);
  setItemLocal(SHOULD_SHOW_POPUP_WHATSAPP, "true");

  const redirectToMailbox = () => {
    if (!dataFromLocal?.email) return;
    else window.location.href = `https://mail.google.com/`;
  };

  useEffect(() => {
    document.body.style.borderBottom = "2px solid #13192a";
    return () => {
      document.body.style.borderBottom = "none";
    };
  }, []);

  return (
    <PopupLayout>
      <Col xs={22} sm={20} md={18} lg={10}>
        <Card>
          <div className="welcome">
            <div className="text-center">
              <h1 className="title">
                <IntlMessage id="welcome.title" />
              </h1>
              <p className="sub-title">
                <IntlMessage
                  id="welcome.subTitle"
                  values={{
                    email: (
                      <>
                        <b> {dataFromLocal?.email} </b>
                        <br />
                      </>
                    )
                  }}
                />
              </p>
              <Button
                type="primary"
                block
                className="btn-verify-email"
                onClick={redirectToMailbox}
              >
                <IntlMessage id="welcome.button.verify" />
              </Button>
              <p className="explain">
                <IntlMessage id="welcome.explain" />
                <br />
                <IntlMessage id="welcome.canFindIt" />{" "}
                <a href="login">
                  <IntlMessage id="welcome.resend" />
                </a>
              </p>
              <img
                className="img-fluid"
                srcSet={`/img/new-logo.png 2x`}
                alt="Omni GPT"
              />
            </div>
          </div>
        </Card>
      </Col>
    </PopupLayout>
  );
};

export default WelcomePage;
