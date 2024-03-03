import { createClient } from './index';

export const httpClient = createClient();

httpClient.interceptors.response.use(res => res.data);
