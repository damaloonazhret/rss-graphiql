import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../../services/firebase';
import styles from './Header.module.css';

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className={styles.header}>
        <NavLink className={styles['nav-item']} to="/">
          Welcome
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
            <div>Logged as: {user.email}</div>
            <button onClick={() => auth.signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Sing In</NavLink>
            <NavLink to="/registration">Sing Up</NavLink>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
