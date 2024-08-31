import { useReducer, useEffect } from "react";
import { connect } from "react-redux";
import InitialDetails from "./InitialDetails";
import CreateTaskForm from "./CreateTaskForm";
import DealPipeline from "./DealPipeline";
import AddNote from "./AddNote";
import NoteDetail from "./NoteDetail";
import Files from "./Files";
import {
  INITIAL,
  DEAL_PIPELINE,
  CREATE_TASK,
  CREATE_NOTE,
  NOTE_DETAIL,
  FILES_AND_MEDIA,
  SEARCH_IN_CONVERSATION
} from "./Constants";
import SearchInCoversation from "./SearchInConversation";
import { addNote, getAllNotes } from "redux/actions/ContactForm";

const initState = {
  display: INITIAL
};

const customerDetailsReducer = (state, action) => {
  switch (action.type) {
    case INITIAL:
      return {
        ...state,
        display: action.payload
      };
    case DEAL_PIPELINE:
      return {
        ...state,
        display: action.payload
      };
    case CREATE_TASK:
      return {
        ...state,
        display: action.payload
      };
    case CREATE_NOTE:
      return {
        ...state,
        display: action.payload
      };
    case NOTE_DETAIL:
      return {
        ...state,
        display: action.display,
        noteText: action.noteText
      };
    case FILES_AND_MEDIA:
      return {
        ...state,
        display: action.payload
      };
    case SEARCH_IN_CONVERSATION:
      return {
        ...state,
        display: action.payload
      };

    default:
      return state;
  }
};

const ContactForm = (props) => {
  const { contactDetailsIsVaild, activeCustomer, getAllNotes } = props;
  const [state, dispatch] = useReducer(customerDetailsReducer, initState);
  useEffect(() => {
    if (!contactDetailsIsVaild) {
      dispatch({ type: INITIAL, payload: INITIAL });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactDetailsIsVaild]);
  useEffect(() => {
    if (state.display === INITIAL) {
      getAllNotes({ contactId: activeCustomer.hubspot_contact_id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.display, activeCustomer.hubspot_contact_id]);
  return (
    <div
      style={{ flex: 1, display: contactDetailsIsVaild ? "block" : "none" }}
      className="contact-details"
    >
      {state.display === INITIAL && (
        <InitialDetails {...props} dispatch={dispatch} />
      )}
      {state.display === DEAL_PIPELINE && <DealPipeline dispatch={dispatch} />}
      {state.display === CREATE_TASK && <CreateTaskForm dispatch={dispatch} />}
      {state.display === CREATE_NOTE && (
        <AddNote {...props} dispatch={dispatch} />
      )}
      {state.display === NOTE_DETAIL && (
        <NoteDetail noteText={state.noteText} dispatch={dispatch} />
      )}
      {state.display === FILES_AND_MEDIA && <Files dispatch={dispatch} />}
      {state.display === SEARCH_IN_CONVERSATION && (
        <SearchInCoversation dispatch={dispatch} />
      )}
    </div>
  );
};

const mapStateToProps = ({ contactForm, conversation, auth }) => {
  const { notes, tasks } = contactForm;
  const { session } = auth;
  const { owners, allOwnersLoading } = conversation;
  return { notes, tasks, owners, session, allOwnersLoading };
};

const mapDispatchToProps = {
  addNote,
  getAllNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
