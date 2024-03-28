import { HomePageSlider } from '../components/HomePageSlider';
import { HomePageCategories } from '../components/HomePageCategories';
import { HomePageAbout } from '../components/HomePageAbout';
import { HomePageBeVolunteer } from '../components/HomePageBeVolunteer';
import { HomePageFaq } from '../components/HomePageFaq';

export const HomePage = () => {
  return (
    <div className="home-page">
      <HomePageSlider />
      <HomePageCategories />
      <HomePageAbout />
      <HomePageBeVolunteer />
      <HomePageFaq />
    </div>
  );
};
