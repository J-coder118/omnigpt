import { all, takeEvery, fork, call } from "redux-saga/effects";
import {
  GET_TYPES,
  GET_CATEGORIES,
  GET_SUGGESTED_PROMPTS
} from "redux/constants/ChatGpt";
import SupabaseService from "services/SupabaseServices";

export function* getCategories() {
  yield takeEvery(GET_CATEGORIES, function* (payload) {
    try {
      const { data, error } = yield call(SupabaseService.getCategories);
      if (error) throw error;
      else {
        // yield put();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      //   yield put();
    }
  });
}

export function* getTypes() {
  yield takeEvery(GET_TYPES, function* (payload) {
    const { categoryId } = payload;
    try {
      const { data, error } = yield call(SupabaseService.getTypes, categoryId);
      if (error) throw error;
      else {
        console.log(data);
        // yield put();
      }
    } catch (error) {
      console.log(error);
      // yield put();
    }
  });
}

export function* getSuggestedPrompt() {
  yield takeEvery(GET_SUGGESTED_PROMPTS, function* (payload) {
    const { typeId } = payload;
    try {
      const { data, error } = yield call(
        SupabaseService.getSuggestedPrompt,
        typeId
      );
      if (error) throw error;
      else {
        console.log(data);
        // yield put();
      }
    } catch (error) {
      console.log(error);
      // yield put();
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getCategories), fork(getTypes), fork(getSuggestedPrompt)]);
}
