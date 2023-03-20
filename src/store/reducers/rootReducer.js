import { combineReducers } from "redux";
import { quizReducer } from "./quizReducer";
import { createQuizReducer } from "./createQuizReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  quiz: quizReducer,
  create: createQuizReducer,
  auth: authReducer,
});
