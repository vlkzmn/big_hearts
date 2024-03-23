import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  totalPosts: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: React.FC<Props> = ({
  totalPosts,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();

  const pageCount = getNumbers(1, Math.ceil(totalPosts / perPage));

  function handleParamChange(value: number) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', value.toString());

    return newParams.toString();
  }

  return (
    <ul className="pagination">
      <li>
        <Link
          className={classNames(
            'pagination__link pagination__link--left',
            { 'pagination__link--disabled': currentPage === 1 },
          )}
          to={{ search: handleParamChange(currentPage - 1) }}
          onClick={() => onPageChange(currentPage - 1)}
        />
      </li>

      {pageCount.map(item => (
        <li key={item}>
          <Link
            className={classNames(
              'pagination__link',
              { 'pagination__link--active': currentPage === item },
            )}
            to={{ search: handleParamChange(item) }}
            onClick={() => onPageChange(item)}
          >
            <span className="pagination__link-text">
              {item}
            </span>
          </Link>
        </li>
      ))}

      <li>
        <Link
          className={classNames(
            'pagination__link pagination__link--right',
            { 'pagination__link--disabled': currentPage === pageCount.length },
          )}
          to={{ search: handleParamChange(currentPage + 1) }}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </li>
    </ul>
  );
};
