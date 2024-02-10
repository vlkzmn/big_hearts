// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { Logo } from './Logo';

interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => classNames('header__link', {
  'header__link--active': isActive,
});

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo">
          <Logo />
        </div>

        <ul className="header__menu">
          {/* <li>
            <NavLink to="/">
              <span className="header__nav_link">
                Головна
              </span>
            </NavLink>
          </li> */}

          <li>
            <NavLink to="/viddam-bezkoshtovno" className={getLinkClass}>
              <span className="header__nav_link">
                Віддам безкоштовно
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/proponuiu-posluhy" className={getLinkClass}>
              <span className="header__nav_link">
                Пропоную послуги
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/zapyty-dopomohy" className={getLinkClass}>
              <span className="header__nav_link">
                Запити допомоги
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/zbir-donativ" className={getLinkClass}>
              <span className="header__nav_link">
                Збір донатів
              </span>
            </NavLink>
          </li>
        </ul>

        <NavLink to="/dodaty-oholoshennia">
          <div className="header__button">
            + оголошення
          </div>
        </NavLink>
      </nav>
    </header>
  );
};
