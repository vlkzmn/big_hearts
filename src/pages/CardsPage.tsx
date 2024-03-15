/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import './CardsPage.scss';

import { PostType } from '../types/inputTypes';
import { categoriesList } from '../utils/categoriesList';
import { Search } from '../components/Search';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { PostCard } from '../components/PostCard';

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

  useEffect(() => {
    if (
      (page && !Object.keys(PostType).includes(page))
      || (category && !Object.keys(categoriesList[page as keyof typeof PostType]).includes(category))
    ) {
      navigate('../404');
    }

    if (page && Object.keys(PostType).includes(page)) {
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
          {page && Object.keys(PostType).includes(page) && <BreadCrumbs postType={page} />}
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
              <PostCard
                url={post.url}
                image={post.image}
                title={post.title}
                location={post.location}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
