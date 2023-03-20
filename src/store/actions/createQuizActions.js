import axios from "axios";
import {
  ADD_NEW_QUESTION_TO_QUIZ,
  FETCH_NEW_QUIZ_START,
  FETCH_NEW_QUIZ_SUCCESS,
  FETCH_NEW_QUIZ_ERROR,
} from "./actionTypes";

export const addNewQuestionToQuiz = (newItem) => ({
  type: ADD_NEW_QUESTION_TO_QUIZ,
  payload: newItem,
});

export const fetchNewQuiz = () => {
  return (dispatch, getState) => {
    dispatch(fetchNewQuizStart);
    return axios
      .post(
        "https://quiz-d72f8-default-rtdb.europe-west1.firebasedatabase.app/quizes.json",
        getState().create.quiz
      )
      .then((res) => {
        console.log("axios res >>> ", res);
        dispatch(fetchNewQuizSuccess());
        return res;
      })
      .catch((err) => dispatch(fetchNewQuizError(err)));
  };
};

export const fetchNewQuizStart = () => ({
  type: FETCH_NEW_QUIZ_START,
});

export const fetchNewQuizSuccess = () => ({
  type: FETCH_NEW_QUIZ_SUCCESS,
});

export const fetchNewQuizError = (error) => ({
  type: FETCH_NEW_QUIZ_ERROR,
  payload: error,
});
