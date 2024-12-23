// src/services/specialists.ts

import { api } from 'boot/axios';

export const getCountries = () => api.get('/countries', {});
