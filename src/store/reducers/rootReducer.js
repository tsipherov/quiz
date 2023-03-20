import { combineReducers } from "redux";
import { quizReducer } from "./quizReducer";
import { createQuizReducer } from "./createQuizReducer";

export const rootReducer = combineReducers({
  quiz: quizReducer,
  create: createQuizReducer,
});
