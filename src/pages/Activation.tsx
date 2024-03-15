/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Activation.scss';

import { Loading } from '../components/Loading';
import { httpService } from '../services/httpService';

export const Activation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setMessage('Відбувається активація облікового запису');

    if (uid && token) {
      httpService.activate(uid, token)
        .then(() => {
          setMessage('Активація пройшла успішно, через 5 секунд ви будите переадресовані на сторінку авторизації');
          setTimeout(() => navigate('/avtoryzatsiia'), 5000);
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            setMessage('Це посилання вже було використане для активації, спробуйте авторизуватись, через 10 секунд ви будите переадресовані на сторінку авторизації');
            setTimeout(() => navigate('/avtoryzatsiia'), 10000);
          } else {
            setMessage('Сталась якась помилка, спробуйте ще раз');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [uid, token, navigate]);

  return (
    <div className="activation">
      <p className="activation__message">
        {message}
      </p>

      {isLoading && <Loading />}
    </div>
  );
};
