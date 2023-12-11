import * as yup from 'yup';
const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
const passwordErrorMessage =
  'Password must have at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character';
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const emailErrorMessage = 'Invalid email address, please enter a valid email address';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, {
      message: emailErrorMessage,
    })
    .required('Email is required'),
  password: yup
    .string()
    .matches(passwordRegex, {
      message: passwordErrorMessage,
    })
    .required('Password is required'),
});

const registerSchema = yup.object().shape({
  name: yup.string().min(1).required('Name is required'),
  email: yup
    .string()
    .matches(emailRegex, {
      message: emailErrorMessage,
    })
    .required('Email is required'),
  password: yup
    .string()
    .matches(passwordRegex, {
      message: passwordErrorMessage,
    })
    .required('Password is required'),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

export { loginSchema, registerSchema };
