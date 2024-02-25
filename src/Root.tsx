/* eslint-disable max-len */
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
// import { GiveForFree } from './pages/GiveForFree';
// import { OfferServices } from './pages/OfferServices';
// import { HelpRequest } from './pages/HelpRequest';
// import { Donations } from './pages/Donations';
import { UserProfile } from './pages/UserProfile';
import { Authorization } from './pages/Authorization';
import { Activation } from './pages/Activation';
import { NotFoundPage } from './pages/NotFoundPage';
import { Admin } from './pages/Admin';
import { Prohibited } from './pages/Prohibited';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { KorysniResursy } from './pages/KorysniResursy';
import { CardsPage } from './pages/CardsPage';
import { PostPage } from './pages/PostPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          {/* <Route path="viddam-bezkoshtovno" element={<GiveForFree />} /> */}
          {/* <Route path="proponuiu-posluhy" element={<OfferServices />} /> */}
          {/* <Route path="zapyty-dopomohy" element={<HelpRequest />} /> */}
          {/* <Route path="zbir-donativ" element={<Donations />} /> */}
          <Route path="oblikovyi-zapys" element={<UserProfile />} />
          <Route path="avtoryzatsiia/:uid?/:token?" element={<Authorization />} />
          <Route path="aktyvatsiia/:uid/:token" element={<Activation />} />
          <Route path="admin" element={<Admin />} />
          <Route path="spysok-zaboronenykh-oholoshen" element={<Prohibited />} />
          <Route path="polityka-konfidentsiinosti" element={<PrivacyPolicy />} />
          <Route path="korysni-resursy" element={<KorysniResursy />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="/:page" element={<CardsPage />} />
          <Route path="/:page/:post" element={<PostPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
