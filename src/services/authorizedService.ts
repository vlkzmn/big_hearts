import { AxiosResponse } from 'axios';
import { clientForAuthorized } from '../http/clientForAuthorized';

function changeEmail(
  current_password: string,
  new_email: string,
): Promise<AxiosResponse> {
  return clientForAuthorized.post(
    '/api/users/set_email/',
    { current_password, new_email },
  );
}

function changePassword(
  new_password: string,
  current_password: string,
): Promise<AxiosResponse> {
  return clientForAuthorized.post(
    '/api/users/set_password/',
    { new_password, current_password },
  );
}

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
  changeEmail,
  changePassword,
  deleteProfile,
  checkAuthorized,
  // getEmail,
};
