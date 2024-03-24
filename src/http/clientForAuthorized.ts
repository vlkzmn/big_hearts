/* eslint-disable no-param-reassign */
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { createClient } from './index';
import { httpService } from '../services/httpService';
import { localStorageService } from '../services/localStorageService';

export const clientForAuthorized = createClient();

function onRequest(request: InternalAxiosRequestConfig)
  : InternalAxiosRequestConfig {
  const tokens = localStorageService.getTokens();

  if (tokens?.access && request.headers) {
    request.headers.Authorization = `Bearer ${tokens.access}`;
  }

  return request;
}

clientForAuthorized.interceptors.request.use(onRequest);

function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

async function onResponseError(error: AxiosError) {
  const originalRequest = error.config;

  if (error.response && error.response.status !== 401) {
    throw error;
  }

  const tokens = localStorageService.getTokens();

  if (tokens) {
    const token = await httpService.refreshToken(tokens.refresh);

    localStorageService.addAccessToken(token.access);
  }

  return originalRequest && clientForAuthorized.request(originalRequest);
}

clientForAuthorized.interceptors.response.use(
  onResponseSuccess,
  onResponseError,
);
