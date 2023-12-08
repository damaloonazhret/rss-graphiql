import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import WelcomePage from '../../pages/WelcomePage';
import GraphiqlPage from '../../pages/GraphiqlPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="graphiql" element={<GraphiqlPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
