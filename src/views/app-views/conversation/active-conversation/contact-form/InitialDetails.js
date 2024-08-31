import { Avatar, Typography, Spin, notification } from "antd";
import { UserOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import {
  EventAddSvg,
  AddSvg,
  SearchSvg,
  RightArrowSvg,
  WhatsAppColorSvg
} from "assets/svg/icon";
import {
  DEAL_PIPELINE,
  CREATE_TASK,
  CREATE_NOTE,
  FILES_AND_MEDIA,
  SEARCH_IN_CONVERSATION,
  NOTE_DETAIL
} from "./Constants";

const icon1Style = { color: "#000000" };

const openNotification = () => {
  notification.warn({
    placement: "bottomRight",
    description:
      "You need permission to create notes or tasks. Please contact your admin.",
    className: "custom-class",
    style: {
      width: 400,
      fontSize: "10px",
      color: "white",
      backgroundColor: "#0F1B33"
    }
  });
};

notification.config({ description: "AAAAAAAAAa" });

const ContactDetailsRow = (props) => {
  const { title, svgIcon, dispatch, actionType, payload, role } = props;
  const handleClick = () => {
    if (["Admin", "Sales"].includes(role) || actionType === DEAL_PIPELINE) {
      dispatch({ type: actionType, payload });
    } else {
      openNotification("bottomRight");
    }
  };
  return (
    <div className="contact-detials-row" onClick={handleClick}>
      <Typography className="contact-details-row-title">{title}</Typography>
      <div className="contact-details-row-icon">{svgIcon}</div>
    </div>
  );
};
const InitialDetails = (props) => {
  const {
    hideContactDetails,
    activeCustomer,
    dispatch,
    notes,
    tasks,
    session,
    allOwnersLoading,
    owners
  } = props;
  const [role, setRole] = useState(null);
  console.log(owners);
  console.log(allOwnersLoading);

  useEffect(() => {
    if (allOwnersLoading) return;
    if (owners.length > 0) {
      const filterRoles = owners.filter(
        (x) => x.hubba_user_id === session.user.id
      );
      setRole(filterRoles[0].role);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allOwnersLoading]);

  const taskURL = `https://app.hubspot.com/contacts/22510435/contact/${activeCustomer.hubspot_contact_id}/?engagement=`;
  const handleViewNote = (noteText) => {
    dispatch({ type: NOTE_DETAIL, display: NOTE_DETAIL, noteText });
  };

  if (allOwnersLoading) {
    return (
      <div className="converstaion-no-contacts">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div
        className="contact-details-close-icon"
        onClick={() => hideContactDetails()}
      >
        <RightOutlined style={icon1Style} />
      </div>
      <div className="contact-details-avatar">
        <Avatar size={80} icon={<UserOutlined />} />
      </div>
      <div className="contact-details-name">
        <Typography>{activeCustomer.name}</Typography>
      </div>
      <div className="contact-details-icon">
        <WhatsAppColorSvg />
        <Typography style={{ marginLeft: "8px" }}>
          Whatsapp +{activeCustomer.phone}
        </Typography>
      </div>
      <ContactDetailsRow
        title="Deals & Pipeline"
        svgIcon={<RightArrowSvg />}
        dispatch={dispatch}
        actionType={DEAL_PIPELINE}
        payload={DEAL_PIPELINE}
      />
      <ContactDetailsRow
        title="Create task to follow up"
        svgIcon={<EventAddSvg />}
        dispatch={dispatch}
        actionType={CREATE_TASK}
        payload={CREATE_TASK}
        role={role}
      />
      {tasks?.length && (
        <div className="tasks-link">
          <a href={taskURL + tasks[0].id} target="_blank" rel="noreferrer">
            View task
          </a>
        </div>
      )}
      <ContactDetailsRow
        title="Note"
        svgIcon={<AddSvg />}
        dispatch={dispatch}
        actionType={CREATE_NOTE}
        payload={CREATE_NOTE}
        role={role}
      />
      {notes.length > 0 && (
        <div className="notes-scrollbar">
          {notes.map((item) => (
            <div
              key={item.id}
              className="note-div"
              onClick={() => handleViewNote(item.note)}
            >
              <div className="note-sideborder"></div>

              <div className="note-content">
                <Typography.Paragraph
                  ellipsis={{
                    rows: 3,
                    expandable: false
                  }}
                >
                  {/^<div/.test(item.note) ? (
                    <div
                      className="note-content"
                      dangerouslySetInnerHTML={{ __html: item.note }}
                    />
                  ) : (
                    item.note ?? "N/A"
                  )}
                </Typography.Paragraph>
              </div>
            </div>
          ))}
        </div>
      )}
      <ContactDetailsRow
        title="Search in this conversation"
        svgIcon={<SearchSvg />}
        dispatch={dispatch}
        actionType={SEARCH_IN_CONVERSATION}
        payload={SEARCH_IN_CONVERSATION}
      />
      <ContactDetailsRow
        title="Files and medias"
        svgIcon={<RightArrowSvg />}
        dispatch={dispatch}
        actionType={FILES_AND_MEDIA}
        payload={FILES_AND_MEDIA}
      />
      <div className="contact-detials-row">
        <Typography className="contact-details-row-title">
          User group
        </Typography>
      </div>
    </>
  );
};

export default InitialDetails;
