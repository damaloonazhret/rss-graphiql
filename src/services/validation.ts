import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: 'Invalid email address, please enter a valid email address',
    })
    .required('Email is required'),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/, {
      message:
        'Password must have at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
    })
    .required('Password is required'),
});

export default schema;
