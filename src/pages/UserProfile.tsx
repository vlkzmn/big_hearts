import { useEffect, useState } from 'react';
import './UserProfile.scss';
import { Authorization } from '../components/Authorization';

export const UserProfile = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleGetAccess = () => {
    setIsAuth(true);
  };

  useEffect(() => {
    if (localStorage.getItem('big_hearts_access_token')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        {!isAuth ? (
          <Authorization handleGetAccess={handleGetAccess} />
        ) : (
          <div className="user-profile__content">
            user-profile
          </div>
        )}
      </div>
    </div>
  );
};
