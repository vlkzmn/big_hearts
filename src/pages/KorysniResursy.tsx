/* eslint-disable max-len */
import './KorysniResursy.scss';

export const KorysniResursy = () => {
  return (
    <div className="korysni-resursy">
      <h1 className="korysni-resursy__title">
        Корисні ресурси
      </h1>

      <div className="korysni-resursy__link-box">
        <a
          href="https://palianytsia.com.ua/ua"
          className="korysni-resursy__link"
          target="_blank"
          rel="noreferrer"
        >
          Паляниця
        </a>

        <p>
          Це благодійний проект зі Львову, заснований підприємцями України за підтримки Благодійного фонду &quot;LITTERARUM CUPIDUS&quot;.
        </p>
      </div>

      <div className="korysni-resursy__link-box">
        <a
          href="https://www.razomforukraine.org/"
          className="korysni-resursy__link"
          target="_blank"
          rel="noreferrer"
        >
          RAZOM
        </a>

        <p>
          Спільно з IT-фахівцями та великими логістичними компаніями організували координаційну платформу, за допомогою якої можна зробити запит на гуманітарну допомогу
        </p>
      </div>

      <div className="korysni-resursy__link-box">
        <a
          href="https://savelife.in.ua/"
          className="korysni-resursy__link"
          target="_blank"
          rel="noreferrer"
        >
          Повернись Живим
        </a>

        <p>
          Це благодійний фонд компетентної допомоги армії, а також громадська організація, яка займається аналітикою у секторі безпеки та оборони, реалізує проєкти з реабілітації ветеранів через спорт
        </p>
      </div>

      <div className="korysni-resursy__link-box">
        <a
          href="https://napryamok.org/"
          className="korysni-resursy__link"
          target="_blank"
          rel="noreferrer"
        >
          Напрямок
        </a>

        <p>
          Постійно оновлюваний сайт з інформацією для людей, які постраждали від війни
        </p>
      </div>

      <div className="korysni-resursy__link-box">
        <a
          href="https://voices.org.ua/"
          className="korysni-resursy__link"
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
