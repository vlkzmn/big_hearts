/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import './Logo.scss';

type Props = {
  name: string;
};

export const Logo:React.FC<Props> = ({ name }) => {
  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        <img src={`./img/${name}.png`} className="logo__image" alt="Logo" />
      </Link>
    </div>
  );
};
