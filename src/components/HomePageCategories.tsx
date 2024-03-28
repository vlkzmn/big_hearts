/* eslint-disable max-len */
import './HomePageCategories.scss';

export const HomePageCategories = () => {
  return (
    <div className="home-page-categories">
      <div className="home-page-categories__container">
        <h2 className="home-page-categories__title">
          Поєднуємо небайдужих з тими хто потребує допомоги
        </h2>

        <div className="home-page-categories__content">
          <div className="home-page-categories__item home-page-categories__item--free">
            <div className="home-page-categories__item-title">
              Віддам безкоштовно
            </div>

            <div className="home-page-categories__item-text">
              Цей розділ містить оголошення, де люди надають безкоштовно речі, які можуть бути корисними іншим.
            </div>
          </div>

          <div className="home-page-categories__item home-page-categories__item--services">
            <div className="home-page-categories__item-title">
              Пропоную послуги
            </div>

            <div className="home-page-categories__item-text">
              Цей розділ присвячений оголошенням, де люди надають безкоштовні послуги для тих, хто потребує допомоги.
            </div>
          </div>

          <div className="home-page-categories__item  home-page-categories__item--sos">
            <div className="home-page-categories__item-title">
              Запити допомоги
            </div>

            <div className="home-page-categories__item-text">
              Це розділ, де публікуються оголошення, де люди звертаються за допомогою з різних сфер життя.
            </div>
          </div>

          <div className="home-page-categories__item  home-page-categories__item--donate">
            <div className="home-page-categories__item-title">
              Збір донатів
            </div>

            <div className="home-page-categories__item-text">
              Тут можна знайти оголошення про збір коштів для різних потреб.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
