import { useContext } from 'react';
import { LanguageContext } from '../context/localization';

const WelcomePage = () => {
  const { languageData } = useContext(LanguageContext);

  return (
    <>
      <h1>{languageData.welcome}</h1>
    </>
  );
};

export default WelcomePage;
