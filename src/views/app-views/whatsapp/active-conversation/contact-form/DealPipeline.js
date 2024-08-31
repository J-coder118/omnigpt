import { Typography, Spin } from "antd";
import { INITIAL } from "./Constants";
import { CancelSvg } from "assets/svg/icon";
import { getCustomerDeals } from "redux/actions/Conversation";
import { connect } from "react-redux";
import { useEffect } from "react";

export const ContactDetailsRow = (props) => {
  const { title, svgIcon, dispatch } = props;
  return (
    <div className="create-task-row">
      <Typography className="contact-details-row-title">{title}</Typography>
      <div
        className="contact-details-row-icon"
        onClick={() => dispatch({ type: INITIAL, payload: INITIAL })}
      >
        {svgIcon}
      </div>
    </div>
  );
};

const DealPipeline = (props) => {
  const {
    dispatch,
    hubspotAccessToken,
    activeCustomer,
    getCustomerDeals,
    deals,
    loadingDeals
  } = props;

  useEffect(() => {
    activeCustomer &&
      activeCustomer.hubspot_contact_id &&
      getCustomerDeals(hubspotAccessToken, activeCustomer.hubspot_contact_id);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <ContactDetailsRow
        title="Deals and Pipelines"
        svgIcon={<CancelSvg />}
        dispatch={dispatch}
      />
      {loadingDeals ? (
        <div className="spin-style">
          <Spin />
        </div>
      ) : deals?.length ? (
        deals.map((deal) => {
          return (
            <ul key={deal.id}>
              <b>{deal.dealname}</b>
              <li>Create Date: {new Date(deal.createdate).toLocaleString()}</li>
              <li>Close Date: {new Date(deal.closedate).toLocaleString()}</li>
              <li>Amount: {deal.amount ?? "N/A"}</li>
              <li>Stage: {deal.dealstage}</li>
              <li>Pipeline: {deal.pipeline}</li>
            </ul>
          );
        })
      ) : (
        <b>N/A</b>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, conversation }) => {
  const { hubspotAccessToken } = auth;
  const { activeCustomer, deals, loadingDeals } = conversation;
  return { hubspotAccessToken, activeCustomer, deals, loadingDeals };
};

const mapDispatchToProps = {
  getCustomerDeals
};

export default connect(mapStateToProps, mapDispatchToProps)(DealPipeline);
