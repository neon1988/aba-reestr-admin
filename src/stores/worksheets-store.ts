// stores/worksheetStore.ts
import { defineStore } from 'pinia';
import type { Worksheet } from 'src/models/Worksheet'; // Интерфейс Worksheet из модели
import type { Meta } from 'src/models/Pagination'; // Интерфейс Meta для пагинации
import { getWorksheets } from 'src/services/worksheets'; // Сервис для получения вебинаров

export const useWorksheetsStore = defineStore('worksheets', {
  state: () => ({
    worksheets: [] as Worksheet[], // Список вебинаров
    meta: {} as Meta, // Пагинация
    currentPage: 1, // Текущая страница
    loading: false, // Статус загрузки
  }),

  actions: {
    // Загрузка вебинаров
    async fetchWorksheets() {
      this.loading = true;
      try {
        const response = await getWorksheets(this.currentPage);
        this.worksheets = response.data.data; // Массив вебинаров
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
