import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles['github-wrapper']}>
          <img className={styles['github-logo']} src="src/assets/img/github-mark-white.svg" />
          <div className={styles['github-link']}>
            <a href="https://github.com/denys-bilonozhko/">
              <span>denys-bilonozhko</span>
            </a>
            <a href="https://github.com/damaloonazhret/">
              <span>damaloonazhret</span>
            </a>
            <a href="https://github.com/p0lluxstar/">
              <span>p0lluxstar</span>
            </a>
          </div>
        </div>
        <div className={styles.year}>
          <span>2023-2024</span>
        </div>
        <a href="https://rs.school/react/">
          <img
            className={styles['rsschool-logo']}
            src="src/assets/img/rsschool-logo.png"
            alt="RSSchool"
          />
        </a>
      </div>
    </>
  );
};

export default Footer;
