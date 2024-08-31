import { Modal, Carousel } from "antd";
import { useRef } from "react";
import { connect } from "react-redux";

import IntlMessage from "components/util-components/IntlMessage";
import ButtonGreen from "components/shared-components/Button/ButtonGreen";
import ButtonDefault from "components/shared-components/Button/ButtonDefault";

import useSubcribeUrl from "hooks/useSubcribeUrl";

import { ReactComponent as Welcome1Icon } from "assets/svg/welcome1.svg";
import { ReactComponent as Welcome2Icon } from "assets/svg/welcome2.svg";
import { ReactComponent as Welcome3Icon } from "assets/svg/welcome3.svg";

import "./WelcomDialog.css";
import { amplitude } from "App";

const WelcomeDialog = ({ open, session }) => {
  const { data: urlSubcribe } = useSubcribeUrl(session);

  const carouselRef = useRef(null);
  const handleContinue = () => {
    carouselRef?.current?.next();
  };

  const handleBack = () => {
    carouselRef?.current?.prev();
  };

  const handleStartSubscription = async () => {
    amplitude.track("Payment Started");
    window.open(urlSubcribe, "_self");
  };

  return (
    <Modal
      centered
      visible={open}
      footer={null}
      closable={false}
      className="welcome-dialog"
    >
      <Carousel
        effect={"fade"}
        dots={{ className: "custom-dot" }}
        ref={carouselRef}
      >
        <div className="content-wrap">
          <Welcome1Icon />
          <div className="text-area">
            <h3 className="title">
              <IntlMessage id="notice.welcome.title" />
            </h3>
            <p className="explain">
              <IntlMessage id="notice.welcome.explain1" />
            </p>
            <p className="explain">
              <IntlMessage id="notice.welcome.explain2" />
            </p>
          </div>
          <ButtonGreen onClick={handleContinue}>
            <IntlMessage id="notice.button.continue" />
          </ButtonGreen>
        </div>
        <div className="content-wrap">
          <Welcome2Icon />
          <div className="text-area">
            <h3 className="title">
              <IntlMessage id="notice.introduce.title" />
            </h3>
            <p className="explain">
              <IntlMessage id="notice.introduce.explain1" />
            </p>
            <p className="explain">
              <IntlMessage id="notice.introduce.explain2" />
            </p>
          </div>
          <div className="d-flex gap-10px w-100">
            <ButtonDefault onClick={handleBack} className="button-back">
              <IntlMessage id="notice.button.back" />
            </ButtonDefault>
            <ButtonGreen onClick={handleContinue}>
              <IntlMessage id="notice.button.continue" />
            </ButtonGreen>
          </div>
        </div>
        <div className="content-wrap">
          <Welcome3Icon />
          <div className="text-area">
            <h3 className="title">
              <IntlMessage id="notice.price.title" />
            </h3>
            <p className="explain">
              <IntlMessage id="notice.price.explain1" />
            </p>
            <p className="explain">
              <IntlMessage id="notice.price.explain2" />
            </p>
          </div>
          <div className="d-flex gap-10px w-100">
            <ButtonDefault onClick={handleBack} className="button-back">
              <IntlMessage id="notice.button.back" />
            </ButtonDefault>
            <ButtonGreen onClick={handleStartSubscription}>
              Start subscription
            </ButtonGreen>
          </div>
        </div>
      </Carousel>
    </Modal>
  );
};

const mapStateToProps = ({ auth }) => {
  const { session } = auth;
  return { session };
};

export default connect(mapStateToProps)(WelcomeDialog);
