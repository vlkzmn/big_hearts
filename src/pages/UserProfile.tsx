import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import './UserProfile.scss';

export const UserProfile = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('big_hearts_access_token')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        {!isAuth ? (
          <Navigate to="/avtoryzatsiia" />
        ) : (
          <div className="user-profile__content">
            user-profile
          </div>
        )}
      </div>
    </div>
  );
};
