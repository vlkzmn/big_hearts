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
