/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { localStorageService } from '../services/localStorageService';

import './UserProfile.scss';
import { AddNewPost } from '../components/AddNewPost';
import { MyPosts } from '../components/MyPosts';
import { MyProfile } from '../components/MyProfile';
import { authorizedService } from '../services/authorizedService';

enum Page {
  addNewPost, myPosts, myProfile,
}

export const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [page, setPage] = useState<Page>(Page.addNewPost);
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = localStorageService.getTokens();

    if (tokens?.access) {
      authorizedService.checkAuthorized()
        .then((data) => setEmail(data.email))
        .catch(() => navigate('/avtoryzatsiia'));
    } else {
      navigate('/avtoryzatsiia');
    }
    // if (tokens?.access) {
    //   authorizedService.verifyToken(tokens.access)
    //     .catch(() => navigate('/avtoryzatsiia'));
    // } else {
    //   navigate('/avtoryzatsiia');
    // }
  }, [navigate]);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <div className="user-profile__page">
          <div className="user-profile__left-side">
            <h1 className="user-profile__title">
              Кабінет
            </h1>

            <ul className="user-profile__menu">
              <li>
                <button
                  type="button"
                  className={cn(
                    'user-profile__menu-button',
                    { 'user-profile__menu-button--active': page === Page.addNewPost },
                  )}
                  onClick={() => setPage(Page.addNewPost)}
                >
                  Додати
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={cn(
                    'user-profile__menu-button',
                    { 'user-profile__menu-button--active': page === Page.myPosts },
                  )}
                  onClick={() => setPage(Page.myPosts)}
                >
                  Редагувати
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={cn(
                    'user-profile__menu-button',
                    { 'user-profile__menu-button--active': page === Page.myProfile },
                  )}
                  onClick={() => setPage(Page.myProfile)}
                >
                  Аккаунт
                </button>
              </li>
            </ul>
          </div>

          <div className="user-profile__content">
            {page === Page.addNewPost && (
              <AddNewPost />
            )}

            {page === Page.myPosts && (
              <MyPosts />
            )}

            {page === Page.myProfile && (
              <MyProfile currentEmail={email} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
