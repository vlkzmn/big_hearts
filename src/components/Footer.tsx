import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__list">
            <a
              href="mailto:info@velyki-sertsia.pp.ua"
              className="footer__link footer__link--email"
            >
              info@velyki-sertsia.pp.ua
            </a>

            <a
              href="https://t.me/velyki_sertsia_bot"
              className="footer__link footer__link--telegram"
              target="_blank"
              rel="noreferrer"
            >
              @velyki_sertsia
            </a>

            <a
              href="https://www.instagram.com/velyki_sertsia/"
              className="footer__link footer__link--instagram"
              target="_blank"
              rel="noreferrer"
            >
              @velyki_sertsia
            </a>

            <a
              href="https://www.tiktok.com/uk-UA/"
              className="footer__link footer__link--tiktok"
              target="_blank"
              rel="noreferrer"
            >
              @velyki_sertsia
            </a>
          </div>

          <div className="footer__list">
            <Link to="/" className="footer__link">
              Про сервіс
            </Link>

            <Link to="/" className="footer__link">
              Список заборонених оголошень
            </Link>

            <Link to="/" className="footer__link">
              Угода користувача
            </Link>

            <Link to="/" className="footer__link">
              Політика конфіденційності
            </Link>

            <Link to="/" className="footer__link">
              Корисні ресурси
            </Link>
          </div>

          <Link to="/" className="footer__logo-link">
            <img
              src="./img/logo-footer.png"
              className="footer__logo-image"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
