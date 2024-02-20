import { useNavigate, useParams } from 'react-router-dom';

export const Activation = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  if (token) {
    navigate('/oblikovyi-zapys');
  }
};
