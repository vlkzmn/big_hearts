import './HomePageSlider.scss';

export const HomePageSlider = () => {
  return (
    <div className="home-page-slider">
      <img
        src="img/slider-6.jpg"
        className="home-page-slider__image"
        alt="slider"
      />

      <div className="home-page-slider__text">
        <p className="home-page-slider__sub-text">
          З думкою про інших
        </p>

        {/* <p className="home-page__slider-text-main">
          Змінюймо життя разом
          <br />
          Будьмо джерелом добра
        </p> */}

        <p className="home-page-slider__text-main">
          Простягни руку допомоги тим
          <br />
          Хто її потребує
        </p>
      </div>

      <div className="home-page-slider__map" />
    </div>
  );
};
