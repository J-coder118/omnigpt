import { Button } from "antd";

import "./PaymentNotice.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import IntlMessage from "components/util-components/IntlMessage";
import { connect } from "react-redux";
import { SUBCRIBE_STATUS } from "constants/common";
import usePortalCustomer from "hooks/usePortalCustomer";

const PaymentNotice = ({ session, userInfo }) => {
  const { data: urlPortalCustomer } = usePortalCustomer(userInfo);

  const handleUpdatePayment = async () => {
    window.open(urlPortalCustomer, "_self");
  };

  const subscriptionStatus = userInfo?.subscription_status;
  if (subscriptionStatus === SUBCRIBE_STATUS.SUSPENDED) {
    return (
      <div className="payment-notice payment-failure">
        <InfoCircleOutlined />
        <span>
          <IntlMessage id="payment.failed" />
        </span>
        <Button
          style={{ background: "#111826", color: "white" }}
          onClick={handleUpdatePayment}
        >
          <IntlMessage id="payment.button.update" />
        </Button>
      </div>
    );
  }

  // if (subscriptionStatus !== SUBCRIBE_STATUS.ACTIVE) {
  //   return (
  //     <div className="payment-notice">
  //       <span>
  //         <IntlMessage id="payment.notice" />
  //       </span>
  //       <Button
  //         style={{ background: "#111826", color: "white" }}
  //         onClick={handleSubcribe}
  //       >
  //         <IntlMessage id="payment.button.subcribe" />
  //       </Button>
  //     </div>
  //   );
  // }

  return null;
};

const mapStateToProps = ({ auth }) => {
  const { session, userInfo } = auth;
  return { session, userInfo };
};

export default connect(mapStateToProps)(PaymentNotice);
