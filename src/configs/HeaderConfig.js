import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP
} from "constants/ThemeConstant";

export const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

export const getLogoDisplay = (isMobile, mobileLogo) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo";
  }
};

export const getLogo = (props) => {
  const { navCollapsed, logoType, mobileLogo } = props;
  if (logoType === "light") {
    if (navCollapsed) {
      return "/img/logo-collapsed.png";
    }
    return "/img/omni-white.png";
  }

  if (navCollapsed) {
    return "/img/logo-collapsed.png";
  }
  if (mobileLogo) {
    return "/img/new-logo.png";
  }
  return "/img/new-logo.png";
};
