import React from "react";
import { APP_NAME } from "configs/AppConfig";
import { connect } from "react-redux";
import utils from "utils";
import { Grid } from "antd";
import {
  getLogoWidthGutter,
  getLogoDisplay,
  getLogo
} from "configs/HeaderConfig";

const { useBreakpoint } = Grid;

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const redirectToHome = () => {
    window.location.href = "/app/home";
  };
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{ width: `${getLogoWidthGutter(props, isMobile)}` }}
    >
      <img
        srcSet={`${getLogo(props)} 2x`}
        alt={`${APP_NAME} logo`}
        style={{ cursor: "pointer" }}
        onClick={() => redirectToHome()}
      />
    </div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } = theme;
  return { navCollapsed, navType };
};

export default connect(mapStateToProps)(Logo);
