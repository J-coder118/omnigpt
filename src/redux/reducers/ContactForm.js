import {
  ADD_NOTE,
  ADD_NOTE_ERROR,
  GET_ALL_NOTES,
  GET_ALL_NOTES_SUCCESS,
  GET_ALL_NOTES_ERROR,
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_ERROR
} from "redux/constants/ContactForm";

const initState = {
  notes: [],
  addNoteLoading: false,
  getNotesLoading: false
};

const contactForm = (state = initState, action) => {
  switch (action.type) {
    // NOTE
    case ADD_NOTE:
      return {
        ...state,
        addNoteLoading: true
      };
    case ADD_NOTE_ERROR:
      return {
        ...state,
        addNoteLoading: false,
        addNoteErrorMessage: action.data
      };
    case GET_ALL_NOTES:
      return {
        ...state,
        addNoteLoading: false,
        getNotesLoading: true
      };
    case GET_ALL_NOTES_SUCCESS:
      return {
        ...state,
        getNotesLoading: false,
        notes: action.data
      };
    case GET_ALL_NOTES_ERROR:
      return {
        ...state,
        getNotesLoading: false,
        notes: []
      };

    // TASK
    case CREATE_TASK:
      return {
        ...state,
        createTaskLoading: true
      };
    case GET_ALL_TASKS:
      return {
        ...state,
        createTaskLoading: false,
        getTasksLoading: true
      };
    case GET_ALL_TASKS_SUCCESS:
      return {
        ...state,
        getTasksLoading: false,
        tasks: action.data
      };
    case GET_ALL_TASKS_ERROR:
      return {
        ...state,
        getTasksLoading: false,
        tasks: []
      };
    default:
      return state;
  }
};
export default contactForm;
