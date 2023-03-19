import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  SET_QUIZ_RESULTS,
  SET_QUIZ_FINISHED,
  SET_QUIZ_NEXT,
  RETRY_QUIZ,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  quiz: [],
  results: {}, // {[id]: success error}
  isFinished: false,
  activeQuestion: 0,
  answerState: null, // { [id]: 'success' 'error' }
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
    case SET_QUIZ_RESULTS:
      return {
        ...state,
        answerState: payload.answerState,
        results: payload.results,
      };

    case SET_QUIZ_FINISHED:
      return {
        ...state,
        isFinished: true,
      };

    case SET_QUIZ_NEXT:
      return {
        ...state,
        activeQuestion: payload,
        answerState: null,
      };

    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };

    default:
      return state;
  }
};
