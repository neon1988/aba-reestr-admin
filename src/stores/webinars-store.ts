// stores/webinarStore.ts
import { defineStore } from 'pinia';
import type { Webinar } from 'src/models/Webinar'; // Интерфейс Webinar из модели
import type { Meta } from 'src/models/Pagination'; // Интерфейс Meta для пагинации
import { getEndedWebinars, getUpcomingWebinars } from 'src/services/webinars'; // Сервис для получения вебинаров

export const useWebinarsStore = defineStore('webinars', {
  state: () => ({
    webinars: [] as Webinar[], // Список вебинаров
    meta: {} as Meta, // Пагинация
    currentPage: 1, // Текущая страница
    loading: false, // Статус загрузки
  }),

  actions: {
    // Загрузка вебинаров
    async fetchUpcomingWebinars() {
      this.loading = true;
      try {
        const response = await getUpcomingWebinars(this.currentPage);
        this.webinars = response.data.data; // Массив вебинаров
        this.meta = response.data.meta; // Данные о пагинации
        this.currentPage = this.meta.current_page; // Обновление текущей страницы
      } catch (error) {
        // Обработка ошибок
      } finally {
        this.loading = false;
      }
    },

    async fetchEndedWebinars() {
      this.loading = true;
      try {
        const response = await getEndedWebinars(this.currentPage);
        this.webinars = response.data.data; // Массив вебинаров
        this.meta = response.data.meta; // Данные о пагинации
        this.currentPage = this.meta.current_page; // Обновление текущей страницы
      } catch (error) {
        // Обработка ошибок
      } finally {
        this.loading = false;
      }
    },

    // Установить текущую страницу
    setPage(page: number) {
      this.currentPage = page;
    },
  },
});
