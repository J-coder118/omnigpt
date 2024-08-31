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
  GET_THREADS_MESSAGES,
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
  GET_HUBSPOT_CUSTOMERS_ERROR,
  GET_MESSAGES_FOR_CUSTOMER_FAILED,
  GET_ALL_THREADS,
  GET_ALL_THREADS_SUCCESS,
  GET_ALL_THREADS_FAILED,
  GET_ALL_NEW_THREADS_SUCCESS,
  REMOVE_FONTBOLD_IS_VALID,
  SET_NEW_THREAD_IS_VALID,
  SET_NEW_THREAD_IS_IN_VALID,
  SET_SELECTED_THREAD,
  EDIT_SELECTED_THREAD,
  EDIT_SELECTED_THREAD_SUCCESS,
  EDIT_SELECTED_THREAD_FAILED,
  SET_OPEN_POP_UP,
  UPDATE_THREAD,
  RESPONSE_IN_PROGRESS
} from "redux/constants/Conversation";

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
  messagesErrorMessage: null,
  owners: [],
  token: null,
  allOwnersLoading: false,
  threads: [],
  threadsLoading: false,
  threadsErrorMessage: null,
  fontBoldIsValid: false,
  newThreadIsValid: false,
  selectedThread: "",
  loadingEdit: false,
  editFailed: false,
  openPopUp: false,
  responseInProgress : false
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
    case GET_THREADS_MESSAGES:
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
    case GET_MESSAGES_FOR_CUSTOMER_FAILED:
      return {
        ...state,
        messagesLoading: false,
        messagesErrorMessage: action.message
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
    case GET_ALL_THREADS:
      return {
        ...state,
        threadsLoading: true
      };
    case GET_ALL_THREADS_SUCCESS:
      return {
        ...state,
        threadsLoading: false,
        threads: action.data
      };
    case GET_ALL_THREADS_FAILED:
      return {
        ...state,
        threadsLoading: false,
        threadsErrorMessage: action.message
      };
    case EDIT_SELECTED_THREAD:
      return {
        ...state,
        loadingEdit: true
      };
    case EDIT_SELECTED_THREAD_SUCCESS:
      return {
        ...state,
        loadingEdit: false
      };
    case EDIT_SELECTED_THREAD_FAILED:
      return {
        ...state,
        loadingEdit: false,
        editFailed: true
      };
    case GET_ALL_NEW_THREADS_SUCCESS:
      return {
        ...state,
        threads: action.data,
        fontBoldIsValid: true
      };
    case REMOVE_FONTBOLD_IS_VALID:
      return {
        ...state,
        fontBoldIsValid: false
      };
    case SET_NEW_THREAD_IS_VALID:
      return {
        ...state,
        newThreadIsValid: true
      };
    case SET_NEW_THREAD_IS_IN_VALID:
      return {
        ...state,
        newThreadIsValid: false
      };
    case SET_SELECTED_THREAD:
      return {
        ...state,
        selectedThread: action.id
      };
    case SET_OPEN_POP_UP:
      return {
        ...state,
        openPopUp: action.value
      };
    case RESPONSE_IN_PROGRESS:
        return {
          ...state,
          responseInProgress: action.value
        };
    case UPDATE_THREAD:
      return {
        ...state,
        threads: state.threads.map((threadData) =>
          threadData.thread_id === action.threadId
            ? action.threadData
            : threadData
        )
      };
    default:
      return state;
  }
};

export default conversation;
