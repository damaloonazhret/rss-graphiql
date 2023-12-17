import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../services/firebase';
import { registerSchema } from '../../services/validation';
import styles from './registration-form.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '../../context/localization';

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
      <label>
        {languageData.name}:
        <input type="text" {...register('name')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.name?.message}</p>
      </div>
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
      <label>
        {languageData.passwordConfirm}:
        <input type="password" {...register('passwordConfirm')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.passwordConfirm?.message}</p>
      </div>

      <button type="submit">{languageData.register}</button>
    </form>
  );
};
export default RegistrationForm;
