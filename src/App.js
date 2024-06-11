import Layout from './components/Layout/Page';
import Home from './components/Layout/home/Home'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </Layout>

  );
}

export default App;
