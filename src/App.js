import Layout from './components/Layout/Page';
import ProjectDetail from "./ProjectDetail";

function App() {
  return (
    <Layout>
      <div className="App">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <ProjectDetail />
      </div>
    </Layout>
  );
}

export default App;
