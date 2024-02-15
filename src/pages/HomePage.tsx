import { HomePageAbout } from '../components/HomePageAbout';
import { HomePageBeVolunteer } from '../components/HomePageBeVolunteer';
import { HomePageCategories } from '../components/HomePageCategories';
import { HomePageFaq } from '../components/HomePageFaq';
import { HomePageSlider } from '../components/HomePageSlider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__slider">
        <HomePageSlider />
      </div>

      <div className="home-page__categories">
        <HomePageCategories />
      </div>

      <div className="home-page__about">
        <HomePageAbout />
      </div>

      <div className="home-page__about">
        <HomePageBeVolunteer />
      </div>

      <div className="home-page__about">
        <HomePageFaq />
      </div>
    </div>
  );
};
