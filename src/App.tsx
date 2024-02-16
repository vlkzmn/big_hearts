import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
        onClick={() => scrollToTop()}
      />
    </div>
  );
};
