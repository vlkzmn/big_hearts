import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { GiveForFree } from './pages/GiveForFree';
import { OfferServices } from './pages/OfferServices';
import { HelpRequest } from './pages/HelpRequest';
import { Donations } from './pages/Donations';
import { UserProfile } from './pages/UserProfile';
import { Authorization } from './pages/Authorization';
import { Activation } from './pages/Activation';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="viddam-bezkoshtovno" element={<GiveForFree />} />
          <Route path="proponuiu-posluhy" element={<OfferServices />} />
          <Route path="zapyty-dopomohy" element={<HelpRequest />} />
          <Route path="zbir-donativ" element={<Donations />} />
          <Route path="oblikovyi-zapys" element={<UserProfile />} />
          <Route path="avtoryzatsiia/:token?" element={<Authorization />} />
          <Route path="aktyvatsiia/:uid/:token" element={<Activation />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
