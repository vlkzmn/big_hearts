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

interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => cn('cards-page__category-list-item', {
  'cards-page__category-list-item--active': isActive,
});

export const CardsPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [isMobileCategory, setIsMobileCategory] = useState(false);
  // const category = ['взуття', 'речі', 'меблі', 'продукти', 'медикаменти', 'інше'];
  const category1 = {
    vzuttya: 'Взуття',
    rechi: 'Речі',
    mebli: 'Меблі',
    produkty: 'Продукти',
    liky: 'Ліки',
    inshe: 'Інше',
  };

  const cat = Object.entries(category1);

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
          <BreadCrumbs categories={cat} />
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
              {cat.map(item => (
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
            {cat.map(item => (
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

          <div className="cards-page__content">
            <div className="cards-page__posts-list">
              <NavLink to={`/${page}/vzuttya/ogoloshennya`}>
                оголошення
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
