import type { User } from 'src/models/User'; // убедитесь, что модель User создана
import api from './api'; // импорт основного API-инстанса

// Получить список пользователей с поддержкой пагинации
export const getUsers = (page: number = 1) => api.get(`/users?page=${page}`);

// Получить данные конкретного пользователя по ID
export const getUserById = (id: string | number) => api.get(`/users/${id}`);

// Создать нового пользователя
export const createUser = (data: Partial<User>) => api.post('/users', data);

// Обновить данные пользователя по ID
export const updateUser = (id: string | number, data: Partial<User>) => api.patch(`/users/${id}`, data);

// Удалить пользователя по ID
export const deleteUser = (id: string | number) => api.delete(`/users/${id}`);

export const updateUserPhoto = (id: string | number, file: File) => {
  const formData = new FormData();
  formData.append('photo', file);

  return api.post(
    `/users/${id}/photos`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
