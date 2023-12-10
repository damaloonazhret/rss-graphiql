import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import LoginForm from '../loginForm/LoginForm';
import RegistrationForm from '../registrationForm/RegistrationForm';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <RegistrationForm />
      <LoginForm />
      {user && <div>Logged as: {user.displayName}</div>}
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};

export default App;
