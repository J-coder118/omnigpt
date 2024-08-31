import {
  SWITCH_TO_CHAT,
  SWITCH_TO_HOME,
  SHOW_CUSTOMER_MODAL,
  HIDE_CUSTOMER_MODAL,
  ADD_NEW_CUSTOMER,
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_ERROR,
  HIDE_ADD_NEW_CUSTOMER_ERROR,
  GET_HUBBA_CUSTOMERS,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_OWNERS,
  GET_ALL_OWNERS_ERROR,
  GET_ALL_OWNERS_SUCCESS,
  GET_ALL_CUSTOMERS_ERROR,
  GET_MESSAGES_FOR_CUSTOMER,
  GET_MESSAGES_FOR_CUSTOMER_SUCCESS,
  GET_MESSAGES_FOR_CUSTOMER_FAILED,
  GET_SUBSCRIBED_TO_MESSAGES,
  GET_CUSTOMER_DEALS,
  GET_CUSTOMER_DEALS_SUCCESS,
  GET_CUSTOMER_DEALS_ERROR,
  SET_ACTIVE_CUSTOMER,
  GET_HUBSPOT_CUSTOMERS,
  GET_HUBSPOT_CUSTOMERS_ERROR
} from "redux/constants/WhatsApp";

export const switchToChat = () => {
  return {
    type: SWITCH_TO_CHAT
  };
};

export const switchToHome = () => {
  return {
    type: SWITCH_TO_HOME
  };
};

export const showCustomerModal = () => {
  return {
    type: SHOW_CUSTOMER_MODAL
  };
};

export const hideCustomerModal = () => {
  return {
    type: HIDE_CUSTOMER_MODAL
  };
};

export const addNewCustomer = (customer) => {
  return {
    type: ADD_NEW_CUSTOMER,
    customer
  };
};

export const addNewCustomerSuccess = (data) => {
  return {
    type: ADD_NEW_CUSTOMER_SUCCESS,
    data
  };
};

export const addNewCustomerError = (message) => {
  return {
    type: ADD_NEW_CUSTOMER_ERROR,
    message
  };
};

export const hideAddNewCustomerError = () => {
  return {
    type: HIDE_ADD_NEW_CUSTOMER_ERROR
  };
};

// export const getAllCustomers = (identifier, token) => {
//   return {
//     type: GET_ALL_CUSTOMERS,
//     identifier,
//     token,
//   };
// };

export const getHubSpotCustomers = (token) => {
  return {
    type: GET_HUBSPOT_CUSTOMERS,
    token
  };
};

export const getHubSpotCustomersError = (message) => {
  return {
    type: GET_HUBSPOT_CUSTOMERS_ERROR.at,
    message
  };
};

export const getHubbaCustomers = (identifier) => {
  return {
    type: GET_HUBBA_CUSTOMERS,
    identifier
  };
};

export const getAllCustomersSuccess = (data) => {
  return {
    type: GET_ALL_CUSTOMERS_SUCCESS,
    data
  };
};

export const getAllOwners = () => {
  return {
    type: GET_ALL_OWNERS
  };
};

export const getAllOwnersError = () => {
  return {
    type: GET_ALL_OWNERS_ERROR
  };
};

export const getAllOwnersSuccess = (data) => {
  return {
    type: GET_ALL_OWNERS_SUCCESS,
    data
  };
};

export const getAllCustomersError = (message) => {
  return {
    type: GET_ALL_CUSTOMERS_ERROR,
    message
  };
};

export const getMessagesForCustomer = (queryData) => {
  return {
    type: GET_MESSAGES_FOR_CUSTOMER,
    queryData
  };
};

export const getMessagesForCustomerSuccess = (data) => {
  return {
    type: GET_MESSAGES_FOR_CUSTOMER_SUCCESS,
    data
  };
};

export const getMessagesForCustomerFailed = (message) => {
  return {
    type: GET_MESSAGES_FOR_CUSTOMER_FAILED,
    message
  };
};

export const getSubscribedToMessages = (data) => {
  return {
    type: GET_SUBSCRIBED_TO_MESSAGES,
    data
  };
};

export const getCustomerDeals = (token, contact_id) => {
  return {
    type: GET_CUSTOMER_DEALS,
    contact_id,
    token
  };
};

export const getCustomerDealsSuccess = (deals) => {
  return { type: GET_CUSTOMER_DEALS_SUCCESS, deals };
};

export const getCustomerDealsError = (message) => {
  return { type: GET_CUSTOMER_DEALS_ERROR, message };
};

export const setActiveCustomer = (customer) => {
  return { type: SET_ACTIVE_CUSTOMER, customer };
};
