/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Admin.scss';

import { Loading } from '../components/Loading';
import { localStorageService } from '../services/localStorageService';
import { authorizedService } from '../services/authorizedService';
import { ModerationPostData } from '../types/postData';

enum Page {
  moderation,
}

export const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<Page>(Page.moderation);
  const [posts, setPosts] = useState<ModerationPostData[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = localStorageService.getTokens();

    if (tokens?.access) {
      authorizedService.checkAuthorized()
        .then(() => {
          authorizedService.getNewAddedPosts()
            .then((data) => {
              setPosts(data);
            })
            .catch((error) => {
              if (error.response.status === 403) {
                setMessage('У вас немає прав доступа до цієї сторінки');
                setTimeout(() => {
                  navigate('/');
                }, 3000);
              } else {
                setMessage('Виникла помилка завантаження даних, спробуйте пізніше');
              }
            })
            .finally(() => setIsLoading(false));
        })
        .catch(() => navigate('/avtoryzatsiia'));
    } else {
      navigate('/avtoryzatsiia');
    }
  }, [navigate]);

  const handleAprove = (id: number) => {
    const formData = new FormData();

    formData.append('status', 'Active');

    authorizedService
      .editPost(id, formData)
      .then(() => {
        setPosts(current => current.filter(post => post.id !== id));
      })
      .catch(() => setMessage(
        'Виникли проблеми зі збереженням оголошення, спробуйте пізніше',
      ));
  };

  const handleReject = (id: number) => {
    const formData = new FormData();

    formData.append('status', 'Rejected');

    authorizedService
      .editPost(id, formData)
      .then(() => {
        setPosts(current => current.filter(post => post.id !== id));
      })
      .catch(() => setMessage(
        'Виникли проблеми зі збереженням оголошення, спробуйте пізніше',
      ));
  };

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
            </ul>
          </div>

          <div className="admin__content">
            {isLoading ? (
              <div className="admin__loading">
                <Loading />
              </div>
            ) : (
              <>
                {posts.length > 0
                  ? posts.map(item => (
                    <div className="admin__post" key={item.id}>
                      <div className="admin__wrapper">
                        <img src={item.image || 'img/placeholder.png'} className="admin__image" alt={item.title} />

                        <div className="admin__text-content">
                          <h3 className="admin__title">
                            {item.title}
                          </h3>

                          <p className="admin__item">
                            {item.type}
                          </p>

                          <p className="admin__item">
                            {item.category}
                          </p>

                          {item.link.split('|').map(url => (
                            <a href={url} className="admin__link" target="_blank" rel="noreferrer">
                              {url}
                            </a>
                          ))}

                          <p className="admin__item">
                            {item.person}
                          </p>

                          <p className="admin__item">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      <p className="admin__text">
                        {item.text}
                      </p>

                      <div className="admin__buttons">
                        <button
                          type="button"
                          className="admin__button"
                          onClick={() => handleAprove(item.id)}
                        >
                          Погодити
                        </button>

                        <button
                          type="button"
                          className="admin__button"
                          onClick={() => handleReject(item.id)}
                        >
                          Відхилити
                        </button>
                      </div>
                    </div>
                  ))
                  : !message && (
                    <p className="admin__loading">
                      Немає нових оголошень
                    </p>
                  )}

                <div className="admin__loading">
                  {message}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
