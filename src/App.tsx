import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [location, scrollToTop]);

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Outlet />
      </main>

      <Footer />

      <button
        type="button"
        className={cn('app__arrow-up', { 'app__arrow-up--active': isVisible })}
        aria-label="arrow up button"
        onClick={scrollToTop}
      />
    </div>
  );
};
