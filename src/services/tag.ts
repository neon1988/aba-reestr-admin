// src/services/tags.ts
import api from './api';

export const getTags = (search: string = '', page: number = 1) => api.get('/tags', {
  params: {
    search,
    page,
  },
});
