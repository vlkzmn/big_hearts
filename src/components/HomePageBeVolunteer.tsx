/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import './HomePageBeVolunteer.scss';

export const HomePageBeVolunteer = () => {
  return (
    <div className="be-volunteer">
      <Link to="/dodaty-oholoshennia" className="be-volunteer__category be-volunteer__category--free60">
        <div className="be-volunteer__title">
          допоможіть речами
        </div>

        <p className="be-volunteer__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus porro id dolorum deserunt cupiditate harum
        </p>

        <div className="be-volunteer__button" />
      </Link>

      <Link to="/dodaty-oholoshennia" className="be-volunteer__category be-volunteer__category--free80">
        <div className="be-volunteer__title">
          запропонуйте послуги
        </div>

        <p className="be-volunteer__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus porro id dolorum deserunt cupiditate harum
        </p>

        <div className="be-volunteer__button" />
      </Link>

      <Link to="/zbir-donativ" className="be-volunteer__category be-volunteer__category--free150">
        <div className="be-volunteer__title">
          зробіть донат
        </div>

        <p className="be-volunteer__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus porro id dolorum deserunt cupiditate harum
        </p>

        <div className="be-volunteer__button" />
      </Link>
    </div>
  );
};
