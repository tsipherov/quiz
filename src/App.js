import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Logout from "./containers/Logout/Logout";
import "./App.scss";
import { autoLogin } from "./store/actions/authActions";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Routes>
        <Route path="/" element={<QuizList />} />
        {/* <Route path="/quiz/:int" element={<Quiz />} /> */}
        {/* <Route path="/quiz-creator" element={<QuizCreator />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/*" element={<h1>Page Not Found (404)</h1>} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="/" element={<QuizList />} />
          {/* <Route path="/quiz/:int" element={<Quiz />} /> */}
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/*" element={<h1>Page Not Found (404)</h1>} />
        </Routes>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
