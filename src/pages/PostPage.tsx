/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Delimiter } from '../components/Delimiter';
import { DeliveryType, ServiceType } from '../types/inputTypes';
import './PostPage.scss';
import { PostData } from '../types/postData';
import { httpService } from '../services/httpService';
import { Loading } from '../components/Loading';

export const PostPage = () => {
  const { pathname } = useLocation();
  const [post, setPost] = useState<PostData | null>(null);
  const [link, setLink] = useState('');
  const [donateLink, setDonateLink] = useState('');
  const [delivery, setDelivery] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPost(null);
    setIsLoading(true);
    setMessage('');

    if (pathname) {
      console.log(pathname);

      httpService.getPost(pathname)
        .then((data) => {
          setPost(data);

          if (data.delivery) {
            const values: string[] = [];

            Object.entries(DeliveryType)
              .forEach(item => {
                if (data.delivery?.includes(item[0])) {
                  values.push(item[1]);
                }
              });

            setDelivery(values);
          }

          if (data.services) {
            const values: string[] = [];

            Object.entries(ServiceType)
              .forEach(item => {
                if (data.services?.includes(item[0])) {
                  values.push(item[1]);
                }
              });

            setServices(values);
          }

          if (data.link) {
            const links = data.link.split('|');

            if (links.length > 0) {
              setLink(links[0]);
            }

            if (links.length > 1) {
              setDonateLink(links[1]);
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            navigate('/404', { replace: true });
          } else {
            setMessage('Помилка завантаження данних');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [pathname, navigate]);

  return (
    <div className="post-page">
      {isLoading && (
        <div className="search-page__centered">
          <Loading />
        </div>
      )}

      {post && (
        <div className="post-page__container">
          <div className="post-page__breadcrumbs">
            <BreadCrumbs />
          </div>

          <div className="post-page__wrapper">
            <img
              src={post.image || 'img/placeholder.png'}
              className="post-page__image"
              alt={post.title}
            />

            <div className="post-page__content">
              <h1 className="post-page__title">
                {post.title}
              </h1>

              {post.location && (
                <div className="post-page__location">
                  <span>Місцезнаходження: </span>
                  <b>{post.location}</b>
                </div>
              )}

              <div className="post-page__text">
                {post.text}
              </div>

              <div className="post-page__links">
                {link && (
                  <a
                    href={link}
                    className="post-page__contact-item"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Додаткова інформація
                  </a>
                )}

                {donateLink && (
                  <a
                    href={donateLink}
                    className="post-page__contact-item"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Посилання на збір
                  </a>
                )}
              </div>

              {post.delivery && (
                <div>
                  <Delimiter />

                  <h4 className="post-page__delivery-title">
                    Умови доставки:
                  </h4>

                  <ul className="post-page__delivery-list">
                    {delivery.map(item => (
                      <li className="post-page__delivery-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {post.services && (
                <div className="post-page__services">
                  <Delimiter />
                  <h4>
                    Умови надання послуги:
                  </h4>

                  <ul className="post-page__delivery-list">
                    {services.map(item => (
                      <li className="post-page__delivery-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <Delimiter />

                <h4 className="post-page__delivery-title">
                  Засоби зв&apos;язку:
                </h4>

                <div className="post-page__contacts">
                  {post.phone && (
                    <a href={`tel:${post.phone}`} className="post-page__contact-item">
                      {post.phone}
                    </a>
                  )}

                  {post.email && (
                    <a href={`mailto:${post.email}`} className="post-page__contact-item">
                      {post.email}
                    </a>
                  )}

                  {post.telegram && (
                    <a
                      href={`https://t.me/${post.telegram}`}
                      className="post-page__contact-item"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Telegram
                    </a>
                  )}
                </div>
              </div>

              {post.person && (
                <div className="post-page__location">
                  <span>Контактна особа: </span>
                  <b>{post.person}</b>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="search-page__centered">
          {message}
        </div>
      )}
    </div>
  );
};
