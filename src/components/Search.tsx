import { useState } from 'react';
import './Search.scss';

export const Search = () => {
  const [request, setRequest] = useState('');

  return (
    <form className="search">
      <input
        type="search"
        className="search__input"
        value={request}
        onChange={(event) => setRequest(event.target.value)}
        placeholder="пошук..."
      />

      <div className="search__button-box">
        <button
          type="submit"
          className="search__button"
          aria-label="кнопка пошуку"
        />
      </div>
    </form>
  );
};
