import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 34
    }}
    spin
  />
);

const LoaderLayout = () => {
  return (
    <div className="loader-center">
      <Spin indicator={antIcon} style={{ color: "#1FC77E" }} />
    </div>
  );
};

export default LoaderLayout;
