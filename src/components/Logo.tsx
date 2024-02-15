/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        <img src="./img/logo.png" className="logo__image" alt="Logo" />
      </Link>
    </div>
  );
};
