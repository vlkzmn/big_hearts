/* eslint-disable no-console */
/* eslint-disable max-len */
import './Moderation.scss';

type Post = {
  id: number,
  title: string,
  image: string,
  text: string,
};

export const Moderation = () => {
  const data: Post[] = [
    {
      id: 1,
      title: 'Ноутбук Asus 17 дюймів',
      image: 'img/placeholder.png',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde minus sint officiis, iure consectetur veritatis sapiente ratione qui quam doloremque, exercitationem illum aspernatur labore quae nihil error deleniti fugiat alias animi explicabo perspiciatis vitae?',
    },
    {
      id: 2,
      title: 'Смартфон Samsung Galaxy Mega',
      image: 'img/placeholder.png',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde minus sint officiis, iure consectetur veritatis sapiente ratione qui quam doloremque, exercitationem illum aspernatur labore quae nihil error deleniti fugiat alias animi explicabo perspiciatis vitae?',
    },
  ];

  const handleAprove = (id: number) => {
    const requestData = {
      id,
      status: 'active',
    };

    console.log(requestData);
  };

  const handleReject = (id: number) => {
    const requestData = {
      id,
      status: 'rejected',
    };

    console.log(requestData);
  };

  return (
    <div className="moderation">
      {data.length > 0
        ? data.map(item => (
          <div className="moderation__post">
            <div className="moderation__content">
              <img src={item.image} className="moderation__image" alt={item.title} />

              <div className="moderation__text-content">
                <h3 className="moderation__title">
                  {item.title}
                </h3>

                <p className="moderation__text">
                  {item.text}
                </p>
              </div>
            </div>

            <div className="moderation__buttons">
              <button
                type="button"
                className="moderation__button"
                onClick={() => handleAprove(item.id)}
              >
                Погодити
              </button>

              <button
                type="button"
                className="moderation__button"
                onClick={() => handleReject(item.id)}
              >
                Відхилити
              </button>
            </div>
          </div>
        ))
        : (
          <p>
            Немає нових оголошень
          </p>
        )}
    </div>
  );
};
