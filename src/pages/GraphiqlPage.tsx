import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { useEffect } from 'react';

const GraphiqlPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <>
      <h1>GraphiQL page</h1>
    </>
  );
};

export default GraphiqlPage;
