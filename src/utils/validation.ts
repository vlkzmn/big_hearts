/* eslint-disable max-len */
export const phoneValidate = (phoneNumber: string) => {
  const phoneRegex = /^(\+?\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;

  return phoneRegex.test(phoneNumber);
};

export const emailValidate = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const telegramValidate = (phoneNumber: string) => {
  const telegramRegex = /^\+\d{9,12}$/;

  return telegramRegex.test(phoneNumber);
};

export const passwordValidate = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return passwordRegex.test(password);
};
