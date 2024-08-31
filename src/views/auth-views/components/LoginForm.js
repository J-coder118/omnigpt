import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Divider } from "antd";
import { MailOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GoogleSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import AlertMessage from "components/layout-components/AlertMessage";
import "./login.css";
import { EMAIL_SIGN_IN } from "redux/constants/Auth";
import { getItemLocal, setItemLocal } from "utils/localStorage";
// import { amplitude } from "App";

export const LoginForm = (props) => {
  let history = useHistory();

  const {
    otherSignIn,
    hideAuthMessage,
    showLoading,
    signInWithGoogle,
    extra,
    signIn,
    session,
    loading,
    redirect,
    showMessage,
    showSuccessMessage,
    message,
    allowRedirect = true
  } = props;

  const dataFromLocal = getItemLocal(EMAIL_SIGN_IN);

  const initialCredential = dataFromLocal || {
    email: ""
  };

  const onLogin = (values) => {
    // amplitude.track("Sign In");
    showLoading();
    signIn(values);
    setItemLocal(EMAIL_SIGN_IN, values);
  };

  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
    // amplitude.track("Sign In");
  };

  useEffect(() => {
    if (session !== null && allowRedirect) {
      history.push(redirect);
    }
    if (showMessage || showSuccessMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  useEffect(() => {
    if (showSuccessMessage) {
      history.push("welcome");
    }
  }, [history, showSuccessMessage]);

  useEffect(() => {
    document.body.style.borderBottom = "2px solid #13192a";
    return () => {
      document.body.style.borderBottom = "none";
    };
  }, []);

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-sm font-weight-normal">
          or connect with
        </span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => onGoogleLogin()}
          className="mr-2 w-50"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG} />}
        >
          Google
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <AlertMessage
        alertType="error"
        showMessage={showMessage}
        message={message}
        width="100%"
      />
      <AlertMessage
        alertType="success"
        showMessage={showSuccessMessage}
        message={message}
        width="100%"
      />

      <Form
        layout="vertical"
        name="login-form"
        autoComplete="off"
        initialValues={initialCredential}
        onFinish={onLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email"
            },
            {
              type: "email",
              message: "Email format should be like example@site.com"
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className="icon-mail" />}
            className="input-email"
            placeholder="Your email"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="btn-login"
          >
            Sign in
          </Button>
        </Form.Item>
        {otherSignIn ? renderOtherSignIn : null}
        {extra}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false
};

const mapStateToProps = ({ auth }) => {
  const {
    loading,
    message,
    showMessage,
    token,
    redirect,
    session,
    showSuccessMessage
  } = auth;
  return {
    loading,
    message,
    showMessage,
    token,
    redirect,
    session,
    showSuccessMessage
  };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
