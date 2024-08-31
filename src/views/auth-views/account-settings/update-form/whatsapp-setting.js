import { useMemo, useState } from "react";
import { Form, Input, Select } from "antd";
import { useIntl } from "react-intl";
import { parsePhoneNumber } from "awesome-phonenumber";

import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { ReactComponent as OutlineSuggestIcon } from "assets/svg/OutlineSuggest.svg";

import { supabase } from "auth/SupabaseClient";
import en from "world_countries_lists/data/countries/en/world.json";
import { defaultAreas } from "../../../app-views/whatsapp/const";

const { Option } = Select;

const inputProps = {
  size: "large",
  style: {
    borderRadius: 5
  }
};

const WhatsappSetting = ({
  phoneCode,
  changePhoneCodeHandler,
  isShowLabel = false,
  origWhatsapp = "",
  created = false,
  setSaveChanges = null,
  userInfo = null
}) => {
  const intl = useIntl();

  const [isCheckingPhone, setCheckingPhone] = useState(false);
  const [isError, setError] = useState(false);

  const phoneCodeOptions = useMemo(
    () =>
      defaultAreas.map((area) => {
        const countryName = en.find(
          (country) => country.alpha2.toLowerCase() === area.short.toLowerCase()
        );
        return (
          countryName && (
            <Option value={`${area.phoneCode}`} key={area.short}>
              {countryName?.name}
            </Option>
          )
        );
      }),
    []
  );

  const handleValidateWhatsapp = async (_, value) => {
    setCheckingPhone(true);
    if (!value || origWhatsapp === `${phoneCode}${value}`) {
      setCheckingPhone(false);
      setError(false);
      return Promise.resolve();
    }

    const pn = parsePhoneNumber(`+${phoneCode}${value}`);

    if (!pn.valid || pn.number.input !== pn.number.e164) {
      setCheckingPhone(false);
      setError(true);
      return Promise.reject(
        intl.formatMessage({ id: "message.whatsapp.error.phoneNumber" })
      );
    }

    const { data } = await supabase.functions.invoke("whatsapp-check-phone", {
      body: JSON.stringify({
        phoneNumber: `${phoneCode}${value}`
      })
    });

    if (data.error) {
      setCheckingPhone(false);
      setError(true);
      return Promise.reject(
        new Error(
          intl.formatMessage({ id: "message.whatsapp.error.phoneNumber" })
        )
      );
    }

    setCheckingPhone(false);
    setError(false);
    return Promise.resolve();
  };

  const handleChangePhoneNumber = (e) => {
    if (setSaveChanges) {
      return e.target.value !== userInfo?.whatsapp_number
        ? setSaveChanges(true)
        : setSaveChanges(false);
    }
  };

  return (
    <>
      <Form.Item
        label={
          isShowLabel
            ? intl.formatMessage({
                id: "account.form.phoneNumber"
              })
            : ""
        }
        name="phone-code"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "message.account.form.error.countryCode"
            })
          }
        ]}
        className="phone-code"
        initialValue={"66"}
      >
        <Select
          showSearch={true}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={changePhoneCodeHandler}
          placeholder="Select a option"
          size="large"
          className="country-selector"
          disabled={!created ? false : true}
        >
          {phoneCodeOptions}
        </Select>
      </Form.Item>

      <div className="phone-info">
        <div
          className={
            !created
              ? "phone-offset bg-grey"
              : "phone-offset bg-grey ant-input-disabled"
          }
        >
          {phoneCode ? `+${phoneCode}` : ""}
        </div>
        <Form.Item
          name="phone-number"
          rules={[
            {
              validator: handleValidateWhatsapp
            }
          ]}
        >
          <Input
            className="bg-grey phone-number"
            prefix={
              isError ? (
                <InfoCircleOutlined style={{ color: "red" }} />
              ) : isCheckingPhone ? (
                <LoadingOutlined />
              ) : (
                <OutlineSuggestIcon />
              )
            }
            {...inputProps}
            placeholder={intl.formatMessage({
              id: "account.form.placehoder.phoneNumber"
            })}
            disabled={!created ? false : true}
            onChange={handleChangePhoneNumber}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default WhatsappSetting;
