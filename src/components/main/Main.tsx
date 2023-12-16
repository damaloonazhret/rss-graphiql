import styles from './Main.module.css';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <div className={styles.main} data-testid="main">
        <Outlet />
      </div>
    </>
  );
};

export default Main;
