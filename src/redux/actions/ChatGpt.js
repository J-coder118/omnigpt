import {
  GET_TYPES,
  GET_CATEGORIES,
  GET_SUGGESTED_PROMPTS,
  GET_CATEGORIES_SUCCESS,
  GET_TYPES_SUCCESS,
  GET_SUGGESTED_PROMPTS_SUCCESS
} from "redux/constants/ChatGpt";

export const getCategories = () => {
  return {
    type: GET_CATEGORIES
  };
};
export const getCategoriesSuccess = () => {
  return {
    type: GET_CATEGORIES_SUCCESS
  };
};
export const getTypes = (categoryId) => {
  return {
    type: GET_TYPES,
    categoryId
  };
};

export const getTypesSuccess = (data) => {
  return {
    type: GET_TYPES_SUCCESS,
    data
  };
};

export const getSuggestedPrompt = (typeId) => {
  return {
    type: GET_SUGGESTED_PROMPTS,
    typeId
  };
};

export const getSuggestedPromptSuccess = (data) => {
  return {
    type: GET_SUGGESTED_PROMPTS_SUCCESS,
    data
  };
};
