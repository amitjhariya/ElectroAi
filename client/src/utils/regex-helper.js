import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/regex-constants';
export const validateEmail = (email) => {
  const re = EMAIL_REGEX;
  return re.test(email);
};

export const validatePassword = (value) => {
  const re = PASSWORD_REGEX;
  return re.test(value);
};
