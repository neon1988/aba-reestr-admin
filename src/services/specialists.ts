// src/services/specialists.ts
import type { Specialist } from 'src/models/Specialist';
import { StatusEnum } from 'src/enums/StatusEnums';
import type { AxiosRequestConfig } from 'axios'; // Добавляем импорт
import api from './api';

export const getSpecialists = (
  search: string = '',
  status: StatusEnum = StatusEnum.Accepted,
  page: number = 1,
  options: { signal?: AbortSignal } = {},
) => api.get('/specialists', {
  params: {
    search,
    status,
    page,
  },
  signal: options.signal,
} as AxiosRequestConfig);

export const getSpecialistsOnCheck = (page: number = 1) => api.get(`/specialists/on_check?page=${page}`);

export const getSpecialistById = (id: number) => api.get(`/specialists/${id}`);

export const createSpecialist = (data: Partial<Specialist>) => api.post('/specialists', data);

export const updateSpecialist = (id: string, data: Partial<Specialist>) => api.put(`/specialists/${id}`, data);

export const deleteSpecialist = (id: string) => api.delete(`/specialists/${id}`);

export const approveSpecialist = (id: number) => api.put(`/specialists/${id}/approve`);

export const rejectSpecialist = (id: number) => api.put(`/specialists/${id}/reject`);
