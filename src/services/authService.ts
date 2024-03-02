import { AxiosResponse } from 'axios';
import { authClient } from '../http/authClient';
import { Tokens } from '../types/tokens';

function register(email: string, password: string): Promise<AxiosResponse> {
  return authClient.post('/api/users/', { email, password });
}

function login(email: string, password: string): Promise<Tokens> {
  return authClient.post('/api/users/jwt/create/', { email, password });
}

function resetPassword(email: string): Promise<AxiosResponse> {
  return authClient.post('/api/users/reset_password/', { email });
}

function resetPasswordConfirm(
  uid: string,
  token: string,
  new_password: string,
): Promise<AxiosResponse> {
  return authClient.post(
    '/api/users/reset_password_confirm/',
    { uid, token, new_password },
  );
}

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
  resetPassword,
  resetPasswordConfirm,
  logout,
  activate,
  refresh,
};
