import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <NavLink className={styles['nav-item']} to="/">
          Welcome
        </NavLink>
        <NavLink className={styles['nav-item']} to="/graphiql">
          GraphiQL
        </NavLink>
      </div>
    </>
  );
};

export default Header;
