import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error' }
    loading: true,
    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Красный", id: 3 },
          { text: "Зеленый", id: 4 },
        ],
      },
      {
        question: "В каком году основали Санкт-Петербург?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: "1700", id: 1 },
          { text: "1702", id: 2 },
          { text: "1703", id: 3 },
          { text: "1803", id: 4 },
        ],
      },
      {
        question: "Столица Австралии?",
        rightAnswerId: 4,
        id: 3,
        answers: [
          { text: "Сидней", id: 1 },
          { text: "Оттава", id: 2 },
          { text: "Абу-Даби", id: 3 },
          { text: "Канберра", id: 4 },
        ],
      },
      {
        question: "Какая река является самой длинной на планете?",
        rightAnswerId: 4,
        id: 4,
        answers: [
          { text: "Амазонка", id: 1 },
          { text: "Лимпопо", id: 2 },
          { text: "Дунай", id: 3 },
          { text: "Нил", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  componentDidMount() {
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
        this.setState((prevState) => ({
          ...prevState,
          quiz: quizList,
          loading: false,
        }));
      })
      .catch((err) => console.log("err >>> ", err));
  }

  render() {
    return (
      <div className={classes.Quiz}>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className={classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>

            {this.state.isFinished ? (
              <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
            ) : (
              <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
