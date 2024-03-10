/* eslint-disable max-len */
import './UsefulResources.scss';

export const UsefulResources = () => {
  return (
    <div className="useful-resources">
      <h1 className="useful-resources__title">
        Корисні ресурси
      </h1>

      <div className="useful-resources__link-box">
        <a
          href="https://palianytsia.com.ua/ua"
          className="useful-resources__link"
          target="_blank"
          rel="noreferrer"
        >
          Паляниця
        </a>

        <p>
          Це благодійний проект зі Львову, заснований підприємцями України за підтримки Благодійного фонду &quot;LITTERARUM CUPIDUS&quot;.
        </p>
      </div>

      <div className="useful-resources__link-box">
        <a
          href="https://www.razomforukraine.org/"
          className="useful-resources__link"
          target="_blank"
          rel="noreferrer"
        >
          RAZOM
        </a>

        <p>
          Спільно з IT-фахівцями та великими логістичними компаніями організували координаційну платформу, за допомогою якої можна зробити запит на гуманітарну допомогу
        </p>
      </div>

      <div className="useful-resources__link-box">
        <a
          href="https://savelife.in.ua/"
          className="useful-resources__link"
          target="_blank"
          rel="noreferrer"
        >
          Повернись Живим
        </a>

        <p>
          Це благодійний фонд компетентної допомоги армії, а також громадська організація, яка займається аналітикою у секторі безпеки та оборони, реалізує проєкти з реабілітації ветеранів через спорт
        </p>
      </div>

      {/* <div className="useful-resources__link-box">
        <a
          href="https://napryamok.org/"
          className="useful-resources__link"
          target="_blank"
          rel="noreferrer"
        >
          Напрямок
        </a>

        <p>
          Постійно оновлюваний сайт з інформацією для людей, які постраждали від війни
        </p>
      </div> */}

      <div className="useful-resources__link-box">
        <a
          href="https://voices.org.ua/"
          className="useful-resources__link"
          target="_blank"
          rel="noreferrer"
        >
          Голоси дітей
        </a>

        <p>
          Організація для допомоги дітям, які постраждали від війни
        </p>
      </div>
    </div>
  );
};
