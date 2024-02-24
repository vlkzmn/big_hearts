/* eslint-disable max-len */
import dataProhibited from '../api/prohibited.json';
import './Prohibited.scss';

export const Prohibited = () => {
  return (
    <div className="prohibited">
      <h1 className="prohibited__title">
        Список заборонених оголошень
      </h1>

      <p className="prohibited__text">
        Користувачеві забороняється розміщувати Оголошення, що стосуються продажу та безоплатної передачі наступних Позицій (Заборонені позиції), і публікувати фотографії, які відносяться до наступних Позицій:
      </p>

      <ol>
        {dataProhibited.full.map(item => (
          <li key={item} className="prohibited__list">
            {item}
          </li>
        ))}
      </ol>

      <p className="prohibited__text">
        Користувачу обмежено дозволяється розміщувати Оголошення щодо продажу та безоплатної передачі наступних Позицій (Заборонені позиції) та публікувати фотографії, що стосуються наступних Позицій:
      </p>

      <ol>
        {dataProhibited.part.map(item => (
          <li key={item} className="prohibited__list">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
};
