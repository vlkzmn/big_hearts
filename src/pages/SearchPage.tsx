/* eslint-disable no-console */
import { NavLink, useSearchParams } from 'react-router-dom';
import './SearchPage.scss';
import { Search } from '../components/Search';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('text');

  const posts = [
    {
      title: 'Ноутбук Asus 17 дюймів',
      image: 'img/placeholder.png',
      location: 'Київ',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya1',
    },
    {
      title: 'Ноутбук Asus 17 дюймів',
      image: 'img/placeholder.png',
      location: 'Київ',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya7',
    },
    {
      title: 'Смартфон Samsung Galaxy Mega',
      image: 'img/placeholder.png',
      location: 'Львів',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya2',
    },
    {
      title: 'Пральна мишина Bosch',
      image: 'img/placeholder.png',
      location: 'Одеса',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya3',
    },
    {
      title: 'Ноутбук Asus 17 дюймів',
      image: 'img/placeholder.png',
      location: 'Київ',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya4',
    },
    {
      title: 'Смартфон Samsung Galaxy Mega',
      image: 'img/placeholder.png',
      location: 'Львів',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya5',
    },
    {
      title: 'Пральна мишина Bosch',
      image: 'img/placeholder.png',
      location: 'Одеса',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya6',
    },
  ];

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

        {posts.length > 0 ? (
          <div className="search-page__posts-list">
            {posts.map(post => (
              <NavLink
                to={post.url}
                key={post.url}
                className="search-page__post"
              >
                <div>
                  <img
                    src={post.image}
                    className="search-page__post-image"
                    alt={post.title}
                  />

                  <h2 className="search-page__post-title">
                    {post.title}
                  </h2>
                </div>

                <p className="search-page__post-location">
                  {post.location}
                </p>
              </NavLink>
            ))}
          </div>
        ) : (
          <p className="search-page__query">
            Нічого не знайдено
          </p>
        )}
      </div>
    </div>
  );
};
