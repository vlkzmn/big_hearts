/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { DeliveryType, PostType, ServiceType } from '../types/inputTypes';
import './PostForm.scss';
import {
  emailValidate,
  phoneValidate,
  telegramValidate,
} from '../utils/validation';
import { categoriesList } from '../utils/categoriesList';
import { PostData } from '../types/postData';
import { authorizedService } from '../services/authorizedService';
import { Loading } from './Loading';

type CheckboxOptions = {
  [key: string]: boolean;
};

type Props = {
  post?: PostData;
  backToList?: (isPostChanged: boolean) => void;
};

const startDeliveryData = {
  free: false,
  paid: false,
  ukrPoshta: false,
  novaPoshta: false,
  pickup: false,
};

const startServicesData = {
  remotely: false,
  meeting: false,
  office: false,
  home: false,
};

export const PostForm: React.FC<Props> = ({ post, backToList }) => {
  const [postType, setPostType] = useState<PostType>(
    PostType['viddam-bezkoshtovno'],
  );
  const [categories, setCategories] = useState<[string, string][]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [donateLink, setDonateLink] = useState('');
  const [person, setPerson] = useState('');

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [category, setCategory] = useState('');
  const [hasCategoryError, setHasCategoryError] = useState(false);

  const [text, setText] = useState('');
  const [hasTextError, setHasTextError] = useState(false);

  const [delivery, setDelivery] = useState<CheckboxOptions>(startDeliveryData);
  const [hasDeliveryError, setHasDeliveryError] = useState(false);

  const [services, setServices] = useState<CheckboxOptions>(startServicesData);
  const [hasServicesError, setHasServicesError] = useState(false);

  const [phone, setPhone] = useState('');
  const [hasPhoneError, setHasPhoneError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [telegram, setTelegram] = useState('');
  const [hasTelegramError, setHasTelegramError] = useState(false);

  const [hasContactsError, setHasContactsError] = useState(false);

  const [location, setLocation] = useState('');
  const [hasLocationError, setHasLocationError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const postTypeKey = Object.keys(PostType).find(
      (key) => PostType[key as keyof typeof PostType] === postType,
    );

    setCategories(
      Object.entries(categoriesList[postTypeKey as keyof typeof PostType]),
    );
  }, [postType]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (post) {
      setPostType(PostType[post.type as keyof typeof PostType]);
      setCategories(
        Object.entries(categoriesList[post.type as keyof typeof PostType]),
      );
      setTitle(post.title);
      setCategory(post.category);
      setText(post.text);
      setPerson(post.person);

      if (post.image) {
        const fileName = post.image.split('/').pop() || 'image.jpg';

        const loadImage = async () => {
          try {
            const response = await fetch(post.image);
            const blob = await response.blob();

            const file = new File([blob], fileName, { type: response.headers.get('Content-Type') || 'application/octet-stream' });

            setImage(file);
          } catch (error) {
            console.error('Error loading image:', error);
          }
        };

        loadImage();
        setImageUrl(post.image);
      }

      if (post.link) {
        const links = post.link.split('|');

        if (links.length > 0) {
          setLink(links[0]);
        }

        if (links.length > 1) {
          setDonateLink(links[1]);
        }
      }

      if (post.phone) {
        setPhone(post.phone);
      }

      if (post.email) {
        setEmail(post.email);
      }

      if (post.telegram) {
        setTelegram(post.telegram);
      }

      if (post.location) {
        setLocation(post.location);
      }

      if (post.delivery) {
        const data = { ...startDeliveryData };

        post.delivery.split('|').forEach((item) => {
          data[item as keyof typeof DeliveryType] = true;
        });

        setDelivery(data);
      }

      if (post.services) {
        const data = { ...startServicesData };

        post.services.split('|').forEach((item) => {
          data[item as keyof typeof ServiceType] = true;
        });

        setServices(data);
      }
    }
  }, [post]);

  // useEffect(() => {
  //   const postTypeKey = Object.keys(PostType).find(
  //     (key) => PostType[key as keyof typeof PostType] === postType,
  //   );

  //   setCategories(
  //     Object.entries(categoriesList[postTypeKey as keyof typeof PostType]),
  //   );
  // }, [postType]);

  const handletPostType = (item: PostType) => {
    setPostType(item);
    setCategory('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    setHasCategoryError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setHasTextError(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];

      setImage(selectedImage);

      const selectedImageUrl = URL.createObjectURL(selectedImage);

      setImageUrl(selectedImageUrl);
    }
  };

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setDelivery({ ...delivery, [name]: checked });
    setHasDeliveryError(false);
  };

  const handleServicesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setServices({ ...services, [name]: checked });
    setHasServicesError(false);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    setHasPhoneError(false);
    setHasContactsError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
    setHasContactsError(false);
  };

  const handleTelegramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelegram(event.target.value);
    setHasTelegramError(false);
    setHasContactsError(false);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    setHasLocationError(false);
  };

  const clearFields = () => {
    setPostType(PostType['viddam-bezkoshtovno']);
    setTitle('');
    setCategory('');
    setText('');
    setImage(null);
    setImageUrl('');
    setLink('');
    setDonateLink('');
    setDelivery({
      free: false,
      paid: false,
      ukrPoshta: false,
      novaPoshta: false,
      pickup: false,
    });
    setServices({
      remotely: false,
      meeting: false,
      office: false,
      home: false,
    });
    setPhone('');
    setEmail('');
    setTelegram('');
    setPerson('');
    setLocation('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(
      'Перегляньте форму та виправте помилки підсвічені червоним',
    );

    // const deliveryValues = Object.values(delivery);
    // const servicesValues = Object.values(services);

    const deliveryItems = Object.entries(delivery)
      .map((item) => (item[1] ? item[0] : ''))
      .filter((item) => item);

    const servicesItems = Object.entries(services)
      .map((item) => (item[1] ? item[0] : ''))
      .filter((item) => item);

    // console.log(deliveryItems);
    console.log(servicesItems);

    if (title.length < 5 || title.length > 80) {
      setHasTitleError(true);
    }

    if (!category) {
      setHasCategoryError(true);
    }

    if (text.split(' ').length < 5 || text.length > 1000) {
      setHasTextError(true);
    }

    if (
      postType === PostType['viddam-bezkoshtovno']
      && deliveryItems.length < 1
    ) {
      setHasDeliveryError(true);
    }

    // if (postType === PostType['viddam-bezkoshtovno'] && deliveryValues.every(item => item === false)) {
    //   setHasDeliveryError(true);
    // }

    if (
      postType === PostType['proponuiu-posluhy']
      && servicesItems.length < 1
    ) {
      setHasServicesError(true);
    }

    if (!phone && !email && !telegram) {
      setHasContactsError(true);
    }

    if (!phoneValidate(phone) && phone !== '') {
      setHasPhoneError(true);
    }

    if (!emailValidate(email) && email !== '') {
      setHasEmailError(true);
    }

    if (!telegramValidate(telegram) && telegram !== '') {
      setHasTelegramError(true);
    }

    if (postType !== PostType['zbir-donativ'] && !location) {
      setHasLocationError(true);
    }

    if (
      (title.length >= 5 || title.length <= 80)
      && category
      && (text.split(' ').length >= 5 || text.length <= 1000)
      && ((postType === PostType['viddam-bezkoshtovno']
        && deliveryItems.length > 0
        && location)
        || (postType === PostType['proponuiu-posluhy']
          && servicesItems.length > 0
          && location)
        || (postType === PostType['zapyty-dopomohy'] && location)
        || (postType === PostType['zbir-donativ'] && !location))
      && (phoneValidate(phone)
        || emailValidate(email)
        || telegramValidate(telegram))
    ) {
      setErrorMessage('');

      const formData = new FormData();

      if (image && post?.image !== imageUrl) {
        formData.append('image_file', image);
      } else {
        formData.append('image', '');
      }

      const postType2 = Object.keys(PostType).find(
        (key) => PostType[key as keyof typeof PostType] === postType,
      );

      if (postType2) {
        formData.append('type', postType2);
      }

      formData.append('title', title);
      formData.append('category', category);
      formData.append('text', text);

      if (link) {
        formData.append('link', `${link}|${donateLink}`);
      }

      if (deliveryItems.length > 0) {
        formData.append('delivery', deliveryItems.join('|'));
      }

      if (servicesItems.length > 0) {
        formData.append('services', servicesItems.join('|'));
      }

      formData.append('phone', phone);

      formData.append('email', email);

      formData.append('telegram', telegram);

      // if (phone) {
      //   formData.append('phone', phone);
      // }

      // if (email) {
      //   formData.append('email', email);
      // }

      // if (telegram) {
      //   formData.append('telegram', telegram);
      // }

      if (person) {
        formData.append('person', person);
      }

      if (location) {
        formData.append('location', location);
      }

      setIsLoading(true);

      if (!post) {
        authorizedService
          .addNewPost(formData)
          .then(() => {
            setErrorMessage('Ооголошення успішно збережене');
            clearFields();
            setTimeout(() => {
              setErrorMessage('');
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }, 3000);
          })
          .catch(() => setErrorMessage(
            'Виникли проблеми зі збереженням оголошення, спробуйте пізніше',
          ))
          .finally(() => setIsLoading(false));
      } else {
        authorizedService
          .editPost(post.id, formData)
          .then(() => {
            setErrorMessage('Ооголошення успішно змінено');
            clearFields();
            setTimeout(() => {
              setErrorMessage('');
              if (backToList) {
                backToList(true);
              }
            }, 3000);
          })
          .catch(() => setErrorMessage(
            'Виникли проблеми зі збереженням оголошення, спробуйте пізніше',
          ))
          .finally(() => setIsLoading(false));
      }
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const postTypeValues = Object.values(PostType);
  const deliveryTypeValues = Object.entries(DeliveryType);
  const servicesTypeValues = Object.entries(ServiceType);

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        {!post && (
          <div className="post-form__form-section">
            <p className="post-form__input-title">Тип оголошення*</p>

            {postTypeValues.map((item) => (
              <label key={item} className="post-form__label">
                <input
                  className="post-form__input"
                  type="radio"
                  value={item}
                  checked={postType === item}
                  onChange={() => handletPostType(item)}
                // onChange={() => setPostType(item)}
                />

                <span className="post-form__custom-radio-button" />

                {item}
              </label>
            ))}
          </div>
        )}

        <div className="post-form__form-section">
          <label htmlFor="input-title" className="post-form__input-title">
            Заголовок*
          </label>

          <p className="post-form__input-note">Довжина від 5 до 80 символів</p>

          <input
            type="text"
            id="input-title"
            className={cn('post-form__input-field', {
              'post-form__input-field--error': hasTitleError,
            })}
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <p className="post-form__input-error">
              Введіть коректний заголовок
            </p>
          )}
        </div>

        <div className="post-form__form-section">
          <p className="post-form__input-title">Категорія*</p>

          {categories.map((item) => (
            <label key={item[0]} className="post-form__label">
              <input
                className="post-form__input"
                type="radio"
                value={item[0]}
                checked={category === item[0]}
                onChange={handleCategoryChange}
              />

              <span
                className={cn('post-form__custom-radio-button', {
                  'post-form__custom-radio-button--error': hasCategoryError,
                })}
              />
              {/* <span className="post-form__custom-radio-button" /> */}

              {item[1]}
            </label>
          ))}

          {hasCategoryError && (
            <p className="post-form__input-error">Оберіть одну з категорій</p>
          )}
        </div>

        <div className="post-form__form-section">
          <label htmlFor="input-text" className="post-form__input-title">
            Текст оголошення*
          </label>

          <p className="post-form__input-note">
            Введіть текст оголошення мінімум 5 слів, максимум 1000 символів
          </p>

          <textarea
            id="input-text"
            className={cn('post-form__textarea', {
              'post-form__textarea--error': hasTextError,
            })}
            // className="post-form__textarea"
            value={text}
            onChange={handleTextChange}
          />

          {hasTextError && (
            <p className="post-form__input-error">
              Введіть текст згідно з рекомендаціями
            </p>
          )}
        </div>

        <div className="post-form__form-section">
          <p className="post-form__input-title">Зображення</p>

          <p className="post-form__input-note">
            Намагайтесь додавати зображення квадратної форми або зображення, де
            основна інформація зосереджена в центрі. Високі або широкі
            зображення будуть обрізані до квадратної форми:
          </p>

          <div className="post-form__image-box">
            <label htmlFor="input-image" className="post-form__image-label">
              {!image ? 'Обрати' : 'Змінити'}
            </label>

            {imageUrl && <img src={imageUrl} className="post-form__thumbnails" alt="Обране зображення" />}
          </div>

          <input
            id="input-image"
            type="file"
            className="post-form__input-image"
            onChange={handleImageChange}
          />
        </div>

        {postType === PostType['viddam-bezkoshtovno'] && (
          <div className="post-form__form-section">
            <p className="post-form__input-title">Умови доставки*</p>

            <p className="post-form__input-note">
              Оберіть хоча б один варіант чи декілька
            </p>

            {deliveryTypeValues.map((item) => (
              <label key={item[0]} className="post-form__label">
                <input
                  className="post-form__input"
                  type="checkbox"
                  name={item[0]}
                  checked={delivery[item[0]]}
                  onChange={handleDeliveryChange}
                />

                <span
                  className={cn('post-form__custom-checkbox', {
                    'post-form__custom-checkbox--error': hasDeliveryError,
                  })}
                />

                {item[1]}
              </label>
            ))}

            {hasDeliveryError && (
              <p className="post-form__input-error">
                Оберіть хоча б один варіант
              </p>
            )}
          </div>
        )}

        {postType === PostType['proponuiu-posluhy'] && (
          <div className="post-form__form-section">
            <p className="post-form__input-title">Умови послуг*</p>

            <p className="post-form__input-note">
              Оберіть хоча б один варіант чи декілька
            </p>

            {servicesTypeValues.map((item) => (
              <label key={item[0]} className="post-form__label">
                <input
                  className="post-form__input"
                  type="checkbox"
                  name={item[0]}
                  checked={services[item[0]]}
                  onChange={handleServicesChange}
                />

                <span
                  className={cn('post-form__custom-checkbox', {
                    'post-form__custom-checkbox--error': hasServicesError,
                  })}
                />

                {item[1]}
              </label>
            ))}

            {hasServicesError && (
              <p className="post-form__input-error">
                Оберіть хоча б один варіант
              </p>
            )}
          </div>
        )}

        {(postType === PostType['zbir-donativ']
          || postType === PostType['proponuiu-posluhy']) && (
          <>
            <div className="post-form__form-section">
              <label htmlFor="input-link" className="post-form__input-title">
                Посилання
              </label>

              <p className="post-form__input-note">
                Додайте посилання на ресурс який більше розкриває інформацію про
                послугу чи збір донатів (ваш сайт, сторінка в соц мережі чи відео
                на YouTube)
              </p>

              <input
                type="text"
                id="input-link"
                className="post-form__input-field"
                value={link}
                onChange={(event) => setLink(event.target.value)}
              />
            </div>

            {postType === PostType['zbir-donativ'] && (
              <div className="post-form__form-section">
                <label htmlFor="input-link" className="post-form__input-title">
                  Посилання на збір
                </label>

                <p className="post-form__input-note">
                  Додайте посилання за яким користувач може зробити благодійний платіж
                </p>

                <input
                  type="text"
                  id="input-link"
                  className="post-form__input-field"
                  value={donateLink}
                  onChange={(event) => setDonateLink(event.target.value)}
                />
              </div>
            )}
          </>
        )}

        {/* Contacts */}
        <div className="post-form__form-section">
          <p className="post-form__input-title">Засоби зв&apos;язку*</p>

          <p className="post-form__input-note">
            Заповніть ті засоби, якими вам буде зручно користуватись для
            зв&apos;язку, інші залиште порожніми. У полях Телефон та Telegram
            потрібно вказати ваш номер телефону у форматі +380631234567 для
            генерації посилання
          </p>

          <div>
            <label
              htmlFor="input-phone"
              className="
                post-form__input-title
                post-form__input-title--contacts
              "
            >
              Телефон
            </label>

            <input
              type="tel"
              id="input-phone"
              className={cn(
                'post-form__input-field',
                'post-form__input-field--contacts',
                {
                  'post-form__input-field--error':
                    hasContactsError || hasPhoneError,
                },
              )}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+380631234567"
            />

            {hasPhoneError && (
              <p className="post-form__input-error">
                Не коректний номер телефону
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="input-email"
              className="
                post-form__input-title
                post-form__input-title--contacts
              "
            >
              E-mail
            </label>

            <input
              type="text"
              id="input-email"
              className={cn(
                'post-form__input-field',
                'post-form__input-field--contacts',
                {
                  'post-form__input-field--error':
                    hasContactsError || hasEmailError,
                },
              )}
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
            />

            {hasEmailError && (
              <p className="post-form__input-error">Не коректний email</p>
            )}
          </div>

          <div>
            <label
              htmlFor="input-telegram"
              className="
                post-form__input-title
                post-form__input-title--contacts
              "
            >
              Telegram
            </label>

            <input
              type="text"
              id="input-telegram"
              className={cn(
                'post-form__input-field',
                'post-form__input-field--contacts',
                {
                  'post-form__input-field--error':
                    hasContactsError || hasTelegramError,
                },
              )}
              value={telegram}
              onChange={handleTelegramChange}
              placeholder="+380631234567"
            />

            {hasTelegramError && (
              <p className="post-form__input-error">Не коректний номер</p>
            )}
          </div>

          {hasContactsError && (
            <p className="post-form__input-error">
              Оберіть хоча б один варіант
            </p>
          )}
        </div>

        {/* Person */}
        <div className="post-form__form-section">
          <label htmlFor="input-person" className="post-form__input-title">
            Контактна особа*
          </label>

          <input
            type="text"
            id="input-person"
            className="post-form__input-field"
            value={person}
            onChange={(event) => setPerson(event.target.value)}
          />
        </div>

        {/* Location */}
        {postType !== PostType['zbir-donativ'] && (
          <div className="post-form__form-section">
            <label htmlFor="input-title" className="post-form__input-title">
              Місцезнаходження*
            </label>

            <input
              type="text"
              id="input-title"
              className={cn('post-form__input-field', {
                'post-form__input-field--error': hasLocationError,
              })}
              value={location}
              onChange={handleLocationChange}
            />

            {hasLocationError && (
              <p className="post-form__input-error">
                Вквжіть ваше місцезнаходження
              </p>
            )}
          </div>
        )}

        <button type="submit" className="post-form__button-submit">
          Зберегти
        </button>
      </form>

      {isLoading ? (
        <div className="post-form__loading">
          <Loading />
        </div>
      )
        : errorMessage && (
          <div className="post-form__error-message">
            {errorMessage}
          </div>
        )}
    </div>
  );
};
