import {
  ADD_NEW_QUESTION_TO_QUIZ,
  FETCH_NEW_QUIZ_START,
  FETCH_NEW_QUIZ_SUCCESS,
  FETCH_NEW_QUIZ_ERROR,
} from "../actions/actionTypes";

const initialState = {
  quiz: [],
  error: null,
  loading: false,
};

export const createQuizReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NEW_QUESTION_TO_QUIZ:
      return {
        ...state,
        quiz: [...state.quiz, payload],
      };
    case FETCH_NEW_QUIZ_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_NEW_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: [],
        loading: false,
      };
    case FETCH_NEW_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
