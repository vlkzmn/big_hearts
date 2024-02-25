/* eslint-disable max-len */
/* eslint-disable no-console */
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';
import { PostType } from '../types/inputTypes';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  const breadCrumbs = pathname
    .split('/')
    .filter(item => item !== '');

  console.log(breadCrumbs);

  return (
    <div className="bread-crumbs">
      <Link to="/" className="bread-crumbs__home">
        Головна
      </Link>

      {breadCrumbs.map((crumb, i) => {
        const crumbText = PostType[crumb as keyof typeof PostType] || 'Поточне оголошення';

        return breadCrumbs.length !== i + 1
          ? (
            <Link
              to={`/${crumb}`}
              className="bread-crumbs__item bread-crumbs__item--link"
              key={crumb}
            >
              {crumbText}
            </Link>
          ) : (
            <span
              className="bread-crumbs__item bread-crumbs__item--text"
              key={crumb}
            >
              {crumbText}
            </span>
          );
      })}
    </div>
  );
};
