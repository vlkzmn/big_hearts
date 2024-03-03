import { AxiosResponse } from 'axios';
import { clientForAuthorized } from '../http/clientForAuthorized';

function deleteProfile(current_password: string): Promise<AxiosResponse> {
  const data = {
    current_password,
  };

  return clientForAuthorized.delete('/api/users/me/', { data });
}

type Email = {
  email: string,
};

function checkAuthorized(): Promise<Email> {
  return clientForAuthorized.get('/api/users/me/');
}

// function verifyToken(token: string): Promise<AxiosResponse> {
//   return clientForAuthorized.post('/api/users/jwt/verify/', { token });
// }

// function getEmail(): Promise<string> {
//   return clientForAuthorized.delete('/api/users/me/');
// }

export const authorizedService = {
  deleteProfile,
  checkAuthorized,
  // getEmail,
};
