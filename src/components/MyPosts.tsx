import { useEffect, useState } from 'react';
import cn from 'classnames';

import './MyPosts.scss';

import { PostData, Status } from '../types/postData';
import { authorizedService } from '../services/authorizedService';
import { PostForm } from './PostForm';
import { Loading } from './Loading';
import { Delimiter } from './Delimiter';

export const MyPosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingMessage, setDeletingMessage] = useState('');
  const [deletingLoading, setDeletingLoading] = useState(false);

  const dataLoader = () => {
    setIsLoading(true);
    setLoadingMessage('');

    authorizedService.getUserPosts()
      .then((data) => setPosts(data))
      .catch(() => {
        setLoadingMessage('Помилка завантаження оголошень, спробуйте пізніше');
        setPosts([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    dataLoader();
  }, []);

  const handleEdit = (selectedPost: PostData) => {
    setPost(selectedPost);
  };

  const handleBackToList = (isPostChanged: boolean) => {
    setPost(null);

    if (isPostChanged) {
      dataLoader();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = (postId: number) => {
    if (postId === deletingId) {
      setDeletingLoading(true);

      authorizedService.deletePost(postId)
        .then(() => {
          setDeletingMessage('Успішно видалено');
          setTimeout(() => {
            setDeletingMessage('');
            setPosts(current => current.filter(item => item.id !== postId));
            setDeletingId(null);
          }, 2000);
        })
        .catch(() => {
          setDeletingMessage('Помилка видалення, спробуйте пізніше');
          setTimeout(() => {
            setDeletingMessage('');
          }, 5000);
        })
        .finally(() => setDeletingLoading(false));
    } else {
      setDeletingId(postId);
      setTimeout(() => {
        setDeletingId(null);
      }, 5000);
    }
  };

  return (
    <div className="my-posts">
      {post
        ? (
          <>
            <h2 className="my-posts__title">
              Редагування
            </h2>

            <PostForm post={post} backToList={handleBackToList} />

            <Delimiter />

            <button
              type="button"
              className="my-posts__button"
              onClick={() => handleBackToList(false)}
            >
              Повернуться до оголошень
            </button>
          </>
        ) : (
          <>
            <h2 className="my-posts__title">
              Мої оголошення
            </h2>

            {isLoading && (
              <div className="my-posts__loading">
                <Loading />
              </div>
            )}

            {(posts.length > 0 && !isLoading) && posts.map(item => {
              return (
                <div className="my-posts__post" key={item.id}>
                  <p className={cn(
                    'my-posts__status',
                    { 'my-posts__status--active': item.status === 'Active' },
                    {
                      'my-posts__status--rejected': item.status === 'Rejected',
                    },
                  )}
                  >
                    {Status[item.status as keyof typeof Status]}
                  </p>

                  <div className="my-posts__content">
                    <div className="my-posts__image-container">
                      <img
                        src={item.image || 'img/placeholder.png'}
                        className="my-posts__image"
                        alt={item.title}
                      />
                    </div>

                    <div className="my-posts_text-content">
                      <h3 className="my-posts__item-title">
                        {item.title}
                      </h3>

                      <p className="my-posts__text">
                        {item.text}
                      </p>
                    </div>
                  </div>

                  <div className="my-posts__buttons">
                    <button
                      type="button"
                      className="my-posts__button"
                      onClick={() => handleEdit(item)}
                    >
                      Редагувати
                    </button>

                    <button
                      type="button"
                      className="my-posts__button"
                      onClick={() => handleDelete(item.id)}
                    >
                      {
                        deletingId !== item.id
                          ? 'Видалити'
                          : 'Підтвердити'
                      }
                    </button>
                  </div>

                  {deletingId === item.id && deletingLoading && (
                    <p className="my-posts__deleting-loading">
                      <Loading />
                    </p>
                  )}

                  {deletingId === item.id && deletingMessage && (
                    <p className="my-posts__message">
                      {deletingMessage}
                    </p>
                  )}
                </div>
              );
            })}

            {(posts.length === 0 && !loadingMessage && !isLoading) && (
              <p className="my-posts__loading-message">
                У вас поки що немає оголошень
              </p>
            )}

            {(loadingMessage && !isLoading) && (
              <p className="my-posts__loading-message">
                {loadingMessage}
              </p>
            )}
          </>
        )}
    </div>
  );
};
