import styles from './Main.module.css';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <div className={styles.main}>
        <Outlet />
      </div>
    </>
  );
};

export default Main;
