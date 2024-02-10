import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__slider">
        <img
          src="img/slider-6.jpg"
          className="home-page__slider-image"
          alt="slider"
        />

        <div className="home-page__slider-text">
          <p className="home-page__slider-sub-text">
            З думкою про інших
          </p>

          <p className="home-page__slider-text-main">
            Простягни руку допомоги тим
            <br />
            Хто її потребує
          </p>
        </div>

        <div className="home-page__slider-map" />
      </div>
    </div>
  );
};
