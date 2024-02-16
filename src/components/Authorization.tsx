/* eslint-disable max-len */
import { useState } from 'react';
import './Authorization.scss';
import cn from 'classnames';

export const Authorization = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          >
            <label className="authorization__input-label">
              Введіть e-mail:
              <input type="text" className="authorization__input" />
            </label>

            <label className="authorization__input-label">
              Введіть пароль:
              <input type="password" className="authorization__input" />
            </label>

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
          >
            <label className="authorization__input-label">
              Введіть e-mail:
              <input type="text" className="authorization__input" />
            </label>

            <label className="authorization__input-label">
              Введіть пароль:
              <input type="password" className="authorization__input" />
            </label>

            <label className="authorization__input-label">
              Введіть пароль ще раз:
              <input type="password" className="authorization__input" />
            </label>

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
