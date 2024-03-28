import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Moderation.scss';

import { ModerationPostData } from '../types/postData';
import { localStorageService } from '../services/localStorageService';
import { authorizedService } from '../services/authorizedService';
import { Loading } from '../components/Loading';

enum Page {
  moderation,
}

export const Moderation = () => {
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
                setMessage(
                  'Виникла помилка завантаження даних, спробуйте пізніше',
                );
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
    <div className="moderation">
      <div className="moderation__container">
        <div className="moderation__page">
          <div className="moderation__left-side">
            <ul className="moderation__menu">
              <li>
                <button
                  type="button"
                  className={cn('moderation__menu-button', {
                    'moderation__menu-button--active': page === Page.moderation,
                  })}
                  onClick={() => setPage(Page.moderation)}
                >
                  Модерація
                </button>
              </li>
            </ul>
          </div>

          <div className="moderation__content">
            {isLoading ? (
              <div className="moderation__loading">
                <Loading />
              </div>
            ) : (
              <>
                {posts.length > 0
                  ? posts.map(item => (
                    <div className="moderation__post" key={item.id}>
                      <div className="moderation__wrapper">
                        <img
                          src={item.image || 'img/placeholder.png'}
                          className="moderation__image"
                          alt={item.title}
                        />

                        <div className="moderation__text-content">
                          <h3 className="moderation__title">
                            {item.title}
                          </h3>

                          <p className="moderation__item">
                            {item.type}
                          </p>

                          <p className="moderation__item">
                            {item.category}
                          </p>

                          {item.link && item.link.split('|').map(url => (
                            <a
                              href={url}
                              className="moderation__link"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {url}
                            </a>
                          ))}

                          <p className="moderation__item">
                            {item.person}
                          </p>

                          <p className="moderation__item">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      <p className="moderation__text">
                        {item.text}
                      </p>

                      <div className="moderation__buttons">
                        <button
                          type="button"
                          className="moderation__button"
                          onClick={() => handleAprove(item.id)}
                        >
                          Погодити
                        </button>

                        <button
                          type="button"
                          className="moderation__button"
                          onClick={() => handleReject(item.id)}
                        >
                          Відхилити
                        </button>
                      </div>
                    </div>
                  ))
                  : !message && (
                    <p className="moderation__loading">
                      Немає нових оголошень
                    </p>
                  )}

                <div className="moderation__loading">
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
