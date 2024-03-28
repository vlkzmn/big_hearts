import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.scss';

export const Search = () => {
  const [request, setRequest] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (request.trim()) {
      navigate(`/poshuk?text=${request.trim()}`);
    }

    setRequest('');
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="search"
        className="search__input"
        value={request}
        onChange={(event) => setRequest(event.target.value)}
        placeholder="пошук..."
      />

      <button
        type="submit"
        className="search__button"
        aria-label="кнопка пошуку"
      />
    </form>
  );
};
