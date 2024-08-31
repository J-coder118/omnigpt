import { Modal } from "antd";
import { connect } from "react-redux";

import IntlMessage from "components/util-components/IntlMessage";
import ButtonGreen from "components/shared-components/Button/ButtonGreen";

import usePortalCustomer from "hooks/usePortalCustomer";

import "./FailureNotice.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const FailureNoticeDialog = ({ open, setOpen, userInfo }) => {
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
      onCancel={() => setOpen(false)}
      className="failure-notice-dialog"
    >
      <ExclamationCircleOutlined
        style={{ fontSize: "60px", color: "#FC5555" }}
      />
      <div className="text-area">
        <h3 className="title">
          <IntlMessage id="notice.payment.failure.title" />
        </h3>
        <p className="explain">
          <IntlMessage id="notice.payment.failure.explain1" />
        </p>
        <p className="explain">
          <IntlMessage id="notice.payment.failure.explain2" />
        </p>
        <p className="explain">
          <IntlMessage id="notice.payment.failure.thankyou" />
        </p>
      </div>
      <ButtonGreen onClick={handleUpdatePayment} className="btn-update-payment">
        <IntlMessage id="notice.payment.failure.button" />
      </ButtonGreen>
    </Modal>
  );
};

const mapStateToProps = ({ auth }) => {
  const { userInfo } = auth;
  return { userInfo };
};

export default connect(mapStateToProps)(FailureNoticeDialog);
