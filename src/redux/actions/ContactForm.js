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

export const addNote = (data) => {
  return {
    type: ADD_NOTE,
    noteText: data.noteText,
    contactId: data.contactId
  };
};

export const addNoteError = (data) => {
  return {
    type: ADD_NOTE_ERROR,
    addNoteErrorMessage: data.message
  };
};

export const getAllNotes = (data) => {
  return {
    type: GET_ALL_NOTES,
    contactId: data.contactId
  };
};

export const getAllNotesSuccess = (data) => {
  return {
    type: GET_ALL_NOTES_SUCCESS,
    data
  };
};

export const getAllNotesError = () => {
  return {
    type: GET_ALL_NOTES_ERROR
  };
};

export const createTask = (data) => {
  return {
    type: CREATE_TASK,
    data: data
  };
};

export const getAllTasks = (data) => {
  return {
    type: GET_ALL_TASKS,
    contactId: data.contactId
  };
};

export const getAllTasksSuccess = (data) => {
  return {
    type: GET_ALL_TASKS_SUCCESS,
    data
  };
};

export const getAllTasksError = () => {
  return {
    type: GET_ALL_TASKS_ERROR
  };
};
