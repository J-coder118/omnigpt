import { all } from "redux-saga/effects";
import SupaBaseAuth from "./SupabaseAuth";
import Conversation from "./Conversation";
import ChatGpt from "./ChatGpt";
import WhatsApp from "./WhatsApp";

export default function* rootSaga(getState) {
  yield all([
    SupaBaseAuth(),
    Conversation(),
    ChatGpt(),
    WhatsApp()
  ]);
}
