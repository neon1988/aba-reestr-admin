// stores/conferenceStore.ts
import { defineStore } from 'pinia';
import type { Conference } from 'src/models/Conference'; // Интерфейс Conference из модели
import type { Meta } from 'src/models/Pagination'; // Интерфейс Meta для пагинации
import { getEndedConferences, getUpcomingConferences } from 'src/services/conferences'; // Сервис для получения вебинаров

export const useConferencesStore = defineStore('conferences', {
  state: () => ({
    conferences: [] as Conference[], // Список вебинаров
    meta: {} as Meta, // Пагинация
    currentPage: 1, // Текущая страница
    loading: false, // Статус загрузки
  }),

  actions: {
    // Загрузка вебинаров
    async fetchUpcomingConferences() {
      this.loading = true;
      try {
        const response = await getUpcomingConferences(this.currentPage);
        this.conferences = response.data.data; // Массив вебинаров
        this.meta = response.data.meta; // Данные о пагинации
        this.currentPage = this.meta.current_page; // Обновление текущей страницы
      } catch (error) {
        // Обработка ошибок
      } finally {
        this.loading = false;
      }
    },

    async fetchEndedConferences() {
      this.loading = true;
      try {
        const response = await getEndedConferences(this.currentPage);
        this.conferences = response.data.data; // Массив вебинаров
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
