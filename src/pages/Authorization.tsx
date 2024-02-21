/* eslint-disable max-len */
import { useState } from 'react';
import cn from 'classnames';

import './Authorization.scss';

enum Form {
  login, registration, emailForRefreshPass, refreshPass, message,
}

export const Authorization = () => {
  const [activeForm, setActiveForm] = useState<Form>(Form.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('Виникла помилка');

  const handleLogin = () => {
  };

  const handleRegistration = () => {
  };

  const handleEmailForRefreshPass = () => {
    setMessage('');
  };

  const handleRefreshPass = () => {
    setMessage('');
  };

  return (
    <div className="authorization">
      {activeForm !== Form.refreshPass && (
        <div className="authorization__content">
          <div className="authorization__content-subtitle">
            вхід в кабінет
          </div>

          <div className="authorization__content-title">
            Керування оголошеннями
          </div>

          <p className="authorization__content-text">
            Для того щоб додати нове чи змінити існуюче оголошеня потрібно увійти у свій обліковий запис.
          </p>

          <p className="authorization__content-text">
            Якщо у вас ще немає облікового запису, натисніть &quot;Реєстрація&quot;, введіть свій e-mail та пароль два рази і натисніть &quot;Зареєструватись&quot;, після чого ві отримаєте листа на вашу пошту з посиланням на підтвердження реєстрації, перейдіть за цим посиланням в свій новий обліковий запис.
          </p>
        </div>
      )}

      <div className="authorization__forms">
        {activeForm !== Form.refreshPass && (
          <div className="authorization__switcher">
            <button
              type="button"
              className={cn(
                'authorization__button',
                { 'authorization__button--active': activeForm === Form.login },
              )}
              onClick={() => setActiveForm(Form.login)}
            >
              Вхід
            </button>

            <button
              type="button"
              className={cn(
                'authorization__button',
                { 'authorization__button--active': activeForm === Form.registration },
              )}
              onClick={() => setActiveForm(Form.registration)}
            >
              Реєстрація
            </button>
          </div>
        )}

        {activeForm === Form.login && (
          <form
            className="authorization__form"
            onSubmit={handleLogin}
          >
            <div>
              <label htmlFor="email" className="authorization__input-label">
                Введіть e-mail:
              </label>

              <input
                id="email"
                type="text"
                className="authorization__input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="authorization__input-label">
                Введіть пароль:
              </label>

              <input
                id="password"
                type="password"
                className="authorization__input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Увійти
            </button>

            <button
              type="button"
              className="authorization__button authorization__button--refresh"
              onClick={() => setActiveForm(Form.emailForRefreshPass)}
            >
              Забули пароль?
            </button>
          </form>
        )}

        {activeForm === Form.emailForRefreshPass && (
          <form
            className="authorization__form"
            onSubmit={handleEmailForRefreshPass}
          >
            <div>
              <label htmlFor="email" className="authorization__input-label authorization__input-label--refresh">
                Введіть e-mail, натисніть &quot;Підтвердити&quot;, перевірте свою пошту та перейдіть за посиланням щоб відновити пароль:
              </label>

              <input
                id="email"
                type="text"
                className="authorization__input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Підтвердити
            </button>
          </form>
        )}

        {activeForm === Form.registration && (
          <form
            className="authorization__form"
            onSubmit={handleRegistration}
          >
            <div>
              <label htmlFor="email" className="authorization__input-label">
                Введіть e-mail:
              </label>

              <input
                id="email"
                type="text"
                className="authorization__input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="authorization__input-label">
                Введіть пароль:
              </label>

              <input
                id="password"
                type="password"
                className="authorization__input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password2" className="authorization__input-label">
                Введіть пароль ще раз:
              </label>

              <input
                id="password2"
                type="password"
                className="authorization__input"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Зареєструватись
            </button>
          </form>
        )}

        {activeForm === Form.refreshPass && (
          <form
            className="authorization__form"
            onSubmit={handleRefreshPass}
          >
            <div>
              <label htmlFor="password" className="authorization__input-label">
                Введіть новий пароль:
              </label>

              <input
                id="password"
                type="password"
                className="authorization__input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password2" className="authorization__input-label">
                Введіть новий пароль ще раз:
              </label>

              <input
                id="password2"
                type="password"
                className="authorization__input"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Оновити пароль
            </button>
          </form>
        )}

        {activeForm === Form.message && (
          <div className="authorization__form">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
