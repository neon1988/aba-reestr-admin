import api from './api'; // импорт основного API-инстанса

// Получить список пользователей с поддержкой пагинации
export const getStat = () => api.get('/stats');
