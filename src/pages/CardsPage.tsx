/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Search } from '../components/Search';
import './CardsPage.scss';
import { PostType } from '../types/inputTypes';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { categoriesList } from '../utils/categoriesList';

interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => cn('cards-page__category-list-item', {
  'cards-page__category-list-item--active': isActive,
});

export const CardsPage = () => {
  const { page, category } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<[string, string][]>([]);
  const [isMobileCategory, setIsMobileCategory] = useState(false);

  const posts = [
    {
      title: 'Ноутбук Asus 17 дюймів',
      image: 'img/placeholder.png',
      location: 'Київ',
      url: '/viddam-bezkoshtovno/technika/ogoloshennya1',
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

  useEffect(() => {
    if (page && !Object.keys(PostType).includes(page)) {
      navigate('../404');
    }

    if (page) {
      setCategories(Object.entries(categoriesList[page as keyof typeof PostType]));
    }
  }, [page, category, navigate]);

  const handleMobileCategory = () => {
    setIsMobileCategory(current => !current);
  };

  return (
    <div className="cards-page">
      <div className="cards-page__container">
        <div className="cards-page__breadcrumbs">
          {page && <BreadCrumbs postType={page} />}
        </div>

        <header className="cards-page__header">
          <h1 className="cards-page__title">
            {PostType[page as keyof typeof PostType]}
          </h1>

          <Search />
        </header>

        <div className="cards-page__main">
          <aside className="cards-page__sidebar">
            <h2 className="cards-page__category-title">
              Категорії
            </h2>

            <div className="cards-page__line">
              <span className="cards-page__line-start" />
              <span className="cards-page__line-end" />
            </div>

            <ul className="cards-page__category-list">
              {categories.map(item => (
                <li key={item[0]}>
                  <NavLink
                    to={`/${page}/${item[0]}`}
                    className={getLinkClass}
                  >
                    {item[1]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>

          <button
            type="button"
            className="cards-page__category-mobile-button"
            onClick={handleMobileCategory}
          >
            {isMobileCategory ? 'Закрити' : 'Категорії'}
          </button>

          <ul className={cn(
            'cards-page__category-mobile',
            { 'cards-page__category-mobile--active': isMobileCategory },
          )}
          >
            {categories.map(item => (
              <li key={item[0]}>
                <NavLink
                  to={`/${page}/${item[0]}`}
                  className={getLinkClass}
                >
                  {item[1]}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="cards-page__posts-list">
            {posts.map(post => (
              <NavLink to={post.url} key={post.url} className="cards-page__post">
                <div>
                  <img src={post.image} className="cards-page__post-image" alt={post.title} />

                  <h2 className="cards-page__post-title">
                    {post.title}
                  </h2>
                </div>

                <p className="cards-page__post-location">
                  {post.location}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
