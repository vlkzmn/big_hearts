/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import cn from 'classnames';

import './Admin.scss';

import { Moderation } from '../components/Moderation';
import { AddCategory } from '../components/AddCategory';

enum Page { moderation, addCategory }

export const Admin = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [page, setPage] = useState<Page>(Page.moderation);

  useEffect(() => {
    if (localStorage.getItem('big_hearts_admin_token')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className="admin">
      <div className="admin__container">
        {!isAuth ? (
          <Navigate to="/avtoryzatsiia" />
        ) : (
          <div className="admin__page">
            <div className="admin__left-side">
              <ul className="admin__menu">
                <li>
                  <button
                    type="button"
                    className={cn(
                      'admin__menu-button',
                      { 'admin__menu-button--active': page === Page.moderation },
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
                      'admin__menu-button',
                      { 'admin__menu-button--active': page === Page.addCategory },
                    )}
                    onClick={() => setPage(Page.addCategory)}
                  >
                    Категорії
                  </button>
                </li>
              </ul>
            </div>

            <div className="admin__content">
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
