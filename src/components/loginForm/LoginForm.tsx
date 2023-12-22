import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../services/firebase';
import { loginSchema } from '../../services/validation';
import styles from './login-form.module.css';
import { useContext } from 'react';
import { LanguageContext } from '../../context/localization';
import { Box, Button } from '@mui/material';
import { showToastError, showToastSuccess } from '../../services/toasts';
import { FirebaseError } from 'firebase/app';

const LoginForm = () => {
  const { languageData } = useContext(LanguageContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema(languageData)),
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    try {
      await loginUser(data.email, data.password);
      showToastSuccess(languageData.loginSuccess);
      navigate('/graphiql');
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/invalid-credential') {
          showToastError(languageData.invalidCredentials);
        } else {
          showToastError(languageData.somethingWentWrong);
        }
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        alignItems: 'center',
        maxWidth: '200px',
        margin: '0 auto',
      }}
    >
      <h1>{languageData.login}</h1>
      <Box component="label" sx={{ display: 'block' }} htmlFor="email">
        {languageData.email}:
      </Box>
      <input type="text" {...register('email')} id="email" />
      <div className={styles['field-error']}>
        <p>{errors.email?.message}</p>
      </div>
      <Box component="label" sx={{ display: 'block' }} htmlFor="password">
        {languageData.password}:
      </Box>
      <input type="password" {...register('password')} id="password" />
      <div className={styles['field-error']}>
        <p>{errors.password?.message}</p>
      </div>

      <Button type="submit" variant="contained" sx={{ mt: '6px' }}>
        {languageData.login}
      </Button>
    </Box>
  );
};
export default LoginForm;
