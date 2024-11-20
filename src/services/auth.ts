// src/services/auth.ts
import api from './api';

export const login = (data: { email: string; password: string }) => api.post('/login', data);

export const logout = () => api.post('/logout');

export const getAuthenticatedUser = () => api.get('/user');
