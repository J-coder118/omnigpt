import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  GET_THREADS_MESSAGES,
  GET_ALL_THREADS,
  GET_ALL_NEW_THREADS,
  EDIT_SELECTED_THREAD
} from "redux/constants/Conversation";
import {
  getMessagesForCustomerSuccess,
  getMessagesForCustomerFailed,
  getAllThreadsSuccess,
  getAllThreadsFailed,
  getAllNewThreadsSuccess,
  getAllNewThreadsFailed,
  editThreadSuccess,
  editThreadFailed
} from "redux/actions/Conversation";
import SupabaseService from "services/SupabaseServices";


export function* getMessages() {
  yield takeEvery(GET_THREADS_MESSAGES, function* (payload) {
    const { threadId } = payload;
    try {
      const { data, error } = yield call(SupabaseService.getMessages, threadId);
      if (error) throw error;
      else {
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

// export function* getSubscribedToMessages() {
//   yield takeEvery(GET_SUBSCRIBED_TO_MESSAGES, function* () {
//     try {
//       const data = yield call(SupabaseService.getSubscribedToMessages);
//     } catch (error) {
//       console.log(error);
//       yield put(
//         getMessagesForCustomerFailed("Request Failed, Please try again.")
//       );
//     }
//   });
// }

export function* getAllThreads() {
  yield takeEvery(GET_ALL_THREADS, function* (payload) {
    const { identifier } = payload;
    try {
      const { data, error } = yield call(
        SupabaseService.getAllThreads,
        identifier
      );

      if (error) throw error;
      else {
        yield put(getAllThreadsSuccess(data));
      }
    } catch (error) {
      console.log(error);
      yield put(getAllThreadsFailed("Request Failed, Please try again."));
    }
  });
}

export function* editThread() {
  yield takeEvery(EDIT_SELECTED_THREAD, function* (editPayload) {
    const { payload } = editPayload;
    const { identify, content } = payload;
    try {
      const { error } = yield call(
        SupabaseService.editThread,
        identify,
        content
      );
      if (error) throw error;
      else {
        yield put(editThreadSuccess());
      }
    } catch (error) {
      console.log(error);
      yield put(editThreadFailed());
    }
  });
}

export function* getAllNewThreads() {
  yield takeEvery(GET_ALL_NEW_THREADS, function* (payload) {
    const { identifier } = payload;
    try {
      const { data, error } = yield call(
        SupabaseService.getAllThreads,
        identifier
      );

      if (error) throw error;
      else {
        yield put(getAllNewThreadsSuccess(data));
      }
    } catch (error) {
      console.log(error);
      yield put(getAllNewThreadsFailed("Request Failed, Please try again."));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getMessages),
    fork(getAllThreads),
    fork(getAllNewThreads),
    fork(editThread)
  ]);
}
