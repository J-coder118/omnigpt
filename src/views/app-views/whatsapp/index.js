import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col, Button, Form, Spin } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserInfo } from "redux/actions/Auth";

import PopupLayout from "layouts/popup-layout";
import { supabase } from "auth/SupabaseClient";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { ReactComponent as LoadingIcon } from "assets/svg/Loading.svg";
import IntlMessage from "components/util-components/IntlMessage";
import WhatsappSetting from "views/auth-views/account-settings/update-form/whatsapp-setting";
import { CloseOutlined } from "@ant-design/icons";
import { amplitude } from "App";

export const inputProps = {
  size: "large",
  style: {
    borderRadius: 5
  }
};

const WhatsAppSetting = ({ userInfo, session, setUserInfo }) => {
  const history = useHistory();
  const [phoneCode, setPhoneCode] = useState("66");

  const [isLoading, setLoading] = useState(false);
  const [isCheckingPhone] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      form.setFieldsValue({
        "phone-number": userInfo.whatsapp_number?.substring(
          userInfo.country_code?.length
        ),
        "phone-code": userInfo.country_code
      });
      setPhoneCode(userInfo.country_code);
    }
  }, [form, userInfo]);

  const onFinish = async (values) => {
    amplitude.track("Connect to WhatsApp");
    setLoading(true);
    const newUserInfo = {
      id: session.user.id,
      whatsapp_number: values["phone-number"]
        ? `${phoneCode}${values["phone-number"]}`
        : "",
      country_code: phoneCode
    };
    await supabase.from("users").upsert(newUserInfo);
    setLoading(false);
    setUserInfo(newUserInfo);

    history.push(`${APP_PREFIX_PATH}/home`);
  };

  const changePhoneCodeHandler = useCallback((value) => {
    setPhoneCode(value);
  }, []);

  const handleClose = () => {
    history.push(`${APP_PREFIX_PATH}/home`);
  };

  return (
    <PopupLayout>
      <Col xs={22} sm={20} md={15} lg={8}>
        <Card>
          <div className="login-form my-4">
            <div className="text-center">
              <img
                className="img-fluid"
                srcSet={`/img/new-logo.png 2x`}
                alt="Omni GPT"
              />
              {!isLoading && (
                <p className="describe">
                  <IntlMessage id="whatsapp.title" />
                </p>
              )}
            </div>
            <Row justify="center">
              {isLoading ? (
                <Col style={{ padding: "100px" }}>
                  <div className="loader-center">
                    <Spin
                      indicator={
                        <LoadingIcon
                          style={{ fontSize: "50px" }}
                          rotate={180}
                        />
                      }
                    />
                  </div>
                </Col>
              ) : (
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                      "phone-number": ""
                    }}
                    validateTrigger=""
                  >
                    <WhatsappSetting
                      phoneCode={phoneCode}
                      changePhoneCodeHandler={changePhoneCodeHandler}
                    />

                    <div>
                      <Button
                        htmlType="submit"
                        loading={isCheckingPhone}
                        style={{
                          background: "#1FC77E",
                          color: "white",
                          width: "100%",
                          borderRadius: "5px",
                          height: "40px"
                        }}
                      >
                        <IntlMessage id="whatsapp.connect" />
                      </Button>
                    </div>
                  </Form>
                </Col>
              )}
            </Row>
          </div>
        </Card>
        <CloseOutlined
          onClick={handleClose}
          style={{ position: "absolute", top: "15px", right: "15px" }}
        />
      </Col>
    </PopupLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { userInfo, session } = auth;
  return {
    userInfo,
    session
  };
};

export default connect(mapStateToProps, { setUserInfo })(WhatsAppSetting);
