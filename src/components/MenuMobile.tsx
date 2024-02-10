/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import './MenuMobile.scss';
import classNames from 'classnames';

type Props = {
  toggleMenu: (isActive: boolean) => void;
};

type Options = {
  isActive: boolean
};

const getLinkClass = (
  { isActive }: Options,
) => classNames('menu-mobile__link', {
  'menu-mobile__link--active': isActive,
});

export const MenuMobile:React.FC<Props> = ({ toggleMenu }) => {
  return (
    <div className="menu-mobile">
      <button
        type="button"
        className="menu-mobile__close"
        aria-label="menu close button"
        onClick={() => toggleMenu(false)}
      />

      <ul className="menu-mobile__menu">
        <li>
          <NavLink to="/" className={getLinkClass}>
            <span className="menu-mobile__nav_link">
              Головна
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/viddam-bezkoshtovno" className={getLinkClass}>
            <span className="menu-mobile__nav_link">
              Віддам безкоштовно
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/proponuiu-posluhy" className={getLinkClass}>
            <span className="menu-mobile__nav_link">
              Пропоную послуги
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/zapyty-dopomohy" className={getLinkClass}>
            <span className="menu-mobile__nav_link">
              Запити допомоги
            </span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/zbir-donativ" className={getLinkClass}>
            <span className="menu-mobile__nav_link">
              Збір донатів
            </span>
          </NavLink>
        </li>
      </ul>

      <NavLink to="/dodaty-oholoshennia" className="menu-mobile__button-link">
        <div className="menu-mobile__button">
          + оголошення
        </div>
      </NavLink>
    </div>
  );
};
