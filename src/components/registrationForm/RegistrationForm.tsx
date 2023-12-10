import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../services/firebase';
import { registerSchema } from '../../services/validation';
import styles from './registration-form.module.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

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
      <h1>Registration</h1>
      <label>
        Name:
        <input type="text" {...register('name')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.name?.message}</p>
      </div>
      <label>
        Email:
        <input type="text" {...register('email')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.email?.message}</p>
      </div>
      <label>
        Password:
        <input type="password" {...register('password')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.password?.message}</p>
      </div>
      <label>
        Password confirm:
        <input type="password" {...register('passwordConfirm')} />
      </label>
      <div className={styles['field-error']}>
        <p>{errors.passwordConfirm?.message}</p>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};
export default RegistrationForm;
