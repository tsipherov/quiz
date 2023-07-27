import React, { Component } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import {
  addNewQuestionToQuiz,
  fetchNewQuiz,
} from "../../store/actions/createQuizActions";

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}
const sections = [
  { value: "cinema", text: "Кино" },
  { value: "geography", text: "География" },
  { value: "history", text: "История" },
  { value: "literature", text: "Литература" },
];

const initState = {
  isFormValid: false,
  rightAnswerId: 1,
  formControls: createFormControls(),
  section: "cinema",
};

class QuizCreator extends Component {
  state = initState;

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const { question, option1, option2, option3, option4 } =
      this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.addNewQuestionToQuiz(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = (event) => {
    event.preventDefault();
    this.props
      .fetchNewQuiz(this.state.section, this.props.token)
      .then((result) => {
        if (result.statusText === "OK") this.setState(initState);
      });
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }

  rightAnswerChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  sectionChangeHandler = (event) => {
    this.setState({
      section: event.target.value,
    });
  };

  render() {
    const selectSection = (
      <Select
        label="Выберите раздел"
        value={this.state.section}
        onChange={this.sectionChangeHandler}
        options={sections}
      />
    );

    const selectRightAnswer = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.rightAnswerChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {selectSection}

            {this.renderControls()}

            {selectRightAnswer}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid || this.props.loading}
            >
              Добавить вопрос
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0 || this.props.loading}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quiz: state.create.quiz,
  loading: state.create.loading,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  addNewQuestionToQuiz: (item) => dispatch(addNewQuestionToQuiz(item)),
  fetchNewQuiz: (section, token) => dispatch(fetchNewQuiz(section, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
