import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/material';
import styles from './Main.module.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Main = () => {
  return (
    <>
      <div className={styles.main} data-testid="main">
        <Container>
          <Outlet />
        </Container>
      </div>
      <ToastContainer />
    </>
  );
};

export default Main;
