/* eslint-disable no-console */
/* eslint-disable max-len */
// import { useState } from 'react';
// import classNames from 'classnames';
import './AddNewPost.scss';
import { useState } from 'react';

enum PostType {
  freeGoods = 'безкоштовні речі',
  freeService = 'безкоштовні послуги',
  askHelp = 'запит допомоги',
  askDonate = 'збір донатів',
}

enum ServiceType {
  remotely = 'дистанційно',
  meeting = 'при зустрічі',
  office = 'за нашою адресою',
  home = 'приїдемо до вас',
}

enum DeliveryType {
  free = 'за свій рахунок',
  paid = 'за рахунок отримувача',
  ukrPoshta = 'Укр Пошта',
  novaPoshta = 'Нова Пошта',
  pickup = 'Самовивіз',
}

export const AddNewPost = () => {
  const [postType, setPostType] = useState<PostType>(PostType.freeGoods);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [delivery, setDelivery] = useState({
    free: false,
    paid: false,
    ukrPoshta: false,
    novaPoshta: false,
    pickup: false,
  });
  const [link, setLink] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [person, setPerson] = useState('');
  const [location, setLocation] = useState('');

  const categories = {
    [PostType.freeGoods]: ['взуття', 'речі', 'меблі', 'продукти', 'медикаменти', 'інше'],
    [PostType.freeService]: ['навчання', 'житло', 'транспорт', 'інше'],
    [PostType.askHelp]: ['житло', 'меблі', 'речі', 'інше'],
    [PostType.askDonate]: ['ЗСУ', 'екологія', 'тварини', 'інше'],
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setDelivery({ ...delivery, [name]: checked });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      postType,
      title,
      category,
      text,
      image: image || null,
      link: link || null,
      delivery,
      phone: phone || null,
      email: email || null,
      telegram: telegram || null,
      person,
      location: location || null,
    };

    console.log(data);
  };

  const postTypeValues = Object.values(PostType);
  const servicesTypeValues = Object.values(ServiceType);
  const deliveryTypeValues = Object.entries(DeliveryType);

  return (
    <div className="add-new-post">
      <h2 className="add-new-post__title">
        Нове оголошення
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="add-new-post__form-section">
          <p className="add-new-post__input-title">
            Тип оголошення*
          </p>

          {postTypeValues.map(item => (
            <label key={item} className="add-new-post__label">
              <input
                className="add-new-post__input"
                type="radio"
                value={item}
                checked={postType === item}
                onChange={() => setPostType(item)}
              />

              <span className="add-new-post__custom-radio-button" />

              {item}
            </label>
          ))}
        </div>

        <div className="add-new-post__form-section">
          <label htmlFor="input-title" className="add-new-post__input-title">
            Заголовок*
          </label>

          <p className="add-new-post__input-note">
            Довжина від 10 до 80 символів
          </p>

          <input
            type="text"
            id="input-title"
            className="add-new-post__input-field"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="add-new-post__form-section">
          <p className="add-new-post__input-title">
            Категорія*
          </p>

          {categories[postType].map(item => (
            <label key={item} className="add-new-post__label">
              <input
                className="add-new-post__input"
                type="radio"
                value={item}
                checked={category === item}
                onChange={() => setCategory(item)}
              />

              <span className="add-new-post__custom-radio-button" />

              {item}
            </label>
          ))}
        </div>

        <div className="add-new-post__form-section">
          <label htmlFor="input-text" className="add-new-post__input-title">
            Текст оголошення*
          </label>

          <p className="add-new-post__input-note">
            Введіть текст оголошення мінімум 10 слів
          </p>

          <textarea
            id="input-text"
            className="add-new-post__textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        <div className="add-new-post__form-section">
          <p className="add-new-post__input-title">
            Зображення
          </p>

          <p className="add-new-post__input-note">
            Намагайтесь додавати зображення квадратної форми, або зображення на яких основна інформація посереду, так як високі чи широкі зображення будуть обрізані до квадратної форми
          </p>

          <div className="add-new-post__image-box">
            <label htmlFor="input-image" className="add-new-post__image-label">
              {!image ? ('Обрати') : ('Змінити')}
            </label>

            {image.split('\\').pop()}
          </div>

          <input
            id="input-image"
            type="file"
            className="add-new-post__input-image"
            onChange={(event) => setImage(event.target.value)}
          />
        </div>

        {postType === PostType.freeGoods && (
          <div className="add-new-post__form-section">
            <p className="add-new-post__input-title">
              Умови доставки*
            </p>

            <p className="add-new-post__input-note">
              Оберіть хоча б один варіант чи декілька
            </p>

            {deliveryTypeValues.map(item => (
              <label key={item[0]} className="add-new-post__label">
                <input
                  className="add-new-post__input"
                  type="checkbox"
                  name={item[0]}
                  // checked={delivery[`${item[0]}`]}
                  onChange={handleCheckboxChange}
                />

                <span className="add-new-post__custom-checkbox" />

                {item[1]}
              </label>
            ))}
          </div>
        )}

        {postType === PostType.freeService && (
          <div className="add-new-post__form-section">
            <p className="add-new-post__input-title">
              Умови послуг*
            </p>

            <p className="add-new-post__input-note">
              Оберіть хоча б один варіант чи декілька
            </p>

            {servicesTypeValues.map(item => (
              <label key={item} className="add-new-post__label">
                <input
                  className="add-new-post__input"
                  type="checkbox"
                  value={item}
                  // checked={postType === item}
                  // onChange={() => setPostType(item)}
                />

                <span className="add-new-post__custom-checkbox" />

                {item}
              </label>
            ))}
          </div>
        )}

        {(postType === PostType.askDonate
        || postType === PostType.freeService) && (
          <div className="add-new-post__form-section">
            <label htmlFor="input-link" className="add-new-post__input-title">
              Посилання
            </label>

            <p className="add-new-post__input-note">
              Додоайте посилання (ваш сайт, сторінка в соц мережі чи відео на YouTube) на ресурс який більше розкриває інформацію про послугу чи збір донатів
            </p>

            <input
              type="text"
              id="input-link"
              className="add-new-post__input-field"
              value={link}
              onChange={(event) => setLink(event.target.value)}
            />
          </div>
        )}

        <div className="add-new-post__form-section">
          <p className="add-new-post__input-title">
            Засоби зв&apos;язку*
          </p>

          <p className="add-new-post__input-note">
            Оберіть та заповніть ті поля, якими вам буде зручно користуватись для зв&apos;язку, інші залиште порожніми. В полі Telegram потрібно вказати ваш username (його можно знайти в налаштуваннях) додавши спереду собачку
          </p>

          <div>
            <label
              htmlFor="input-phone"
              className="
                add-new-post__input-title
                add-new-post__input-title--contacts
              "
            >
              Телефон
            </label>

            <input
              type="text"
              id="input-phone"
              className="
                add-new-post__input-field
                add-new-post__input-field--contacts
              "
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+38 063 1234567"
            />
          </div>

          <div>
            <label
              htmlFor="input-email"
              className="
                add-new-post__input-title
                add-new-post__input-title--contacts
              "
            >
              E-mail
            </label>

            <input
              type="text"
              id="input-email"
              className="
                add-new-post__input-field
                add-new-post__input-field--contacts
              "
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your-email@mail.com"
            />
          </div>

          <div>
            <label
              htmlFor="input-telegram"
              className="
                add-new-post__input-title
                add-new-post__input-title--contacts
              "
            >
              Telegram
            </label>

            <input
              type="text"
              id="input-telegram"
              className="
                add-new-post__input-field
                add-new-post__input-field--contacts
              "
              value={telegram}
              onChange={(event) => setTelegram(event.target.value)}
              placeholder="@username"
            />
          </div>
        </div>

        <div className="add-new-post__form-section">
          <label htmlFor="input-title" className="add-new-post__input-title">
            Контактна особа
          </label>

          <input
            type="text"
            id="input-title"
            className="
              add-new-post__input-field
              add-new-post__input-field--contacts
            "
            value={person}
            onChange={(event) => setPerson(event.target.value)}
          />
        </div>

        {postType !== PostType.askDonate && (
          <div className="add-new-post__form-section">
            <label htmlFor="input-title" className="add-new-post__input-title">
              Місцезнаходження*
            </label>

            <input
              type="text"
              id="input-title"
              className="add-new-post__input-field"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        )}

        <button type="submit" className="add-new-post__button-submit">
          Зберегти
        </button>
      </form>
    </div>
  );
};
