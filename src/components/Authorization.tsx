/* eslint-disable max-len */
import React, { useState } from 'react';
import './Authorization.scss';
import cn from 'classnames';

type Props = {
  handleGetAccess: () => void;
};

export const Authorization:React.FC<Props> = ({ handleGetAccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleLogin = () => {
    handleGetAccess();
  };

  const handleRegistration = () => {
    handleGetAccess();
  };

  return (
    <div className="authorization">
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

      <div className="authorization__forms">
        <div className="authorization__switcher">
          <button
            type="button"
            className={cn(
              'authorization__button',
              { 'authorization__button--active': isLogin },
            )}
            onClick={() => setIsLogin(true)}
          >
            Вхід
          </button>

          <button
            type="button"
            className={cn(
              'authorization__button',
              { 'authorization__button--active': !isLogin },
            )}
            onClick={() => setIsLogin(false)}
          >
            Реєстрація
          </button>
        </div>

        {isLogin ? (
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
          </form>
        ) : (
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
      </div>
    </div>
  );
};
