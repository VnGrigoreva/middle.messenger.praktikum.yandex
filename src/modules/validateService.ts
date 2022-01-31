export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  return !!email.match(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i);
};

export const validatePassword = (password: string): boolean => {
  const isUpper = !!password.match(/[A-Z]/);
  const isNumber = !!password.match(/[0-9]/);
  return password.length >= 8 && password.length<=40 && isUpper && isNumber;
};

export const validatePhone = (phone: string): boolean => {
  const isNumber = !!phone.match(/(?\+[0-9])/);
  return phone.length >= 10 && phone.length <= 15 && isNumber;
};
