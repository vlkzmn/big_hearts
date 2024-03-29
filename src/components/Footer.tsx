import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__list">
            <Link
              to="mailto:info@velyki-sertsia.pp.ua"
              className="footer__link footer__link--email"
            >
              info@velyki-sertsia.pp.ua
            </Link>

            <Link
              to="https://t.me/velyki_sertsia_bot"
              className="footer__link footer__link--telegram"
              target="_blank"
              rel="noreferrer"
            >
              @velyki_sertsia
            </Link>

            <Link
              to="https://www.instagram.com/velyki_sertsia/"
              className="footer__link footer__link--instagram"
              target="_blank"
              rel="noreferrer"
            >
              @velyki_sertsia
            </Link>
          </div>

          <div className="footer__list">
            <Link to="/spysok-zaboronenykh-oholoshen" className="footer__link">
              Список заборонених оголошень
            </Link>

            <Link to="/polityka-konfidentsiinosti" className="footer__link">
              Політика конфіденційності
            </Link>

            <Link to="/korysni-resursy" className="footer__link">
              Корисні ресурси
            </Link>
          </div>

          <Link to="/">
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
