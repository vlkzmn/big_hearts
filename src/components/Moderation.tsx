/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './Moderation.scss';
import { authorizedService } from '../services/authorizedService';
import { Loading } from './Loading';
import { ModerationPostData } from '../types/postData';

export const Moderation = () => {
  const [posts, setPosts] = useState<ModerationPostData[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authorizedService.getNewAddedPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch(() => setMessage('error'))
      .finally(() => setIsLoading(false));
  }, []);

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
      {isLoading ? (
        <div className="user-profile__loading">
          <Loading />
        </div>
      ) : (
        <>
          {posts.length > 0
            ? posts.map(item => (
              <div className="moderation__post" key={item.id}>
                <div className="moderation__content">
                  <img src={item.image || 'img/placeholder.png'} className="moderation__image" alt={item.title} />

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

                    <a href={item.link} className="moderation__link" target="_blank" rel="noreferrer">
                      {item.link}
                    </a>

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
            : (
              <p className="user-profile__loading">
                Немає нових оголошень
              </p>
            )}

          <div>
            {message}
          </div>
        </>
      )}
    </div>
  );
};
