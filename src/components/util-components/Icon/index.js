import React from "react";

const Icon = (props) => {
  const { type, style } = props;
  return <>{React.createElement(type, { style })}</>;
};

export default Icon;
