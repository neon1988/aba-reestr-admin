// src/services/worksheets.ts
import type { Worksheet } from 'src/models/Worksheet';
import api from './api';

export const getWorksheets = (page: number = 1) => api.get('/worksheets', {
  params: {
    page,
  },
});

export const getWorksheetById = (id: number) => api.get(`/worksheets/${id}`);

export const createWorksheet = (data: Partial<Worksheet>) => api.post('/worksheets', data);

export const updateWorksheet = (id: number, data: Partial<Worksheet>) => api.patch(`/worksheets/${id}`, data);

export const deleteWorksheet = (id: number) => api.delete(`/worksheets/${id}`);
