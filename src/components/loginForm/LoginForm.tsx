import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../services/firebase';
import { loginSchema } from '../../services/validation';
import styles from './login-form.module.css';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '../../context/localization';

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
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <h1>{languageData.login}</h1>
      <label>
        {languageData.email}:
        <input type="text" {...register('email')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.email?.message}</p>
      </div>
      <label>
        {languageData.password}:
        <input type="password" {...register('password')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.password?.message}</p>
      </div>

      <button type="submit">{languageData.login}</button>
    </form>
  );
};
export default LoginForm;