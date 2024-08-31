import React from "react";
import { Row } from "antd";

const backgroundStyle = {
  backgroundImage: "url(/img/background.svg)",
  backgroundRepeat: "repeat",
  backgroundColor: "#111826",
  backgroundSize: "auto 100%"
};

const PopupLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="h-100" style={backgroundStyle}>
        <div className="container d-flex flex-column justify-content-center h-100">
          <Row justify="center">{children}</Row>
        </div>
      </div>
    </div>
  );
};

export default PopupLayout;
