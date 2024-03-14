/* eslint-disable no-console */
/* eslint-disable max-len */
import { useState } from 'react';
import cn from 'classnames';
import { PostData, Status } from '../types/postData';
import './MyPosts.scss';

import { PostForm } from './PostForm';

export const MyPosts = () => {
  const data: PostData[] = [
    {
      id: 1,
      postType: 'viddam-bezkoshtovno',
      title: 'Ноутбук Asus 17 дюймів',
      category: 'technika',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde minus sint officiis, iure consectetur veritatis sapiente ratione qui quam doloremque, exercitationem illum aspernatur labore quae nihil error deleniti fugiat alias animi explicabo perspiciatis vitae?',
      image: 'img/placeholder.png',
      url: 'url',
      delivery: ['free', 'novaPoshta', 'ukrPoshta'],
      services: null,
      phone: '+380633485206',
      email: 'vlkzmn@gmail.com',
      telegram: '+380633485206',
      link: 'https://velyki-sertsia.pp.ua/',
      location: 'Київ',
      person: 'Володимир',
      status: 'active',
    },
    {
      id: 2,
      postType: 'proponuiu-posluhy',
      title: 'Ноутбук HP 15 дюймів',
      category: 'robota',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde minus sint officiis, iure consectetur veritatis sapiente ratione qui quam doloremque, exercitationem illum aspernatur labore quae nihil error deleniti fugiat alias animi explicabo perspiciatis vitae?',
      image: 'img/placeholder.png',
      url: 'url',
      delivery: null,
      services: ['remotely', 'meeting'],
      phone: '+380633485206',
      email: 'vlkzmn@gmail.com',
      telegram: '+380633485206',
      link: 'https://velyki-sertsia.pp.ua/',
      location: 'Київ',
      person: 'Володимир',
      status: 'rejected',
    },
    {
      id: 3,
      postType: 'viddam-bezkoshtovno',
      title: 'Ноутбук Acer 14 дюймів',
      category: 'technika',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde minus sint officiis, iure consectetur veritatis sapiente ratione qui quam doloremque, exercitationem illum aspernatur labore quae nihil error deleniti fugiat alias animi explicabo perspiciatis vitae?',
      image: 'img/placeholder.png',
      url: 'url',
      delivery: ['free', 'novaPoshta', 'ukrPoshta'],
      services: null,
      phone: '+380633485206',
      email: 'vlkzmn@gmail.com',
      telegram: '+380633485206',
      link: 'https://velyki-sertsia.pp.ua/',
      location: 'Київ',
      person: 'Володимир',
      status: 'new',
    },
  ];
  const [post, setPost] = useState<PostData | null>(null);

  const handleEdit = (item: PostData) => {
    setPost(item);
  };

  const handleBackToList = () => {
    setPost(null);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <div className="my-posts">
      {post
        ? (
          <>
            <h2 className="my-posts__title">
              Редагування
            </h2>

            <PostForm post={post} />

            <button
              type="button"
              className="my-posts__button"
              onClick={handleBackToList}
            >
              Відмінити редагування
            </button>
          </>
        ) : (
          <>
            <h2 className="my-posts__title">
              Мої оголошення
            </h2>

            {data.length > 0 ? data.map(item => (
              <div className="my-posts__post" key={item.id}>
                <p className={cn(
                  'my-posts__status',
                  { 'my-posts__status--active': item.status === 'active' },
                  { 'my-posts__status--rejected': item.status === 'rejected' },
                )}
                >
                  {Status[item.status as keyof typeof Status]}
                </p>

                <div className="my-posts__content">
                  <img
                    src={item.image}
                    className="my-posts__image"
                    alt={item.title}
                  />

                  <div className="moderation__text-content">
                    <h3 className="moderation__title">
                      {item.title}
                    </h3>

                    <p className="moderation__text">
                      {item.text}
                    </p>
                  </div>
                </div>

                <div className="my-posts__buttons">
                  <button
                    type="button"
                    className="my-posts__button"
                    onClick={() => handleEdit(item)}
                  >
                    Редагувати
                  </button>

                  <button
                    type="button"
                    className="my-posts__button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            )) : (
              <p>
                У вас поки що немає оголошень
              </p>
            )}
          </>
        )}
    </div>
  );
};
