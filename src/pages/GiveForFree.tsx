/* eslint-disable no-console */
import { useParams } from 'react-router-dom';
import { Search } from '../components/Search';
import './GiveForFree.scss';

export const GiveForFree = () => {
  const { page } = useParams();

  console.log(page);

  return (
    <div className="give-for-free">
      <div className="give-for-free__container">
        <h1 className="give-for-free__title">
          Віддам безкоштовно
        </h1>

        <div className="give-for-free__breadcrumbs">
          breadcrumbs
        </div>

        <div className="give-for-free__main">
          <aside className="give-for-free__sidebar">
            <h2 className="give-for-free__title">
              Категорії
            </h2>

            <nav>
              123
            </nav>
          </aside>

          <div className="give-for-free__content">
            <Search />

            <div className="give-for-free__posts-list">
              posts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
