import React, { Component } from "react";
import classes from "./QuizList.module.scss";
import { Link } from "react-router-dom";

export default class QuizList extends Component {
  sections = {
    cinema: "Кино",
    geography: "География",
    history: "История",
    literature: "Литература",
  };
  renderQuizes() {
    return Object.keys(this.sections).map((quiz) => {
      return (
        <li key={quiz}>
          <Link to={`/quiz/${quiz}`}>
            Тест из раздела {this.sections[quiz].toUpperCase()}
          </Link>
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
