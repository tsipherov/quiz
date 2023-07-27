import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  SET_QUIZ_RESULTS,
  SET_QUIZ_FINISHED,
  SET_QUIZ_NEXT,
  RETRY_QUIZ,
} from "./actionTypes";

import axios from "axios";

export const onAnswerClickHandler = (answerId) => {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      dispatch(setQuizResults({ [answerId]: "success" }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(setQuizFinished());
        } else {
          dispatch(setQuizNext(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      dispatch(setQuizResults({ [answerId]: "error" }, results));
    }
  };
};

export const fetchQuizes = (section, token) => {
  return (dispatch) => {
    dispatch(fetchQuizesStart());
    axios
      .get(
        `https://quiz-d72f8-default-rtdb.europe-west1.firebasedatabase.app/quizes/${section}.json?auth=${token}`
      )
      .then((response) => {
        console.log(response.data);
        const quizList = [];
        Object.keys(response.data).forEach((key) =>
          quizList.push(response.data[key][0])
        );
        dispatch(fetchQuizesSuccess(quizList));
      })
      .catch((err) => {
        dispatch(fetchQuizesError(err));
      });
  };
};

export const setQuizResults = (answerState, results) => ({
  type: SET_QUIZ_RESULTS,
  payload: { answerState, results },
});

export const setQuizFinished = () => ({
  type: SET_QUIZ_FINISHED,
});

export const retryQuiz = () => ({
  type: RETRY_QUIZ,
});

export const setQuizNext = (activeQuestion) => ({
  type: SET_QUIZ_NEXT,
  payload: activeQuestion,
});

export const fetchQuizesStart = () => ({
  type: FETCH_QUIZES_START,
});

export const fetchQuizesSuccess = (data) => ({
  type: FETCH_QUIZES_SUCCESS,
  payload: data,
});

export const fetchQuizesError = (error) => ({
  type: FETCH_QUIZES_ERROR,
  payload: error,
});

const isQuizFinished = (state) => {
  return state.activeQuestion + 1 === state.quiz.length;
};
