import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../../services/firebase';
import styles from './Header.module.css';
import { useContext } from 'react';
import { LanguageContext } from '../../context/localization';
import { Language } from '../../types/enums';

const Header = () => {
  const [user] = useAuthState(auth);
  const { language, languageData, setLanguage } = useContext(LanguageContext);
  const handleToggleLanguage = () => {
    const newLanguage = language === Language.EN ? Language.RU : Language.EN;
    if (setLanguage) {
      setLanguage(newLanguage);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <NavLink className={styles['nav-item']} to="/">
          {languageData.welcome}
        </NavLink>
        {user && (
          <NavLink className={styles['nav-item']} to="/graphiql">
            GraphiQL
          </NavLink>
        )}
      </div>
      <div>
        {user ? (
          <>
            <div>
              {languageData.loggedAs}: {user.email}
            </div>
            <button onClick={() => auth.signOut()}>{languageData.logout}</button>
          </>
        ) : (
          <>
            <NavLink to="/login">{languageData.login}</NavLink>
            <NavLink to="/registration">{languageData.register}</NavLink>
          </>
        )}
      </div>
      <div>
        {languageData.language}:
        <select value={language} onChange={handleToggleLanguage}>
          <option value={Language.EN}>English</option>
          <option value={Language.RU}>Russian</option>
        </select>
      </div>
    </>
  );
};

export default Header;
