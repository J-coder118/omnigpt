import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  SIGNIN,
  SIGNOUT,
  SIGNIN_WITH_GOOGLE,
} from "../constants/Auth";
import {
  showAuthMessage,
  showAuthSuccessMessage
} from "../actions/Auth";
import SupabaseService from "services/SupabaseServices";

export function* signInWithSBEmail() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    const { email } = payload;
    try {
      const { error } = yield call(SupabaseService.signInWithMagicLink, email);

      if (error) {
        throw error;
      } else {
        yield put(showAuthSuccessMessage("Please check your Inbox"));
      }
    } catch (error) {
      yield put(showAuthMessage(error.message || error.error_description));
    }
  });
}

export function* signInWithSBGoogle() {
  yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
    try {
      const { error } = yield call(SupabaseService.signInWithGoogle);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
      yield put(showAuthMessage(error.message || error.error_description));
    }
  });
}

export function* signOutMain() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      const { error } = yield call(SupabaseService.signOutRequest);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
      yield put(showAuthMessage(error.message));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signInWithSBEmail),
    fork(signOutMain),
    fork(signInWithSBGoogle),
  ]);
}
