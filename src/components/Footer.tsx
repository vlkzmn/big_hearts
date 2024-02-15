import './Footer.scss';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo name="logo-footer" />
      </div>
    </footer>
  );
};
