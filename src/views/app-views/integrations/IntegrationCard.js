import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Typography, Row, Col, Card, Space, Button } from "antd";
import { Link } from "react-router-dom";

const IntegrationCard = ({
  title,
  description,
  LogoSrc,
  availability,
  connected,
  phone,
  slackConnection,
  session,
  setOpen,
  open
}) => {
  return (
    <Col
      style={{ transition: "all 500ms cubic-bezier(0, 0, 0.2, 1) 0s" }}
      xl={{ span: 7, offset: 1 }}
      sm={{ span: 11, offset: 1 }}
      xs={{ span: 20 }}
    >
      <Card
        className="integration-card"
        title={
          <Row justify="start">
            <Space>
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LogoSrc />
              </div>
              <Typography.Title level={3} style={{ margin: "0" }}>
                {title}
              </Typography.Title>
            </Space>
          </Row>
        }
      >
        <p style={{ height: "85px" }}>{description}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {availability ? (
            <Button type="primary" className="integration-available-button">
              Available
            </Button>
          ) : (
            <Button type="primary" className="integration-coming-soon-button">
              Coming soon
            </Button>
          )}
          {connected ? (
            <>
              {title === "WhatsApp" && (
                <Button
                  type="primary"
                  className="integration-connected-button"
                  icon={<LinkOutlined />}
                  onClick={!session?.user && (() => setOpen(!open))}
                >
                  {phone ? (
                    "Connected"
                  ) : session?.user ? (
                    <Link to={`/whatsapp`}>Connect</Link>
                  ) : (
                    "Connect"
                  )}
                </Button>
              )}
            </>
          ) : (
            <p style={{ lineHeight: "3" }}>Learn More</p>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default IntegrationCard;
