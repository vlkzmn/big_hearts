/* eslint-disable max-len */
import { Link, useLocation } from 'react-router-dom';
import { PostType } from '../types/inputTypes';
import './BreadCrumbs.scss';
import { categoriesList } from '../types/categoriesList';

type Props = {
  postType: string;
};

export const BreadCrumbs:React.FC<Props> = ({ postType }) => {
  const { pathname } = useLocation();
  const linkNames = [
    ...Object.entries(PostType),
    ...Object.entries(categoriesList[postType as keyof typeof PostType]),
  ];
  const breadCrumbs = pathname
    .split('/')
    .filter(item => item !== '');

  return (
    <div className="bread-crumbs">
      <Link to="/" className="bread-crumbs__home">
        Головна
      </Link>

      {breadCrumbs.map((crumb, i) => {
        const crumbText = linkNames.find(item => crumb === item[0]) || ['post', 'Поточне оголошення'];

        if (breadCrumbs.length === i + 1) {
          return (
            <span
              className="bread-crumbs__item bread-crumbs__item--text"
              key={crumbText[0]}
            >
              {crumbText[1]}
            </span>
          );
        }

        return i === 0
          ? (
            <Link
              to={`/${crumbText[0]}`}
              className="bread-crumbs__item bread-crumbs__item--link"
              key={crumbText[0]}
            >
              {crumbText[1]}
            </Link>
          ) : (
            <Link
              to={`/${breadCrumbs[0]}/${crumbText[0]}`}
              className="bread-crumbs__item bread-crumbs__item--link"
              key={crumbText[0]}
            >
              {crumbText[1]}
            </Link>
          );
      })}
    </div>
  );
};
