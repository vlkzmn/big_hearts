import { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './MenuMobile.scss';

import { PostType } from '../types/inputTypes';

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
    }
  }, [isActive]);

  const handleLinkClick = () => {
    document.body.classList.remove('body-mobile');
    toggleMenu(false);
  };

  const handleClose = () => {
    document.body.classList.remove('body-mobile');
    toggleMenu(false);
  };

  const menuItems = useMemo(() => {
    return [['/', 'Головна'], ...Object.entries(PostType)];
  }, []);

  return (
    <div className="menu-mobile">
      <button
        type="button"
        className="menu-mobile__close"
        aria-label="menu close button"
        onClick={handleClose}
      />

      <ul className="menu-mobile__menu">
        {menuItems.map(item => (
          <li key={item[0]}>
            <NavLink
              to={item[0]}
              className={getLinkClass}
              onClick={handleLinkClick}
            >
              <span>
                {item[1]}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <NavLink
        to="/oblikovyi-zapys"
        className="menu-mobile__button-link"
        onClick={handleLinkClick}
      >
        оголошення
      </NavLink>
    </div>
  );
};
