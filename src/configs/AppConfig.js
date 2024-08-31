import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
  DIR_LTR
} from "constants/ThemeConstant";
import { env } from "./EnvironmentConfig";

export const APP_NAME = "HUBBA";
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = "/app";
export const AUTH_PREFIX_PATH = "/auth";
export const HUBSPOT_CALLBACK = "/callback";
export const REDIRECT_PREFIX_PATH = "/redirect";

export const THEME_CONFIG = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  locale: "en",
  navType: NAV_TYPE_SIDE,
  topNavColor: "#3e82f7",
  headerNavColor: "",
  mobileNav: false,
  currentTheme:
    process.env.REACT_APP_ENV !== "production" &&
    localStorage.getItem("preferred-theme")
      ? localStorage.getItem("preferred-theme")
      : "light",
  direction: DIR_LTR,
  notiType: null,
  notiMsg: ""
};
