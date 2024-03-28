import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './SearchPage.scss';

import { CategoryPostData } from '../types/postData';
import { httpService } from '../services/httpService';
import { Search } from '../components/Search';
import { PostCard } from '../components/PostCard';
import { Loading } from '../components/Loading';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('text');
  const [posts, setPosts] = useState<CategoryPostData[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessage('');

    if (query) {
      setIsLoading(true);

      httpService.getSerchResult(query)
        .then((data) => {
          setPosts(data);
        })
        .catch(() => setMessage('Помилка завантаження, спробуйте пізніше'))
        .finally(() => setIsLoading(false));
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-page__container">
        <header className="search-page__header">
          <h1 className="search-page__title">
            Результат пошуку
          </h1>

          <Search />
        </header>

        <p className="search-page__query">
          Запит:&nbsp;
          <b>{query}</b>
        </p>

        {isLoading && (
          <div className="search-page__centering">
            <Loading />
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <>
            <div className="search-page__posts-list">
              {posts.map(post => (
                <PostCard
                  url={post.url}
                  image={post.image}
                  title={post.title}
                  location={post.location}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && posts.length === 0 && !message && (
          <p className="search-page__centering">
            Нічого не знайдено
          </p>
        )}

        {!isLoading && message && (
          <p className="search-page__centering">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
