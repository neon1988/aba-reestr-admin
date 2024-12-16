// src/services/webinars.ts
import type { Webinar } from 'src/models/Webinar';
import api from './api';

export const getWebinars = (page: number = 1) => api.get('/webinars', {
  params: {
    page,
  },
});

export const getUpcomingWebinars = (page: number = 1) => api.get('/webinars/upcoming', {
  params: {
    page,
  },
});

export const getEndedWebinars = (page: number = 1) => api.get('/webinars/ended', {
  params: {
    page,
  },
});

export const getWebinarById = (id: number) => api.get(`/webinars/${id}`);

export const createWebinar = (data: Partial<Webinar>) => api.post('/webinars', data);

export const updateWebinar = (id: number, data: Partial<Webinar>) => api.put(`/webinars/${id}`, data);

export const deleteWebinar = (id: number) => api.delete(`/webinars/${id}`);
