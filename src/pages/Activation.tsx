/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import './Activation.scss';

export const Activation = () => {
  const { token } = useParams();
  // const navigate = useNavigate();
  const [message, setMessage] = useState('Відбувається активація облікового запису');

  useEffect(() => {
    if (token) {
      // navigate('/oblikovyi-zapys');
      setMessage('Сталася помилка, спробуйте ще раз');
    }
  }, [token]);

  return (
    <div className="activation">
      <p>
        {message}
      </p>

      <Loading />
    </div>
  );
};
