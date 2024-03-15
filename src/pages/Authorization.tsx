/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import './Authorization.scss';

import { httpService } from '../services/httpService';
import { emailValidate, passwordValidate } from '../utils/validation';
import { Loading } from '../components/Loading';

enum Form {
  login, registration, emailForRefreshPass, refreshPass, empty,
}

export const Authorization = () => {
  const { uid, token } = useParams();
  const [activeForm, setActiveForm] = useState<Form>(Form.empty);
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordsNotSame, setIsPasswordsNotSame] = useState(false);
  const [isPasswordsNotCorrect, setIsPasswordsNotCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (uid && token) {
      setActiveForm(Form.refreshPass);
    } else {
      setActiveForm(Form.login);
    }
  }, [uid, token]);

  const handleActiveForm = (form: Form) => {
    setPassword('');
    setPassword2('');
    setMessage('');
    setHasEmailError(false);
    setIsPasswordsNotCorrect(false);
    setIsPasswordsNotSame(false);
    setActiveForm(form);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordsNotCorrect(false);
    setIsPasswordsNotSame(false);
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordsNotCorrect(false);
    setIsPasswordsNotSame(false);
    setPassword2(event.target.value);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!emailValidate(email)) {
      setHasEmailError(true);
    }

    if (!passwordValidate(password)) {
      setIsPasswordsNotCorrect(true);
    }

    if (passwordValidate(password) && emailValidate(email)) {
      setIsLoading(true);

      httpService.login(email, password)
        .then((data) => {
          setEmail('');
          setPassword('');
          navigate('/oblikovyi-zapys');
          localStorage.setItem('big_hearts_tokens', JSON.stringify(data));
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessage('Невірний email чи пароль');
          } else {
            setMessage('Виникла помилка, спробуйте пізніше');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!emailValidate(email)) {
      setHasEmailError(true);
    }

    if (password !== password2) {
      setIsPasswordsNotSame(true);
    }

    if (!passwordValidate(password)) {
      setIsPasswordsNotCorrect(true);
    }

    if (password === password2 && passwordValidate(password) && emailValidate(email)) {
      setIsLoading(true);

      httpService.register(email, password)
        .then(() => {
          setMessage('Успішно, перевірте свою пошту');
          setEmail('');
          setPassword('');
          setPassword2('');
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessage('Користувач з таким email вже існує');
          } else {
            setMessage('Виникла помилка, спробуйте пізніше');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleEmailForRefreshPass = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!emailValidate(email)) {
      setHasEmailError(true);
    } else {
      setIsLoading(true);

      httpService.resetPassword(email)
        .then(() => {
          setEmail('');
          setMessage('Успішно, перевірте свою пошту');
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessage('Користувач не знайден');
          } else {
            setMessage('Виникла помилка, спробуйте пізніше');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleRefreshPass = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (password !== password2) {
      setIsPasswordsNotSame(true);
    }

    if (!passwordValidate(password)) {
      setIsPasswordsNotCorrect(true);
    }

    if (password === password2 && passwordValidate(password) && uid && token) {
      setIsLoading(true);

      httpService.resetPasswordConfirm(uid, token, password)
        .then(() => {
          setPassword('');
          setPassword2('');
          setMessage('Успішно, через 5 секунд ви будите переадресовані на сторінку авторизації');
          setTimeout(() => {
            navigate('/avtoryzatsiia');
            setMessage('');
          }, 5000);
        })
        .catch(() => {
          setMessage('Виникла помилка, спробуйте пізніше');
        })
        .finally(() => setIsLoading(false));
    }
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
            Якщо у вас ще немає облікового запису, натисніть &quot;Реєстрація&quot;, введіть свій e-mail та пароль два рази і натисніть &quot;Зареєструватись&quot;, після чого ві отримаєте листа на вашу пошту з посиланням на підтвердження реєстрації, перейдіть за цим посиланням, дочекайтесь активації і потім авторизуйтесь щоб потрапити в свій новий обліковий запис.
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
              onClick={() => handleActiveForm(Form.login)}
            >
              Вхід
            </button>

            <button
              type="button"
              className={cn(
                'authorization__button',
                { 'authorization__button--active': activeForm === Form.registration },
              )}
              onClick={() => handleActiveForm(Form.registration)}
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
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': hasEmailError },
                )}
                value={email}
                onChange={handleEmailChange}
              />

              {hasEmailError && (
                <p className="authorization__input-error">
                  Введіть коректний email
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="authorization__input-label">
                Введіть пароль:
              </label>

              <input
                id="password"
                type="password"
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': isPasswordsNotCorrect },
                )}
                value={password}
                onChange={handlePasswordChange}
              />

              {isPasswordsNotCorrect && (
                <p className="authorization__input-error">
                  Введіть коректний пароль
                </p>
              )}
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
              onClick={() => {
                setMessage('');
                setHasEmailError(false);
                setActiveForm(Form.emailForRefreshPass);
              }}
            >
              Забули пароль?
            </button>

            {message && (
              <p className="authorization__message">
                {message}
              </p>
            )}

            {isLoading && (
              <div className="authorization__loading">
                <Loading />
              </div>
            )}
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
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': hasEmailError },
                )}
                value={email}
                onChange={handleEmailChange}
              />

              {hasEmailError && (
                <p className="authorization__input-error">
                  Введіть коректний email
                </p>
              )}
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Підтвердити
            </button>

            {message && (
              <p className="authorization__message">
                {message}
              </p>
            )}

            {isLoading && (
              <div className="authorization__loading">
                <Loading />
              </div>
            )}
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
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': hasEmailError },
                )}
                value={email}
                onChange={handleEmailChange}
              />

              {hasEmailError && (
                <p className="authorization__input-error">
                  Введіть коректний email
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="authorization__input-label">
                Введіть пароль:
              </label>

              <input
                id="password"
                type="password"
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': isPasswordsNotCorrect || isPasswordsNotSame },
                )}
                value={password}
                onChange={handlePasswordChange}
              />

              <span className="authorization__input-label-password">
                Пароль має бути не менше 8 символів і містити латинські літери та цифри
              </span>
            </div>

            <div>
              <label htmlFor="password2" className="authorization__input-label">
                Введіть пароль ще раз:
              </label>

              <input
                id="password2"
                type="password"
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': isPasswordsNotCorrect || isPasswordsNotSame },
                )}
                value={password2}
                onChange={handlePassword2Change}
              />

              {isPasswordsNotSame && (
                <p className="authorization__input-error">
                  Паролі не співпадають
                </p>
              )}

              {isPasswordsNotCorrect && (
                <p className="authorization__input-error">
                  Введіть пароль згідно рекомендаціям
                </p>
              )}
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Зареєструватись
            </button>

            {message && (
              <p className="authorization__message">
                {message}
              </p>
            )}

            {isLoading && (
              <div className="authorization__loading">
                <Loading />
              </div>
            )}
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
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': isPasswordsNotCorrect || isPasswordsNotSame },
                )}
                value={password}
                onChange={handlePasswordChange}
              />

              <span className="authorization__input-label-password">
                Пароль має бути не менше 8 символів і містити латинські літери та цифри
              </span>
            </div>

            <div>
              <label htmlFor="password2" className="authorization__input-label">
                Введіть новий пароль ще раз:
              </label>

              <input
                id="password2"
                type="password"
                className={cn(
                  'authorization__input',
                  { 'authorization__input--error': isPasswordsNotCorrect || isPasswordsNotSame },
                )}
                value={password2}
                onChange={handlePassword2Change}
              />

              {isPasswordsNotSame && (
                <p className="authorization__input-error">
                  Паролі не співпадають
                </p>
              )}

              {isPasswordsNotCorrect && (
                <p className="authorization__input-error">
                  Введіть пароль згідно рекомендаціям
                </p>
              )}
            </div>

            <button
              type="submit"
              className="authorization__button authorization__button--active"
            >
              Оновити пароль
            </button>

            {message && (
              <p className="authorization__message">
                {message}
              </p>
            )}

            {isLoading && (
              <div className="authorization__loading">
                <Loading />
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
