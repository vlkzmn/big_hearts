/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import './Authorization.scss';
import { authService } from '../services/authService';

enum Form {
  login, registration, emailForRefreshPass, refreshPass, message, empty,
}

export const Authorization = () => {
  const { uid, token } = useParams();
  const [activeForm, setActiveForm] = useState<Form>(Form.empty);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('Виникла помилка');

  useEffect(() => {
    if (uid && token) {
      setActiveForm(Form.refreshPass);
    } else {
      setActiveForm(Form.login);
    }
  }, [uid, token]);

  const handleLogin = () => {
  };

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === password2 && password.length >= 8) {
      authService.register(email, password)
        .then(() => {
          setMessage('успішно');
          setEmail('');
          setPassword('');
          setPassword2('');
        })
        .catch(() => {
          setMessage('помилка');
        });
    } else {
      setActiveForm(Form.message);
      setMessage('Паролі не співпадають');
    }
  };

  const handleEmailForRefreshPass = () => {
    setMessage('');
  };

  const handleRefreshPass = () => {
    setMessage('');
  };

  return (
    <div className="authorization">
      {activeForm !== Form.refreshPass && activeForm !== Form.empty && (
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

            <div className="authorization__form">
              {message}
            </div>
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
