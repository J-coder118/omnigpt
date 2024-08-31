import {
  SWITCH_TO_CHAT,
  SWITCH_TO_HOME,
  SHOW_CUSTOMER_MODAL,
  HIDE_CUSTOMER_MODAL,
  ADD_NEW_CUSTOMER,
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_ERROR,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_ERROR,
  HIDE_ADD_NEW_CUSTOMER_ERROR,
  GET_MESSAGES_FOR_CUSTOMER,
  GET_MESSAGES_FOR_CUSTOMER_SUCCESS,
  GET_SUBSCRIBED_TO_MESSAGES,
  GET_CUSTOMER_DEALS,
  GET_CUSTOMER_DEALS_SUCCESS,
  GET_CUSTOMER_DEALS_ERROR,
  SET_ACTIVE_CUSTOMER,
  GET_ALL_OWNERS,
  GET_ALL_OWNERS_SUCCESS,
  GET_ALL_OWNERS_ERROR,
  GET_HUBBA_CUSTOMERS,
  GET_HUBSPOT_CUSTOMERS_ERROR
} from "redux/constants/WhatsApp";

const initState = {
  chatPage: false,
  customerModal: false,
  customers: [],
  allCustomersLoading: false,
  allCustomersError: false,
  allCustomersErrorMessage: null,
  hubspotCustomerErrorMessage: null,
  addCustomerLoading: false,
  addCustomerError: false,
  addCustomerErrorMessage: null,
  messages: [],
  messagesLoading: false,
  owners: [],
  token: null,
  allOwnersLoading: false
};

const conversation = (state = initState, action) => {
  switch (action.type) {
    case SWITCH_TO_CHAT:
      return {
        ...state,
        chatPage: true
      };
    case SWITCH_TO_HOME:
      return {
        ...state,
        chatPage: false
      };
    case SHOW_CUSTOMER_MODAL:
      return {
        ...state,
        customerModal: true
      };
    case HIDE_CUSTOMER_MODAL:
      return {
        ...state,
        customerModal: false
      };
    case GET_HUBBA_CUSTOMERS:
      return {
        ...state,
        allCustomersLoading: true
      };
    case GET_HUBSPOT_CUSTOMERS_ERROR:
      return {
        ...state,
        hubspotCustomerErrorMessage: action.message
      };
    case GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: [...action.data, ...state.customers],
        allCustomersLoading: false
      };
    case GET_ALL_OWNERS:
      return {
        ...state,
        allOwnersLoading: true
      };
    case GET_ALL_OWNERS_SUCCESS:
      return {
        ...state,
        owners: action.data,
        allOwnersLoading: false
      };
    case GET_ALL_OWNERS_ERROR:
      return {
        ...state,
        owners: [],
        allOwnersLoading: false
      };
    case GET_ALL_CUSTOMERS_ERROR:
      return {
        ...state,
        allCustomersLoading: false,
        allCustomersError: true,
        allCustomersErrorMessage: action.message
      };
    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        addCustomerLoading: true
      };
    case ADD_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [action.data, ...state.customers],
        addCustomerLoading: false
      };
    case ADD_NEW_CUSTOMER_ERROR:
      return {
        ...state,
        addCustomerError: true,
        addCustomerErrorMessage: action.message,
        addCustomerLoading: false
      };
    case HIDE_ADD_NEW_CUSTOMER_ERROR:
      return {
        ...state,
        addCustomerError: false,
        addCustomerErrorMessage: null
      };
    case GET_MESSAGES_FOR_CUSTOMER:
      return {
        ...state,
        messagesLoading: true
      };
    case GET_MESSAGES_FOR_CUSTOMER_SUCCESS:
      return {
        ...state,
        messages: action.data,
        messagesLoading: false
      };
    case GET_SUBSCRIBED_TO_MESSAGES:
      return {
        ...state,
        messages: [action.data, ...state.messages]
      };
    case GET_CUSTOMER_DEALS:
      return {
        ...state,
        contact_id: action.contact_id,
        token: action.token,
        loadingDeals: true
      };
    case GET_CUSTOMER_DEALS_SUCCESS:
      return {
        ...state,
        deals: action.deals,
        loadingDeals: false
      };
    case GET_CUSTOMER_DEALS_ERROR:
      return {
        ...state,
        getCustomerDealErrorMessage: action.message
      };
    case SET_ACTIVE_CUSTOMER:
      return {
        ...state,
        activeCustomer: action.customer
      };
    default:
      return state;
  }
};

export default conversation;
