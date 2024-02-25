/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Search } from '../components/Search';
import './CardsPage.scss';
import { PostType } from '../types/inputTypes';
import { BreadCrumbs } from '../components/BreadCrumbs';

export const CardsPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [isMobileCategory, setIsMobileCategory] = useState(false);
  const category
  = ['взуття', 'речі', 'меблі', 'продукти', 'медикаменти', 'інше'];

  useEffect(() => {
    if (page && !Object.keys(PostType).includes(page)) {
      navigate('../404');
    }
  }, [page, navigate]);

  const handleMobileCategory = () => {
    setIsMobileCategory(current => !current);
  };

  return (
    <div className="cards-page">
      <div className="cards-page__container">
        <div className="cards-page__breadcrumbs">
          <BreadCrumbs />
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
              {category.map(item => (
                <li key={item}>
                  <button
                    type="button"
                    className="cards-page__category-list-item"
                  >
                    {item}
                  </button>
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

          {isMobileCategory && (
            <ul className="cards-page__category-mobile">
              {category.map(item => (
                <li key={item}>
                  <button
                    type="button"
                    className="cards-page__category-list-item"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="cards-page__content">
            <div className="cards-page__posts-list">
              <NavLink to={`/${page}/ogoloshennya`}>
                оголошення
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
