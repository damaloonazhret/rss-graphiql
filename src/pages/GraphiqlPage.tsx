import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '../context/localization';

const GraphiqlPage = () => {
  const { languageData } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <>
      <h1>{languageData.graphiqlPage}</h1>
    </>
  );
};

export default GraphiqlPage;
