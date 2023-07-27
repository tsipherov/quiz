import React, { useEffect } from "react";
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
import { useParams } from "react-router";

const Quiz = (props) => {
  const temp = [
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
  const { section } = useParams();
  useEffect(() => {
    props.fetchQuizes(section, props.token);
    return props.retryHandler();
  }, []);

  return (
    <div className={classes.Quiz}>
      {props.loading ? (
        <Loader />
      ) : (
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {props.isFinished ? (
            <FinishedQuiz
              results={props.results}
              quiz={props.quiz}
              onRetry={props.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={props.quiz[props.activeQuestion].answers}
              question={props.quiz[props.activeQuestion].question}
              onAnswerClick={props.onAnswerClickHandler}
              quizLength={props.quiz.length}
              answerNumber={props.activeQuestion + 1}
              state={props.answerState}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.quiz.loading,
  quiz: state.quiz.quiz,
  error: state.quiz.error,
  results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  token: state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuizes: (section, token) => dispatch(fetchQuizes(section, token)),
  onAnswerClickHandler: (answerId) => dispatch(onAnswerClickHandler(answerId)),
  retryHandler: () => dispatch(retryQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
