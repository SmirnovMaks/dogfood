export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const PASSWORD_REGEXP = /[\w]{8,}/;

export const PHRASES = {
  incorrectEmail: 'Введите корректный email формата email@email.com',
  incorrectPassword: 'Пароль должен содержать минимум 8 символов',
  required: 'Обязательное поле'
};
