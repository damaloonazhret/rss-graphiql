import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <NavLink to="/">Welcome</NavLink>
        <NavLink to="/graphiql">GraphiQL</NavLink>
      </div>
    </>
  );
};

export default Header;
