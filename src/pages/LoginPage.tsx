import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm/LoginForm';
import { auth } from '../services/firebase';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate('/graphiql');
    }
  });

  return <LoginForm />;
};

export default LoginPage;
