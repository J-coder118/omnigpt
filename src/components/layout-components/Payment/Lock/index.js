import { Modal } from "antd";
import { connect } from "react-redux";

import IntlMessage from "components/util-components/IntlMessage";
import ButtonGreen from "components/shared-components/Button/ButtonGreen";

import usePortalCustomer from "hooks/usePortalCustomer";

import "./FailureNotice.css";
import { LockOutlined } from "@ant-design/icons";

const LockDialog = ({ open, userInfo }) => {
  const { data: urlPortalCustomer } = usePortalCustomer(userInfo);

  const handleUpdatePayment = () => {
    if (urlPortalCustomer) {
      window.open(urlPortalCustomer, "_self");
    }
  };

  return (
    <Modal
      centered
      visible={open}
      footer={null}
      closable={false}
      className="failure-notice-dialog"
    >
      <LockOutlined style={{ fontSize: "60px", color: "#8F9FB2" }} />
      <div className="text-area">
        <h3 className="title">
          <IntlMessage id="notice.lock.title" />
        </h3>
        <p className="explain">
          <IntlMessage id="notice.lock.explain1" />
        </p>
        <p className="explain">
          <IntlMessage id="notice.lock.explain2" />
        </p>
        <p className="explain">
          <IntlMessage id="notice.lock.thankyou" />
        </p>
      </div>
      <ButtonGreen onClick={handleUpdatePayment} className="btn-update-payment">
        <IntlMessage id="notice.lock.button" />
      </ButtonGreen>
    </Modal>
  );
};

const mapStateToProps = ({ auth }) => {
  const { userInfo } = auth;
  return { userInfo };
};

export default connect(mapStateToProps)(LockDialog);
