import "./App.scss";
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <Layout>
      <div
        style={{
          width: "800px",
          border: "1px solid black",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Layout works</h1>
      </div>
    </Layout>
  );
}

export default App;
