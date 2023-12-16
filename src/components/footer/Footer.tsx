import { Box, Typography } from '@mui/material';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <Box className={styles.footer}>
        <div className={styles['github-wrapper']}>
          <Box
            component="img"
            sx={{ width: { xs: '20px', sm: '68px' } }}
            src="src/assets/img/github-mark-white.svg"
          />
          <Box className={styles['github-link']}>
            <a href="https://github.com/denys-bilonozhko/">
              <Typography sx={{ fontSize: { xs: '14px', sm: '18px' } }}>
                denys-bilonozhko
              </Typography>
            </a>
            <a href="https://github.com/damaloonazhret/">
              <Typography sx={{ fontSize: { xs: '14px', sm: '18px' } }}>damaloonazhret</Typography>
            </a>
            <a href="https://github.com/p0lluxstar/">
              <Typography sx={{ fontSize: { xs: '14px', sm: '18px' } }}>p0lluxstar</Typography>
            </a>
          </Box>
        </div>
        <div className={styles.year}>
          <Typography sx={{ fontSize: { xs: '14px', sm: '18px' } }}>2023-2024</Typography>
        </div>
        <a href="https://rs.school/react/">
          <Box
            component="img"
            sx={{ width: { xs: '50px', sm: '150px' } }}
            src="src/assets/img/rsschool-logo.png"
            alt="RSSchool"
          />
        </a>
      </Box>
    </>
  );
};

export default Footer;
