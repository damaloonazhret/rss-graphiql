import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../services/firebase';
import schema from '../../services/validation';
import styles from './login-form.module.css';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    try {
      loginUser(data.email, data.password);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <h1>Authorization</h1>
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

      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;
