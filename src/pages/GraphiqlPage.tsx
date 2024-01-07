import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { useEffect } from 'react';
import GraphiqlLayout from '../components/graphiql/graphiqlLayout/GraphiqlLayout';

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
      <GraphiqlLayout />
    </>
  );
};
export default GraphiqlPage;
