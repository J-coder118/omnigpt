import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "antd";
import { Breadcrumb } from "antd";
import UpdateForm from "./update-form";
import { connect } from "react-redux";
import utils from "../../../utils";
import IntlMessage from "components/util-components/IntlMessage";
import Billing from "./billing";

const AccountSettings = (props) => {
  const [option, setOption] = useState("account-setting");
  const [size, setSize] = useState(76);

  const { session } = props;

  const initials = session
    ? utils.getEmailInitials(session.user.email)
    : utils.getEmailInitials("user");

  let resizeWindow = () => {
    if (window.innerWidth < 768) {
      setSize(63);
    } else {
      setSize(76);
    }
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <div className="account-setting-container">
      <div className="account-setting-wrapper">
        <div className="account-setting-header">
          <Avatar
            size={size}
            style={{
              minWidth: size,
              fontSize: 30,
              color: "#FFFFFF",
              backgroundColor: session
                ? utils.generateAvatarColor(session.user.email)
                : utils.generateAvatarColor("user")
            }}
          >
            {initials}
          </Avatar>
          <div className="account-setting-header-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                {session ? session.user.email : "user@gmail.com"}
              </Breadcrumb.Item>
              <Breadcrumb.Item className="account-settings">
                <IntlMessage id="header.menu.accountSetting" />
              </Breadcrumb.Item>
            </Breadcrumb>
            <Typography>
              <IntlMessage id="account.explain" />
            </Typography>
          </div>
        </div>
        <div className="account-setting-content">
          <div className="account-setting-options">
            <Typography
              onClick={() => setOption("account-setting")}
              className={
                option === "account-setting"
                  ? "option-text-bold"
                  : "option-text"
              }
              style={{
                marginBottom: 30
              }}
            >
              <IntlMessage id="header.menu.accountSetting" />
            </Typography>
            <Typography
              onClick={() => setOption("billing")}
              className={
                option === "billing" ? "option-text-bold" : "option-text"
              }
            >
              <IntlMessage id="header.menu.billing" />
            </Typography>
          </div>
          <div className="account-setting-form">
            {option !== "billing" ? <UpdateForm /> : <Billing />}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { session } = auth;
  return {
    session
  };
};

export default connect(mapStateToProps, null)(AccountSettings);
