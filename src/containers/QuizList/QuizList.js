import React, { Component } from "react";
import classes from "./QuizList.module.scss";
import { Link } from "react-router-dom";
// import axios from "axios";

export default class QuizList extends Component {
  renderQuizes() {
    return ["География", "Литература", "История", "Кино"].map((quiz, index) => {
      return (
        <li key={index}>
          <Link to={`/quiz/${index + 1}`}>
            Тест из раздела {quiz.toUpperCase()}
          </Link>
        </li>
      );
    });
  }

  // componentDidMount() {
  //   axios
  //     .get("https://react-quiz-b9c12-default-rtdb.firebaseio.com/quiz.json")
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }

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
