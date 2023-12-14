import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <p>Error 404</p>
      <p>Not found page</p>
    </div>
  );
};

export default NotFound;
