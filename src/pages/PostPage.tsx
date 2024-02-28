import { BreadCrumbs } from '../components/BreadCrumbs';
import './PostPage.scss';

export const PostPage = () => {
  return (
    <div className="post-page">
      <div className="post-page__container">
        <div className="cards-page__breadcrumbs">
          <BreadCrumbs categories={[['vzuttya', 'Взуття']]} />
        </div>

        PostPage
      </div>
    </div>
  );
};
