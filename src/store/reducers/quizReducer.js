import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  quiz: [],
};

export const quizReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: payload,
      };

    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
