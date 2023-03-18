import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
} from "./actionTypes";

import axios from "axios";

export const fetchQuizes = () => {
  return (dispatch) => {
    dispatch(fetchQuizesStart());
    axios
      .get(
        "https://quiz-d72f8-default-rtdb.europe-west1.firebasedatabase.app/quizes.json"
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
