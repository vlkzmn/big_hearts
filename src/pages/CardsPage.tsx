import { useEffect, useMemo, useState } from 'react';
import {
  NavLink, useNavigate, useParams, useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';

import './CardsPage.scss';

import { PostType } from '../types/inputTypes';
import { CategoryPostData } from '../types/postData';
import { categoriesList } from '../utils/categoriesList';
import { httpService } from '../services/httpService';

import { Search } from '../components/Search';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { PostCard } from '../components/PostCard';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';
import { Delimiter } from '../components/Delimiter';

interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => cn(
  'cards-page__category-list-item',
  { 'cards-page__category-list-item--active': isActive },
);

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
  const totalPosts = useMemo(() => posts.length, [posts]);
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
        || (
          category
          && !Object.keys(categoriesList[page as keyof typeof PostType])
            .includes(category)
        )
    ) {
      navigate('/404', { replace: true });
    } else if (page) {
      setIsLoading(true);
      setCategories(
        Object.entries(categoriesList[page as keyof typeof PostType]),
      );

      const currentCategory = category || null;

      httpService.getPosts(page, currentCategory)
        .then((data) => {
          setPosts(data);
        })
        .catch(() => setMessage(
          'Помилка завантаження даних, спробуйте пізніше',
        ))
        .finally(() => setIsLoading(false));
    }
  }, [page, category, navigate]);

  const handleMobileCategory = () => setIsMobileCategory(current => !current);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

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

            <Delimiter />

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
                <div className="cards-page__centering">
                  <Loading />
                </div>
              )}

              {(posts.length > 0 && !isLoading)
              && posts.slice(firstItem, lastItem).map(post => (
                <PostCard
                  key={post.url}
                  url={post.url}
                  image={post.image}
                  title={post.title}
                  location={post.location}
                />
              ))}

              {(posts.length === 0 && !message && !isLoading) && (
                <p className="cards-page__centering">
                  Поки немає оголошень в цій категорії
                </p>
              )}

              {(message && !isLoading) && (
                <p className="cards-page__centering">
                  {message}
                </p>
              )}
            </div>

            {(posts.length > PER_PAGE && !isLoading) && (
              <div className="cards-page__pagination">
                <Pagination
                  totalPosts={totalPosts}
                  perPage={PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
