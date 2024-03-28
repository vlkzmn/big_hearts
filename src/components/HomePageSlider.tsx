/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import './HomePageSlider.scss';

type Props = {
  subText: string;
  text1: string;
  text2: string;
};

const Slide:React.FC<Props> = ({
  subText,
  text1,
  text2,
}) => {
  return (
    <div className="home-page-slider">
      <div className="home-page-slider__text">
        <p className="home-page-slider__sub-text">
          {subText}
        </p>

        <p className="home-page-slider__text-main">
          {text1}
          <br />
          {text2}
        </p>
      </div>

      <div className="home-page-slider__map" />
    </div>
  );
};

export const HomePageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="slider">
      {[...Array(totalSlides)].map((_, index) => (
        <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
          <img
            src={`img/slider-${index + 1}.webp`}
            className="home-page-slider__image"
            alt="Великі Серця - Благодійний проєкт"
          />
        </div>
      ))}

      {currentSlide === 0 && (
        <Slide
          subText="З думкою про інших"
          text1="Простягни руку допомоги тим"
          text2="Хто її потребує"
        />
      )}

      {currentSlide === 1 && (
        <Slide
          subText="З добром у серці"
          text1="Змінюймо життя разом"
          text2="Будьмо джерелом добра"
        />
      )}

      {currentSlide === 2 && (
        <Slide
          subText="З турботою про близьких"
          text1="Не будь байдужим"
          text2="Відгукнись на запит допомоги"
        />
      )}
    </div>
  );
};
