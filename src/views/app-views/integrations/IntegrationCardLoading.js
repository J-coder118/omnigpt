import React from "react";
import { Col, Skeleton } from "antd";

/**
 * Loading skeleton for Integration Cards
 */
const IntegrationCardLoading = React.memo(() => {
  return (
    <Col
      style={{
        transition: "all 500ms cubic-bezier(0, 0, 0.2, 1) 0s"
      }}
      xl={{ span: 7, offset: 1 }}
      sm={{ span: 11, offset: 1 }}
      xs={{ span: 20 }}
    >
      <div
        style={{
          display: "grid",
          height: "100%",
          alignItems: "start",
          alignContent: "space-between"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: ""
          }}
        >
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            <Skeleton.Avatar
              style={{ margin: "0.5rem 1rem 1.25rem 0rem" }}
              size={"default"}
              active={true}
            />
            <Skeleton
              title={{ width: "10rem" }}
              active={true}
              paragraph={{ rows: 0, style: { width: "calc(100% - 50px)" } }}
            />
          </div>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "90%",
              margin: "0rem 0 2.0rem"
            }}
          >
            <Skeleton title={false} paragraph={{ rows: 2 }} active={true} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "calc(100% + 85px)"
            }}
          >
            <Skeleton.Button shape="square" active={true} />
            <Skeleton.Button shape="square" active={true} />
          </div>
        </div>
      </div>
    </Col>
  );
});

export default IntegrationCardLoading;
