/* eslint-disable no-console */
import { useSearchParams } from 'react-router-dom';
import './SearchPage.scss';
import { Search } from '../components/Search';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('text');

  console.log(query);

  return (
    <div className="search-page">
      <div className="search-page__container">
        <header className="search-page__header">
          <h1 className="search-page__title">
            Результат пошуку
          </h1>

          <Search />
        </header>
      </div>
    </div>
  );
};
