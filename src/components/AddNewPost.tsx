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

enum DeliveryType {
  free = 'за свій рахунок',
  paid = 'за рахунок отримувача',
  ukrPoshta = 'Укр Пошта',
  novaPoshta = 'Нова Пошта',
}

export const AddNewPost = () => {
  const [postType, setPostType] = useState<PostType>(PostType.freeGoods);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');

  const handleSubmit = () => {

  };

  const postTypeValues = Object.values(PostType);
  const deliveryTypeValues = Object.values(DeliveryType);

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

          <input
            type="text"
            id="input-title"
            className="add-new-post__input-field"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="add-new-post__form-section">
          <label htmlFor="input-text" className="add-new-post__input-title">
            Опис оголошення*
          </label>

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

            {deliveryTypeValues.map(item => (
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
            />
          </div>
        </div>

        <button type="submit" className="add-new-post__button-submit">
          Зберегти
        </button>
      </form>
    </div>
  );
};
