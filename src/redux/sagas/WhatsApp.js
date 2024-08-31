import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  ADD_NEW_CUSTOMER,
  GET_MESSAGES_FOR_CUSTOMER,
  GET_HUBBA_CUSTOMERS,
} from "redux/constants/WhatsApp";
import {
  getAllCustomersSuccess,
  addNewCustomerSuccess,
  hideCustomerModal,
  addNewCustomerError,
  getAllCustomersError,
  getMessagesForCustomerSuccess,
  getMessagesForCustomerFailed,
} from "redux/actions/WhatsApp";
import SupabaseService from "services/SupabaseServices";

export function* addNewCustomer() {
  yield takeEvery(ADD_NEW_CUSTOMER, function* (payload) {
    const { customer } = payload;
    try {
      const { data, error } = yield call(
        SupabaseService.addNewCustomer,
        customer
      );
      if (error) throw error;
      else {
        console.log(data);
        yield put(addNewCustomerSuccess(data[0]));
        yield put(hideCustomerModal());
      }
    } catch (error) {
      console.log(error);
      yield put(addNewCustomerError("Request Failed"));
    }
  });
}

export function* getHubbaCustomers() {
  yield takeEvery(GET_HUBBA_CUSTOMERS, function* (payload) {
    const { identifier } = payload;
    try {
      const { data, error } = yield call(
        SupabaseService.getallCustomers,
        identifier
      );

      if (error) throw error;
      else {
        console.log(data);
        yield put(getAllCustomersSuccess(data));
      }
    } catch (error) {
      console.log(error);
      yield put(getAllCustomersError("Request Failed, Please try again."));
    }
  });
}


export function* getMessages() {
  yield takeEvery(GET_MESSAGES_FOR_CUSTOMER, function* (payload) {
    const { user, customer } = payload.queryData;
    console.log(user, customer);
    try {
      const { data, error } = yield call(
        SupabaseService.getWhatsAppMessages,
        user,
        customer
      );
      if (error) throw error;
      else {
        console.log(data);
        yield put(getMessagesForCustomerSuccess(data));
      }
    } catch (error) {
      console.log(error);
      yield put(
        getMessagesForCustomerFailed("Request Failed, Please try again.")
      );
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(addNewCustomer),
    fork(getHubbaCustomers),
    fork(getMessages),
  ]);
}
