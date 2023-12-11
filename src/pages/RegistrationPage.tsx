import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/registrationForm/RegistrationForm';
import { auth } from '../services/firebase';
import { useEffect } from 'react';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate('/graphiql');
    }
  });

  return <RegistrationForm />;
};

export default RegistrationPage;
