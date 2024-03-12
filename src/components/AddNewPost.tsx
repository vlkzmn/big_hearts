import './AddNewPost.scss';
import { PostForm } from './PostForm';

export const AddNewPost = () => {
  return (
    <div className="add-new-post">
      <h2 className="add-new-post__title">
        Нове оголошення
      </h2>

      <PostForm />
    </div>
  );
};
// import { useEffect, useState } from 'react';
// import cn from 'classnames';
// import { DeliveryType, PostType, ServiceType } from '../types/inputTypes';
// import './AddNewPost.scss';
// import { emailValidate, phoneValidate, telegramValidate } from '../utils/validation';
// import { categoriesList } from '../types/categoriesList';

// type CheckboxOptions = {
//   [key: string]: boolean;
// };

// export const AddNewPost = () => {
//   const [postType, setPostType] = useState<PostType>(PostType['viddam-bezkoshtovno']);
//   const [categories, setCategories] = useState<[string, string][]>([]);
//   const [image, setImage] = useState('');
//   const [link, setLink] = useState('');
//   const [person, setPerson] = useState('');

//   const [title, setTitle] = useState('');
//   const [hasTitleError, setHasTitleError] = useState(false);

//   const [category, setCategory] = useState('');
//   const [hasCategoryError, setHasCategoryError] = useState(false);

//   const [text, setText] = useState('');
//   const [hasTextError, setHasTextError] = useState(false);

//   const [delivery, setDelivery] = useState<CheckboxOptions>({
//     free: false,
//     paid: false,
//     ukrPoshta: false,
//     novaPoshta: false,
//     pickup: false,
//   });
//   const [hasDeliveryError, setHasDeliveryError] = useState(false);

//   const [services, setServices] = useState<CheckboxOptions>({
//     remotely: false,
//     meeting: false,
//     office: false,
//     home: false,
//   });
//   const [hasServicesError, setHasServicesError] = useState(false);

//   const [phone, setPhone] = useState('');
//   const [hasPhoneError, setHasPhoneError] = useState(false);

//   const [email, setEmail] = useState('');
//   const [hasEmailError, setHasEmailError] = useState(false);

//   const [telegram, setTelegram] = useState('');
//   const [hasTelegramError, setHasTelegramError] = useState(false);

//   const [hasContactsError, setHasContactsError] = useState(false);

//   const [location, setLocation] = useState('');
//   const [hasLocationError, setHasLocationError] = useState(false);

//   const [errorMessage, setErrorMessage] = useState('');

//   // const categories = {
//   //   [PostType['viddam-bezkoshtovno']]: ['взуття', 'речі', 'меблі', 'продукти', 'медикаменти', 'інше'],
//   //   [PostType['proponuiu-posluhy']]: ['навчання', 'житло', 'транспорт', 'інше'],
//   //   [PostType['zapyty-dopomohy']]: ['житло', 'меблі', 'речі', 'інше'],
//   //   [PostType['zbir-donativ']]: ['ЗСУ', 'екологія', 'тварини', 'інше'],
//   // };

//   useEffect(() => {
//     const postTypeKey = Object.keys(PostType).find(key => PostType[key as keyof typeof PostType] === postType);

//     setCategories(Object.entries(categoriesList[postTypeKey as keyof typeof PostType]));
//   }, [postType]);

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(event.target.value);
//     setHasTitleError(false);
//   };

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCategory(event.target.value);
//     setHasCategoryError(false);
//   };

//   const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setText(event.target.value);
//     setHasTextError(false);
//   };

//   const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = event.target;

//     setDelivery({ ...delivery, [name]: checked });
//     setHasDeliveryError(false);
//   };

//   const handleServicesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = event.target;

//     setServices({ ...services, [name]: checked });
//     setHasServicesError(false);
//   };

//   const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPhone(event.target.value);
//     setHasPhoneError(false);
//     setHasContactsError(false);
//   };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//     setHasEmailError(false);
//     setHasContactsError(false);
//   };

//   const handleTelegramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTelegram(event.target.value);
//     setHasTelegramError(false);
//     setHasContactsError(false);
//   };

//   const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLocation(event.target.value);
//     setHasLocationError(false);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setErrorMessage('Перегляньте форму та виправте помилки підсвічені червоним');

//     // const deliveryValues = Object.values(delivery);
//     // const servicesValues = Object.values(services);

//     const deliveryItems = Object.entries(delivery)
//       .map(item => (item[1] ? item[0] : ''))
//       .filter(item => item);

//     const servicesItems = Object.entries(services)
//       .map(item => (item[1] ? item[0] : ''))
//       .filter(item => item);

//     console.log(deliveryItems);
//     console.log(servicesItems);

//     if (title.length < 5 || title.length > 80) {
//       setHasTitleError(true);
//     }

//     if (!category) {
//       setHasCategoryError(true);
//     }

//     if (text.split(' ').length < 5 || text.length > 1000) {
//       setHasTextError(true);
//     }

//     if (postType === PostType['viddam-bezkoshtovno'] && deliveryItems.length < 1) {
//       setHasDeliveryError(true);
//     }

//     // if (postType === PostType['viddam-bezkoshtovno'] && deliveryValues.every(item => item === false)) {
//     //   setHasDeliveryError(true);
//     // }

//     if (postType === PostType['proponuiu-posluhy'] && servicesItems.length < 1) {
//       setHasServicesError(true);
//     }

//     if (!phone && !email && !telegram) {
//       setHasContactsError(true);
//     }

//     if (!phoneValidate(phone) && phone !== '') {
//       setHasPhoneError(true);
//     }

//     if (!emailValidate(email) && email !== '') {
//       setHasEmailError(true);
//     }

//     if (!telegramValidate(telegram) && telegram !== '') {
//       setHasTelegramError(true);
//     }

//     if (postType !== PostType['zbir-donativ'] && !location) {
//       setHasLocationError(true);
//     }

//     if ((title.length >= 5 || title.length <= 80)
//       && category
//       && (text.split(' ').length >= 5 || text.length <= 1000)
//       && ((postType === PostType['viddam-bezkoshtovno'] && deliveryItems.length > 0 && location)
//       || (postType === PostType['proponuiu-posluhy'] && servicesItems.length > 0 && location)
//       || (postType === PostType['zapyty-dopomohy'] && location)
//       || (postType === PostType['zbir-donativ'] && !location))
//       && (phoneValidate(phone) || emailValidate(email) || telegramValidate(telegram))) {
//       setErrorMessage('');

//       const data = {
//         postType: Object.keys(PostType).find(key => PostType[key as keyof typeof PostType] === postType),
//         title,
//         category,
//         text,
//         link: link || null,
//         delivery: deliveryItems.length > 0 ? deliveryItems : null,
//         services: servicesItems.length > 0 ? servicesItems : null,
//         phone: phone || null,
//         email: email || null,
//         telegram: telegram || null,
//         person: person || null,
//         location: location || null,
//       };

//       console.log(data);

//       const formData = new FormData();

//       formData.append('image', image);
//       formData.append('data', JSON.stringify(data));

//       setPostType(PostType['viddam-bezkoshtovno']);
//       setTitle('');
//       setCategory('');
//       setText('');
//       setImage('');
//       setLink('');
//       setDelivery({
//         free: false,
//         paid: false,
//         ukrPoshta: false,
//         novaPoshta: false,
//         pickup: false,
//       });
//       setServices({
//         remotely: false,
//         meeting: false,
//         office: false,
//         home: false,
//       });
//       setPhone('');
//       setEmail('');
//       setTelegram('');
//       setPerson('');
//       setLocation('');
//     }

//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   const postTypeValues = Object.values(PostType);
//   const deliveryTypeValues = Object.entries(DeliveryType);
//   const servicesTypeValues = Object.entries(ServiceType);

//   return (
//     <div className="add-new-post">
//       <h2 className="add-new-post__title">
//         Нове оголошення
//       </h2>

//       <form onSubmit={handleSubmit}>
//         <div className="add-new-post__form-section">
//           <p className="add-new-post__input-title">
//             Тип оголошення*
//           </p>

//           {postTypeValues.map(item => (
//             <label key={item} className="add-new-post__label">
//               <input
//                 className="add-new-post__input"
//                 type="radio"
//                 value={item}
//                 checked={postType === item}
//                 onChange={() => setPostType(item)}
//               />

//               <span className="add-new-post__custom-radio-button" />

//               {item}
//             </label>
//           ))}
//         </div>

//         <div className="add-new-post__form-section">
//           <label htmlFor="input-title" className="add-new-post__input-title">
//             Заголовок*
//           </label>

//           <p className="add-new-post__input-note">
//             Довжина від 5 до 80 символів
//           </p>

//           <input
//             type="text"
//             id="input-title"
//             className={cn(
//               'add-new-post__input-field',
//               { 'add-new-post__input-field--error': hasTitleError },
//             )}
//             value={title}
//             onChange={handleTitleChange}
//           />

//           {hasTitleError && (
//             <p className="add-new-post__input-error">
//               Введіть коректний заголовок
//             </p>
//           )}
//         </div>

//         <div className="add-new-post__form-section">
//           <p className="add-new-post__input-title">
//             Категорія*
//           </p>

//           {categories.map(item => (
//             <label key={item[0]} className="add-new-post__label">
//               <input
//                 className="add-new-post__input"
//                 type="radio"
//                 value={item[0]}
//                 checked={category === item[0]}
//                 onChange={handleCategoryChange}
//               />

//               <span className={cn(
//                 'add-new-post__custom-radio-button',
//                 { 'add-new-post__custom-radio-button--error': hasCategoryError },
//               )}
//               />
//               {/* <span className="add-new-post__custom-radio-button" /> */}

//               {item[1]}
//             </label>
//           ))}

//           {hasCategoryError && (
//             <p className="add-new-post__input-error">
//               Оберіть одну з категорій
//             </p>
//           )}
//         </div>

//         <div className="add-new-post__form-section">
//           <label htmlFor="input-text" className="add-new-post__input-title">
//             Текст оголошення*
//           </label>

//           <p className="add-new-post__input-note">
//             Введіть текст оголошення мінімум 5 слів, максимум 1000 символів
//           </p>

//           <textarea
//             id="input-text"
//             className={cn(
//               'add-new-post__textarea',
//               { 'add-new-post__textarea--error': hasTextError },
//             )}
//             // className="add-new-post__textarea"
//             value={text}
//             onChange={handleTextChange}
//           />

//           {hasTextError && (
//             <p className="add-new-post__input-error">
//               Введіть текст згідно з рекомендаціями
//             </p>
//           )}
//         </div>

//         <div className="add-new-post__form-section">
//           <p className="add-new-post__input-title">
//             Зображення
//           </p>

//           <p className="add-new-post__input-note">
//             Намагайтесь додавати зображення квадратної форми або зображення, де основна інформація зосереджена в центрі. Високі або широкі зображення будуть обрізані до квадратної форми:
//           </p>

//           <div className="add-new-post__image-box">
//             <label htmlFor="input-image" className="add-new-post__image-label">
//               {!image ? ('Обрати') : ('Змінити')}
//             </label>

//             {image.split('\\').pop()}
//           </div>

//           <input
//             id="input-image"
//             type="file"
//             className="add-new-post__input-image"
//             onChange={(event) => setImage(event.target.value)}
//           />
//         </div>

//         {postType === PostType['viddam-bezkoshtovno'] && (
//           <div className="add-new-post__form-section">
//             <p className="add-new-post__input-title">
//               Умови доставки*
//             </p>

//             <p className="add-new-post__input-note">
//               Оберіть хоча б один варіант чи декілька
//             </p>

//             {deliveryTypeValues.map(item => (
//               <label key={item[0]} className="add-new-post__label">
//                 <input
//                   className="add-new-post__input"
//                   type="checkbox"
//                   name={item[0]}
//                   checked={delivery[item[0]]}
//                   onChange={handleDeliveryChange}
//                 />

//                 <span className={cn(
//                   'add-new-post__custom-checkbox',
//                   { 'add-new-post__custom-checkbox--error': hasDeliveryError },
//                 )}
//                 />

//                 {item[1]}
//               </label>
//             ))}

//             {hasDeliveryError && (
//               <p className="add-new-post__input-error">
//                 Оберіть хоча б один варіант
//               </p>
//             )}
//           </div>
//         )}

//         {postType === PostType['proponuiu-posluhy'] && (
//           <div className="add-new-post__form-section">
//             <p className="add-new-post__input-title">
//               Умови послуг*
//             </p>

//             <p className="add-new-post__input-note">
//               Оберіть хоча б один варіант чи декілька
//             </p>

//             {servicesTypeValues.map(item => (
//               <label key={item[0]} className="add-new-post__label">
//                 <input
//                   className="add-new-post__input"
//                   type="checkbox"
//                   name={item[0]}
//                   checked={delivery[item[0]]}
//                   onChange={handleServicesChange}
//                 />

//                 <span className={cn(
//                   'add-new-post__custom-checkbox',
//                   { 'add-new-post__custom-checkbox--error': hasServicesError },
//                 )}
//                 />

//                 {item[1]}
//               </label>
//             ))}

//             {hasServicesError && (
//               <p className="add-new-post__input-error">
//                 Оберіть хоча б один варіант
//               </p>
//             )}
//           </div>
//         )}

//         {(postType === PostType['zbir-donativ']
//         || postType === PostType['proponuiu-posluhy']) && (
//           <div className="add-new-post__form-section">
//             <label htmlFor="input-link" className="add-new-post__input-title">
//               Посилання
//             </label>

//             <p className="add-new-post__input-note">
//               Додоайте посилання на ресурс який більше розкриває інформацію про послугу чи збір донатів (ваш сайт, сторінка в соц мережі чи відео на YouTube)
//             </p>

//             <input
//               type="text"
//               id="input-link"
//               className="add-new-post__input-field"
//               value={link}
//               onChange={(event) => setLink(event.target.value)}
//             />
//           </div>
//         )}

//         <div className="add-new-post__form-section">
//           <p className="add-new-post__input-title">
//             Засоби зв&apos;язку*
//           </p>

//           <p className="add-new-post__input-note">
//             Заповніть ті засоби, якими вам буде зручно користуватись для зв&apos;язку, інші залиште порожніми. У полях Телефон та Telegram потрібно вказати ваш номер телефону у форматі +380631234567 для генерації посилання
//           </p>

//           <div>
//             <label
//               htmlFor="input-phone"
//               className="
//                 add-new-post__input-title
//                 add-new-post__input-title--contacts
//               "
//             >
//               Телефон
//             </label>

//             <input
//               type="tel"
//               id="input-phone"
//               className={cn(
//                 'add-new-post__input-field',
//                 'add-new-post__input-field--contacts',
//                 { 'add-new-post__input-field--error': hasContactsError || hasPhoneError },
//               )}
//               value={phone}
//               onChange={handlePhoneChange}
//               placeholder="+380631234567"
//             />

//             {hasPhoneError && (
//               <p className="add-new-post__input-error">
//                 Не коректний номер телефону
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="input-email"
//               className="
//                 add-new-post__input-title
//                 add-new-post__input-title--contacts
//               "
//             >
//               E-mail
//             </label>

//             <input
//               type="text"
//               id="input-email"
//               className={cn(
//                 'add-new-post__input-field',
//                 'add-new-post__input-field--contacts',
//                 { 'add-new-post__input-field--error': hasContactsError || hasEmailError },
//               )}
//               value={email}
//               onChange={handleEmailChange}
//               placeholder="your@email.com"
//             />

//             {hasEmailError && (
//               <p className="add-new-post__input-error">
//                 Не коректний email
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="input-telegram"
//               className="
//                 add-new-post__input-title
//                 add-new-post__input-title--contacts
//               "
//             >
//               Telegram
//             </label>

//             <input
//               type="text"
//               id="input-telegram"
//               className={cn(
//                 'add-new-post__input-field',
//                 'add-new-post__input-field--contacts',
//                 { 'add-new-post__input-field--error': hasContactsError || hasTelegramError },
//               )}
//               value={telegram}
//               onChange={handleTelegramChange}
//               placeholder="+380631234567"
//             />

//             {hasTelegramError && (
//               <p className="add-new-post__input-error">
//                 Не коректний номер
//               </p>
//             )}
//           </div>

//           {hasContactsError && (
//             <p className="add-new-post__input-error">
//               Оберіть хоча б один варіант
//             </p>
//           )}
//         </div>

//         <div className="add-new-post__form-section">
//           <label htmlFor="input-person" className="add-new-post__input-title">
//             Контактна особа
//           </label>

//           <input
//             type="text"
//             id="input-person"
//             className="add-new-post__input-field"
//             value={person}
//             onChange={(event) => setPerson(event.target.value)}
//           />
//         </div>

//         {postType !== PostType['zbir-donativ'] && (
//           <div className="add-new-post__form-section">
//             <label htmlFor="input-title" className="add-new-post__input-title">
//               Місцезнаходження*
//             </label>

//             <input
//               type="text"
//               id="input-title"
//               className={cn(
//                 'add-new-post__input-field',
//                 { 'add-new-post__input-field--error': hasLocationError },
//               )}
//               value={location}
//               onChange={handleLocationChange}
//             />

//             {hasLocationError && (
//               <p className="add-new-post__input-error">
//                 Вквжіть ваше місцезнаходження
//               </p>
//             )}
//           </div>
//         )}

//         <button type="submit" className="add-new-post__button-submit">
//           Зберегти
//         </button>
//       </form>

//       <div className="add-new-post__error-message">
//         {errorMessage}
//       </div>
//     </div>
//   );
// };
