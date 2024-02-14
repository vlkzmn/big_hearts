/* eslint-disable max-len */
import './HomePageCategories.scss';

export const HomePageCategories = () => {
  return (
    <div className="home-page-categories">
      <div className="home-page-categories__container">
        <h1 className="home-page-categories__title">
          Поєднуємо небайдужих з тими хто потребує допомоги
        </h1>

        <div className="home-page-categories__content">
          <div className="home-page-categories__item home-page-categories__item--first">
            <div className="home-page-categories__item-title">
              Віддам безкоштовно
            </div>

            <div className="home-page-categories__item-text">
              Розділ в якому розміщені оголошення в яких люди безкоштовно готові віддать речі які знадобляться іншим.
            </div>
          </div>

          <div className="home-page-categories__item home-page-categories__item--second">
            <div className="home-page-categories__item-title">
              Пропоную послуги
            </div>

            <div className="home-page-categories__item-text">
              Розділ в якому розміщені оголошення в яких люди пропонують безкоштовні полсуги для потребуючих.
            </div>
          </div>

          <div className="home-page-categories__item  home-page-categories__item--third">
            <div className="home-page-categories__item-title">
              Запити допомоги
            </div>

            <div className="home-page-categories__item-text">
              Розділ в якому розміщені оголошення в яких люди звертаются за допомогою з різних приводів.
            </div>
          </div>

          <div className="home-page-categories__item  home-page-categories__item--fourth">
            <div className="home-page-categories__item-title">
              Збір донатів
            </div>

            <div className="home-page-categories__item-text">
              Розділ в якому розміщені оголошення зі зборами донатів на різні потреби.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
