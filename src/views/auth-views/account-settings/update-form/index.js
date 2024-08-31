import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { notification } from "antd";

import { setUserInfo } from "redux/actions/Auth";
import { supabase } from "auth/SupabaseClient";
import { Form, Input, Select, Button } from "antd";
import IntlMessage from "components/util-components/IntlMessage";

import { CheckCircleOutlined } from "@ant-design/icons";
import { inputProps } from "views/app-views/whatsapp";
import WhatsappSetting from "./whatsapp-setting";
import ButtonGreen from "components/shared-components/Button/ButtonGreen";

const { Option } = Select;

const UpdateForm = ({ setUserInfo, session, userInfo }) => {
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneCode, setPhoneCode] = useState("66");
  const [form] = Form.useForm();
  const [origWhatsapp, setOrigWhatsapp] = useState("");
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      form.setFieldsValue({
        name: userInfo.name,
        "phone-number": userInfo.whatsapp_number?.substring(
          userInfo.country_code?.length
        ),
        "phone-code": userInfo.country_code,
        language: userInfo.language || "en"
      });
      setOrigWhatsapp(userInfo?.whatsapp_number);

      setPhoneCode(userInfo.country_code);
    }
  }, [form, userInfo]);

  const changePhoneCodeHandler = (value) => {
    setPhoneCode(value);
    return value !== userInfo?.country_code
      ? setSaveChanges(true)
      : setSaveChanges(false);
  };

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const phoneNumber = `${phoneCode}${values["phone-number"]}`;
      const newUserInfo = {
        id: session.user.id,
        name: values.name,
        whatsapp_number: values["phone-number"] ? phoneNumber : "",
        country_code: phoneCode,
        language: values.language
      };
      const { error } = await supabase.from("users").upsert(newUserInfo);
      if (!error) {
        setIsLoading(false);
        setUserInfo(newUserInfo);

        if (
          phoneNumber !== newUserInfo?.whatsapp_number &&
          newUserInfo?.whatsapp_number
        ) {
          notification.info({
            placement: "bottomLeft",
            icon: <CheckCircleOutlined />,
            message: intl.formatMessage({
              id: "message.account.success.title"
            }),
            description: intl.formatMessage({
              id: "message.account.success.explain"
            })
          });
          return;
        }
        notification.info({
          placement: "bottomLeft",
          icon: <CheckCircleOutlined />,
          message: intl.formatMessage({ id: "message.account.language.title" }),
          description: intl.formatMessage({
            id: "message.account.language.explain"
          })
        });
        setSaveChanges(false);
      }
    } catch (err) {
      console.error(err);
      notification.info({
        placement: "bottomLeft",
        icon: <CheckCircleOutlined />,
        message: err.messag,
        description: ""
      });
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label={intl.formatMessage({ id: "account.form.name" })}
        name="name"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "message.account.form.error.name"
            })
          }
        ]}
      >
        <Input
          {...inputProps}
          placeholder={intl.formatMessage({
            id: "account.form.placehoder.name"
          })}
          className="bg-grey"
          onChange={(e) =>
            e.target.value !== userInfo?.name
              ? setSaveChanges(true)
              : setSaveChanges(false)
          }
        />
      </Form.Item>

      <WhatsappSetting
        isShowLabel={true}
        phoneCode={phoneCode}
        changePhoneCodeHandler={changePhoneCodeHandler}
        origWhatsapp={origWhatsapp}
        created={userInfo?.whatsapp_number}
        setSaveChanges={setSaveChanges}
        userInfo={userInfo}
      />

      <Form.Item
        label={intl.formatMessage({ id: "account.form.email" })}
        name="email"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "message.account.form.error.email"
            })
          }
        ]}
        initialValue={session?.user?.email}
      >
        <Input
          {...inputProps}
          style={{ pointerEvents: "none" }}
          className="bg-grey"
          disabled
        />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ id: "account.form.language" })}
        name="language"
        initialValue="en"
      >
        <Select
          placeholder="Select a language"
          size="large"
          className="lang-selector bg-grey"
          onChange={(val) =>
            val !== userInfo?.language
              ? setSaveChanges(true)
              : setSaveChanges(false)
          }
        >
          <Option value="en">
            <IntlMessage id="account.form.language.english" />
          </Option>
          <Option value="zh">
            <IntlMessage id="account.form.language.chinese" />
          </Option>
          <Option value="fr">
            <IntlMessage id="account.form.language.french" />
          </Option>
          <Option value="ja">
            <IntlMessage id="account.form.language.japanese" />
          </Option>
          <Option value="es">
            <IntlMessage id="account.form.language.spanish" />
          </Option>
        </Select>
      </Form.Item>

      <div
        style={{
          marginTop: 30
        }}
      >
        {saveChanges && (
          <ButtonGreen
            htmlType="submit"
            style={{ background: "#1FC77E", color: "white" }}
            loading={isLoading}
          >
            <IntlMessage id="account.save" />
          </ButtonGreen>
        )}
        {!saveChanges && (
          <Button htmlType="submit" loading={isLoading} disabled>
            <IntlMessage id="account.save" />
          </Button>
        )}
      </div>
    </Form>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { locale } = theme;
  const { session, userInfo } = auth;
  return { locale, session, userInfo };
};

export default connect(mapStateToProps, { setUserInfo })(UpdateForm);
