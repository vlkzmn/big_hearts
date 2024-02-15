/* eslint-disable import/no-extraneous-dependencies */
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { GiveForFree } from './pages/GiveForFree';
import { OfferServices } from './pages/OfferServices';
import { HelpRequest } from './pages/HelpRequest';
import { Donations } from './pages/Donations';
import { UserProfile } from './pages/UserProfile';

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
          <Route path="dodaty-oholoshennia" element={<UserProfile />} />
          <Route path="polityka-konfidentsiinosti" element={<UserProfile />} />
          {/*
          <Route path=":category/:itemId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
};
