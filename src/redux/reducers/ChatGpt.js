import {
  GET_TYPES,
  GET_CATEGORIES,
  GET_SUGGESTED_PROMPTS
} from "redux/constants/ChatGpt";

const init = {
  initialLoading: true,
  supabaseLoading: false,
  buttonLoading: false,
  categories: null,
  selectedCategory: null,
  types: null,
  selectedType: null,
  suggestedPrompt: null
};

const chatGpt = (state = init, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state };
    case GET_TYPES:
      return { ...state };
    case GET_SUGGESTED_PROMPTS:
      return { ...state };
    default:
      return state;
  }
};

export default chatGpt;
