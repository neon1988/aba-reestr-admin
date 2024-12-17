// src/services/conferences.ts
import type { Conference } from 'src/models/Conference';
import api from './api';

export const getConferences = (page: number = 1) => api.get('/conferences', {
  params: {
    page,
  },
});

export const getUpcomingConferences = (page: number = 1) => api.get('/conferences/upcoming', {
  params: {
    page,
  },
});

export const getEndedConferences = (page: number = 1) => api.get('/conferences/ended', {
  params: {
    page,
  },
});

export const getConferenceById = (id: number) => api.get(`/conferences/${id}`);

export const createConference = (data: Partial<Conference>) => api.post('/conferences', data);

export const updateConference = (id: number, data: Partial<Conference>) => api.patch(`/conferences/${id}`, data);

export const deleteConference = (id: number) => api.delete(`/conferences/${id}`);
