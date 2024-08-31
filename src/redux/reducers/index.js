import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import conversation from "./Conversation";
import whatsApp from "./WhatsApp";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  conversation,
  whatsApp
});

export default reducers;
