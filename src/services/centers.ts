// src/services/centers.ts
import type { Center } from 'src/models/Center'; // убедитесь, что модель Center создана
import api from './api'; // импорт основного API-инстанса

// Получить список центров с поддержкой пагинации
export const getCenters = (page: number = 1) => api.get(`/centers?page=${page}`);

// Получить данные конкретного центра по ID
export const getCenterById = (id: string | number) => api.get(`/centers/${id}`);

// Создать новый центр
export const createCenter = (data: Partial<Center>) => api.post('/centers', data);

// Обновить данные центра по ID
export const updateCenter = (id: string | number, data: Partial<Center>) => api.put(`/centers/${id}`, data);

// Удалить центр по ID
export const deleteCenter = (id: string | number) => api.delete(`/centers/${id}`);

export const approveCenter = (id: number) => api.put(`/centers/${id}/approve`);

export const rejectCenter = (id: number) => api.put(`/centers/${id}/reject`);
