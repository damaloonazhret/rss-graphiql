import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase.ts';
import { useEffect } from 'react';
import SchemaPage from '../components/schemaPage/SchemaPage.tsx';

const GraphiqlPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return <SchemaPage />;
};

export default GraphiqlPage;
