import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../services/firebase';
import { registerSchema } from '../../services/validation';
import styles from './registration-form.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '../../context/localization';
import { Box, Button } from '@mui/material';

const RegistrationForm = () => {
  const { language, languageData } = useContext(LanguageContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema(languageData)),
    mode: 'onTouched',
  });

  useEffect(() => {
    reset();
  }, [language]);

  const handleFormSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/graphiql');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <h1>{languageData.register}</h1>
        <Box component="label" sx={{ display: 'block' }} htmlFor="name">
          {languageData.name}:
        </Box>
        <input type="text" {...register('name')} id="name" />
        <div className={styles['field-error']}>
          <p>{errors.name?.message}</p>
        </div>
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
        <Box component="label" sx={{ display: 'block' }} htmlFor="passwordConfirm">
          {languageData.passwordConfirm}:
        </Box>
        <input type="password" {...register('passwordConfirm')} id="passwordConfirm" />
        <div className={styles['field-error']}>
          <p>{errors.passwordConfirm?.message}</p>
        </div>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {languageData.register}
        </Button>
      </form>
    </Box>
  );
};
export default RegistrationForm;
