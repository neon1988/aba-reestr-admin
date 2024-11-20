import { defineStore } from 'pinia';
import { login, logout, getAuthenticatedUser } from 'src/services/auth';
import type { User } from 'src/models/User'; // импортируем интерфейсы

interface LoginResponse {
  access_token: string; // Токен, который мы ожидаем получить
  token_type: string;
  user: User;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null, // типизируем user
    loading: false,
    error: null as string | null,
    token: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await login(credentials); // типизированный ответ
        const data = response.data as LoginResponse; // кастуем ответ к типу LoginResponse
        this.token = data.access_token; // Сохраняем токен
        if (this.token) {
          localStorage.setItem('token', this.token); // Сохраняем токен в localStorage
        }
        this.user = data.user; // Сохраняем данные о пользователе
      } catch (error) {
        this.error = 'Ошибка аутентификации';
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await logout();
        this.token = null; // Сбросим токен
        this.user = null; // Сбросим пользователя
        localStorage.removeItem('token'); // Удалим токен из localStorage
      } catch (error) {
        this.error = 'Ошибка при выходе из системы';
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      this.loading = true;
      try {
        const response = await getAuthenticatedUser();
        const data = response.data as User; // типизируем ответ
        this.user = data; // Устанавливаем пользователя
      } catch (error) {
        this.error = 'Не удалось загрузить данные пользователя';
      } finally {
        this.loading = false;
      }
    },

    // Метод для защиты от неаутентифицированных пользователей
    async checkAuthentication() {
      if (!this.isAuthenticated) {
        this.error = 'Пользователь не аутентифицирован';
      }
    },

    async initializeToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        await this.fetchUser();
      }
    },
  },
});
