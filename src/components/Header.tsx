// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import cn from 'classnames';
import './Header.scss';
import { Logo } from './Logo';
import { MenuMobile } from './MenuMobile';
import { PostType } from '../types/inputTypes';

interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => cn('header__link', {
  'header__link--active': isActive,
});

export const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuItems = useMemo(() => Object.entries(PostType), []);

  const handleOpenMenu = () => {
    setIsMenuActive(true);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <div className={cn(
          'header__nav-mobile',
          { 'header__nav-mobile--active': isMenuActive },
        )}
        >
          <MenuMobile toggleMenu={setIsMenuActive} isActive={isMenuActive} />
        </div>

        <button
          type="button"
          className="header__burger-icon"
          aria-label="menu button"
          onClick={handleOpenMenu}
        />

        <Logo />

        <ul className="header__menu">
          {menuItems.map(item => (
            <li key={item[0]}>
              <NavLink
                to={item[0]}
                className={getLinkClass}
              >
                <span className="menu-mobile__nav_link">
                  {item[1]}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink to="/oblikovyi-zapys" className="header__button-link">
          оголошення
        </NavLink>
      </nav>
    </header>
  );
};
