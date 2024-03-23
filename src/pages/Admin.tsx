/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Admin.scss';

import { Moderation } from '../components/Moderation';
import { AddCategory } from '../components/AddCategory';
import { Loading } from '../components/Loading';
import { localStorageService } from '../services/localStorageService';
import { authorizedService } from '../services/authorizedService';

enum Page {
  moderation,
  addCategory,
}

export const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<Page>(Page.moderation);
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = localStorageService.getTokens();

    if (tokens?.access) {
      authorizedService.checkAuthorized()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => navigate('/avtoryzatsiia'));
    } else {
      navigate('/avtoryzatsiia');
    }
  }, [navigate]);

  return (
    <div className="admin">
      <div className="admin__container">
        <div className="admin__page">
          <div className="admin__left-side">
            <ul className="admin__menu">
              <li>
                <button
                  type="button"
                  className={cn('admin__menu-button', {
                    'admin__menu-button--active': page === Page.moderation,
                  })}
                  onClick={() => setPage(Page.moderation)}
                >
                  Модерація
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={cn('admin__menu-button', {
                    'admin__menu-button--active': page === Page.addCategory,
                  })}
                  onClick={() => setPage(Page.addCategory)}
                >
                  Категорії
                </button>
              </li>
            </ul>
          </div>

          <div className="admin__content">
            {isLoading ? (
              <div className="user-profile__loading">
                <Loading />
              </div>
            ) : (
              <>
                {page === Page.moderation && <Moderation />}

                {page === Page.addCategory && <AddCategory />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
