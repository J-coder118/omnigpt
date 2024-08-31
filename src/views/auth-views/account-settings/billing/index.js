import { Button, Col, Row } from "antd";
import { ReactComponent as CreditCardIcon } from "assets/svg/credit-card.svg";
import { ReactComponent as InvoiceIcon } from "assets/svg/invoice.svg";

import "./billing.css";
import IntlMessage from "components/util-components/IntlMessage";
import ButtonGreen from "components/shared-components/Button/ButtonGreen";
import { connect } from "react-redux";
import usePortalCustomer from "hooks/usePortalCustomer";
import Loading from "components/shared-components/Loading";

const Billing = ({ userInfo }) => {
  const { data: urlPortalCustomer, isLoading } = usePortalCustomer(userInfo);

  const handleBilling = async () => {
    if (urlPortalCustomer) {
      window.open(urlPortalCustomer, "_self");
    }
  };

  const handleInvoice = async () => {
    if (urlPortalCustomer) {
      window.open(urlPortalCustomer, "_self");
    }
  };

  if (isLoading) {
    return <Loading cover="inline" />;
  }

  return (
    <Row gutter={24}>
      <Col span={24} md={12}>
        <div className="billing-card">
          <CreditCardIcon />
          <div className="billing-info">
            <h3>
              <IntlMessage id="account.billing.creditCard.title" />
            </h3>
            <span>
              <IntlMessage id="account.billing.creditCard.explain" />
            </span>
            <Button
              style={{ background: "#1FC77E", color: "white" }}
              onClick={handleBilling}
            >
              <IntlMessage id="account.billing.creditCard.button" />
            </Button>
          </div>
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className="billing-card">
          <InvoiceIcon />
          <div className="billing-info">
            <h3>
              <IntlMessage id="account.billing.invoice.title" />
            </h3>
            <span>
              <IntlMessage id="account.billing.invoice.explain" />
            </span>
            <ButtonGreen onClick={handleInvoice}>
              <IntlMessage id="account.billing.invoice.button" />
            </ButtonGreen>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ auth }) => {
  const { userInfo } = auth;
  return {
    userInfo
  };
};

export default connect(mapStateToProps)(Billing);
