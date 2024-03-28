import { AxiosResponse } from 'axios';
import { Tokens } from '../types/tokens';
import { PostData } from '../types/postData';
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

type CategoryPostsData = {
  title: string,
  image: string,
  location: string,
  url: string,
};

function getPosts(
  type: string,
  category: string | null,
): Promise<CategoryPostsData[]> {
  return httpClient.post('/api/filter-posts/', { type, category });
}

function getSerchResult(search: string): Promise<CategoryPostsData[]> {
  return httpClient.post('/api/search/', { search });
}

function getPost(url: string): Promise<PostData> {
  return httpClient.post('/api/url/', { url });
}

export const httpService = {
  register,
  login,
  resetPassword,
  resetPasswordConfirm,
  activate,
  refreshToken,
  getPosts,
  getSerchResult,
  getPost,
};
