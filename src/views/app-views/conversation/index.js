import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//user-imports
import { APP_PREFIX_PATH } from "configs/AppConfig";
import {
  getHubbaCustomers,
  getAllOwners,
  getHubSpotCustomers,
  getMessagesForCustomer,
  getAllThreads
} from "redux/actions/Conversation";
import { Spin } from "antd";

const Conversation = (props) => {
  const {
    session,
    threads,
    threadsLoading,
    threadsErrorMessage,
    getAllThreads
  } = props;

  useEffect(() => {
    getAllThreads(session.user.id);
    //eslint-disable-next-line
  }, []);
  if (threads.length > 0) {
    return (
      <Redirect
        to={`${APP_PREFIX_PATH}/conversation/${threads[0].thread_id}`}
      />
    );
  } else {
    return (
      <>
        {threadsLoading ? (
          <div className="converstaion-no-contacts">
            <Spin />
          </div>
        ) : (
          <>
            {threadsErrorMessage ? (
              <div className="converstaion-no-contacts">
                {threadsErrorMessage}
              </div>
            ) : (
              <div className="converstaion-no-contacts"></div>
            )}
          </>
        )}
      </>
    );
  }
};

const mapStateToProps = ({ auth, conversation }) => {
  const { session, hubspotAccessToken } = auth;
  const { threads, threadsLoading, threadsErrorMessage } = conversation;
  return {
    session,
    hubspotAccessToken,
    threads,
    threadsLoading,
    threadsErrorMessage
  };
};

const mapDispatchToProps = {
  getHubbaCustomers,
  getAllOwners,
  getHubSpotCustomers,
  getMessagesForCustomer,
  getAllThreads
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
