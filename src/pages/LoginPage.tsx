import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm/LoginForm';
import { auth } from '../services/firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  if (user) {
    navigate('/');
  }

  return <LoginForm />;
};

export default LoginPage;
