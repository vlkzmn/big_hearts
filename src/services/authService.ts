/* eslint-disable max-len */
import { AxiosResponse } from 'axios';
import { authClient } from '../http/authClient';

function register(email: string, password: string): Promise<AxiosResponse> {
  return authClient.post('/api/users/', { email, password });
}

function login(email: string, password: string): Promise<AxiosResponse> {
  return authClient.post('/api/users/jwt/create/', { email, password });
}

// function register({ email, password }: { email: string, password: string }): Promise<AxiosResponse> {
//   return authClient.post('/api/users/', { email, password });
// }

// function login({ email, password }: { email: string, password: string }): Promise<AxiosResponse> {
//   return authClient.post('/login', { email, password });
// }

function logout() {
  return authClient.post('/logout');
}

function activate(uid: string, token: string) {
  return authClient.post('/api/users/activation/', { uid, token });
}

function refresh(): Promise<string> {
  return authClient.get('/api/users/jwt/refresh/');
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
};
