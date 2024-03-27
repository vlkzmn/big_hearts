import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { UserProfile } from './pages/UserProfile';
import { Authorization } from './pages/Authorization';
import { Activation } from './pages/Activation';
import { NotFoundPage } from './pages/NotFoundPage';
import { Moderation } from './pages/Moderation';
import { Prohibited } from './pages/Prohibited';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { UsefulResources } from './pages/UsefulResources';
import { CardsPage } from './pages/CardsPage';
import { PostPage } from './pages/PostPage';
import { SearchPage } from './pages/SearchPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="oblikovyi-zapys"
            element={<UserProfile />}
          />

          <Route
            path="avtoryzatsiia/:uid?/:token?"
            element={<Authorization />}
          />

          <Route
            path="aktyvatsiia/:uid/:token"
            element={<Activation />}
          />

          <Route
            path="admin"
            element={<Moderation />}
          />

          <Route
            path="spysok-zaboronenykh-oholoshen"
            element={<Prohibited />}
          />

          <Route
            path="polityka-konfidentsiinosti"
            element={<PrivacyPolicy />}
          />

          <Route
            path="korysni-resursy"
            element={<UsefulResources />}
          />

          <Route
            path="404"
            element={<NotFoundPage />}
          />

          <Route
            path="poshuk"
            element={<SearchPage />}
          />

          <Route
            path="/:page/:category?"
            element={<CardsPage />}
          />

          <Route
            path="/:page/:category/:url"
            element={<PostPage />}
          />

          <Route
            path="*"
            element={<Navigate to="/404" />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
