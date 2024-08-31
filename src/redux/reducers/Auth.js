import {
  AUTH_TOKEN,
  SUPABASE_AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SHOW_LOADING,
  SHOW_AUTH_SUCCESS_MESSAGE,
  SET_HUBSPOT_TOKEN,
  SET_USER_INFO
} from "../constants/Auth";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  showSuccessMessage: false,
  redirect: "",
  token: localStorage.getItem(AUTH_TOKEN),
  session: null,
  isHubspotAuthenticated: false,
  hubspotAccessToken: null,
  userInfo: null
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case SUPABASE_AUTHENTICATED:
      return {
        ...state,
        loading: false,
        session: action.session,
        redirect: "/"
      };
    case SHOW_AUTH_SUCCESS_MESSAGE:
      return {
        ...state,
        message: action.message,
        showSuccessMessage: true,
        loading: false
      };
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
        showMessage: false,
        showSuccessMessage: false
      };
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case SET_HUBSPOT_TOKEN: {
      return {
        ...state,
        hubspotAccessToken: action.token
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.userInfo
        }
      };
    }
    default:
      return state;
  }
};

export default auth;
