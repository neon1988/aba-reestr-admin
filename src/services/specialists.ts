// src/services/specialists.ts
import type { Specialist } from 'src/models/Specialist';
import api from './api';

export const getSpecialists = (page: number = 1) => api.get(`/specialists?page=${page}`);

export const getSpecialistsOnCheck = (page: number = 1) => api.get(`/specialists/on_check?page=${page}`);

export const getSpecialistById = (id: string) => api.get(`/specialists/${id}`);

export const createSpecialist = (data: Partial<Specialist>) => api.post('/specialists', data);

export const updateSpecialist = (id: string, data: Partial<Specialist>) => api.put(`/specialists/${id}`, data);

export const deleteSpecialist = (id: string) => api.delete(`/specialists/${id}`);
