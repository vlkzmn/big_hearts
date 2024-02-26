import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import './Activation.scss';

export const Activation = () => {
  const { uid, token } = useParams();

  // const navigate = useNavigate();
  const [message, setMessage]
  = useState('Відбувається активація облікового запису');

  useEffect(() => {
    if (token) {
      // navigate('/oblikovyi-zapys');
      setMessage('Відбувається активація облікового запису');
    }
  }, [token]);

  return (
    <div className="activation">
      <p>
        {token}
      </p>
      <p>
        {uid}
      </p>
      <p>
        {message}
      </p>

      <Loading />
    </div>
  );
};
