// src/services/api.ts
import axios from 'axios';
import { Notify } from 'quasar';

const apiUrl = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl || '', // базовый URL вашего API
  timeout: 180 * 1000, // Таймаут для запросов
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерцепторы (например, токен авторизации)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error(error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // console.warn('401 error');
          // store.dispatch('auth/removeToken');
          // router.push({ name: 'login' });
          break;
        case 413:
          Notify.create({
            color: 'red',
            textColor: 'white',
            icon: 'error',
            caption: error.message,
            position: 'top',
            message: 'Файл слишком большой',
          });
          return Promise.reject(error);
        case 422:

          Notify.create({
            color: 'red',
            textColor: 'white',
            icon: 'error',
            message: Object.values(error.response.data.errors)
              .map((err) => `• ${err}`)
              .join('<br>'),
            caption: error.message,
            position: 'top',
            html: true,
          });
          break;

        default:
          Notify.create({
            color: 'red',
            textColor: 'white',
            icon: 'error',
            caption: error.message,
            position: 'top',
            message: error.response.data?.error || 'Произошла ошибка',
          });
          break;
      }
    } else if (error.request) {
      if (error instanceof axios.CanceledError) {
        return Promise.reject(error);
      }
      Notify.create({
        color: 'red',
        textColor: 'white',
        icon: 'error',
        caption: error.message || 'Нет ответа от сервера',
        position: 'top',
      });
    } else {
      Notify.create({
        color: 'red',
        textColor: 'white',
        icon: 'error',
        caption: error.message || 'Произошла неизвестная ошибка',
        position: 'top',
      });
    }

    return Promise.reject(error);
  },
);

export default api;
