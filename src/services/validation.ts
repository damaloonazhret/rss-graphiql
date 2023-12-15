import * as yup from 'yup';
const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const loginSchema = (languageData: Record<string, string>) => {
  return yup.object().shape({
    email: yup
      .string()
      .required(languageData.emailRequired)
      .matches(emailRegex, {
        message: languageData.emailErrorMessage,
      })
      .required(languageData.emailRequired),
    password: yup.string().required(languageData.passwordRequired),
  });
};

const registerSchema = (languageData: Record<string, string>) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(1, languageData.nameAtLeastOneCharacter)
      .required(languageData.nameRequired),
    email: yup
      .string()
      .matches(emailRegex, {
        message: languageData.emailErrorMessage,
      })
      .required(languageData.emailRequired),
    password: yup
      .string()
      .matches(passwordRegex, {
        message: languageData.passwordErrorMessage,
      })
      .required(languageData.passwordRequired),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], languageData.passwordMatch),
  });
};

export { loginSchema, registerSchema };
