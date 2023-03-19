import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizes,
  onAnswerClickHandler,
  retryQuiz,
} from "../../store/actions/quizActions";

class Quiz extends Component {
  temp = [
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
  ];

  componentDidMount() {
    this.props.fetchQuizes();
  }

  componentWillUnmount() {
    this.props.retryHandler();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        {this.props.loading ? (
          <Loader />
        ) : (
          <div className={classes.QuizWrapper}>
            <h1>Ответьте на все вопросы</h1>

            {this.props.isFinished ? (
              <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.retryHandler}
              />
            ) : (
              <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                onAnswerClick={this.props.onAnswerClickHandler}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.quiz.loading,
  quiz: state.quiz.quiz,
  error: state.quiz.error,
  results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuizes: () => dispatch(fetchQuizes()),
  onAnswerClickHandler: (answerId) => dispatch(onAnswerClickHandler(answerId)),
  retryHandler: () => dispatch(retryQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
