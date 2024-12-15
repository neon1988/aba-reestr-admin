// src/services/bulletins.ts
import type { Bulletin } from 'src/models/Bulletin';
import type { StatusEnum } from 'src/enums/StatusEnums';
import api from './api';

export const getBulletins = (status: StatusEnum, page: number = 1) => api.get('/bulletins', {
  params: {
    status,
    page,
  },
});

export const getBulletinsOnCheck = (page: number = 1) => api.get(`/bulletins/on_check?page=${page}`);

export const getBulletinById = (id: string) => api.get(`/bulletins/${id}`);

export const createBulletin = (data: Partial<Bulletin>) => api.post('/bulletins', data);

export const updateBulletin = (id: string, data: Partial<Bulletin>) => api.put(`/bulletins/${id}`, data);

export const deleteBulletin = (id: string) => api.delete(`/bulletins/${id}`);

export const approveBulletin = (id: number) => api.put(`/bulletins/${id}/approve`);

export const rejectBulletin = (id: number) => api.put(`/bulletins/${id}/reject`);
