import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: 'https://bighearts.onrender.com',
    withCredentials: true,
  });
}
