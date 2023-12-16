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
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <h1>{languageData.register}</h1>
      <Box component="label" sx={{ display: 'block' }}>
        {languageData.name}:
      </Box>
      <input type="text" {...register('name')} />
      <div className={styles['field-error']}>
        <p>{errors.name?.message}</p>
      </div>
      <Box component="label" sx={{ display: 'block' }}>
        {languageData.email}:
      </Box>
      <input type="text" {...register('email')} />
      <div className={styles['field-error']}>
        <p>{errors.email?.message}</p>
      </div>
      <Box component="label" sx={{ display: 'block' }}>
        {languageData.password}:
      </Box>
      <input type="password" {...register('password')} />
      <div className={styles['field-error']}>
        <p>{errors.password?.message}</p>
      </div>
      <Box component="label" sx={{ display: 'block' }}>
        {languageData.passwordConfirm}:
      </Box>
      <input type="password" {...register('passwordConfirm')} />
      <div className={styles['field-error']}>
        <p>{errors.passwordConfirm?.message}</p>
      </div>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {languageData.register}
      </Button>
    </form>
  );
};
export default RegistrationForm;
