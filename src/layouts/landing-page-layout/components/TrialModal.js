import { Button, Modal, Row, Col, Space, Typography } from "antd";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";
import { Link } from "react-router-dom";

const { Title } = Typography;

const TrialModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        maskStyle={{
          background: "rgba(109, 109, 109, 0.40)",
          backdropFilter: "blur(2px)"
        }}
        closable={false} // This will not show the cross icon according to figma design
        style={{ maxWidth: "21.15rem" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space direction="vertical" size="large">
            <Title className="title-light" style={{ lineHeight: 1.5 }}>
              Upgrade your productivity with
              <br />
              AI-powered technology
            </Title>
            <Title
              className="title-bold"
              style={{ margin: 0, color: "#455560" }}
            >
              Standard
            </Title>
            <Title className="sub-price" style={{ margin: "-0.5rem 0" }}>
              $7<span className="title-light"> per month</span>
            </Title>
            <Link to={AUTH_PREFIX_PATH}>
              <Button className="trial-modal_btn disable-hover" block>
                Start trial
              </Button>
            </Link>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                maxWidth: 450,
                fontSize: 14,
                fontWeight: 500,
                margin: "0 auto"
              }}
            >
              <Row style={{ flexDirection: "column" }}>
                <Space direction="vertical" style={{ gap: 6 }}>
                  <Col>
                    <span
                      style={{
                        display: "flex",
                        margin: "0rem 0rem 0.25rem 0rem"
                      }}
                    >
                      <span
                        style={{
                          margin: "0.2rem 0.4rem 0rem 0rem",
                          width: ".9rem"
                        }}
                      >
                        <svg
                          style={{
                            fill: "#05E283"
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                      </span>
                      <span style={{ fontSize: ".9rem" }}>
                        Use OmniGPT from your WhatsApp
                      </span>
                    </span>
                  </Col>
                  <Col>
                    <span
                      style={{
                        display: "flex",
                        margin: "0rem 0rem 0.25rem 0rem"
                      }}
                    >
                      <span
                        style={{
                          margin: "0.2rem 0.4rem 0rem 0rem",
                          width: ".9rem"
                        }}
                      >
                        <svg
                          style={{
                            fill: "#05E283"
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>{" "}
                      </span>
                      <span style={{ fontSize: ".9rem" }}>
                        Transcribe speech into text
                      </span>
                    </span>
                  </Col>
                  <Col>
                    <span
                      style={{
                        display: "flex",
                        margin: "0rem 0rem 0.25rem 0rem"
                      }}
                    >
                      <span
                        style={{
                          margin: "0.2rem 0.4rem 0rem 0rem",
                          width: ".9rem"
                        }}
                      >
                        <svg
                          style={{
                            fill: "#05E283"
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                      </span>
                      <span style={{ fontSize: ".9rem" }}>
                        Download your chat conversations
                      </span>
                    </span>
                  </Col>
                  <Col>
                    <span
                      style={{
                        display: "flex",
                        margin: "0rem 0rem 0.25rem 0rem",
                        cursor: "pointer"
                      }}
                    >
                      <span
                        style={{
                          margin: "0.2rem 0.4rem 0rem 0rem",
                          width: ".9rem"
                        }}
                      >
                        <svg
                          style={{
                            fill: "#05E283"
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                      </span>
                      <span style={{ fontSize: ".9rem" }}>
                        Upload documents to get
                        <br />
                        better insights
                      </span>
                    </span>
                  </Col>
                </Space>
              </Row>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default TrialModal;
