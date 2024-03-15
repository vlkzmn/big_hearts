import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';

import './PostCard.scss';

type Props = {
  url: string;
  image: string;
  title: string;
  location: string;
};

export const PostCard:React.FC<Props> = ({
  url,
  image,
  title,
  location,
}) => {
  const { page } = useParams();

  return (
    <NavLink
      to={url}
      key={url}
      className={cn(
        'post-card__post',
        { 'post-card__post--search': !page },
      )}
    >
      <div>
        <img
          src={image}
          className="post-card__post-image"
          alt={title}
        />

        <h2 className="post-card__post-title">
          {title}
        </h2>
      </div>

      <p className="post-card__post-location">
        {location}
      </p>
    </NavLink>
  );
};
