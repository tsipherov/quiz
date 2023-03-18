import React, { Component } from "react";
import classes from "./QuizList.module.scss";
import { Link } from "react-router-dom";
// import axios from "axios";

export default class QuizList extends Component {
  renderQuizes() {
    return ["География", "Литература", "История", "Кино"].map((quiz) => {
      return (
        <li key={quiz}>
          <Link to={`/quiz/${quiz}`}>Тест из раздела {quiz.toUpperCase()}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
