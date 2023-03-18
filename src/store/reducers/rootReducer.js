import { combineReducers } from "redux";
import { quizReducer } from "./quizReducer";

export const rootReducer = combineReducers({ quiz: quizReducer });
