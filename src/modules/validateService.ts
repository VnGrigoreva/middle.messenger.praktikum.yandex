export const validateEmail = (email: string): string | undefined => {
  // eslint-disable-next-line no-useless-escape
  return email.match(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)
    ? undefined
    : 'Email должен быть введен латиницей, должен содержать символ @ и точку.';
};

export const validatePassword = (password: string): string | undefined => {
  const isUpper = !!password.match(/[A-Z]/);
  const isNumber = !!password.match(/[0-9]/);
  return password.length >= 8 && password.length <= 40 && isUpper && isNumber
    ? undefined
    : 'Пароль должен содержать от 8 до 40 символов, заглавную букву и цифру';
};

export const comparePasswords = (
  password: string,
  newPassword: string
): string | undefined => {
  return password === newPassword ? undefined : 'Пароли не совпадают';
};

export const validatePhone = (phone: string): string | undefined => {
  const isNumber = !!phone.match(/(\+?[0-9])/);
  return phone.length >= 10 && phone.length <= 15 && isNumber
    ? undefined
    : 'Телефон должен содержать от 10 до 15 цифр, может начинается с плюса';
};

export const validateMessage = (message: string): string | undefined => {
  return message ? undefined : 'Введите сообщение';
};

export const validateLogin = (login: string): string | undefined => {
  return login.match(/^[\w-]{3,20}$/) && isNaN(+login)
    ? undefined
    : 'Логин должен быть введен латиницей, может содержать цифры, дефис или нижнее подчёркивание)';
};

export const validateUserName = (name: string): string | undefined => {
  return name.match(/^[A-ZА-Я]{1}[a-zа-я]*$/)
    ? undefined
    : 'Значение должно быть введено латиницей или кириллицей без пробелов и без цифр, первая буква должна быть заглавной';
};
