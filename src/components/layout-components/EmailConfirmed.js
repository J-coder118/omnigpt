import { Button, Modal } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

import "./EmailConfirmed.css";
import EmailIcon from "assets/svg/Email.svg";
import { useHistory } from "react-router-dom";
import { setItemLocal } from "utils/localStorage";
import { SHOULD_SHOW_POPUP_WHATSAPP } from "redux/constants/Auth";
import IntlMessage from "components/util-components/IntlMessage";
import ButtonCustom from "components/shared-components/Button/ButtonGreen";

const EmailConfirmed = ({ open, setOpen }) => {
  const history = useHistory();

  const closePopup = () => {
    setItemLocal(SHOULD_SHOW_POPUP_WHATSAPP, "false");
    setOpen(false);
  };

  const handleSettingWhatsapp = () => {
    closePopup();
    history.push("/whatsapp");
  };

  return (
    <Modal
      visible={open}
      footer={null}
      closable={false}
      className="email-confirmed"
    >
      <div className="text-center">
        <img
          className="img-fluid image-email"
          src={EmailIcon}
          alt="Email Icon"
        />
        <h3 className="title">
          <IntlMessage id="notice.whatsapp.title" />
        </h3>
        <p className="explain">
          <IntlMessage id="notice.whatsapp.subTitle" />
        </p>
        <p className="explain">
          <IntlMessage id="notice.whatsapp.content" />
        </p>
        <p className="explain">
          <IntlMessage id="notice.whatsapp.explain" />
        </p>

        <Button
          type="default"
          block
          className="btn-use-omnigpt"
          onClick={closePopup}
        >
          <IntlMessage id="notice.whatsapp.button.useNow" />
        </Button>

        <ButtonCustom
          type="primary"
          block
          className="btn-connect-whatsapp"
          onClick={handleSettingWhatsapp}
          icon={<WhatsAppOutlined />}
        >
          <IntlMessage id="notice.whatsapp.button.connect" />
        </ButtonCustom>
      </div>
    </Modal>
  );
};

export default EmailConfirmed;
