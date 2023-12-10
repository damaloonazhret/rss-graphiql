import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/registrationForm/RegistrationForm';
import { auth } from '../services/firebase';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  if (user) {
    navigate('/');
  }

  return <RegistrationForm />;
};

export default RegistrationPage;
