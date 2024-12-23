// src/services/specialists.ts
import type { Specialist } from 'src/models/Specialist';
import type { StatusEnum } from 'src/enums/StatusEnums';
import api from './api';

export const getSpecialists = (status: StatusEnum, page: number = 1) => api.get('/specialists', {
  params: {
    status,
    page,
  },
});

export const getSpecialistsOnCheck = (page: number = 1) => api.get(`/specialists/on_check?page=${page}`);

export const getSpecialistById = (id: number) => api.get(`/specialists/${id}`);

export const createSpecialist = (data: Partial<Specialist>) => api.post('/specialists', data);

export const updateSpecialist = (id: string, data: Partial<Specialist>) => api.put(`/specialists/${id}`, data);

export const deleteSpecialist = (id: string) => api.delete(`/specialists/${id}`);

export const approveSpecialist = (id: number) => api.put(`/specialists/${id}/approve`);

export const rejectSpecialist = (id: number) => api.put(`/specialists/${id}/reject`);
