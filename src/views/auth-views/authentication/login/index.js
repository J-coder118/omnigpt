import React from "react";
import { Card, Row, Col } from "antd";
import LoginForm from "../../components/LoginForm";
import PopupLayout from "layouts/popup-layout";
import IntlMessage from "components/util-components/IntlMessage";
import { useIntl } from "react-intl";

const LoginOne = (props) => {
  const intl = useIntl();
  const theme = localStorage.getItem("preferred-theme")
    ? localStorage.getItem("preferred-theme")
    : "light";

  return (
    <PopupLayout>
      <Col xs={22} sm={20} md={15} lg={8}>
        <Card>
          <div className="login-form my-4">
            <div className="text-center">
              <img
                className="img-fluid"
                srcSet={
                  theme === "light"
                    ? "/img/new-logo.png 2x"
                    : "/img/omni-white.png 2x"
                }
                alt={intl.formatMessage({ id: "title" })}
              />
              <p className="describe">
                <IntlMessage id="signIn.title" />
              </p>
            </div>
            <Row justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <LoginForm {...props} />
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </PopupLayout>
  );
};

export default LoginOne;
