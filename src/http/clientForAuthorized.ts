/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { createClient } from './index';
import { authService } from '../services/authService';
import { localStorageService } from '../services/localStorageService';

export const clientForAuthorized = createClient();

function onRequest(request: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
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
  const originalRequest = error.config; // в объекте error в свойтсве config хранится запрос который вернулся с ошибкой

  if (error.response && error.response.status !== 401) {
    throw error;
  }

  const tokens = localStorageService.getTokens();

  if (tokens) {
    const token = await authService.refreshToken(tokens.refresh);

    localStorageService.addAccessToken(token.access);
  }

  return originalRequest && clientForAuthorized.request(originalRequest); // отправляем запрос еще раз

  // try {
  //   const { accessToken } = await authService.refresh();

  //   accessTokenService.save(accessToken);

  //   return originalRequest && httpClient.request(originalRequest); // отправляем запрос еще раз
  // } catch (error) {
  //   throw error;
  // }
}

clientForAuthorized.interceptors.response.use(onResponseSuccess, onResponseError);
