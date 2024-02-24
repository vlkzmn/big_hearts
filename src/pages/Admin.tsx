/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './Admin.scss';
import { Navigate } from 'react-router-dom';
import cn from 'classnames';
import { Moderation } from '../components/Moderation';
import { AddCategory } from '../components/AddCategory';

enum Page {
  moderation, addCategory,
}

export const Admin = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [page, setPage] = useState<Page>(Page.moderation);

  useEffect(() => {
    if (localStorage.getItem('big_hearts_admin_token')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        {!isAuth ? (
          <Navigate to="/avtoryzatsiia" />
        ) : (
          <div className="user-profile__page">
            <div className="user-profile__left-side">
              <ul className="user-profile__menu">
                <li>
                  <button
                    type="button"
                    className={cn(
                      'user-profile__menu-button',
                      { 'user-profile__menu-button--active': page === Page.moderation },
                    )}
                    onClick={() => setPage(Page.moderation)}
                  >
                    Модерація
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className={cn(
                      'user-profile__menu-button',
                      { 'user-profile__menu-button--active': page === Page.addCategory },
                    )}
                    onClick={() => setPage(Page.addCategory)}
                  >
                    Категорії
                  </button>
                </li>
              </ul>
            </div>

            <div className="user-profile__content">
              {page === Page.moderation && (
                <Moderation />
              )}

              {page === Page.addCategory && (
                <AddCategory />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
