import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './MenuMobile.scss';
import { useEffect } from 'react';

type Props = {
  toggleMenu: (isActive: boolean) => void;
  isActive: boolean;
};

type Options = {
  isActive: boolean
};

const getLinkClass = (
  { isActive }: Options,
) => classNames('menu-mobile__link', {
  'menu-mobile__link--active': isActive,
});

export const MenuMobile:React.FC<Props> = ({ toggleMenu, isActive }) => {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('body-mobile');
      // document.body.style.overflow = 'hidden';
    }
  }, [isActive]);

  const handleLinkClick = () => {
    document.body.classList.remove('body-mobile');
    // document.body.style.overflow = 'auto';
    toggleMenu(false);
  };

  const handleClose = () => {
    document.body.classList.remove('body-mobile');
    // document.body.style.overflow = 'auto';
    toggleMenu(false);
  };

  return (
    <div className="menu-mobile">
      <button
        type="button"
        className="menu-mobile__close"
        aria-label="menu close button"
        onClick={handleClose}
      />

      <ul className="menu-mobile__menu">
        <li>
          <NavLink
            to="/"
            className={getLinkClass}
            onClick={handleLinkClick}
          >
            <span className="menu-mobile__nav_link">
              Головна
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/viddam-bezkoshtovno"
            className={getLinkClass}
            onClick={handleLinkClick}
          >
            <span className="menu-mobile__nav_link">
              Віддам безкоштовно
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/proponuiu-posluhy"
            className={getLinkClass}
            onClick={handleLinkClick}
          >
            <span className="menu-mobile__nav_link">
              Пропоную послуги
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/zapyty-dopomohy"
            className={getLinkClass}
            onClick={handleLinkClick}
          >
            <span className="menu-mobile__nav_link">
              Запити допомоги
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/zbir-donativ"
            className={getLinkClass}
            onClick={handleLinkClick}
          >
            <span className="menu-mobile__nav_link">
              Збір донатів
            </span>
          </NavLink>
        </li>
      </ul>

      <NavLink
        to="/oblikovyi-zapys"
        className="menu-mobile__button-link"
        onClick={handleLinkClick}
      >
        <div className="menu-mobile__button">
          + оголошення
        </div>
      </NavLink>
    </div>
  );
};
