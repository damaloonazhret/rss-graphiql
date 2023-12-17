import { Container } from '@mui/material';
import styles from './Main.module.css';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className={styles.main}>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Main;
