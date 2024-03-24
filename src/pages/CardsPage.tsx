/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import {
  NavLink, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';

import './CardsPage.scss';

import { PostType } from '../types/inputTypes';
import { categoriesList } from '../utils/categoriesList';
import { Search } from '../components/Search';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { PostCard } from '../components/PostCard';
import { httpService } from '../services/httpService';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';
import { CategoryPostData } from '../types/postData';

interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => cn('cards-page__category-list-item', {
  'cards-page__category-list-item--active': isActive,
});

const PER_PAGE = 12;

export const CardsPage = () => {
  const { page, category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<[string, string][]>([]);
  const [isMobileCategory, setIsMobileCategory] = useState(false);
  const [posts, setPosts] = useState<CategoryPostData[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = posts.length;
  const firstItem = currentPage !== 1 ? (currentPage - 1) * PER_PAGE : 0;
  const lastItem = (currentPage * PER_PAGE) > totalPosts
    ? totalPosts
    : currentPage * PER_PAGE;

  useEffect(() => {
    const serchPage = searchParams.get('page');

    if (serchPage) {
      setCurrentPage(+serchPage);
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

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

    if (page && category) {
      setIsLoading(true);

      httpService.getPosts(page, category)
        .then((data) => {
          setPosts(data);
        })
        .catch(() => setMessage('error'))
        .finally(() => setIsLoading(false));
    } else if (page) {
      setIsLoading(true);

      httpService.getPosts(page, null)
        .then((data) => {
          setPosts(data);
        })
        .catch(() => setMessage('error'))
        .finally(() => setIsLoading(false));
    }
  }, [page, category, navigate]);

  const handleMobileCategory = () => {
    setIsMobileCategory(current => !current);
  };

  return (
    <div className="cards-page">
      <div className="cards-page__container">
        <div className="cards-page__breadcrumbs">
          {page && Object.keys(PostType).includes(page) && <BreadCrumbs />}
        </div>

        <header className="cards-page__header">
          <h1 className="cards-page__title">
            {PostType[page as keyof typeof PostType]}
          </h1>

          <Search />
        </header>

        {message}

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
                  onClick={handleMobileCategory}
                >
                  {item[1]}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="cards-page__posts-list-wrapper">
            <div className="cards-page__posts-list">
              {isLoading && (
                <div className="cards-page__loading">
                  <Loading />
                </div>
              )}

              {(posts.length > 0 && !isLoading) && posts.slice(firstItem, lastItem).map(post => (
                <PostCard
                  key={post.url}
                  url={post.url}
                  image={post.image}
                  title={post.title}
                  location={post.location}
                />
              ))}

              {(posts.length === 0 && !isLoading) && (
                <p className="cards-page__loading">
                  Поки немає оголошень
                </p>
              )}
            </div>

            {(posts.length > PER_PAGE && !isLoading) && (
              <div className="cards-page__pagination">
                <Pagination
                  totalPosts={totalPosts}
                  perPage={PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
