import { AxiosResponse } from 'axios';
import { Tokens } from '../types/tokens';
import { httpClient } from '../http/httpClient';

function register(email: string, password: string): Promise<AxiosResponse> {
  return httpClient.post('/api/users/', { email, password });
}

function login(email: string, password: string): Promise<Tokens> {
  return httpClient.post('/api/users/jwt/create/', { email, password });
}

function resetPassword(email: string): Promise<AxiosResponse> {
  return httpClient.post('/api/users/reset_password/', { email });
}

function resetPasswordConfirm(
  uid: string,
  token: string,
  new_password: string,
): Promise<AxiosResponse> {
  return httpClient.post(
    '/api/users/reset_password_confirm/',
    { uid, token, new_password },
  );
}

function activate(uid: string, token: string) {
  return httpClient.post('/api/users/activation/', { uid, token });
}

type AccessToken = {
  access: string,
};

function refreshToken(refresh: string): Promise<AccessToken> {
  return httpClient.post('/api/users/jwt/refresh/', { refresh });
}

export const httpService = {
  register,
  login,
  resetPassword,
  resetPasswordConfirm,
  activate,
  refreshToken,
};