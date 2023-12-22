import { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Option, Select } from '@mui/joy';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import { LanguageContext } from '../../context/localization';
import { auth } from '../../services/firebase';
import { Language } from '../../types/enums';
import styles from './header.module.css';

const Header = () => {
  const [user] = useAuthState(auth);
  const { language, languageData, setLanguage } = useContext(LanguageContext);
  const handleToggleLanguage = () => {
    const newLanguage = language === Language.EN ? Language.RU : Language.EN;
    if (setLanguage) {
      setLanguage(newLanguage);
      window.location.reload();
    }
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pagesLinks = () => {
    return (
      <div>
        <NavLink to="/">
          <Button className={styles.button} variant="contained">
            <Typography textAlign="center">{languageData.welcome}</Typography>
          </Button>
        </NavLink>
        {user && (
          <NavLink to="/graphiql">
            <Button className={styles.button} variant="contained">
              <Typography textAlign="center">GraphiQL</Typography>
            </Button>
          </NavLink>
        )}
      </div>
    );
  };

  return (
    <AppBar
      position="sticky"
      sx={{ py: '6px', backgroundColor: '#457c8b', zIndex: 1 }}
      data-testid="header"
    >
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="small" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesLinks()}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {pagesLinks()}
          </Box>

          <Box
            sx={{
              display: { xs: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              mr: '6px',
            }}
          >
            <Select value={language} onChange={handleToggleLanguage} size="sm" sx={{ zIndex: 2 }}>
              <Option value={Language.EN}>English</Option>
              <Option value={Language.RU}>Russian</Option>
            </Select>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex' },
                flexWrap: 'wrap',
                gap: 1,
                fontSize: { xs: '14px', md: '16px' },
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user ? (
                <>
                  <Typography
                    sx={{
                      fontSize: { xs: '14px', md: '16px' },
                      display: { xs: 'none', sm: 'block' },
                    }}
                    textAlign="center"
                  >
                    {user.email}
                  </Typography>
                  <Button
                    className={styles.button}
                    variant="contained"
                    onClick={() => auth.signOut()}
                  >
                    {languageData.logout}
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <Button className={styles.button} variant="contained">
                      <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }} textAlign="center">
                        {languageData.login}
                      </Typography>
                    </Button>
                  </NavLink>
                  <NavLink to="/registration">
                    <Button className={styles.button} variant="contained">
                      <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }} textAlign="center">
                        {languageData.register}
                      </Typography>
                    </Button>
                  </NavLink>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
