import { Row, Col, Space, Button, Typography } from "antd";
import "./CodeBlock.css";

const { Title } = Typography;

const Features = ({ openModal }) => (
  <>
    <Space direction="vertical">
      <div className="omni-features_bullets">
        <Row style={{ flexDirection: "column" }}>
          <Space size={10} direction="vertical">
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">Multiple AI Models</span>
              </span>
            </Col>
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">Slack Integration</span>
              </span>
            </Col>
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">Text to Speech</span>
              </span>
            </Col>
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">Team Collaboration</span>
              </span>
            </Col>
          </Space>
        </Row>

        <Row style={{ flexDirection: "column" }}>
          <Space size={10} direction="vertical">
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">GPT-4 Unlimited</span>
              </span>
            </Col>
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">WhatsApp Integration</span>
              </span>
            </Col>
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">Upload Documents</span>
              </span>
            </Col>
            <Col>
              <span className="omni-feature-container">
                <svg
                  style={{
                    fill: "#05E283",
                    fontSize: "0.825rem",
                    cursor: "pointer"
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <span className="omni-feature-text">and More...</span>
              </span>
            </Col>
          </Space>
        </Row>
      </div>
      <Row
      // className="trial-card"
      >
        {/* <Space style={{gap  : "27px !important"}}> */}
        <div
          className="trial-card"
          style={{
            flexDirection: "row",
            width: "auto",
            padding: "0 1.7rem",
            minHeight: "67px",
            alignSelf: "stretch"
          }}
        >
          <Col>
            <Title
              style={{

                fontWeight: 510,
                color: "#455560",
                // color: "#455560f0",

                // fontFamily: "Inter",
                fontSize: 18,
                textAlign: "center",
                margin: 0,
                lineHeight: "25px",
                fontStyle: "normal"
                // letterSpacing: 0.2

              }}
              className="font-inter"
            >
              Accessible pricing for all users Only $7 per month
            </Title>
          </Col>
          <Col>
            <Button
              className="btn-start-trail"
              style={{
                background: "#1FC77E",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "0.3125rem",
                lineHeight: 0,
                fontSize: "1rem",
                border: "2px solid transparent",
                height: 36
              }}
              onClick={() => openModal()}
            >
              <span
                style={{
                  fontWeight: 450
                  //  letterSpacing: 0.5
                }}
              >
                Start trial
              </span>
            </Button>
          </Col>
        </div>
        {/* </Space> */}
      </Row>
      <Row style={{ justifyContent: "center", marginBottom: ".5rem" }}>
        <Col>
          <Title
            style={{
              fontWeight: 400,
              fontSize: 14,
              textAlign: "center",
              margin: 0,
              color: "#8F9FB2",
              marginTop: "15px"
              // letterSpacing: "0.2px"
            }}
          >
            Try for free! 30-day trial.
          </Title>
        </Col>
      </Row>
    </Space>
  </>
);

export default Features;
