/* eslint-disable no-console */
/* eslint-disable max-len */
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Delimiter } from '../components/Delimiter';
import { DeliveryType } from '../types/inputTypes';
import './PostPage.scss';

export const PostPage = () => {
  const post = {
    postType: 'viddam-bezkoshtovno',
    title: 'Ноутбук Asus 17 дюймів',
    category: 'technika',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde minus sint officiis, iure consectetur veritatis sapiente ratione qui quam doloremque, exercitationem illum aspernatur labore quae nihil error deleniti fugiat alias animi explicabo perspiciatis vitae?',
    image: 'img/placeholder.png',
    delivery: ['free', 'novaPoshta', 'ukrPoshta'],
    services: null,
    phone: '+380633485206',
    email: 'vlkzmn@gmail.com',
    telegram: '+380633485206',
    link: 'https://velyki-sertsia.pp.ua/',
    location: 'Київ',
    person: 'Володимир',
  };

  const delivery = Object.entries(DeliveryType)
    .filter(item => post.delivery.includes(item[0]));

  // const delivery = Object.entries(DeliveryType)
  //   .filter(item => post.delivery[item[0] as keyof typeof DeliveryType]);

  // const services = Object.entries(ServiceType)
  //   .filter(item => post.services[item[0] as keyof typeof ServiceType]);

  return (
    <div className="post-page">
      <div className="post-page__container">
        <div className="post-page__breadcrumbs">
          <BreadCrumbs postType={post.postType} />
        </div>

        <div className="post-page__wrapper">
          <img
            src={post.image}
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

            {post.link && (
              <a
                href={post.link}
                className="post-page__contact-item"
                target="_blank"
                rel="noreferrer"
              >
                Додаткова інформація
              </a>
            )}

            {post.delivery && (
              <div>
                <Delimiter />
                <h4 className="post-page__delivery-title">
                  Умови доставки:
                </h4>

                <ul className="post-page__delivery-list">
                  {delivery.map(item => (
                    <li className="post-page__delivery-item" key={item[1]}>
                      {item[1]}
                    </li>
                  ))}
                </ul>
                {/* <div className="post-page__delivery-list">
                  {delivery.map(item => (
                    <div className="post-page__delivery-item">
                      {item[1]}
                    </div>
                  ))}
                </div> */}
              </div>
            )}

            {post.services && (
              <div className="post-page__services">
                <Delimiter />
                <h4>
                  Умови надання послуги:
                </h4>

                {}
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

                {post.phone && (
                  <a href={`mailto:${post.email}`} className="post-page__contact-item">
                    {post.email}
                  </a>
                )}

                {post.phone && (
                  <a
                    href={`https://t.me/${post.phone}`}
                    className="post-page__contact-item"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram
                  </a>
                )}
              </div>
            </div>

            {post.location && (
              <div className="post-page__location">
                <span>Контактна особа: </span>
                <b>{post.person}</b>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
