/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { localStorageService } from '../utils/localStorageService';

import './UserProfile.scss';
import { AddNewPost } from '../components/AddNewPost';
import { MyPosts } from '../components/MyPosts';
import { MyProfile } from '../components/MyProfile';

enum Page {
  addNewPost, myPosts, myProfile, exit,
}

export const UserProfile = () => {
  // const [isAuth, setIsAuth] = useState(true);
  const [page, setPage] = useState<Page>(Page.addNewPost);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorageService.getTokens()) {
      navigate('/avtoryzatsiia');
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (!localStorage.getItem('big_hearts_tokens')) {
  //     navigate('/avtoryzatsiia');
  //   }
  // }, [navigate]);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        {/* {!isAuth ? (
          <Navigate to="/avtoryzatsiia" />
        ) : ( */}
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
                  Мої данні
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={cn(
                    'user-profile__menu-button',
                    { 'user-profile__menu-button--active': page === Page.exit },
                  )}
                  onClick={() => setPage(Page.exit)}
                >
                  Вийти
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
              <MyProfile />
            )}

            {page === Page.exit && (
              <MyProfile />
            )}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
