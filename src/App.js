import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<QuizList />} />
            <Route path="/quiz/:int" element={<Quiz />} />
            <Route path="/quiz-creator" element={<QuizCreator />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/*" element={<h1>Page Not Found (404)</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
