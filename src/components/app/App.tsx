import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import WelcomePage from '../../pages/WelcomePage';
import GraphiqlPage from '../../pages/GraphiqlPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="graphiql" element={<GraphiqlPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
