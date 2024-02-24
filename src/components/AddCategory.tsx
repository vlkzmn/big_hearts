import { useState } from 'react';
import './AddCategory.scss';

enum PostType {
  freeGoods = 'безкоштовні речі',
  freeService = 'безкоштовні послуги',
  askHelp = 'запит допомоги',
  askDonate = 'збір донатів',
}

export const AddCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [postType, setPostType] = useState<PostType>(PostType.freeGoods);
  const postTypeValues = Object.values(PostType);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="add-category">
      <form onSubmit={handleSubmit}>
        <div className="add-new-post__form-section">
          <p className="add-new-post__input-title">
            Тип категорії
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
            Нова категорія
          </label>

          <input
            type="text"
            id="input-title"
            className="add-new-post__input-field"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
        </div>

        <button type="submit" className="add-new-post__button-submit">
          Зберегти
        </button>
      </form>
    </div>
  );
};
