import {
  SIGNIN,
  SUPABASE_AUTHENTICATED,
  SIGNOUT,
  SHOW_AUTH_MESSAGE,
  SHOW_AUTH_SUCCESS_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE,
  SET_HUBSPOT_TOKEN,
  GET_HUBSPOT_TOKEN,
  SET_USER_INFO
} from "../constants/Auth";

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  };
};

export const supabase_authenticated = (session) => {
  return {
    type: SUPABASE_AUTHENTICATED,
    session
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signInWithGoogle = () => {
  return {
    type: SIGNIN_WITH_GOOGLE
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const showAuthSuccessMessage = (message) => {
  return {
    type: SHOW_AUTH_SUCCESS_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING
  };
};

export const getHubSpotToken = () => {
  return {
    type: GET_HUBSPOT_TOKEN
  };
};
export const setHubSpotToken = (token) => {
  return {
    type: SET_HUBSPOT_TOKEN,
    token
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    userInfo
  };
};
