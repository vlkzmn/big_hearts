/* eslint-disable max-len */
import { useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import './MyProfile.scss';

import { emailValidate, passwordValidate } from '../utils/validation';
import { localStorageService } from '../services/localStorageService';
import { authorizedService } from '../services/authorizedService';
import { Loading } from './Loading';
import { Delimiter } from './Delimiter';

type Props = {
  currentEmail: string;
};

export const MyProfile:React.FC<Props> = ({ currentEmail }) => {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [passwordForEmail, setPasswordForEmail] = useState('');
  const [
    isEmailPasswordsNotCorrect,
    setIsEmailPasswordsNotCorrect,
  ] = useState(false);
  const [messageChangeEmail, setMessageChangeEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [
    isCurrentPasswordsNotCorrect,
    setIsCurrentPasswordsNotCorrect,
  ] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordsNotSame, setIsPasswordsNotSame] = useState(false);
  const [isPasswordsNotCorrect, setIsPasswordsNotCorrect] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const [passwordForDelete, setPasswordForDelete] = useState('');
  const [
    isDeletePasswordsNotCorrect,
    setIsDeletePasswordsNotCorrect,
  ] = useState(false);
  const [isLoadingDeleteProfile, setIsLoadingDeleteProfile] = useState(false);
  const [messageDeleteProfile, setMessageDeleteProfile] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setEmail(event.target.value);
  };

  const handlePasswordForEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsEmailPasswordsNotCorrect(false);
    setPasswordForEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsCurrentPasswordsNotCorrect(false);
    setCurrentPassword(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordsNotCorrect(false);
    setIsPasswordsNotSame(false);
    setPassword(event.target.value);
  };

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsPasswordsNotCorrect(false);
    setIsPasswordsNotSame(false);
    setPassword2(event.target.value);
  };

  const handlePasswordForDeleteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsDeletePasswordsNotCorrect(false);
    setPasswordForDelete(event.target.value);
  };

  const handleChangeCurrentEmail = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setMessageChangeEmail('');

    if (!emailValidate(email)) {
      setHasEmailError(true);
    }

    if (!passwordValidate(passwordForEmail)) {
      setIsEmailPasswordsNotCorrect(true);
    }

    if (emailValidate(email) && passwordValidate(passwordForEmail)) {
      setIsLoadingEmail(true);

      authorizedService.changeEmail(passwordForEmail, email)
        .then(() => {
          setEmail('');
          setPasswordForEmail('');
          setMessageChangeEmail(
            'Успішно, зараз ви будите переадресовані на сторінку авторизації',
          );
          setTimeout(() => {
            localStorageService.removeTokens();
            setMessageChangeEmail('');
            navigate('/avtoryzatsiia');
          }, 5000);
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessageChangeEmail(
              'Користувач з таким email вже існує чи пароль не вірний',
            );
          } else {
            setMessageChangeEmail('Виникла помилка, спробуйте пізніше');
          }
        })
        .finally(() => setIsLoadingEmail(false));
    }
  };

  const handleChangeCurrentPassword = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setMessage('');

    if (password !== password2) {
      setIsPasswordsNotSame(true);
    }

    if (!passwordValidate(currentPassword)) {
      setIsCurrentPasswordsNotCorrect(true);
    }

    if (!passwordValidate(password)) {
      setIsPasswordsNotCorrect(true);
    }

    if (password === password2
      && passwordValidate(currentPassword)
      && passwordValidate(password)) {
      setIsLoadingPassword(true);

      authorizedService.changePassword(password, currentPassword)
        .then(() => {
          setPassword('');
          setPassword2('');
          setCurrentPassword('');
          setMessage(
            'Успішно, зараз ви будите переадресовані на сторінку авторизації',
          );
          setTimeout(() => {
            localStorageService.removeTokens();
            setMessage('');
            navigate('/avtoryzatsiia');
          }, 5000);
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessage('Не вірний поточний пароль');
          } else {
            setMessage('Виникла помилка, спробуйте пізніше');
          }
        })
        .finally(() => setIsLoadingPassword(false));
    }
  };

  const handleDeleteProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageDeleteProfile('');

    if (!passwordValidate(passwordForDelete)) {
      setIsDeletePasswordsNotCorrect(true);
    } else {
      setIsLoadingDeleteProfile(true);

      authorizedService.deleteProfile(passwordForDelete)
        .then(() => {
          localStorageService.removeTokens();
          setMessageDeleteProfile(
            'Успішно, зараз ви будите переадресовані на головну сторінку',
          );
          setTimeout(() => {
            setMessageDeleteProfile('');
            navigate('/');
          }, 5000);
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessageDeleteProfile(
              'Пароль не співдає з тим що ви вказали при реєстрації',
            );
          } else {
            setMessageDeleteProfile('Виникла помилка, спробуйте пізніше');
          }
        })
        .finally(() => {
          setIsLoadingDeleteProfile(false);
        });
    }
  };

  const handleExitFromProfile = () => {
    localStorageService.removeTokens();
    navigate('/');
  };

  return (
    <div className="my-profile">
      <h2 className="my-profile__title">
        Мій акаунт
      </h2>

      <div className="my-profile__box">
        <h3 className="my-profile__sub-title">
          Змінити e-mail
        </h3>

        <p className="my-profile__text">
          Поточний email: &nbsp;&nbsp;
          <b>
            {currentEmail}
          </b>
        </p>

        <form
          className="my-profile__form"
          onSubmit={handleChangeCurrentEmail}
        >
          <div>
            <label
              htmlFor="passwordForChangeEmail"
              className="my-profile__input-label"
            >
              Введіть поточний пароль:
            </label>

            <input
              id="passwordForChangeEmail"
              type="password"
              className={cn(
                'my-profile__input',
                { 'my-profile__input--error': isEmailPasswordsNotCorrect },
              )}
              value={passwordForEmail}
              onChange={handlePasswordForEmailChange}
            />

            {(isEmailPasswordsNotCorrect) && (
              <p className="my-profile__input-error">
                Не схоже на коректний пароль
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="my-profile__input-label">
              Введіть новий e-mail, натисніть &quot;Підтвердити&quot;, пройдіть авторизацію з новим email:
            </label>

            <input
              id="email"
              type="text"
              className={cn(
                'my-profile__input',
                { 'my-profile__input--error': hasEmailError },
              )}
              value={email}
              onChange={handleEmailChange}
            />

            {hasEmailError && (
              <p className="my-profile__input-error">
                Введіть коректний email
              </p>
            )}
          </div>

          <button
            type="submit"
            className="my-profile__button"
          >
            Підтвердити
          </button>

          {messageChangeEmail && (
            <p className="my-profile__message">
              {messageChangeEmail}
            </p>
          )}

          {isLoadingEmail && (
            <div className="my-profile__loading">
              <Loading />
            </div>
          )}
        </form>
      </div>

      <Delimiter />

      <div className="my-profile__box">
        <h3 className="my-profile__sub-title">
          Змінити пароль
        </h3>

        <form
          className="my-profile__form"
          onSubmit={handleChangeCurrentPassword}
        >
          <input hidden type="text" autoComplete="username" />

          <div>
            <label
              htmlFor="currentPassword"
              className="my-profile__input-label"
            >
              Введіть поточний пароль:
            </label>

            <input
              id="currentPassword"
              type="password"
              className={cn(
                'my-profile__input',
                { 'my-profile__input--error': isCurrentPasswordsNotCorrect },
              )}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="my-profile__input-label">
              Введіть новий пароль:
            </label>

            <input
              id="password"
              type="password"
              className={cn(
                'my-profile__input',
                {
                  'my-profile__input--error':
                isPasswordsNotCorrect || isPasswordsNotSame,
                },
              )}
              value={password}
              onChange={handlePasswordChange}
            />

            <span className="my-profile__input-label-password">
              Пароль має бути не менше 8 символів і містити латинські літери та цифри
            </span>
          </div>

          <div>
            <label htmlFor="password2" className="my-profile__input-label">
              Введіть новий пароль ще раз:
            </label>

            <input
              id="password2"
              type="password"
              className={cn(
                'my-profile__input',
                {
                  'my-profile__input--error':
                isPasswordsNotCorrect || isPasswordsNotSame,
                },
              )}
              value={password2}
              onChange={handlePassword2Change}
            />

            {isPasswordsNotSame && (
              <p className="my-profile__input-error">
                Паролі не співпадають
              </p>
            )}

            {(isPasswordsNotCorrect || isCurrentPasswordsNotCorrect) && (
              <p className="my-profile__input-error">
                Введіть пароль згідно рекомендаціям
              </p>
            )}
          </div>

          <button
            type="submit"
            className="my-profile__button"
          >
            Підтвердити
          </button>

          {message && (
            <p className="my-profile__message">
              {message}
            </p>
          )}

          {isLoadingPassword && (
            <div className="my-profile__loading">
              <Loading />
            </div>
          )}
        </form>
      </div>

      <Delimiter />

      <div className="my-profile__box">
        <h3 className="my-profile__sub-title">
          Видалити аккаунт
        </h3>

        <p className="my-profile__text">
          Ця дія призведе до видалення вашого аккаунта та всіх ваших оголошень, відновити ці дані буде не можливо.
        </p>

        <form
          className="my-profile__form"
          onSubmit={handleDeleteProfile}
        >
          <input hidden type="text" autoComplete="username" />

          <div>
            <label
              htmlFor="passwordForDelete"
              className="my-profile__input-label"
            >
              Введіть поточний пароль:
            </label>

            <input
              id="passwordForDelete"
              type="password"
              className={cn(
                'my-profile__input',
                { 'my-profile__input--error': isDeletePasswordsNotCorrect },
              )}
              value={passwordForDelete}
              onChange={handlePasswordForDeleteChange}
            />

            {(isDeletePasswordsNotCorrect) && (
              <p className="my-profile__input-error">
                Не схоже на коректний пароль
              </p>
            )}
          </div>

          <button
            type="submit"
            className="my-profile__button"
          >
            Видалити аккаунт
          </button>

          {messageDeleteProfile && (
            <p className="my-profile__message">
              {messageDeleteProfile}
            </p>
          )}

          {isLoadingDeleteProfile && (
            <div className="my-profile__loading">
              <Loading />
            </div>
          )}
        </form>
      </div>

      <Delimiter />

      <div className="my-profile__box">
        <h3 className="my-profile__sub-title">
          Вийти з аккаунту
        </h3>

        <p className="my-profile__text">
          Натисніть &quot;Вийти&quot;, після чого ви будете перенаправлені на головну сторінку.
        </p>

        <button
          type="button"
          className="my-profile__button"
          onClick={handleExitFromProfile}
        >
          Вийти
        </button>
      </div>
    </div>
  );
};
