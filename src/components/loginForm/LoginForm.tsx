import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../services/firebase';
import { loginSchema } from '../../services/validation';
import styles from './login-form.module.css';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '../../context/localization';
import { Box, Button } from '@mui/material';

const LoginForm = () => {
  const { language, languageData } = useContext(LanguageContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema(languageData)),
    mode: 'onTouched',
  });

  useEffect(() => {
    reset();
  }, [language]);

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    try {
      await loginUser(data.email, data.password);
      navigate('/graphiql');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
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

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {languageData.login}
        </Button>
      </form>
    </Box>
  );
};
export default LoginForm;
