// src/boot/precognition.js

import { client } from 'laravel-precognition-vue';
import { api } from './axios'; // Импортируем настроенный экземпляр Axios

// Используем глобальный экземпляр Axios для Precognition
client.use(api);
