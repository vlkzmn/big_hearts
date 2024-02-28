/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

export const httpClient = createClient();

function onRequest(request: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken && request.headers) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
}

httpClient.interceptors.request.use(onRequest);

function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

async function onResponseError(error: AxiosError) {
  const originalRequest = error.config; // в объекте error в свойтсве config хранится запрос который вернулся с ошибкой

  if (error.response && error.response.status !== 401) {
    throw error;
  }

  const accessToken = await authService.refresh();

  accessTokenService.save(accessToken);

  return originalRequest && httpClient.request(originalRequest); // отправляем запрос еще раз

  // try {
  //   const { accessToken } = await authService.refresh();

  //   accessTokenService.save(accessToken);

  //   return originalRequest && httpClient.request(originalRequest); // отправляем запрос еще раз
  // } catch (error) {
  //   throw error;
  // }
}

httpClient.interceptors.response.use(onResponseSuccess, onResponseError);
